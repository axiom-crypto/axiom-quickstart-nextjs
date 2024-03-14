"use client";

import { useEffect, useState } from "react";
import { AxiomCircuitProvider } from "@axiom-crypto/react";
import { AxiomSettings } from "@/lib/axiomSettings";

export default function AxiomProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <AxiomCircuitProvider
      compiledCircuit={AxiomSettings.compiledCircuit}
      provider={AxiomSettings.provider}
      chainId={AxiomSettings.chainId}
    >
      {mounted && children}
    </AxiomCircuitProvider>
  );
}
