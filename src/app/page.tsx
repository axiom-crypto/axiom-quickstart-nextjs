import MainLayout from '@/components/layout/MainLayout'
import ConnectWallet from '@/components/ui/ConnectWallet'
import LinkButton from '@/components/ui/LinkButton'
import Title from '@/components/ui/Title'
import { forwardSearchParams } from '@/lib/utils'
import compiledCircuit from "../../axiom/data/compiled.json";

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

export default async function Home({ searchParams }: PageProps) {
  const connected = searchParams?.connected as string ?? "";
  console.log(searchParams);

  if (compiledCircuit === undefined) {
    return (
      <div>
        Compile circuit first!
      </div>
    )
  }

  const renderButton = () => {
    if (connected) {
      return <LinkButton
        label="Generate Proof"
        href={"/prove?" + forwardSearchParams(searchParams)}
      />;
    }
    return <ConnectWallet connected={connected} />;
  }

  return (
    <>
      <Title>
        Average Balance Proof
      </Title>
      <div className="text-center">
        Generate a ZK proof of your average ETH balance over the past 7,200 blocks (24 hours).
      </div>
      {renderButton()}
    </>
  )
}