import { Constants } from "@/shared/constants";
import { http, createConfig } from 'wagmi'
import { sepolia } from "viem/chains";

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string;

const metadata = {
  name: 'Average Balance Proof',
  description: 'Average Balance Proof',
  url: 'https://autonomous-airdrop-example.vercel.app/',
  icons: ['']
}

export const config = createConfig({
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(process.env.NEXT_PUBLIC_ALCHEMY_URI_SEPOLIA),
  },
})