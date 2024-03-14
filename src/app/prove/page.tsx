import BuildQuery from "@/components/prove/BuildQuery";
import Title from "@/components/ui/Title";
import { bytes32 } from "@/lib/utils";
import { publicClient } from "@/lib/viemClient";
import { UserInput } from "@axiom-crypto/client";
import { AxiomSettings } from "@/lib/axiomSettings";

interface PageProps {
  params: Params;
  searchParams: SearchParams;
}

interface Params {
  slug: string;
}

interface SearchParams {
  [key: string]: string | string[] | undefined;
}

export default async function Prove({ searchParams }: PageProps) {
  const connected = searchParams?.connected as string ?? "";

  const blockNumber = await publicClient.getBlockNumber();

  // We get the user inputs from the URL query parameters and connected wallet
  const inputs: UserInput<typeof AxiomSettings.inputs> = {
    blockNumber: Number(blockNumber),
    address: connected,
  }

  return (
    <>
      <Title>
        Prove
      </Title>
      <div className="text-center">
        Please wait while your browser generates a compute proof for the Axiom Query.
      </div>
      <div className="flex flex-col gap-2 items-center">
        <BuildQuery
          inputs={inputs}
          callbackTarget={AxiomSettings.callbackTarget}
          callbackExtraData={bytes32(connected)}
          refundee={connected}
        />
      </div>
    </>
  )
}
