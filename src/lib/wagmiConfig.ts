import { http, createConfig } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { injected, walletConnect } from 'wagmi/connectors'
import { createWeb3Modal } from '@web3modal/wagmi/react';

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string;

const metadata = {
  name: 'Axiom Next.js Scaffold',
  description: 'Axiom dApp using Next.js',
  url: 'http://localhost:3000', // origin must match your domain & subdomain
  icons: []
}

export const wagmiConfig = createConfig({
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(process.env.NEXT_PUBLIC_PROVIDER_URI_SEPOLIA as string)
  },
  connectors: [
    walletConnect({ projectId, metadata, showQrModal: false }),
    injected({ shimDisconnect: true }),
  ]
});

createWeb3Modal({
  projectId,
  wagmiConfig,
})