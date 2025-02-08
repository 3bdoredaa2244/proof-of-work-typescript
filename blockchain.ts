import * as crypto from "crypto";
import { Block } from "./block";
import { BlockType } from "./types";
import { calculateHash, currentTimestamp, generateString } from "./utils";

export class Blockchain {
  public chain: Block[] = [];
  private difficulty: number;
  public balances: Map<string, number> = new Map();

  constructor(difficulty: number) {
    this.difficulty = difficulty;
    this.createGenesisBlock(difficulty);
  }

  private createGenesisBlock(difficulty: number): void {
    const genesisBlock = new Block(
      0,
      "0",
      "Genesis Block",
      this.difficulty,
      currentTimestamp()
    );
    this.chain.push(genesisBlock);
  }

  public lastBlock(): BlockType {
    return this.chain[this.chain.length - 1].block;
  }

  public addBlock(data: string): void {
    const previousBlock = this.lastBlock();
    const newBlock = new Block(
      previousBlock.index + 1,
      previousBlock.hash,
      data,
      this.difficulty,
      currentTimestamp()
    );
    this.chain.push(newBlock);
  }

  isValid(): boolean {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i].block;
      const previousBlock = this.chain[i - 1].block;

      // Check if the hash is valid
      if (currentBlock.hash !== calculateHash(currentBlock)) {
        return false;
      }

      // Check if the previous hash reference is correct
      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }

      // Check if the hash meets the difficulty requirement
      if (!currentBlock.hash.startsWith("0".repeat(this.difficulty))) {
        return false;
      }
    }
    return true;
  }

  public transferBalance(
    sender: string,
    receiver: string,
    amount: number
  ): boolean {
    const senderBalance = this.balances.get(sender) || 0;
    const receiverBalance = this.balances.get(receiver) || 0;

    if (senderBalance >= amount) {
      this.balances.set(sender, senderBalance - amount);
      this.balances.set(receiver, receiverBalance + amount);
      console.log(`Transfer successful: ${sender} -> ${receiver}, Amount: ${amount}`);
      return true;
    } else {
      console.log(`Transfer failed: Insufficient balance for ${sender}`);
      return false;
    }
  }

  public showBalances(): void {
    console.log("Balances: ", Object.fromEntries(this.balances));
  }

  async mineContinuously() {
    let indexer = 0;
    const accounts = ["Alice", "Bob", "Charlie", "David"];
    
    // Initialize some accounts with initial balances
    accounts.forEach(account => {
      this.balances.set(account, 1000);
    });

    while (true) {
      // Every 5 blocks, perform a random transfer
      if (indexer % 5 === 0) {
        const sender = accounts[Math.floor(Math.random() * accounts.length)];
        const receiver = accounts[Math.floor(Math.random() * accounts.length)];
        
        if (sender !== receiver) {
          const amount = Math.floor(Math.random() * 100) + 1;
          this.transferBalance(sender, receiver, amount);
          this.showBalances();
        }
      }

      this.addBlock(generateString(6));
      console.log(`Block ${indexer + 1} mined`);

      await new Promise((resolve) => setTimeout(resolve, 1000));
      indexer++;
    }
  }
}
