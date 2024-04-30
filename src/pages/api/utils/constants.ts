import idl from "../idl/bridge.json";
import idl2 from "../idl/new.json";

import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";

/** Constants for RPC Connection the Solana Blockchain */

// processed is the fastest
// finalized is most safe
// confirmed is somewhere balance of both
export const commitmentLevel = "processed";
export const endpoint =
  process.env.NEXT_PUBLIC_ALCHEMY_RPC_URL || clusterApiUrl("devnet");
export const connection = new Connection(endpoint, commitmentLevel);

/** Constants for our deployed hello world program */
export const HELLO_WORLD_PROGRAM_ID_FOR_BRIDGE = idl.metadata.address;
export const HELLO_WORLD_PROGRAM_INTERFACE_FOR_BRIDGE = JSON.parse(
  JSON.stringify(idl)
);
export const TEST_PROGRAM_ID = new PublicKey(idl2.metadata.address);
export const TEST_PROGRAM_INTERFACE = JSON.parse(JSON.stringify(idl2));