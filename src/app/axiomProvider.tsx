"use client";

import { useEffect, useState } from "react";
import { AxiomCircuitProvider } from "@axiom-crypto/react";
import { WebappSettings } from "@/lib/webappSettings";

export default function AxiomProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <AxiomCircuitProvider
      compiledCircuit={WebappSettings.compiledCircuit}
      provider={WebappSettings.provider}
      chainId={WebappSettings.chainId}
    >
      {mounted && children}
    </AxiomCircuitProvider>
  );
}
