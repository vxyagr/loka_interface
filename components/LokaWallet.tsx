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
import { ethers } from "ethers";
export const connectorStorageKey = "lokaConnectors.wallet";
// Configure chains & providers with the Alchemy provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
const { chains, provider, webSocketProvider } = configureChains([chain.polygonMumbai], [alchemyProvider({ apiKey: "gTI1HS4LrrW_hybaEl2L7TG3ECtIQXTq" }), publicProvider()]);

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

export const DEFAULT_CHAIN = chain.polygon;

export const LokaContext = React.createContext({
    magicConnector: undefined,
    setMagicConnector: async (magicConnector) => null,
    loggedIn: undefined,
    setLoggedIn: async (loggedIn) => null,
    magicAddress: undefined,
    setMagicAddress: async (magicAddress) => null,
    magicSigner: undefined,
    setMagicSigner: async (magicAddress) => null,
    magicProvider: undefined,
    setMagicProvider: async (magicProvider) => null,
});

export const useLokaContext = () => useContext(LokaContext);

export const LokaProvider = ({ children }) => {
    //const { m, provider } = getMagicConnector();
    //var providerTemp = getProvider(magicTemp);
    const [magicConnector, setMagicConnector] = useState(undefined);
    const [loggedIn, setLoggedIn] = useState(false);
    const [magicAddress, setMagicAddress] = useState(undefined);
    const [magicProvider, setMagicProvider] = useState(undefined);
    const [magicSigner, setMagicSigner] = useState(undefined);
    return <LokaContext.Provider value={{ magicConnector, setMagicConnector, loggedIn, setLoggedIn, magicAddress, setMagicAddress, magicSigner, setMagicSigner, magicProvider }}>{children}</LokaContext.Provider>;
};
