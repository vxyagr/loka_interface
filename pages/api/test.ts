// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { ethers } from "ethers";
var bitcoinTransaction = require("bitcoin-transaction");
import { USDCAbi } from "../../components/Contracts";
const CryptoAccount = require("send-crypto");
import cryptoAccount from "send-crypto";
const provider = new ethers.providers.JsonRpcProvider(process.env.chainRPC);
const contractSigner = new ethers.Wallet(process.env.PRIVATE_KEY as string, provider);
const yieldContract = new ethers.Contract(process.env.USDCContract as string, USDCAbi, contractSigner as ethers.Signer);
type Data = {
    name: string;
};
export const config = {
    api: {
        bodyParser: true,
    },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    //req : owner address
    //get claimable, get target address
    //execute send to target address
    //if success write result to SC
    //const reslt = bitcoinTransaction.getBalance("3E8ociqZa9mZUSwGdSmAEMAoAxBK3FNDcd", { network: "mainnet" });
    console.log(bitcoinTransaction);
    /* Print balance */
    //console.log(await account.getBalance("BTC"));
    res.status(200).json({ name: "oke" });
}
