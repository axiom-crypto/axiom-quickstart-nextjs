"use client";

import Button from "../ui/Button"
import { SwitchChainMutate } from "wagmi/query";
import { Config } from "wagmi";
import { WebappSettings } from "@/lib/webappSettings";

export default function SwitchChainButton({ switchChain }: {
  switchChain: SwitchChainMutate<Config, unknown>;
}) {
  return (
    <Button onClick={() => switchChain({ chainId: Number(WebappSettings.chainId) })}>
      Switch to Sepolia
    </Button>
  )
}