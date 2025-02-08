import { calculateHash, currentTimestamp } from "./utils";
import type { BlockType } from "./types";

export class Block {
  block: BlockType;

  constructor(
    index: number,
    previousHash: string,
    data: string,
    difficulty: number,
    timestamp: number
  ) {
    this.block = {
      index,
      timestamp,
      previousHash,
      data,
      nonce: 0,
      hash: ''
    };
    
    // Mine the block with the given difficulty to get a valid hash
    this.block.hash = this.mine(difficulty);
  }

  public mine(difficulty: number): string {
    const target = "0".repeat(difficulty);
    while (true) {
      const hash = calculateHash(this.block);

      if (hash.startsWith(target)) {
        return hash;
      }

      this.block.nonce += 1;
    }
  }
}
