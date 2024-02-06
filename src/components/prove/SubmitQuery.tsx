"use client";

import { Constants } from "@/shared/constants";
import { useEffect, useState } from "react";
import {
  useWatchContractEvent,
  useWriteContract,
  useSimulateContract,
} from "wagmi";
import Button from "../ui/Button";
import { useRouter } from "next/navigation";
import { formatEther, formatUnits } from "viem";
import Link from "next/link";
import { useAxiomCircuit } from '@axiom-crypto/react';
import Decimals from "../ui/Decimals";

export default function SubmitQuery({
  callbackAbi,
}: {
  callbackAbi: any[],
}) {
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
      }, 15000);
    }
  }, [isSuccess, setShowExplorerLink]);

  // Monitor contract for `AxiomV2Call` event
  useWatchContractEvent({
    address: Constants.CALLBACK_CONTRACT as `0x${string}`,
    abi: callbackAbi,
    eventName: 'AxiomV2Call',
    onLogs: (logs) => {
      let topics = logs[0].topics;
      // check that the queryId is the same as the one we just sent
      if (topics[3] && builtQuery?.queryId && BigInt(topics[3]) === BigInt(builtQuery?.queryId)) {
        let txHash = logs[0].transactionHash;
        router.push(`success/?txHash=${txHash}`);
      }
    },
  });

  const renderButtonText = () => {
    if (isSuccess) {
      return "Waiting for callback...";
    }
    if (isPending) {
      return "Confirm transaction in wallet...";
    }
    return "Submit query";
  }

  const renderClaimProofCostText = () => {
    return (
      <div className="flex flex-col items-center text-xs text-midtone mt-2">
        <div>
          {"Generating the proof for this query costs up to "}
          <Decimals>
            {formatEther(BigInt(builtQuery?.value ?? 0)).toString()}
          </Decimals>
          {" ETH"}
        </div>
        <div>
          {"(Based on a current maxFeePerGas of "}
          <Decimals>
            {formatUnits(builtQuery?.args?.[4]?.maxFeePerGas ?? "0", 9).toString()}
          </Decimals>
          {" gwei)"}
        </div>
      </div>
    )
  }

  const renderExplorerLink = () => {
    if (!showExplorerLink) {
      return null;
    }
    return (
      <Link href={`${Constants.EXPLORER_BASE_URL}/query/${builtQuery?.queryId}`} target="_blank">
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
          {isSuccess ? "Proof generation may take up to 3 minutes" : renderClaimProofCostText()}
        </div>
        {renderExplorerLink()}
      </div>
    </div>
  )
}
