import { useEffect, useState } from "react";
import { Keypair } from "@solana/web3.js";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import useIsMounted from "./api/utils/useIsMounted";
import styles from "../styles/Home.module.css";
import { createAccount, crudOperation, getMessage3 } from "./caculate";
export default function Home() {
  // const [messageAccount, _] = useState<any>(Keypair.generate()); // Use for generating new account for storage 
  const messageAccount = Keypair.fromSecretKey(                     // contract is deployed with new account change storage
    Uint8Array.from([
      9, 227, 222, 228, 87, 164, 212, 17, 211, 86, 170, 117, 242, 145, 156, 115,
      0, 199, 179, 176, 238, 181, 178, 6, 245, 92, 209, 173, 70, 138, 91, 247,
      234, 139, 42, 166, 26, 227, 26, 204, 76, 185, 127, 107, 198, 29, 222, 248,
      86, 226, 136, 80, 86, 128, 160, 62, 30, 138, 34, 167, 84, 48, 95, 101,
    ]) // Array of Private key Address Which Will Store Data
  );
  console.log('messageAccount', messageAccount.publicKey.toString())
  const [message, setMessage] = useState<Number>(0);
  const [selectedOperation, setSelectedOperation] = useState<string>("");
  const [inputValue1, setInputValue1] = useState<string>("");
  const [inputValue2, setInputValue2] = useState<string>("");

  const wallet: any = useAnchorWallet();
  const mounted = useIsMounted();

  const callGetMessage = async () => { // this is read function of contract which which will show result
    const result: any = await getMessage3(wallet, messageAccount);
    if (result) {
      setMessage(result?.result);
    }
    console.log("result", result?.result);
  };

  const callCreateAccount = async () => { // this is used to create a new account if contract is deployed with new Addesss
    if (wallet) {
      const result = await createAccount(messageAccount, wallet);
      console.log('result', result)
    }
  };
  const callCalculate = async () => {
    if (wallet) {
      const result = await crudOperation(
        messageAccount,
        wallet,
        selectedOperation,
        inputValue1,
        inputValue2
      );
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
            <select
              value={selectedOperation}
              onChange={(e) => setSelectedOperation(e.target.value)}
            >
              <option value="">Select Operation</option>
              <option value="Addition">Addition</option>
              <option value="Subtraction">Subtraction</option>
              <option value="Multiplication">Multiplication</option>
              <option value="Division">Division</option>
            </select>
            <input
              className={styles.message_input}
              placeholder="Input Value 1"
              onChange={(e) => setInputValue1(e.target.value)}
              value={inputValue1}
            />
            <input
              className={styles.message_input}
              placeholder="Input Value 2"
              onChange={(e) => setInputValue2(e.target.value)}
              value={inputValue2}
            />
            <button
              className={styles.message_button}
              disabled={!selectedOperation || !inputValue1 || !inputValue2}
              onClick={() => callCalculate()}
            >
              Calculate
            </button>
            <button
              className={styles.message_button}
              disabled={!selectedOperation || !inputValue1 || !inputValue2}
              onClick={() => callCreateAccount()}
            >
              Create Account
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
