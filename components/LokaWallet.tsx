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
function getDefaultChain() {
    if (process.env.CHAIN == "dev") {
        console.log("CHAIN  : test network");
        return chain.polygonMumbai;
    } else {
        return chain.polygon;
    }
}
export const DEFAULT_CHAIN = getDefaultChain();
const { chains, provider, webSocketProvider } = configureChains([DEFAULT_CHAIN], [alchemyProvider({ apiKey: "PuewTEZNa3_23HormMTi3Dt1wVkgD_u_" }), publicProvider()]);

export const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4, address.length)}`;
};

export const getEtherscanAddressURL = (chain: Chain | null, address: string): string => {
    if (chain) {
        if (chain.blockExplorers) {
            return `https://polygonscan.com/address/${address}`;
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

export const LokaContext = React.createContext({
    magicConnector: undefined,
    setMagicConnector: (magicConnector: any) => {},
    loggedIn: undefined,
    setLoggedIn: (loggedIn: any) => {},
    magicAddress: undefined,
    setMagicAddress: (magicAddress: any) => {},
    magicSigner: undefined,
    setMagicSigner: (magicSigner: any) => {},
    magicProvider: undefined,
    setMagicProvider: (magicProvider: any) => {},
});

export const useLokaContext = () => useContext(LokaContext);

export const LokaProvider = ({ children }: any) => {
    //const { m, provider } = getMagicConnector();
    //var providerTemp = getProvider(magicTemp);
    //const mg = new Magic(process.env.chainRPC as string);
    const [magicConnector, setMagicConnector] = useState(undefined);
    const [loggedIn, setLoggedIn] = useState(undefined);
    const [magicAddress, setMagicAddress] = useState(undefined);
    const [magicProvider, setMagicProvider] = useState(undefined);
    const [magicSigner, setMagicSigner] = useState(undefined);
    return <LokaContext.Provider value={{ magicConnector, loggedIn, magicAddress, magicSigner, magicProvider, setMagicConnector, setLoggedIn, setMagicAddress, setMagicProvider, setMagicSigner }}>{children}</LokaContext.Provider>;
};

export const createMagic = async () => {
    const customNodeOptions = {
        rpcUrl: process.env.chainRPC as string, // Polygon RPC URL
        chainId: DEFAULT_CHAIN.id, // Polygon chain id
    };

    return new Magic(process.env.MAGIC_KEY as string, {
        network: customNodeOptions,
    });
};
