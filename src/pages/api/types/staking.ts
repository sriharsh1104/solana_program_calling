// {
export type SolanaHelloWorld = {
  version: "0.1.0";
  name: "setget";
  instructions: [
    {
      name: "setNum";
      accounts: [
        {
          name: "balance";
          isMut: true;
          isSigner: false;
        },
        {
          name: "signer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "number";
          type: "u128";
        }
      ];
    },
    {
      name: "dummy";
      accounts: [
        {
          name: "balance";
          isMut: true;
          isSigner: false;
        },
        {
          name: "signer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
      returns: "u128";
    }
  ];
  accounts: [
    {
      name: "userBalance";
      type: {
        kind: "struct";
        fields: [
          {
            name: "user";
            type: "publicKey";
          },
          {
            name: "luckynumber";
            type: "u128";
          },
          {
            name: "bump";
            type: "u8";
          }
        ];
      };
    }
  ];
};
// {
export const IDL: SolanaHelloWorld = {
  version: "0.1.0",
  name: "setget",
  instructions: [
    {
      name: "setNum",
      accounts: [
        {
          name: "balance",
          isMut: true,
          isSigner: false,
        },
        {
          name: "signer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "number",
          type: "u128",
        },
      ],
    },
    {
      name: "dummy",
      accounts: [
        {
          name: "balance",
          isMut: true,
          isSigner: false,
        },
        {
          name: "signer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
      returns: "u128",
    },
  ],
  accounts: [
    {
      name: "userBalance",
      type: {
        kind: "struct",
        fields: [
          {
            name: "user",
            type: "publicKey",
          },
          {
            name: "luckynumber",
            type: "u128",
          },
          {
            name: "bump",
            type: "u8",
          },
        ],
      },
    },
  ],
};
