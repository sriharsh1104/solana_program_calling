import { useEffect, useState } from "react";
import { Keypair } from "@solana/web3.js";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import useIsMounted from "./api/utils/useIsMounted";
import styles from "../styles/Home.module.css";
import { createAccount, getMessage3 } from "./caculate";
import { useWallet } from "@solana/wallet-adapter-react";
export default function Home() {
  // const [messageAccount, _] = useState<any>(Keypair.generate()); // Use for generating new account for storage
  const messageAccount = Keypair.fromSecretKey(
    Uint8Array.from([
      9, 227, 222, 228, 87, 164, 212, 17, 211, 86, 170, 117, 242, 145, 156, 115,
      0, 199, 179, 176, 238, 181, 178, 6, 245, 92, 209, 173, 70, 138, 91, 247,
      234, 139, 42, 166, 26, 227, 26, 204, 76, 185, 127, 107, 198, 29, 222, 248,
      86, 226, 136, 80, 86, 128, 160, 62, 30, 138, 34, 167, 84, 48, 95, 101,
    ]) // Array of Private key Address Which Will Store Data
  );
  const { publicKey } = useWallet();
  const [message, setMessage] = useState<Number>(0);
  const [inputtedMessage, setInputtedMessage] = useState("");

  const wallet: any = useAnchorWallet();
  const mounted = useIsMounted();

  const callGetMessage = async () => {
    const result: any = await getMessage3(wallet, messageAccount);
    if (result) {
      setMessage(result.result);
      setInputtedMessage("");
    }
    console.log("wewqeqweq", result.result);
  };

  const callCreateAccount = async () => {
    if (wallet) {
      const result = await createAccount(messageAccount, wallet, publicKey);
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
              placeholder="Caculation Result"
              onChange={(e) => setInputtedMessage(e.target.value)}
              value={inputtedMessage}
            />
            <button
              className={styles.message_button}
              disabled={!inputtedMessage}
              onClick={() => callCreateAccount()}
            >
              Balance Check
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
