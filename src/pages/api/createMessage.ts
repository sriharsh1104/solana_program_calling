// import { Program, AnchorProvider, web3 } from "@project-serum/anchor";
// import { SolanaHelloWorld } from "./types/solana_hello_world";
// import { connection, commitmentLevel, HELLO_WORLD_PROGRAM_ID, HELLO_WORLD_PROGRAM_INTERFACE } from "./utils/constants";
// import { AnchorWallet } from "@solana/wallet-adapter-react";

// export async function createMessage(
//   inputtedMessage: string,
//   wallet: AnchorWallet,
//   messageAccount: web3.Keypair // this is the account that will store messages
// ) {
//   const provider = new AnchorProvider(connection, wallet, { preflightCommitment: commitmentLevel });
// console.log('fiqweqwerst', web3.Keypair)
//   if (!provider) return;

//   /* create the program interface combining the idl, program Id, and provider */
//   const program = new Program(
//     HELLO_WORLD_PROGRAM_INTERFACE,
//     HELLO_WORLD_PROGRAM_ID,
//     provider
//   ) as Program<SolanaHelloWorld>;
// console.log('sdassdas', HELLO_WORLD_PROGRAM_ID)
//   try {
//     // This one is saying that rpc is deprecated
//     // const txn = await program.rpc.createMessage(inputtedMessage, {
//     //   accounts: {
//     //     message: messageAccount.publicKey,
//     //     author: provider.wallet.publicKey,
//     //     systemProgram: web3.SystemProgram.programId,
//     //   },
//     //   signers: [messageAccount],
//     // });

//     // If create message function doesn't work use above one
//     console.log('txn', web3.SystemProgram.programId)
    
//     const txn = await program.methods.createMessanger(inputtedMessage)
//       .accounts({
//         message: messageAccount.publicKey,
//         author: provider.wallet.publicKey,
//         systemProgram: web3.SystemProgram.programId,
//       })
//       .signers([messageAccount])
//       .rpc()
//       console.log('txn', web3.SystemProgram.programId)
//     return txn;
//   } catch (error) {
//     console.log("Transaction error ", error);
//     return;
//   }
// }

// export async function updateMessage(
//   inputtedMessage: string,
//   wallet: AnchorWallet,
//   messageAccount: web3.Keypair // this is the account that will store messages
// ) {
//   const provider = new AnchorProvider(connection, wallet, { preflightCommitment: commitmentLevel });

//   if (!provider) return;

//   /* create the program interface combining the idl, program Id, and provider */
//   const program = new Program(
//     HELLO_WORLD_PROGRAM_INTERFACE,
//     HELLO_WORLD_PROGRAM_ID,
//     provider
//   ) as Program<SolanaHelloWorld>;

//   try {
//     // This one is saying that rpc is deprecated
//     // const txn = await program.rpc.updateMessage(inputtedMessage, {
//     //   accounts: {
//     // message: messageAccount.publicKey,
//     // author: provider.wallet.publicKey,
//     // systemProgram: web3.SystemProgram.programId,
//     //   }, 
//     // });
//     const txn = await program.methods
//       .updateMessanger(inputtedMessage)
//       .accounts({
//         message: messageAccount.publicKey,
//         author: provider.wallet.publicKey,
//         systemProgram: web3.SystemProgram.programId
//       })
//       .rpc();
//     return txn;
//   } catch (error) {
//     console.log("updateMessage error ", error);
//     return;
//   }

// }

// export async function getMessage(
//   wallet: AnchorWallet,
//   messageAccount: any // this is the account that will store messages
// ) {
//   const provider = new AnchorProvider(connection, wallet, { preflightCommitment: commitmentLevel });

//   if (!provider) return;
//   /* create the program interface combining the idl, program Id, and provider */
//   const program = new Program(
//     HELLO_WORLD_PROGRAM_INTERFACE,
//     HELLO_WORLD_PROGRAM_ID,
//     provider
//   ) as Program<SolanaHelloWorld>;

//   try {
//     const message = await program.account.Message.fetch(messageAccount.publicKey);
//     return message;
//   } catch (error) {
//     console.log("getMessage Error ", error);
//     return;
//   }
// }