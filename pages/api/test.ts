// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
if (global._bitcore) delete global._bitcore;
import bitcore from "bitcore-lib";
import { ethers } from "ethers";
import { USDCAbi } from "../../components/Contracts";
//import explorers from 'bitcore-explorers';
const explorers = require("bitcore-explorers");
const bitcoinaddress = require("bitcoin-address");
//var bitcore = require('bitcore-lib');
//import   from 'bitcore-lib';
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

    const unit = bitcore.Unit;
    var Insight = require("bitcore-explorers").Insight;
    const insight = new Insight();
    const minerFee = unit.fromMilis(0.128).toSatoshis(); //cost of transaction in satoshis (minerfee)
    //let balance = unit.fromSatoshis(0).toSatoshis();

    insight.getUnspentUtxos("3E8ociqZa9mZUSwGdSmAEMAoAxBK3FNDcd", function (error: any, utxos: any) {
        if (error) {
            //any other error
            res.status(500).json({ error: error });
        } else {
            if (utxos.length == 0) {
                //if no transactions have happened, there is no balance on the address.
                res.status(500).json({ error: "You don't have enough Satoshis to cover the miner fee." });
                //return reject("You don't have enough Satoshis to cover the miner fee.");
            }

            //get balance
            let balance = unit.fromSatoshis(0).toSatoshis();
            for (var i = 0; i < utxos.length; i++) {
                balance += unit.fromSatoshis(parseInt(utxos[i]["satoshis"])).toSatoshis();
            }
            res.status(200).json({ minerFee: minerFee, balanceNow: balance });
        }
    });
}
