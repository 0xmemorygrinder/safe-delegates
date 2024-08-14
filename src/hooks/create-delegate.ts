import { useCallback, useEffect, useState } from "react";
import { useAccount, useSignTypedData } from "wagmi"
import { Address, Hex } from "viem";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TRANSACTION_SERVICE_URLS } from "@/config/safe";

export const useCreateDelegate = ({safe}: {safe: Address}) => {
  const { address, chainId } = useAccount();
  const [label, setLabel] = useState('');
  const [delegate, setDelegate] = useState<Address>();
  const { signTypedData, data: signature } = useSignTypedData();
  const signCreation = useCallback(async (dele: Address, label: string) => {
    console.log('signing creation', dele, label);
    setDelegate(dele);
    setLabel(label);
    signTypedData({
      domain: {
        name: 'Safe Transaction Service',
        version: '1.0',
        chainId,
      },
      types: {
        Delegate: [
          { name: 'delegateAddress', type: 'address' },
          { name: 'totp', type: 'uint256' }
        ]
      },
      primaryType: 'Delegate',
      message: {
        delegateAddress: dele,
        totp: BigInt(Math.floor(Date.now() / 1000 / 3600))
      }
    });
  }, [signTypedData, chainId]);
  const queryClient = useQueryClient();
  const {data, isPending, mutate: submitCreation} = useMutation({
    mutationKey: ['delegates', address],
    mutationFn: async (signature: Hex) => {
      const response = await fetch(`${TRANSACTION_SERVICE_URLS[chainId!]}/api/v2/delegates/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          safe,
          signature,
          delegate,
          delegator: address,
          label,
        })
      });
      return response.json();
    },
  });

  useEffect(() => {
    if (signature) {
      submitCreation(signature);
    }
  }, [signature]);

  useEffect(() => {
    if (data) {
      setDelegate(undefined);
      setLabel('');
      queryClient.invalidateQueries({ queryKey: ['safes', safe, 'delegates'] });
    }
  }, [data]);

  return {
    createDelegate: signCreation,
    isPending,
    result: data,
  }
}
