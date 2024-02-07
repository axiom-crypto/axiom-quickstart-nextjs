"use client";

import { classes } from "@/lib/utils";
import Link from "next/link";
import ConnectWallet from '@/components/web3/ConnectWallet'
import { useAccount, useSwitchChain } from "wagmi";
import { Constants } from "@/shared/constants";
import SwitchChainButton from "../web3/SwitchChainButton";
import Button from "./Button";

export default function AdvanceStepButton({ label, href, selected, disabled }:{
  label: string,
  href: string,
  selected?: boolean,
  disabled?: boolean,
}) {
  const { isConnected, chainId } = useAccount();
  const { switchChain } = useSwitchChain();
  if (!isConnected) {
    return <ConnectWallet />
  }
  if (chainId !== Constants.CHAIN_ID_SEPOLIA) {
    return <SwitchChainButton switchChain={switchChain} />
  }
  return (
    <Link href={href} prefetch={false}>
      <Button>
        { label }
      </Button>
    </Link>
  )
}