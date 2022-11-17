export enum Chains {
  Ethereum = 'ETH',
  Polygon = 'MATIC',
  Bitcoin = 'BTC',
  Solana = 'SOL',
  Tron = 'TRON',
}

export const SDKOptions = { apiKey: process.env.TATUM_API_KEY || '' };
