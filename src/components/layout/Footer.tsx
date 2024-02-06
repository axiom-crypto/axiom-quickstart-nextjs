import Link from "next/link";

export default function Footer() {
  return (
    <div className="flex flex-row justify-between items-center w-screen px-4 py-2 border-t-[1px] border-lightline">
      <div />
      <div className="flex flex-row items-center gap-2 text-xs sm:gap-4 sm:text-sm">
        <Link href="https://axiom.xyz">
          Axiom Homepage
        </Link>
        <Link href="https://docs.axiom.xyz/">
          Docs
        </Link>
        <Link href="https://github.com/axiom-crypto/axiom-scaffold-nextjs">
          Scaffold Source Code
        </Link>
      </div>
    </div>
  )
}
