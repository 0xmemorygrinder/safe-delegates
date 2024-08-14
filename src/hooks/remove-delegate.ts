import { useCallback, useEffect, useState } from "react";
import { useAccount, useSignTypedData } from "wagmi"
import { Address, Hex } from "viem";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TRANSACTION_SERVICE_URLS } from "@/config/safe";

export const useRemoveDelegate = ({safe}: {safe: Address}) => {
  const { address, chainId } = useAccount();
  const [delegate, setDelegate] = useState<Address>();
  const { signTypedData, data: signature } = useSignTypedData();
  const signRemove = useCallback(async (dele: Address) => {
    setDelegate(dele);
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
  const {isSuccess, isPending, mutate: submitRemove} = useMutation({
    mutationKey: ['delegates', address],
    mutationFn: async (signature: Hex) => {
      await fetch(`${TRANSACTION_SERVICE_URLS[chainId!]}/api/v2/delegates/${delegate}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          safe,
          signature,
          delegator: address
        })
      });
    },
  });

  useEffect(() => {
    if (signature) {
      submitRemove(signature);
    }
  }, [signature]);

  useEffect(() => {
    if (isSuccess) {
      setDelegate(undefined);
      queryClient.invalidateQueries({ queryKey: ['safes', safe, 'delegates'] });
    }
  }, [isSuccess]);

  return {
    removeDelegate: signRemove,
    isPending,
  }
}
