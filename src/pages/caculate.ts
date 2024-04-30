import { Program, AnchorProvider, web3 } from "@project-serum/anchor";
import { CrudWorld } from "./api/types/calculator";
import {
  connection,
  commitmentLevel,
  TEST_PROGRAM_ID,
  TEST_PROGRAM_INTERFACE,
} from "./api/utils/constants";
import { AnchorWallet } from "@solana/wallet-adapter-react";
import { Keypair, PublicKey } from "@solana/web3.js";
import * as bs58 from "bs58";

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
    TEST_PROGRAM_INTERFACE, // Calculator IDL
    TEST_PROGRAM_ID, // Calculator Program Id
    provider
  ) as Program<CrudWorld>;
  try {
    const publicKey = messageAccount.publicKey;
    const message = await program.account.accountData.fetch(
      new PublicKey(publicKey)
    );
    return message;
  } catch (error) {
    console.log("getMessage Error ", error);
    return;
  }
}

export async function createAccount(acc: any, wallet: any, publicKey: any) {
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
    const Operations = {
      Addition: { addition: {} },
      Subtraction: { subtraction: {} },
      Multiplication: { multiplication: {} },
      Division: { division: {} },
    };
    const txn = await program.account.accountData.fetch(acc.publicKey);
    return txn;
  } catch (error) {
    console.log("Transaction error ", error);
    return;
  }
}
export async function crudOperation(
  acc: any,
  wallet: any,
  selectedOperation: any,
  inputValue1: any,
  inputValue2: any
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
    const Operations: any = {
      Addition: { addition: {} },
      Subtraction: { subtraction: {} },
      Multiplication: { multiplication: {} },
      Division: { division: {} },
    };
    const privateKeyString =
      "56Z6sBdieEvQrgNFZ3QZmGcaq9BRjji9aLhfp9im9KBB79ZJAnVGmZFs9HFQtzfxf8vtvL9qS28xipxJxenwntsq"; //User wallet privatekey  or secretkey which is Used for Payment
    const privateKeyBuffer = bs58.decode(privateKeyString);

    const messageAccountFromPrivateKey =
      Keypair.fromSecretKey(privateKeyBuffer);
    const operation = Operations[selectedOperation];
    console.log("operation", operation);
    const txn = await program.methods
      .calculate(operation, inputValue1, inputValue2)
      .accounts({
        account: acc.publicKey,
        payer: messageAccountFromPrivateKey.publicKey,
      })
      .signers([messageAccountFromPrivateKey])
      .rpc();

    console.log("Transaction", txn);
    return txn;
  } catch (error) {
    console.log("Transaction error ", error);
    return;
  }
}
