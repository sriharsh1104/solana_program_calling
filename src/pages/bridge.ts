import { Program, AnchorProvider, web3 } from "@project-serum/anchor";
import { CrudWorld } from "./api/types/claim_deposit";
import {
  connection,
  commitmentLevel,
  TEST_PROGRAM_ID,
  TEST_PROGRAM_INTERFACE,
} from "./api/utils/constants";
import { AnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
const anchor = require("@project-serum/anchor");
import * as anchorcoral from "@coral-xyz/anchor";

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

export async function depositMoney(
  REVIEW_PDA: any,
  REVIEW_PDA1: any,
  wallet: any
) {
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
    console.log("REVIEW_PDA ", REVIEW_PDA.toString());
    const value = new anchor.BN(10);
    const timeStamp = new anchor.BN(Date.now() / 1000);
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
export async function claimMoney(
  // REVIEW_PDA: any,
  // REVIEW_PDA1: any,
  wallet: any
) {
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
    const value = new anchor.BN(10);
    // const timeStamp = new anchor.BN(Date.now() / 1000);
    // console.log("dasdkjasidjaslkndas", REVIEW_PDA1.toString(), REVIEW_PDA.toString());
    // const buffer = Buffer.from(new anchor.BN(6).toArray()); // this value need to be increment every time to create a new PDA to store data (need to be handled by contract side)
    // const publicKeyBytes = publicKey ? publicKey.toBytes() : new Uint8Array();
    const publicKeyfromAta = new anchor.web3.PublicKey(
      "mvyMgM5K6hKabKncXejzY5qE3QdWcjFnRy5bQWTEy7k"
    );
    console.log("publicKeyfromAta", publicKeyfromAta);
    const publicKeytoAta = new anchor.web3.PublicKey(
      "2znwVF1iJbgzwggEzE6waKrfxdymefEE3oDUKa54meoM"
    );
    console.log("publicKeytoAta", publicKeytoAta);
    const programId = new anchorcoral.web3.PublicKey(
      "G4RtD4FYYPCrKks8cRGN3NnZzdKGNSe8YfvR3GnTWmVz"
    );
    console.log("programId", publicKeyfromAta,publicKeytoAta,programId);
    const [REVIEW_PDA2] = anchor.web3.PublicKey.findProgramAddressSync(
      [publicKeyfromAta.toBytes()],
      programId
    );
    const [REVIEW_PDA3] = anchor.web3.PublicKey.findProgramAddressSync(
      [publicKeytoAta.toBytes()],
      programId
    );

    console.log("REVIEW_PDA", REVIEW_PDA2.toString(), REVIEW_PDA3.toString());
    const txn = await program.methods
      .claim(value) // To => Address ,Amount , timeStamp
      .accounts({
        from: "mvyMgM5K6hKabKncXejzY5qE3QdWcjFnRy5bQWTEy7k",
        to: "2znwVF1iJbgzwggEzE6waKrfxdymefEE3oDUKa54meoM",
        fromAta: REVIEW_PDA2,
        toAta: REVIEW_PDA3,
        tokenProgram: "2NWeqYHKfmfLpGReoEKLcJ1oUFU2ARTPpTQoTPxVFaWD",
      })
      // .signers([messageAccountFromPrivateKey]) //No Need to set signer can use publicKey to pay
      .rpc();

    console.log("Transaction", txn);
    return txn;
  } catch (error) {
    console.log("Transaction error ", error);
    return;
  }
}
