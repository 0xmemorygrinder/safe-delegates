import { useEffect } from "react";
import { useAccount } from "wagmi";
import { Address } from "viem";
import { useQuery } from "@tanstack/react-query";
import { TRANSACTION_SERVICE_URLS } from "@/config/safe";

export const useSafeRow = ({safe}: { safe: Address}) => {
  const { isConnected, chainId, chain } = useAccount();
  const { data: safeInfo, isLoading, error } = useQuery({
    queryKey: ['safes', safe],
    queryFn: async () => {
      const response = await fetch(`${TRANSACTION_SERVICE_URLS[chainId!]}/api/v1/safes/${safe}`);
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
    connected: isConnected,
    safeInfo,
    isLoading,
    explorerUrl: `${chain?.blockExplorers.default.url}/address/${safe}`,
  }
}