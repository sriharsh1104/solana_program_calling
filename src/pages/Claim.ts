import { Program, AnchorProvider, web3 } from "@project-serum/anchor";
import { BridgeWorld, BridgeWorldNew } from "./api/types/bridge";
import {
  connection,
  commitmentLevel,
  HELLO_WORLD_PROGRAM_ID_FOR_BRIDGE,
  HELLO_WORLD_PROGRAM_INTERFACE_FOR_BRIDGE,
  TEST_PROGRAM_ID,
  TEST_PROGRAM_INTERFACE,
} from "./../pages/api/utils/constants";
import { AnchorWallet } from "@solana/wallet-adapter-react";
import {
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
const anchor = require("@project-serum/anchor");
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_2022_PROGRAM_ID,
  createAssociatedTokenAccountInstruction,
  getAccount,
  getAssociatedTokenAddressSync,
} from "@solana/spl-token";
import { findProgramAddressSync } from "@project-serum/anchor/dist/cjs/utils/pubkey";
import { utf8 } from "@project-serum/anchor/dist/cjs/utils/bytes";
import * as bs58 from "bs58";
export async function claim(
  inputtedMessage: string,
  wallet: AnchorWallet,
  fromAta: PublicKey, // Account where the tokens are currently held
  toAta: PublicKey, // Account where the tokens will be transferred
  tokenProgram: PublicKey, // Token program ID
  reciept: PublicKey | undefined
) {
  const provider = new AnchorProvider(connection, wallet, {
    preflightCommitment: commitmentLevel,
  });
  console.log("fiqweqwerst", web3.Keypair);
  if (!provider) return;

  /* create the program interface combining the idl, program Id, and provider */
  const program = new Program(
    HELLO_WORLD_PROGRAM_INTERFACE_FOR_BRIDGE,
    HELLO_WORLD_PROGRAM_ID_FOR_BRIDGE,
    provider
  ) as Program<BridgeWorld>;
  console.log("sdassdas", HELLO_WORLD_PROGRAM_ID_FOR_BRIDGE);
  try {
    // If create message function doesn't work use above one
    console.log("txn", web3.SystemProgram.programId);
    const value = new anchor.BN(inputtedMessage);
    console.log("txneqweqweq", provider.wallet.publicKey);

    const txn = await program.methods
      .claim(value)
      .accounts({
        from: wallet.publicKey,
        fromAta,
        toAta,
        tokenProgram: TOKEN_2022_PROGRAM_ID,
        reciept,
        signer: provider.wallet.publicKey,
        systemProgram: web3.SystemProgram.programId,
      })
      .signers([])
      .rpc();
    console.log("txneqweqweq");
    return txn;
  } catch (error) {
    console.log("Transaction error ", error);
    return;
  }
}
export async function deposit(
  inputtedMessage: string,
  wallet: AnchorWallet,
  fromAta: PublicKey, // Account where the tokens are currently held
  toAta: PublicKey, // Account where the tokens will be transferred
  tokenProgram: PublicKey, // Token program ID
  reciept: any // this is the account that will store messages,
) {
  const provider = new AnchorProvider(connection, wallet, {
    preflightCommitment: commitmentLevel,
  });
  console.log("fiqweqwerst", web3.Keypair);
  if (!provider) return;

  /* create the program interface combining the idl, program Id, and provider */
  const program = new Program(
    HELLO_WORLD_PROGRAM_INTERFACE_FOR_BRIDGE,
    HELLO_WORLD_PROGRAM_ID_FOR_BRIDGE,
    provider
  ) as Program<BridgeWorld>;
  console.log("sdassdas", HELLO_WORLD_PROGRAM_ID_FOR_BRIDGE);
  try {
    // If create message function doesn't work use above one
    console.log("txn", web3.SystemProgram.programId);
    const value = new anchor.BN(inputtedMessage);
    console.log(
      "txneqweqweq",
      inputtedMessage,
      wallet,
      fromAta,
      toAta,
      tokenProgram,
      reciept?.publicKey
    );
    // const associatedToken = getAssociatedTokenAddressSync(
    //   new PublicKey(toAta),
    //   new PublicKey("GnZUtpGxMxk5CcXJr2Gt3ojm8pzmqUFTj5Mi9ceXomB2"),
    //   false,
    //   TOKEN_2022_PROGRAM_ID,
    //   ASSOCIATED_TOKEN_PROGRAM_ID
    // );
    // const account = await getAccount(
    //   connection,
    //   associatedToken,
    //   undefined,
    //   TOKEN_2022_PROGRAM_ID
    // );
    const programId = new PublicKey(
      "GJeQSkDrrtia2voguusV7AjKPYBoC8fKUTnWHnpzUbUN"
    ); // Replace with your program ID

    const seeds = [
      Buffer.from("barely"),
      Buffer.from("rural"),
      Buffer.from("park"),
      Buffer.from("dress"),
      Buffer.from("cart"),
      Buffer.from("length"),
      Buffer.from("pupil,"),
      Buffer.from("mammal"),
      Buffer.from("stove"),
      Buffer.from("perfect"),
      Buffer.from("route"),
      Buffer.from("dish"),
    ];
    const [pda, bump] = await PublicKey.findProgramAddress(seeds, programId);
    // let transaction = new web3.Transaction();
    // if(!account){
    //   const instruction = createAssociatedTokenAccountInstruction(
    //             toAta,
    //             associatedToken,
    //             wallet.publicKey,
    //             toAta,
    //             TOKEN_2022_PROGRAM_ID,
    //             ASSOCIATED_TOKEN_PROGRAM_ID
    //           );

    //           transaction.add(instruction);
    //           const {
    //             context: { slot: minContextSlot },
    //             value: { blockhash, lastValidBlockHeight },
    //           } = await connection.getLatestBlockhashAndContext();

    //           const signature = await sendTransaction(transaction, connection, {
    //             minContextSlot,
    //           });

    //           const response = await connection.confirmTransaction({
    //             blockhash,
    //             lastValidBlockHeight,
    //             signature,
    //           });
    //           console.log("response", response);
    //           account = await getAccount(
    //             connection,
    //             associatedToken,
    //             undefined,
    //             TOKEN_2022_PROGRAM_ID
    //           );
    // }
    console.log("huujhjuhjuhjuhju", pda.toString());
    const txn = await program.methods
      .deposit(value)
      .accounts({
        from: wallet.publicKey,
        fromAta,
        toAta,
        tokenProgram: "2NWeqYHKfmfLpGReoEKLcJ1oUFU2ARTPpTQoTPxVFaWD",
        reciept: pda,
        signer: provider.wallet.publicKey,
        systemProgram: web3.SystemProgram.programId,
      })
      .signers([])
      .rpc();
    console.log("txneqweqweq", wallet.publicKey.toString());
    return txn;
  } catch (error) {
    console.log("Transaction error ", error);
    return;
  }
}

export async function getMessage3(
  wallet: AnchorWallet,
  messageAccount: any // this is the account that will store messages
) {
  const provider = new AnchorProvider(connection, wallet, {
    preflightCommitment: commitmentLevel,
  });

  if (!provider) return;
  /* create the program interface combining the idl, program Id, and provider */
  const program = new Program(
    HELLO_WORLD_PROGRAM_INTERFACE_FOR_BRIDGE,
    HELLO_WORLD_PROGRAM_ID_FOR_BRIDGE,
    provider
  ) as Program<BridgeWorld>;

  console.log(
    "dsadasdadasda",
    program.account,
    program,
    HELLO_WORLD_PROGRAM_ID_FOR_BRIDGE.toString()
  );
  try {
    console.log("reached here", messageAccount);
    // const publicKey = messageAccount.publicKey;
    const message = await program.account.transactionInfo.fetch(
      new PublicKey(messageAccount.publicKey)
      // publicKey
    );
    console.log("message", message, messageAccount.publicKey.toString());
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
  console.log("fiqweqwerst", web3.Keypair);
  if (!provider.wallet) return;

  /* create the program interface combining the idl, program Id, and provider */
  const program = new Program(
    TEST_PROGRAM_INTERFACE,
    TEST_PROGRAM_ID,
    provider
  ) as Program<BridgeWorldNew>;
  try {
    const Operations = {
      Addition: { addition: {} },
      Subtraction: { Subtraction: {} },
      Multiplication: { Multiplication: {} },
      Division: { Division: {} },
    };
    const privateKeyString =
      "56Z6sBdieEvQrgNFZ3QZmGcaq9BRjji9aLhfp9im9KBB79ZJAnVGmZFs9HFQtzfxf8vtvL9qS28xipxJxenwntsq";
    const privateKeyArray = Uint8Array.from(
      Buffer.from(privateKeyString, "base64")
    );
    const privateKeyBuffer = bs58.decode(privateKeyString);

    const messageAccountFromPrivateKey =
      Keypair.fromSecretKey(privateKeyBuffer);
    console.log(
      "sdkjadsadsadads",
      messageAccountFromPrivateKey.publicKey.toString(),
      acc.publicKey.toString()
    );
    // const txn = await program.methods
    //   .calculate(Operations["Addition"], 5.0, 3.0)
    //   .accounts({
    //     account: acc.publicKey,
    //     payer: messageAccountFromPrivateKey.publicKey,
    //     // systemProgram: SystemProgram.programId, // Added system program here
    //   })
    //   .signers([messageAccountFromPrivateKey])
    //   .rpc();
    // const txn = await program.methods
    //   .createAccount()
    //   .accounts({
    //     account: acc.publicKey,
    //     payer: messageAccountFromPrivateKey.publicKey,
    //     systemProgram: SystemProgram.programId, // Added system program here
    //   })
    //   .signers([messageAccountFromPrivateKey, acc])
    //   .rpc();
    const txn = await program.account.accountData.fetch(acc.publicKey);
    console.log("txneqweqweq", txn);
    return txn;
  } catch (error) {
    console.log("Transaction error ", error);
    return;
  }
}
