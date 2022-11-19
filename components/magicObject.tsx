import { Magic } from "magic-sdk";
import { OAuthExtension } from "@magic-ext/oauth";
import { DEFAULT_CHAIN } from "./LokaWallet";

// Create client-side Magic instance
export const createMagic = async () => {
    const customNodeOptions = {
        rpcUrl: process.env.chainRPC as string, // Polygon RPC URL
        chainId: DEFAULT_CHAIN.id, // Polygon chain id
    };

    return new Magic(process.env.MAGIC_KEY as string, {
        network: customNodeOptions,
    });
};
