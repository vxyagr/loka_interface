// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

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

    try {
        const BlockIo = require("block_io");

        const block_io = new BlockIo({ api_key: "2404-fce0-4fc7-d54c", pin: "1FeHumaNEfVv3dbf" });
        console.log(block_io);
        //var bal = await block_io.get_balance();
        const data = await block_io.get_new_address({ label: "shibe1" });
        console.log("ok");
        var bal = await block_io.get_address_balance({ address: "2MtaJ2o39KKV2cmgKMiuxz2AB4Uz3AX9q92" });
        console.log("end");
        console.log(JSON.stringify(bal, null, 2));
        res.status(200).json({ balance: bal });
    } catch (e: any) {
        console.log("error happened " + e.message);
    }

    res.status(200).json({ name: "done" });
}
