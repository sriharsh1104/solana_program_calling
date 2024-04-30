// export type SolanaHelloWorld = {
//   version: "0.1.0";
//   name: "sriharsh_tester";
//   instructions: [
//     {
//       name: "createMessanger";
//       accounts: [
//         { name: "message"; isMut: true; isSigner: true },
//         { name: "author"; isMut: true; isSigner: true },
//         { name: "systemProgram"; isMut: false; isSigner: false }
//       ];
//       args: [{ name: "content"; type: "string" }];
//     },
//     {
//       name: "updateMessanger";
//       accounts: [
//         { name: "message"; isMut: true; isSigner: false },
//         { name: "author"; isMut: true; isSigner: true },
//         { name: "systemProgram"; isMut: false; isSigner: false }
//       ];
//       args: [{ name: "content"; type: "string" }];
//     }
//   ];
//   accounts: [
//     {
//       name: "Message";
//       type: {
//         kind: "struct";
//         fields: [
//           { name: "author"; type: "publicKey" },
//           { name: "timestamp"; type: "i64" },
//           { name: "content"; type: "string" }
//         ];
//       };
//     }
//   ];
// };
// export const IDL: SolanaHelloWorld = {
//   version: "0.1.0",
//   name: "sriharsh_tester",
//   instructions: [
//     {
//       name: "createMessanger",
//       accounts: [
//         { name: "message", isMut: true, isSigner: true },
//         { name: "author", isMut: true, isSigner: true },
//         { name: "systemProgram", isMut: false, isSigner: false },
//       ],
//       args: [{ name: "content", type: "string" }],
//     },
//     {
//       name: "updateMessanger",
//       accounts: [
//         { name: "message", isMut: true, isSigner: false },
//         { name: "author", isMut: true, isSigner: true },
//         { name: "systemProgram", isMut: false, isSigner: false },
//       ],
//       args: [{ name: "content", type: "string" }],
//     },
//   ],
//   accounts: [
//     {
//       name: "Message",
//       type: {
//         kind: "struct",
//         fields: [
//           { name: "author", type: "publicKey" },
//           { name: "timestamp", type: "i64" },
//           { name: "content", type: "string" },
//         ],
//       },
//     },
//   ],
// };
