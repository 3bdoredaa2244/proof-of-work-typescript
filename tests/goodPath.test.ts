// -- DO NOT ALTER THIS FILE OR ANY CODE BELOW THIS LINE -- //
// Everything added extra in this file will be disregarded during evaluation
// Please use the student.test.ts file for any extra tests that you want to add
import { Blockchain } from "../src/blockchain";

describe("Blockchain Tests", () => {
  test("Genesis block creation", () => {
    const blockchain = new Blockchain(4);
    const genesisBlock = blockchain.chain[0].block;

    expect(genesisBlock.index).toBe(0);
    expect(genesisBlock.previousHash).toBe("0");
    expect(genesisBlock.data).toBe("Genesis Block");
    expect(genesisBlock.hash.startsWith("0000")).toBe(true); // Genesis block hash matches difficulty
  });

  test("Block addition", () => {
    const blockchain = new Blockchain(2);
    blockchain.addBlock("some data");
    blockchain.addBlock("some more data");

    expect(blockchain.chain.length).toBe(3); // Genesis + 2 blocks
    expect(blockchain.chain[1].block.data).toBe("some data");
    expect(blockchain.chain[2].block.data).toBe("some more data");
  });

  test("Balance initialization and tracking", () => {
    const blockchain = new Blockchain(2);

    // Initially no balances
    expect(blockchain.balances.get("Alice")).toBeUndefined();
    expect(blockchain.balances.get("Bob")).toBeUndefined();

    // Add balances
    blockchain.balances.set("Alice", 200);
    blockchain.balances.set("Bob", 100);

    expect(blockchain.balances.get("Alice")).toBe(200);
    expect(blockchain.balances.get("Bob")).toBe(100);
  });

  test("Transfer success", () => {
    const blockchain = new Blockchain(2);
    blockchain.balances.set("Alice", 100);
    blockchain.balances.set("Bob", 50);

    const success = blockchain.transferBalance("Alice", "Bob", 30);
    expect(success).toBe(true); // Transfer should succeed

    expect(blockchain.balances.get("Alice")).toBe(70); // Alice's balance reduced
    expect(blockchain.balances.get("Bob")).toBe(80); // Bob's balance increased
  });
});

// // -- DO NOT ALTER ANY CODE IN THIS FILE -- //
