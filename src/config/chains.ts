import { mainnet, polygon, optimism, arbitrum, base, bsc, polygonZkEvm, gnosis, celo, avalanche, sepolia, baseSepolia } from "viem/chains";
import { zksync } from "viem/zksync";

export const chains = [
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
  ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [sepolia, baseSepolia] : []),
]

export const chainNames = chains
  .reduce((acc, chain) => {
    acc[chain.id] = chain.name
    return acc
  }, {} as Record<string, string>)