import { Magic } from "magic-sdk";
import { OAuthExtension } from "@magic-ext/oauth";
import { DEFAULT_CHAIN } from "./LokaWallet";

// Create client-side Magic instance
const createMagic = (key: string) => {
    const customNodeOptions = {
        rpcUrl: process.env.chainRPC as string, // Polygon RPC URL
        chainId: DEFAULT_CHAIN.id, // Polygon chain id
    };

    return (
        typeof window != "undefined" &&
        new Magic(key as string, {
            network: customNodeOptions,
        })
    );
};

export const magicObject = createMagic(process.env.chainRPC as string);
