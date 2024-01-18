"use client";

import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsName,
} from 'wagmi'
import Button from './Button';
import { forwardSearchParams, shortenAddress } from '@/lib/utils';

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
        {ensName ? ensName : shortenAddress(address as string)}
      </Button>
    )
  }

  return (
    <div>
      {connectors.map((connector) => (
        <Button
          key={connector.id}
          onClick={async () => {
            connect({ connector }, {
              onSuccess: (data) => {
                let address = data.accounts[0];
                let params = forwardSearchParams({ connected: address });
                window.location.search = params;
              }
            });
          }}
        >
          {"Connect Wallet"}
        </Button>
      ))}

      {error && <div>{error.message}</div>}
    </div>
  )
}