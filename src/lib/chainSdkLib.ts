import { TatumBtcSDK } from '@tatumio/btc';
import { TatumEthSDK } from '@tatumio/eth';
import { TatumPolygonSDK } from '@tatumio/polygon';
import { TatumSolanaSDK } from '@tatumio/solana';
import { TatumTronSDK } from '@tatumio/tron';

export enum Chains {
  Ethereum = 'ETH',
  Polygon = 'MATIC',
  Bitcoin = 'BTC',
  Solana = 'SOL',
  Tron = 'TRON',
}

// @todo
// eslint-disable-next-line
export default function TatumSDK(chain: Chains): any {
  const SDKOptions = { apiKey: process.env.TATUM_API_KEY ?? '' };

  switch (chain) {
    case Chains.Ethereum:
      return TatumEthSDK(SDKOptions);
    case Chains.Polygon:
      return TatumPolygonSDK(SDKOptions);
    case Chains.Bitcoin:
      return TatumBtcSDK(SDKOptions);
    case Chains.Solana:
      return TatumSolanaSDK(SDKOptions);
    case Chains.Tron:
      return TatumTronSDK(SDKOptions);
    default:
      return TatumEthSDK(SDKOptions);
  }
}
