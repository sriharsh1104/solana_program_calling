import { Program, AnchorProvider, web3 } from "@project-serum/anchor";
import { AnchorWallet } from "@solana/wallet-adapter-react";
import { TEST_PROGRAM_ID, TEST_PROGRAM_INTERFACE, commitmentLevel, connection } from "./api/utils/constants";
import { TesterWorld } from "./api/types/create_udpate_message";

export async function createMessage(
  inputtedMessage: string,
  wallet: AnchorWallet,
  messageAccount: web3.Keypair // this is the account that will store messages
) {
  const provider = new AnchorProvider(connection, wallet, { preflightCommitment: commitmentLevel });

  if (!provider) return;

  /* create the program interface combining the idl, program Id, and provider */
  const program = new Program(
    TEST_PROGRAM_INTERFACE,
    TEST_PROGRAM_ID,
    provider
  ) as Program<TesterWorld>;

  try {

    // If create message function doesn't work use above one
    const txn = await program.methods.createMessanger(inputtedMessage)
      .accounts({
        message: messageAccount.publicKey, //storage Account for Data not PDA
        author: provider.wallet.publicKey, // User Wallet Public Key
        systemProgram: web3.SystemProgram.programId, //System Program Always same 
      })
      .signers([messageAccount]) // For the First Time we create Message to signing storage account for program Data 
      .rpc()
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
  const provider = new AnchorProvider(connection, wallet, { preflightCommitment: commitmentLevel });

  if (!provider) return;

  /* create the program interface combining the idl, program Id, and provider */
  const program = new Program(
    TEST_PROGRAM_INTERFACE,
    TEST_PROGRAM_ID,
    provider
  ) as Program<TesterWorld>;

  try {
    const txn = await program.methods
      .updateMessanger(inputtedMessage)
      .accounts({
        message: messageAccount.publicKey,//storage Account for Data not PDA
        author: provider.wallet.publicKey,// User Wallet Public Key
        systemProgram: web3.SystemProgram.programId //System Program Always same
      })
      .rpc();
      console.log('txndasdasds', txn)
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
  const provider = new AnchorProvider(connection, wallet, { preflightCommitment: commitmentLevel });

  if (!provider) return;
  /* create the program interface combining the idl, program Id, and provider */
  const program = new Program(
    TEST_PROGRAM_INTERFACE,
    TEST_PROGRAM_ID,
    provider
  ) as Program<TesterWorld>;

  try {
    const message = await program.account.message.fetch(messageAccount.publicKey);
    return message;
  } catch (error) {
    console.log("getMessage Error ", error);
    return;
  }
}