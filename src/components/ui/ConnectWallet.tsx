"use client";

import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsName,
} from 'wagmi'
import Button from './Button';
import { shortenAddress } from '@/lib/utils';
 
export default function ConnectWallet() {
  const { address, isConnected } = useAccount()
  const { data: ensName } = useEnsName({ address })
  const { connect, connectors, error } = useConnect()
  const { disconnect } = useDisconnect()

  if (isConnected) {
    return (
      <Button
        onClick={() => {
          disconnect();
        }}
      >
        { ensName ? ensName : shortenAddress(address as string) }
      </Button>
    )
  }
 
  return (
    <div>
      {connectors.map((connector) => (
        <Button
          key={connector.id}
          onClick={() => {
            connect({ connector });
          }}
        >
          { "Connect Wallet" }
        </Button>
      ))}
 
      {error && <div>{error.message}</div>}
    </div>
  )
}