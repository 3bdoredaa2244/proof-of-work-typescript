import { Blockchain } from "./blockchain";

(async () => {
  try {
    const simpleBlockchain = new Blockchain(4);
    console.log("Starting continuous mining...");
    // Continuously mine new blocks until stopped (Ctrl + C)
    await simpleBlockchain.mineContinuously();
  } catch (err) {
    console.error("Mining stopped:", err);
  }
})();
