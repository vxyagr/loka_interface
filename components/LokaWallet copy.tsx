import { WagmiConfig, Chain, createClient, defaultChains, chain, configureChains, Client } from "wagmi";
import React, { FunctionComponent, ReactNode, createContext, useContext } from "react";
import createPersistedState from "use-persisted-state";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { Magic, RPCError, RPCErrorCode } from "magic-sdk";
import { useState } from "react";
export const connectorStorageKey = "lokaConnectors.wallet";
// Configure chains & providers with the Alchemy provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
const { chains, provider, webSocketProvider } = configureChains([chain.polygonMumbai], [alchemyProvider({ apiKey: "gTI1HS4LrrW_hybaEl2L7TG3ECtIQXTq" }), publicProvider()]);

// Set up client
export const aa = 2;
export const metaMask = new MetaMaskConnector({ chains });
export const coinBase = new CoinbaseWalletConnector({
    chains,
    options: {
        appName: "wagmi",
    },
});
export const walletConn = new WalletConnectConnector({
    chains,
    options: {
        qrcode: true,
    },
});
export const injectedConn = new InjectedConnector({
    chains,
    options: {
        name: "Injected",
        shimDisconnect: true,
    },
});

export const client = createClient({
    autoConnect: true,
    connectors: [
        new MetaMaskConnector({ chains }),
        new CoinbaseWalletConnector({
            chains,
            options: {
                appName: "wagmi",
            },
        }),
        new WalletConnectConnector({
            chains,
            options: {
                qrcode: true,
            },
        }),
        new InjectedConnector({
            chains,
            options: {
                name: "Injected",
                shimDisconnect: true,
            },
        }),
    ],
    provider,
    webSocketProvider,
});

export const DEFAULT_CHAIN = chain.polygonMumbai;
type WalletGlobalStateProps = {
    children: ReactNode;
};

const m = new Magic("pk_live_6DD38C5CBF3DCC7A");
export type WalletStates = {
    // magicConnector: Magic | undefined;
    // connectMagic: () => Promise<any>;
    //disconnectMagic: () => Promise<any>;
};

const WalletContext = createContext<WalletStates>({
    //magicConnector: undefined,
    //connectMagic: async () => {},
    //disconnectMagic: async () => {},
});

const WalletGlobalState: FunctionComponent<WalletGlobalStateProps> = ({ children }) => {
    const sharedStates = {
        magicConnector: magicConn,
        connectMagic,
        disconnectMagic,
    };
    return <WalletContext.Provider value={sharedStates}>{children}</WalletContext.Provider>;
};
type WalletProps = {
    children: ReactNode;
};

export const Wallet: FunctionComponent<WalletProps> = ({ children }) => {
    return <WalletGlobalState>{children}</WalletGlobalState>;
};

export function useWalletContext() {
    return useContext(WalletContext);
}

export const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4, address.length)}`;
};

export const getEtherscanAddressURL = (chain: Chain | null, address: string): string => {
    if (chain) {
        if (chain.blockExplorers) {
            return `https://mumbai.polygonscan.com/address/${address}`;
        }
        return "#";
    }
    return "#";
};

export const themes = {
    light: {
        foreground: "#000000",
        background: "#eeeeee",
    },
    dark: {
        foreground: "#ffffff",
        background: "#222222",
    },
};

export const LokaContext = React.createContext({
    theme: undefined,
    setTheme: async (theme) => null,
});

export const useLokaContext = () => useContext(LokaContext);

export const LokaProvider = ({ children }) => {
    const [theme, setTheme] = useState(themes.light);

    return <LokaContext.Provider value={{ theme, setTheme }}>{children}</LokaContext.Provider>;
};
