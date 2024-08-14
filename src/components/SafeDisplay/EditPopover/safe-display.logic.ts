import { useAccount } from "wagmi";
import { Address } from "viem";
import { useQuery } from "@tanstack/react-query";
import { TRANSACTION_SERVICE_URLS } from "@/config/safe";
import { useEffect } from "react";

export const useSafeDisplay = ({ safe }: { safe: Address }) => {
  const { isConnected, chainId, chain } = useAccount();
  const { data: delegates, isLoading, error } = useQuery<{results: { delegator: Address, delegate: Address, label: string}[]}>({
    queryKey: ['safes', safe, 'delegates'],
    queryFn: async () => {
      const response = await fetch(`${TRANSACTION_SERVICE_URLS[chainId!]}/api//v2/delegates/?safe=${safe}&limit=10000`);
      return response.json();
    },
    enabled: isConnected,
  });

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  return {
    delegates: delegates?.results,
    isLoading,
    connected: isConnected,
    explorerBaseUrl: `${chain?.blockExplorers.default.url}/address/`,
  }
}