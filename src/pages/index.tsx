
import { useEffect, useState } from "react";
import { Keypair, PublicKey } from "@solana/web3.js";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import useIsMounted from "./api/utils/useIsMounted";
import styles from "../styles/Home.module.css";
import { createAccount, deposit, getMessage3 } from "./Claim";
import { useWallet } from "@solana/wallet-adapter-react";
export default function Home() {
  // const [messageAccount, _] = useState<any>(Keypair.generate()); // Use for generating new account for storage
  const messageAccount = Keypair.fromSecretKey(
    Uint8Array.from([
      9, 227, 222, 228, 87, 164, 212, 17, 211, 86, 170, 117, 242, 145, 156, 115,
      0, 199, 179, 176, 238, 181, 178, 6, 245, 92, 209, 173, 70, 138, 91, 247,
      234, 139, 42, 166, 26, 227, 26, 204, 76, 185, 127, 107, 198, 29, 222, 248,
      86, 226, 136, 80, 86, 128, 160, 62, 30, 138, 34, 167, 84, 48, 95, 101,
    ])
  );
  console.log("messageAccount", messageAccount.publicKey.toString());
  const { publicKey } = useWallet();
  const [message, setMessage] = useState("");
  const [messageAuthor, setMessageAuthor] = useState("");
  const [messageTime, setMessageTime] = useState(0);
  const [inputtedMessage, setInputtedMessage] = useState("");

  const wallet: any = useAnchorWallet();
  const mounted = useIsMounted();

  const callGetMessage = async () => {
    console.log("sakjadsadadsasd");
    const result: any = await getMessage3(wallet, messageAccount);
    if (result) {
      console.log(
        "sadiadskasdnadsadads",
        result,
        result.content.toString(),
        result.author.toString(),
        result.timestamp.toNumber() * 1000
      );
      setMessage(result.balance);
      setMessageAuthor(result.signer);
      setMessageTime(result.timestamp * 1000);
      setInputtedMessage("");
    }
    console.log("wewqeqweq", result);
  };
  const callDeposit = async () => {
    const fromAta: PublicKey = new PublicKey(
      "mvyMgM5K6hKabKncXejzY5qE3QdWcjFnRy5bQWTEy7k"
    ); // Define the account where the tokens are currently held
    const toAta: PublicKey = new PublicKey(
      "2znwVF1iJbgzwggEzE6waKrfxdymefEE3oDUKa54meoM"
    ); // Define the account where the tokens will be transferred
    const tokenProgram: any = "GJeQSkDrrtia2voguusV7AjKPYBoC8fKUTnWHnpzUbUN"; // Define the token program ID
    const receipt: any = messageAccount; // Define the account that will store messages

    const result = await deposit(
      inputtedMessage,
      wallet,
      fromAta,
      toAta,
      tokenProgram,
      receipt
    );
    console.log(
      "firsthellobye",
      inputtedMessage,
      wallet,
      fromAta.toString(),
      toAta.toString(),
      tokenProgram.toString(),
      receipt
    );
    if (result) {
      callGetMessage();
    }
  };

  const callCreateAccount = async () => {
    if (wallet) {
      const result = await createAccount(messageAccount, wallet, publicKey);
      console.log("asiydbakjdkadasdasd", result);
    }
  };
  useEffect(() => {
    if (wallet) callGetMessage();
  }, [wallet]);

  return (
    <div className={styles.container}>
      <div className={styles.navbar}>{mounted && <WalletMultiButton />}</div>

      <div className={styles.main}>
        <h1 className={styles.navbar}>SPL</h1>
        {wallet && (
          <div className={styles.message_bar}>
            <input
              className={styles.message_input}
              placeholder="Message"
              onChange={(e) => setInputtedMessage(e.target.value)}
              value={inputtedMessage}
            />
            <button
              className={styles.message_button}
              // disabled={!inputtedMessage}
              onClick={() => callCreateAccount()}
            >
              Balance Check
            </button>
            <button
              className={styles.message_button}
              disabled={!inputtedMessage}
              onClick={() => callDeposit()}
            >
              Deposit
            </button>
          </div>
        )}

        {wallet && message && (
          <div>
            <h2>Current Message: {message}</h2>
            <h2>
              Message Author: {messageAuthor.substring(0, 4)}...
              {messageAuthor.slice(-4)}
            </h2>
            <h2>Time: {new Date(messageTime).toLocaleDateString()}</h2>
          </div>
        )}
      </div>
    </div>
  );
}
