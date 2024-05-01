export type CrudWorld = {
  version: "0.1.0";
  name: "bridge";
  instructions: [
    {
      name: "createAccount";
      accounts: [
        { name: "txinfo"; isMut: true; isSigner: false },
        { name: "reciept"; isMut: true; isSigner: false },
        { name: "signer"; isMut: true; isSigner: true },
        { name: "systemProgram"; isMut: false; isSigner: false }
      ];
      args: [];
    },
    {
      name: "deposit";
      accounts: [
        { name: "txinfo"; isMut: true; isSigner: false },
        { name: "reciept"; isMut: true; isSigner: false },
        { name: "signer"; isMut: true; isSigner: true },
        { name: "systemProgram"; isMut: false; isSigner: false }
      ];
      args: [
        { name: "to"; type: "string" },
        { name: "amount"; type: "u64" },
        { name: "timestamp"; type: "u64" }
      ];
    },
    {
      name: "claim";
      accounts: [
        { name: "from"; isMut: false; isSigner: true },
        { name: "to"; isMut: false; isSigner: true },
        { name: "fromAta"; isMut: true; isSigner: false },
        { name: "toAta"; isMut: true; isSigner: false },
        { name: "tokenProgram"; isMut: false; isSigner: false }
      ];
      args: [{ name: "amount"; type: "u64" }];
    }
  ];
  accounts: [
    {
      name: "transactionInfo";
      type: {
        kind: "struct";
        fields: [
          { name: "from"; type: "publicKey" },
          { name: "to"; type: "string" },
          { name: "amount"; type: "u64" },
          { name: "timestamp"; type: "u64" },
          { name: "userTxNumber"; type: "u8" }
        ];
      };
    },
    {
      name: "transactionOL";
      type: {
        kind: "struct";
        fields: [{ name: "txcount"; type: "u8" }];
      };
    }
  ];
  events: [
    {
      name: "DepositEvent";
      fields: [
        { name: "from"; type: "publicKey"; index: false },
        { name: "to"; type: "string"; index: false },
        { name: "amount"; type: "u64"; index: false }
      ];
    },
    {
      name: "ClaimEvent";
      fields: [
        { name: "to"; type: "publicKey"; index: false },
        { name: "amount"; type: "u64"; index: false }
      ];
    }
  ];
  metadata: {
    address: "G4RtD4FYYPCrKks8cRGN3NnZzdKGNSe8YfvR3GnTWmVz";
  };
};

// {

export const IDL: CrudWorld = {
  version: "0.1.0",
  name: "bridge",
  instructions: [
    {
      name: "createAccount",
      accounts: [
        { name: "txinfo", isMut: true, isSigner: false },
        { name: "reciept", isMut: true, isSigner: false },
        { name: "signer", isMut: true, isSigner: true },
        { name: "systemProgram", isMut: false, isSigner: false },
      ],
      args: [],
    },
    {
      name: "deposit",
      accounts: [
        { name: "txinfo", isMut: true, isSigner: false },
        { name: "reciept", isMut: true, isSigner: false },
        { name: "signer", isMut: true, isSigner: true },
        { name: "systemProgram", isMut: false, isSigner: false },
      ],
      args: [
        { name: "to", type: "string" },
        { name: "amount", type: "u64" },
        { name: "timestamp", type: "u64" },
      ],
    },
    {
      name: "claim",
      accounts: [
        { name: "from", isMut: false, isSigner: true },
        { name: "to", isMut: false, isSigner: true },
        { name: "fromAta", isMut: true, isSigner: false },
        { name: "toAta", isMut: true, isSigner: false },
        { name: "tokenProgram", isMut: false, isSigner: false },
      ],
      args: [{ name: "amount", type: "u64" }],
    },
  ],
  accounts: [
    {
      name: "transactionInfo",
      type: {
        kind: "struct",
        fields: [
          { name: "from", type: "publicKey" },
          { name: "to", type: "string" },
          { name: "amount", type: "u64" },
          { name: "timestamp", type: "u64" },
          { name: "userTxNumber", type: "u8" },
        ],
      },
    },
    {
      name: "transactionOL",
      type: {
        kind: "struct",
        fields: [{ name: "txcount", type: "u8" }],
      },
    },
  ],
  events: [
    {
      name: "DepositEvent",
      fields: [
        { name: "from", type: "publicKey", index: false },
        { name: "to", type: "string", index: false },
        { name: "amount", type: "u64", index: false },
      ],
    },
    {
      name: "ClaimEvent",
      fields: [
        { name: "to", type: "publicKey", index: false },
        { name: "amount", type: "u64", index: false },
      ],
    },
  ],
  metadata: {
    address: "G4RtD4FYYPCrKks8cRGN3NnZzdKGNSe8YfvR3GnTWmVz",
  },
};