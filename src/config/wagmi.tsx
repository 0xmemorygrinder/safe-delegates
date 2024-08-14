"use client";
import { ReactNode, useState } from 'react';
import { WagmiProvider } from 'wagmi';
import { darkTheme, getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { arbitrum, avalanche, base, baseSepolia, bsc, celo, gnosis, mainnet, optimism, polygon, polygonZkEvm, sepolia, zksync } from 'wagmi/chains'
import "@rainbow-me/rainbowkit/styles.css";

export const getConfig = () => getDefaultConfig({
  appName: import.meta.env.VITE_APP_NAME || 'Safe Delegates',
  projectId: import.meta.env.VITE_PROJECT_ID || 'safe-delegates',
  chains: [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    bsc,
    polygonZkEvm,
    gnosis,
    zksync,
    celo,
    avalanche,
    ...(import.meta.env.VITE_ENABLE_TESTNETS === 'true' ? [sepolia, baseSepolia] : []),
  ],
  ssr: true,
});

declare module 'wagmi' {
  interface Register {
    config: ReturnType<typeof getConfig>
  }
}

export function Providers(props: {
  children: ReactNode
}) {
  const [config] = useState(() => getConfig())
  const [queryClient] = useState(() => new QueryClient())

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme({
          accentColor: '#0cb259',
          accentColorForeground: '#ffffff',
        })}>
          {props.children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}