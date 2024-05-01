import { useEffect, useState } from "react";
import { Keypair } from "@solana/web3.js";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import useIsMounted from "./api/utils/useIsMounted";
import styles from "../styles/Home.module.css";
import { createMessage, getMessage, updateMessage } from "./create_update";

export default function Home() {
  // const [messageAccount, _] = useState<any>(Keypair.generate()); // use to create a account for storage but not a PDA address
  const messageAccount = Keypair.fromSecretKey(
    Uint8Array.from([
      130, 170, 16, 244, 39, 96, 154, 169, 130, 73, 210, 107, 144, 79, 207, 136,
      156, 80, 226, 164, 137, 164, 177, 103, 209, 115, 159, 13, 40, 213, 26, 49,
      108, 55, 9, 231, 108, 100, 30, 255, 34, 86, 28, 161, 169, 62, 165, 201,
      153, 67, 75, 29, 2, 114, 204, 53, 247, 156, 71, 249, 44, 19, 76, 133,
    ])
  ); //Private key of any Random user in Array defined statically to storage data .

  const [message, setMessage] = useState("");
  const [messageAuthor, setMessageAuthor] = useState<string>("");
  const [messageTime, setMessageTime] = useState<number>(0);
  const [inputtedMessage, setInputtedMessage] = useState<string>("");

  const wallet: any = useAnchorWallet();
  const mounted = useIsMounted();

  const callGetMessage = async () => {
    const result: any = await getMessage(wallet, messageAccount);
    if (result) {
      setMessage(result.content.toString());
      setMessageAuthor(result.author.toString());
      setMessageTime(result.timestamp.toNumber() * 1000);
      setInputtedMessage("");
    }
  };

  const callCreateMessage = async () => {
    const result = await createMessage(inputtedMessage, wallet, messageAccount);
    if (result) callGetMessage();
  };

  const callUpdateMessage = async () => {
    const result = await updateMessage(inputtedMessage, wallet, messageAccount);
    if (result) callGetMessage();
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
            <input
              className={styles.message_input}
              placeholder="Message"
              onChange={(e) => setInputtedMessage(e.target.value)}
              value={inputtedMessage}
            />
            <button
              className={styles.message_button}
              disabled={!inputtedMessage}
              onClick={() => callUpdateMessage()}
            >
              Create Message
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
