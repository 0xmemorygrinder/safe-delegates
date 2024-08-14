import { useEffect } from "react";
import { useAccount } from "wagmi";
import { Address } from "viem";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { TRANSACTION_SERVICE_URLS } from "@/config/safe";

export const useSafesList = () => {
  const { isConnected, address, chainId } = useAccount();
  const queryClient = useQueryClient();
  const { data: safes, isLoading, error } = useQuery<{safes: Address[]}>({
    queryKey: ['safes'],
    queryFn: async () => {
      const response = await fetch(`${TRANSACTION_SERVICE_URLS[chainId!]}/api/v1/owners/${address}/safes`);
      return response.json();
    },
    enabled: isConnected,
  });

  useEffect(() => {
    queryClient.invalidateQueries({queryKey: ['safes']});
  }, [address, chainId]);

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  return {
    connected: isConnected,
    safes: safes?.safes,
    isLoading,
  }
}