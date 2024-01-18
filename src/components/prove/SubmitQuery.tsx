"use client";

import { Constants } from "@/shared/constants";
import { useCallback, useEffect, useState } from "react";
import {
  useAccount,
  useWatchContractEvent,
  useReadContract,
  useWriteContract,
  useSimulateContract,
} from "wagmi";
import Button from "../ui/Button";
import { useRouter } from "next/navigation";
import { formatEther } from "viem";
import Link from "next/link";
import { useAxiomCircuit } from '@axiom-crypto/react';

export default function SubmitQuery({
  callbackAbi,
}: {
  callbackAbi: any[],
}) {
  const { address } = useAccount();
  const router = useRouter();
  const { builtQuery } = useAxiomCircuit();
  const [showExplorerLink, setShowExplorerLink] = useState(false);

  // Prepare hook for the sendQuery transaction
  const { data } = useSimulateContract(builtQuery!);
  const { writeContract, isSuccess, isError, isPending } = useWriteContract();

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        setShowExplorerLink(true);
      }, 30000);
    }
  }, [isSuccess, setShowExplorerLink]);

  const proofGeneratedAction = useCallback(() => {
    router.push(`success/?address=${address}`);
  }, [router, address]);

  const proofValidationFailedAction = useCallback(() => {
    if (isError) {
      router.push(`fail/?address=${address}`);
    }
  }, [isError, router, address]);

  // Monitor contract for `ExampleClientEvent` event
  useWatchContractEvent({
    address: Constants.CALLBACK_CONTRACT as `0x${string}`,
    abi: callbackAbi,
    eventName: 'ExampleClientEvent',
    // onLogs: proofGeneratedAction,
    onLogs: (logs) => {
      let txHash = logs[0].transactionHash;
      router.push(`success/?txHash=${txHash}`);
    },
  });

  const renderButtonText = () => {
    if (isSuccess) {
      return "Waiting for callback...";
    }
    if (isPending) {
      return "Confrm transaction in wallet...";
    }
    return "Submit query";
  }

  const renderClaimProofText = () => {
    return `Generating the proof for the claim costs ${formatEther(BigInt(builtQuery?.value ?? 0)).toString()}ETH`;
  }

  const renderExplorerLink = () => {
    if (!showExplorerLink) {
      return null;
    }
    return (
      <Link href={`https://explorer.axiom.xyz/v2/sepolia`} target="_blank">
        View status on Axiom Explorer
      </Link>
    )
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <Button
        disabled={!Boolean(data?.request)}
        onClick={() => writeContract(data!.request)}
      >
        {renderButtonText()}
      </Button>
      <div className="flex flex-col items-center text-sm gap-2">
        <div>
          {isSuccess ? "Proof generation may take up to 3 minutes" : renderClaimProofText()}
        </div>
        {renderExplorerLink()}
      </div>
    </div>
  )
}
