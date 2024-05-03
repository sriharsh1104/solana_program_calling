import { useEffect, useState } from "react";
import { PublicKey } from "@solana/web3.js";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import useIsMounted from "./api/utils/useIsMounted";
import styles from "../styles/Home.module.css";
import { claimMoney, depositMoney, getMessage3 } from "./bridge";
import { useWallet } from "@solana/wallet-adapter-react";
import * as anchorcoral from "@coral-xyz/anchor";
const anchor = require("@project-serum/anchor");

export default function Home() {
  const { publicKey } = useWallet();
  const [message, setMessage] = useState<Number>(0);

  const wallet: any = useAnchorWallet();
  const mounted = useIsMounted();

  const balanceCheck = async () => {
    const publickey = new PublicKey(wallet.publicKey.toString());
    const seed = publickey.toBuffer();
    console.log("seddder", seed);
    const programId = new anchorcoral.web3.PublicKey(
      "G4RtD4FYYPCrKks8cRGN3NnZzdKGNSe8YfvR3GnTWmVz"
    );
    const [REVIEW_PDA] = anchorcoral.web3.PublicKey.findProgramAddressSync(
      [publickey.toBytes()],
      programId
    );
    console.log("Review PDA Address", REVIEW_PDA.toString());
    const buffer = Buffer.from(new anchor.BN(6).toArray()); // this value need to be increment every time to create a new PDA to store data (need to be handled by contract side)
    const publicKeyBytes = publicKey ? publicKey.toBytes() : new Uint8Array();
    const [REVIEW_PDA1] = anchorcoral.web3.PublicKey.findProgramAddressSync(
      [publicKeyBytes, buffer],
      programId
    );
    console.log("Review PDA Address", REVIEW_PDA1.toString());
    return { REVIEW_PDA, REVIEW_PDA1 };
  };
  const callGetMessage = async () => {
    const hello = await balanceCheck();

    const result: any = await getMessage3(
      wallet,
      "EAdXan1jJdNHorKE1mXJ9ux4rZuxYhHLQaauvi4XtyDn" //this REVIEW_PDA address which should be set dynamically to check argument value .
    );
    if (result) {
      setMessage(result?.result);
    }
    console.log("Result for Balance Check=>", result.amount.toString());
  };

  const depositCall = async () => {
    const hello = await balanceCheck();
    if (wallet) {
      const result = await depositMoney(
        hello.REVIEW_PDA,
        hello.REVIEW_PDA1,
        wallet
      ); // contract desposit function with argument
      console.log("Result for Deposit=>", result);
      if (result) {
        callGetMessage(); // Call getMessage function to update the result
      }
    }
  };
  const claimCall = async () => {
    // const hello = await balanceCheck();
    if (wallet) {
      const result = await claimMoney(
        // hello.REVIEW_PDA,
        // hello.REVIEW_PDA1,
        wallet
      ); // contract desposit function with argument
      console.log("Result for Claim=>", result);
      if (result) {
        callGetMessage(); // Call getMessage function to update the result
      }
    }
  };

  useEffect(() => {
    if (wallet) callGetMessage();
  }, [wallet]);

  return (
    <div className={styles.container}>
      <div className={styles.navbar}>{mounted && <WalletMultiButton />}</div>

      <div className={styles.main}>
        {wallet && (
          <div className={styles.message_bar}>
            <button
              className={styles.message_button}
              onClick={() => depositCall()}
            >
              Deposit
            </button>
            <button
              className={styles.message_button}
              onClick={() => claimCall()}
            >
              Claim
            </button>
          </div>
        )}

        {wallet && message && (
          <div>
            <h2>Calculator Result: {Number(message)}</h2>
          </div>
        )}
      </div>
    </div>
  );
}
