"use client";

import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { wagmiConfig } from '@/lib/wagmiConfig';
import { useEffect, useState } from "react";
import { AxiomCrosschainCircuitProvider } from "@axiom-crypto/react";
import { WebappSettings } from "@/lib/webappSettings";
import { BridgeType } from "@axiom-crypto/client/types";

const queryClient = new QueryClient()

export default function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <AxiomCrosschainCircuitProvider
          source={{
            chainId: "11155111",
            rpcUrl: process.env.NEXT_PUBLIC_RPC_URL_11155111!,
          }}
          target={{
            chainId: "84532",
            rpcUrl: process.env.NEXT_PUBLIC_RPC_URL_84532!,
          }}
          bridgeType={BridgeType.BlockhashOracle}
          compiledCircuit={WebappSettings.compiledCircuit}
        >
          {mounted && children}
        </AxiomCrosschainCircuitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
