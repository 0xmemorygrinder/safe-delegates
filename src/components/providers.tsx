'use client';
import { type ReactNode } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { Providers as WagmiProviders } from '@/config/wagmi';
import { theme } from '@/config/theme';

export function Providers(props: {
  children: ReactNode
}) {
  return (
    <ChakraProvider theme={theme} >
      <WagmiProviders>
        {props.children}
      </WagmiProviders>
    </ChakraProvider>
  )
}