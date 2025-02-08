import { Blockchain } from "../blockchain";

describe("Additional Blockchain Tests", () => {
  test("Chain validity after multiple blocks", () => {
    const blockchain = new Blockchain(2);
    blockchain.addBlock("test1");
    blockchain.addBlock("test2");
    blockchain.addBlock("test3");
    
    expect(blockchain.isValid()).toBe(true);
  });

  test("Transfer with insufficient balance", () => {
    const blockchain = new Blockchain(2);
    blockchain.balances.set("Alice", 50);
    blockchain.balances.set("Bob", 50);

    const success = blockchain.transferBalance("Alice", "Bob", 100);
    expect(success).toBe(false);
    expect(blockchain.balances.get("Alice")).toBe(50);
    expect(blockchain.balances.get("Bob")).toBe(50);
  });

  test("Multiple transfers between accounts", () => {
    const blockchain = new Blockchain(2);
    blockchain.balances.set("Alice", 100);
    blockchain.balances.set("Bob", 100);
    blockchain.balances.set("Charlie", 100);

    blockchain.transferBalance("Alice", "Bob", 30);
    blockchain.transferBalance("Bob", "Charlie", 50);
    blockchain.transferBalance("Charlie", "Alice", 20);

    expect(blockchain.balances.get("Alice")).toBe(90);
    expect(blockchain.balances.get("Bob")).toBe(80);
    expect(blockchain.balances.get("Charlie")).toBe(70);
  });

  test("Block mining meets difficulty requirement", () => {
    const blockchain = new Blockchain(3);
    blockchain.addBlock("test block");
    
    const lastBlock = blockchain.lastBlock();
    expect(lastBlock.hash.startsWith("000")).toBe(true);
  });
});
