import type { AppProps } from "next/app";
//import { Wallet } from "../components/Wallet";
//import { useWalletContext, Wallet } from "../components/LokaWallet";
//import { LokaProvider } from "../components/CTX";
import { LokaProvider } from "../components/LokaWallet";
import { WagmiConfig } from "wagmi";
import { client as wagmiClient } from "../components/LokaWallet";

import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import { Toaster } from "react-hot-toast";

function LokaApp({ Component, pageProps }: AppProps) {
    return (
        <LokaProvider>
            <WagmiConfig client={wagmiClient}>
                <Toaster position="top-center" toastOptions={{ duration: 3000 }} />

                <Component {...pageProps} />
            </WagmiConfig>
        </LokaProvider>
    );
}
export default LokaApp;
