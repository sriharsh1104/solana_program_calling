import idl from "../idl/claim_deposit.json";

import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";

/** Constants for RPC Connection the Solana Blockchain */

// processed is the fastest
// finalized is most safe
// confirmed is somewhere balance of both
export const commitmentLevel = "processed";
export const endpoint =
  process.env.NEXT_PUBLIC_ALCHEMY_RPC_URL || clusterApiUrl("devnet"); // Set Network on which You Are Working
export const connection = new Connection(endpoint, commitmentLevel);

/** Constants for our deployed calculator  Program */

export const TEST_PROGRAM_ID = new PublicKey(idl.metadata.address);
export const TEST_PROGRAM_INTERFACE = JSON.parse(JSON.stringify(idl));