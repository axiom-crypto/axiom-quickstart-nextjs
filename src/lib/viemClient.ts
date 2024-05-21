import { createPublicClient, http } from 'viem'
import { SOURCE_CHAIN_ID, TARGET_CHAIN_ID, WebappSettings } from './webappSettings';
import { chainIdToViemChain } from './utils';

export const sourcePublicClient = createPublicClient({
  chain: chainIdToViemChain(SOURCE_CHAIN_ID),
  transport: http(WebappSettings.sourceProvider),
});

export const targetPublicClient = createPublicClient({
  chain: chainIdToViemChain(TARGET_CHAIN_ID),
  transport: http(WebappSettings.targetProvider)
});
