import { Program, AnchorProvider, web3 } from "@project-serum/anchor";
import { AnchorWallet } from "@solana/wallet-adapter-react";
import { TesterWorld } from "./api/types/create_udpate_message";
import {
  TEST_PROGRAM_ID,
  TEST_PROGRAM_INTERFACE,
  commitmentLevel,
  connection,
} from "./api/utils/constants";

export async function createMessage(
  inputtedMessage: string,
  wallet: AnchorWallet,
  messageAccount: web3.Keypair // this is the account that will store messages
) {
  const provider = new AnchorProvider(connection, wallet, {
    preflightCommitment: commitmentLevel,
  });

  if (!provider) return;

  /* create the program interface combining the idl, program Id, and provider */
  const program = new Program(
    TEST_PROGRAM_INTERFACE,
    TEST_PROGRAM_ID,
    provider
  ) as Program<TesterWorld>;

  try {
    // If create message function doesn't work use above one
    const txn = await program.methods
      .createMessage(inputtedMessage)
      .accounts({
        message: messageAccount.publicKey, // Associated Account for user program Data storage
        author: provider.wallet.publicKey, // User wallet Address public Key
        systemProgram: web3.SystemProgram.programId, //systemProgram as required by this
      })
      .signers([messageAccount]) // Signer is set to storage account it can only sign
      .rpc();
    return txn;
  } catch (error) {
    console.log("Transaction error ", error);
    return;
  }
}

export async function updateMessage(
  inputtedMessage: string,
  wallet: AnchorWallet,
  messageAccount: web3.Keypair // this is the account that will store messages
) {
  const provider = new AnchorProvider(connection, wallet, {
    preflightCommitment: commitmentLevel,
  });

  if (!provider) return;

  /* create the program interface combining the idl, program Id, and provider */
  const program = new Program(
    TEST_PROGRAM_INTERFACE,
    TEST_PROGRAM_ID,
    provider
  ) as Program<TesterWorld>;

  try {
    const txn = await program.methods
      .updateMessage(inputtedMessage)
      .accounts({
        message: messageAccount.publicKey,
        author: provider.wallet.publicKey,
        systemProgram: web3.SystemProgram.programId,
      })
      .rpc();
    console.log("Transaction For Update => ", txn);
    return txn;
  } catch (error) {
    console.log("updateMessage error ", error);
    return;
  }
}

export async function getMessage(
  wallet: AnchorWallet,
  messageAccount: any // this is the account that will store messages
) {
  const provider = new AnchorProvider(connection, wallet, {
    preflightCommitment: commitmentLevel,
  });

  if (!provider) return;
  /* create the program interface combining the idl, program Id, and provider */
  const program = new Program(
    TEST_PROGRAM_INTERFACE,
    TEST_PROGRAM_ID,
    provider
  ) as Program<TesterWorld>;

  try {
    const message = await program.account.message.fetch(
      messageAccount.publicKey
    );
    return message;
  } catch (error) {
    console.log("getMessage Error ", error);
    return;
  }
}
