import * as crypto from "crypto";
import { BlockType } from "./types";

export function currentTimestamp(): number {
  return Math.floor(Date.now() / 1000);
}

export function generateString(length: number): string {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function calculateHash(block: BlockType): string {
  const data = `${block.index}${block.timestamp}${block.previousHash}${block.data}${block.nonce}`;
  return crypto.createHash('sha256').update(data).digest('hex');
}
