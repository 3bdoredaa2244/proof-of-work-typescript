export type BlockType = {
  index: number;
  timestamp: number;
  previousHash: string;
  data: string;
  nonce: number;
  hash: string;
};

export type BlockchainType = {
  chain: BlockType[];
  difficulty: number;
  balances: Map<string, number>; // Stores balances for each account
};
