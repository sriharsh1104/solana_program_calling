import { Program, AnchorProvider, web3 } from "@project-serum/anchor";
import { CrudWorld } from "./api/types/claim_deposit";
import {
  connection,
  commitmentLevel,
  TEST_PROGRAM_ID,
  TEST_PROGRAM_INTERFACE,
} from "./api/utils/constants";
import { AnchorWallet } from "@solana/wallet-adapter-react";
import { Keypair, PublicKey } from "@solana/web3.js";
const anchor = require("@project-serum/anchor");

export async function getMessage3(
  wallet: AnchorWallet, // User Wallet PublicKey
  messageAccount: any // this is the account that will store messages
) {
  const provider = new AnchorProvider(connection, wallet, {
    preflightCommitment: commitmentLevel,
  });

  if (!provider) return;
  /* create the program interface combining the idl, program Id, and provider */
  const program = new Program(
    TEST_PROGRAM_INTERFACE, //  IDL Of Calculator
    TEST_PROGRAM_ID, //  ProgramId Of Calculator
    provider
  ) as Program<CrudWorld>;
  try {
    const publicKey = messageAccount;
    const message = await program.account.transactionInfo.fetch(
      new PublicKey(publicKey)
    );
    return message;
  } catch (error) {
    console.log("getMessage Error ", error);
    return;
  }
}

export async function depositMoney(REVIEW_PDA: any, REVIEW_PDA1: any, wallet: any) {
  const provider = new AnchorProvider(connection, wallet, {
    preflightCommitment: commitmentLevel,
  });
  if (!provider.wallet) return;

  /* create the program interface combining the idl, program Id, and provider */
  const program = new Program(
    TEST_PROGRAM_INTERFACE,
    TEST_PROGRAM_ID,
    provider
  ) as Program<CrudWorld>;
  try {
    console.log("first123", REVIEW_PDA.toString());
    const value = new anchor.BN(10);
    const timeStamp = new anchor.BN(Date.now() / 1000);
    console.log("dasdkjasidjaslkndas", REVIEW_PDA1.toString(), REVIEW_PDA.toString());
    const txn = await program.methods
      .deposit("mvyMgM5K6hKabKncXejzY5qE3QdWcjFnRy5bQWTEy7k", value, timeStamp) // To => Address ,Amount , timeStamp
      .accounts({
        txinfo: REVIEW_PDA,
        reciept: REVIEW_PDA1,
        signer: wallet.publicKey,
        systemProgram: web3.SystemProgram.programId,
      })
      // .signers([messageAccountFromPrivateKey]) //no Need to set signer can use publicKey to pay
      .rpc();

    console.log("Transaction", txn);
    return txn;
  } catch (error) {
    console.log("Transaction error ", error);
    return;
  }
}
