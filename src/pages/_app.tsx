import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider
 } from "@solana/wallet-adapter-react-ui";
import { endpoint } from "./api/utils/constants";
import "@solana/wallet-adapter-react-ui/styles.css";
import { krkxkalal } from "../../krk";

function MyApp({ Component, pageProps }: AppProps) {
  const phantomWallet = new PhantomWalletAdapter();
  // krkxkalal();
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[phantomWallet]}>
        <WalletModalProvider>
          <Component {...pageProps}/>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

export default MyApp;