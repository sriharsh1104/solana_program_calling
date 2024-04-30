// {
export type BridgeWorld = {
  version: "0.1.0";
  name: "bridge";
  instructions: [
    {
      name: "deposit";
      accounts: [
        { name: "from"; isMut: false; isSigner: true },
        { name: "fromAta"; isMut: true; isSigner: false },
        { name: "toAta"; isMut: false; isSigner: false },
        { name: "tokenProgram"; isMut: false; isSigner: false },
        { name: "reciept"; isMut: true; isSigner: false },
        { name: "signer"; isMut: true; isSigner: true },
        { name: "systemProgram"; isMut: false; isSigner: false }
      ];
      args: [{ name: "amount"; type: "u64" }];
    },
    {
      name: "claim";
      accounts: [
        { name: "from"; isMut: false; isSigner: true },
        { name: "fromAta"; isMut: true; isSigner: false },
        { name: "toAta"; isMut: false; isSigner: false },
        { name: "tokenProgram"; isMut: false; isSigner: false },
        { name: "reciept"; isMut: true; isSigner: false },
        { name: "signer"; isMut: true; isSigner: true },
        { name: "systemProgram"; isMut: false; isSigner: false }
      ];
      args: [{ name: "to"; type: "publicKey" }];
    }
  ];
  accounts: [
    {
      name: "transactionInfo";
      type: {
        kind: "struct";
        fields: [
          { name: "count"; type: "u128" },
          { name: "user"; type: "publicKey" },
          { name: "amount"; type: "u64" }
        ];
      };
    }
  ];
  metadata: {
    address: "GJeQSkDrrtia2voguusV7AjKPYBoC8fKUTnWHnpzUbUN";
  };
};

export type BridgeWorldNew = {
  version: "0.1.0";
  name: "calculator";
  instructions: [
    {
      name: "createAccount";
      accounts: [
        { name: "account"; isMut: true; isSigner: true },
        { name: "payer"; isMut: true; isSigner: true },
        { name: "systemProgram"; isMut: false; isSigner: false }
      ];
      args: [];
    },
    {
      name: "calculate";
      accounts: [
        { name: "account"; isMut: true; isSigner: false },
        { name: "payer"; isMut: true; isSigner: true }
      ];
      args: [
        { name: "perform"; type: { defined: "PerformSomeCalculation" } },
        { name: "x"; type: "f64" },
        { name: "y"; type: "f64" }
      ];
    }
  ];
  accounts: [
    {
      name: "accountData";
      type: {
        kind: "struct";
        fields: [{ name: "result"; type: "f64" }];
      };
    }
  ];
  types: [
    {
      name: "PerformSomeCalculation";
      type: {
        kind: "enum";
        variants: [
          { name: "Addition" },
          { name: "Subtraction" },
          { name: "Multiplication" },
          { name: "Division" }
        ];
      };
    }
  ];
  metadata: {
    address: "4j5Gtp4wvbefjC1DPmP1QU4RvJ6u99rHADp5CeUSTsbT";
  };
};
// {
export const IDL2: BridgeWorld = {
  version: "0.1.0",
  name: "bridge",
  instructions: [
    {
      name: "deposit",
      accounts: [
        { name: "from", isMut: false, isSigner: true },
        { name: "fromAta", isMut: true, isSigner: false },
        { name: "toAta", isMut: false, isSigner: false },
        { name: "tokenProgram", isMut: false, isSigner: false },
        { name: "reciept", isMut: true, isSigner: false },
        { name: "signer", isMut: true, isSigner: true },
        { name: "systemProgram", isMut: false, isSigner: false },
      ],
      args: [{ name: "amount", type: "u64" }],
    },
    {
      name: "claim",
      accounts: [
        { name: "from", isMut: false, isSigner: true },
        { name: "fromAta", isMut: true, isSigner: false },
        { name: "toAta", isMut: false, isSigner: false },
        { name: "tokenProgram", isMut: false, isSigner: false },
        { name: "reciept", isMut: true, isSigner: false },
        { name: "signer", isMut: true, isSigner: true },
        { name: "systemProgram", isMut: false, isSigner: false },
      ],
      args: [{ name: "to", type: "publicKey" }],
    },
  ],
  accounts: [
    {
      name: "transactionInfo",
      type: {
        kind: "struct",
        fields: [
          { name: "count", type: "u128" },
          { name: "user", type: "publicKey" },
          { name: "amount", type: "u64" },
        ],
      },
    },
  ],
  metadata: {
    address: "GJeQSkDrrtia2voguusV7AjKPYBoC8fKUTnWHnpzUbUN",
  },
};

export const IDL2New: BridgeWorldNew = {
  version: "0.1.0",
  name: "calculator",
  instructions: [
    {
      name: "createAccount",
      accounts: [
        { name: "account", isMut: true, isSigner: true },
        { name: "payer", isMut: true, isSigner: true },
        { name: "systemProgram", isMut: false, isSigner: false },
      ],
      args: [],
    },
    {
      name: "calculate",
      accounts: [
        { name: "account", isMut: true, isSigner: false },
        { name: "payer", isMut: true, isSigner: true },
      ],
      args: [
        { name: "perform", type: { defined: "PerformSomeCalculation" } },
        { name: "x", type: "f64" },
        { name: "y", type: "f64" },
      ],
    },
  ],
  accounts: [
    {
      name: "accountData",
      type: {
        kind: "struct",
        fields: [{ name: "result", type: "f64" }],
      },
    },
  ],
  types: [
    {
      name: "PerformSomeCalculation",
      type: {
        kind: "enum",
        variants: [
          { name: "Addition" },
          { name: "Subtraction" },
          { name: "Multiplication" },
          { name: "Division" },
        ],
      },
    },
  ],
  metadata: {
    address: "4j5Gtp4wvbefjC1DPmP1QU4RvJ6u99rHADp5CeUSTsbT",
  },
};
