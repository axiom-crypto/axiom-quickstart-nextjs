import LinkButton from "@/components/ui/LinkButton";
import Title from "@/components/ui/Title";

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

export default async function Fail({ searchParams }: PageProps) {
  const connected = searchParams?.connected as string ?? "";

  return (
    <>
      <Title>
        Error
      </Title>
      <div className="text-center">
        {"Something went wrong and you were not able to receive tokens."}
      </div>
      <LinkButton
        label="Try again"
        href="/"
      />
    </>
  )
}
