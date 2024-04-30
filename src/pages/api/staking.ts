// import { Program, AnchorProvider, web3 } from "@project-serum/anchor";
// import { SolanaHelloWorld } from "./types/staking";
// import {
//   connection,
//   commitmentLevel,
//   HELLO_WORLD_PROGRAM_ID,
//   HELLO_WORLD_PROGRAM_INTERFACE,
// } from "./utils/constants";
// import { AnchorWallet } from "@solana/wallet-adapter-react";
// import { PublicKey } from "@solana/web3.js";
// const anchor = require("@project-serum/anchor");
// // export async function stake(
// //   inputtedMessage: any,
// //   wallet: AnchorWallet,
// //   messageAccount: web3.PublicKey // this is the account that will store messages
// // ) {
// //   const provider = new AnchorProvider(connection, wallet, {
// //     preflightCommitment: commitmentLevel,
// //   });

// //   if (!provider) return;

// //   /* create the program interface combining the idl, program Id, and provider */
// //   const program = new Program(
// //     HELLO_WORLD_PROGRAM_INTERFACE,
// //     HELLO_WORLD_PROGRAM_ID,
// //     provider
// //   ) as Program<SolanaHelloWorld>;

// //   try {
// //     const value = new anchor.BN(40);
// //     // If create message function doesn't work use above one
// //     console.log('first', program.methods)
// //     const txn = await program.methods
// //       .setNum(value)
// //       .accounts({
// //         balance: wallet.publicKey,
// //         signer: provider.wallet.publicKey,
// //         systemProgram: web3.SystemProgram.programId,
// //       },signers:[messageAccount])
// //       .rpc();
// //     console.log(
// //       "value",
// //       // value,
// //       // balance,
// //       inputtedMessage,
// //       provider.wallet.publicKey,
// //       // systemProgramAccount
// //     );
// //     console.log("txn=>", txn);
// //     return txn;
// //   } catch (error) {
// //     console.log("Transaction error ", error);
// //     return;
// //   }
// // }
// export async function stake(
//     inputtedMessage: string,
//     wallet: AnchorWallet,
//     messageAccount: web3.Keypair // this is the account that will store messages
//   ) {
//     const provider = new AnchorProvider(connection, wallet, { preflightCommitment: commitmentLevel });
//   console.log('fiqweqwerst', web3.Keypair)
//     if (!provider) return;
  
//     /* create the program interface combining the idl, program Id, and provider */
//     const program = new Program(
//       HELLO_WORLD_PROGRAM_INTERFACE,
//       HELLO_WORLD_PROGRAM_ID,
//       provider
//     ) as Program<SolanaHelloWorld>;
//   console.log('sdassdas', HELLO_WORLD_PROGRAM_ID)
//     try {
//        // If create message function doesn't work use above one
//       console.log('txn', web3.SystemProgram.programId)
//     const value = new anchor.BN(inputtedMessage);
//     console.log('txneqweqweq',messageAccount,provider.wallet.publicKey)
    
//       const txn = await program.methods.setNum(value)
//         .accounts({
//           balance: messageAccount.publicKey,
//           signer: provider.wallet.publicKey,
//           systemProgram: web3.SystemProgram.programId,
//         })
//         .signers([])
//         .rpc()
//         console.log('txneqweqweq', messageAccount.publicKey)
//       return txn;
//     } catch (error) {
//       console.log("Transaction error ", error);
//       return;
//     }
//   }
  

// // export async function updateMessage(
// //   inputtedMessage: string,
// //   wallet: AnchorWallet,
// //   messageAccount: web3.Keypair // this is the account that will store messages
// // ) {
// //   const provider = new AnchorProvider(connection, wallet, { preflightCommitment: commitmentLevel });

// //   if (!provider) return;

// //   /* create the program interface combining the idl, program Id, and provider */
// //   const program = new Program(
// //     HELLO_WORLD_PROGRAM_INTERFACE,
// //     HELLO_WORLD_PROGRAM_ID,
// //     provider
// //   ) as Program<SolanaHelloWorld>;

// //   try {
// //     // This one is saying that rpc is deprecated
// //     // const txn = await program.rpc.updateMessage(inputtedMessage, {
// //     //   accounts: {
// //     // message: messageAccount.publicKey,
// //     // author: provider.wallet.publicKey,
// //     // systemProgram: web3.SystemProgram.programId,
// //     //   },
// //     // });
// //     const txn = await program.methods
// //       .updateMessage(inputtedMessage)
// //       .accounts({
// //         message: messageAccount.publicKey,
// //         author: provider.wallet.publicKey,
// //         systemProgram: web3.SystemProgram.programId
// //       })
// //       .rpc();
// //     return txn;
// //   } catch (error) {
// //     console.log("updateMessage error ", error);
// //     return;
// //   }

// // }

// export async function getMessage2(
//   wallet: AnchorWallet,
//   messageAccount: any // this is the account that will store messages
// ) {
//   const provider = new AnchorProvider(connection, wallet, {
//     preflightCommitment: commitmentLevel,
//   });

//   if (!provider) return;
//   /* create the program interface combining the idl, program Id, and provider */
//   const program = new Program(
//     HELLO_WORLD_PROGRAM_INTERFACE,
//     HELLO_WORLD_PROGRAM_ID,
//     provider
//   ) as Program<SolanaHelloWorld>;

//   console.log(
//     "dsadasdadasda",
//     program.account,
//     program,
//     HELLO_WORLD_PROGRAM_ID.toString()
//   );
//   try {
//     console.log("reached here", messageAccount);
//     // if (!messageAccount || !messageAccount.publicKey || !messageAccount.secretKey) {
//     //   console.error("Invalid messageAccount provided.");
//     //   return;
//     // }
//     // const publicKey = messageAccount.publicKey;
//     const message = await program.account.userBalance.fetch(
//       new PublicKey(messageAccount.publicKey)
//       // publicKey
//     );
//   console.log("message", message);
//     return message;
//   } catch (error) {
//     console.log("getMessage Error ", error);
//     return;
//   }
// }
