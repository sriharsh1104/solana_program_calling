import { useEffect, useState } from "react";
import { Keypair } from "@solana/web3.js";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import useIsMounted from "./api/utils/useIsMounted";
import styles from "../styles/Home.module.css";
import { createMessage, getMessage, updateMessage } from "./create_update";

export default function Home() {
  // const [messageAccount, _] = useState<any>(Keypair.generate()); // create a new account for storage
  const messageAccount = Keypair.fromSecretKey(
    Uint8Array.from([
      58, 11, 78, 19, 76, 113, 195, 13, 27, 58, 92, 87, 159, 140, 69, 236, 96,
      244, 132, 52, 185, 22, 144, 157, 252, 198, 47, 58, 88, 252, 19, 88, 211,
      225, 135, 127, 105, 66, 130, 19, 100, 40, 40, 66, 125, 249, 101, 160, 239,
      53, 42, 75, 174, 91, 42, 188, 209, 189, 101, 60, 248, 148, 209, 187,
    ]) // previously user Account is already assigned to program . So have to assign new Account to store data
  );
  console.log("storageAccount", messageAccount.toString());

  const [message, setMessage] = useState("");
  const [messageAuthor, setMessageAuthor] = useState("");
  const [messageTime, setMessageTime] = useState(0);
  const [inputtedMessage, setInputtedMessage] = useState("");

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
    // Every time user create a message it has to be assign with new storage Account as per contract
    const result = await createMessage(inputtedMessage, wallet, messageAccount);
    if (result) callGetMessage();
  };

  const callUpdateMessage = async () => {
    // Use this function to update previous message on chain
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
              onClick={() => callCreateMessage()}
            >
              Create Message
            </button>
            <button
              className={styles.message_button}
              disabled={!inputtedMessage}
              onClick={() => callUpdateMessage()}
            >
              Update Message
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
