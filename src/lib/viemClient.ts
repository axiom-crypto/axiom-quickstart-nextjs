import { createPublicClient, http } from 'viem'
import { CHAIN_ID, WebappSettings } from './webappSettings';
import { chainIdToViemChain } from './utils';

export const publicClient = createPublicClient({
  chain: chainIdToViemChain(CHAIN_ID),
  transport: http(WebappSettings.rpcUrl)
});
