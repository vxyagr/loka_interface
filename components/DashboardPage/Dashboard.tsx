// @ts-ignore
// Import components
import type { FunctionComponent } from "react";
import { chain, useNetwork, useAccount, useContract, useConnect, useSigner, useDisconnect, useEnsAvatar, useEnsName, useSwitchNetwork } from "wagmi";
import { DEFAULT_CHAIN, useLokaContext } from "../LokaWallet";
import { ethers, providers } from "ethers";
import React, { useState, useEffect } from "react";
import { USDCAbi, contractAbi, yieldContractABI } from "../Contracts";
import Link from "next/link";
import { Magic } from "magic-sdk";

type DBProps = {};

const DashboardContent: FunctionComponent<DBProps> = ({}) => {
    //check if non-Magic connected
    const { address } = useAccount();
    const { chain } = useNetwork();

    const [lokaChain, setLokaChain] = useState(chain?.id);
    const { data: signer, isError, isLoading } = useSigner();

    const { loggedIn, magicConnector, magicSigner, magicAddress } = useLokaContext();
    const [account, setAccount] = useState(loggedIn ? magicAddress : address);

    const contractSigner = loggedIn ? magicSigner : signer;
    const [showConnectWallet, setShowConnectWallet] = useState(account || loggedIn ? false : true);
    const nftContract = new ethers.Contract(process.env.lokaNFTContract as string, contractAbi, contractSigner as ethers.Signer);
    const usdcContract = new ethers.Contract(process.env.USDCContract as string, USDCAbi, contractSigner as ethers.Signer);
    const yieldContract = new ethers.Contract(process.env.lokaYieldContract as string, yieldContractABI, contractSigner as ethers.Signer);

    const [nftPrice, setNftPrice] = useState(0);
    const [amount, setAmount] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [claimable, setClaimable] = useState(0);
    const [claimHistory, setClaimHistory] = useState([[0, 1, 2, 3]]);
    const [isOwner, setIsOwner] = useState(false);
    const getAvailable = async () => {
        var name = await nftContract.totalSupply();
    };

    const getPrice = async () => {
        try {
            var price = await nftContract.getPrice();
            var owner = await yieldContract.owner();
            if (owner.toString() == account?.toString()) {
                setIsOwner(true);
            }
            setNftPrice(price);
            return price;
        } catch (e) {
            setNftPrice(0);
        }
    };

    const getClaimable = async () => {
        try {
            var price = await yieldContract.getClaimable(account);
            setClaimable(parseInt(price) / 1000000000);
            //console.log("claimable : " + price);
            //return price;
        } catch (e) {
            setClaimable(0);
        }
    };
    const getClaimHistory = async () => {
        try {
            var history = await yieldContract.getClaimHistory(account);
            const jsonString = JSON.stringify(history);

            // Use JSON.parse() to parse the JSON string and convert it to a JSON array.
            const jsonArray = JSON.parse(jsonString);

            setClaimHistory(history);
            //console.log("0 " + history[0][3]);
            //console.log(jsonArray); // Output: [1, 2, 3, 4, 5]
            //console.log(jsonArray[0][0].toBigNumber());
            //console.log(history);
        } catch (e) {
            //console.log(e.message);
            //setClaimable(0);
        }
    };

    const claim = async () => {
        try {
            var price = await yieldContract.claim(account, 555111);
            await price.wait();
            await getClaimable();
            //return price;
        } catch (e) {
            //console.log(e.message);
            //setClaimable(0);
        }
    };

    const [owned, setOwned] = useState(0);
    const getOwnedLoka = async () => {
        try {
            //console.log("getting owned lokas " + account);
            var owned = await nftContract?.getLokaOwnedBy(account);
            setOwned(owned.length);
            //console.log("got Lokas");
        } catch (e) {}
    };
    const checkAllowance = async () => {
        const allowance = await usdcContract.allowance(account, process.env.lokaNFTContract);
        return parseInt(allowance);
    };
    const mintLoka = async () => {
        if (totalPrice > -2) {
            //approve USDC transfer
            const allowance = await checkAllowance();

            try {
                if (allowance < totalPrice) {
                    const approveResult = await usdcContract.approve(process.env.lokaNFTContract, totalPrice - allowance);
                    var res = await approveResult.wait();
                }
                //console.log("minting");
                const result = await nftContract.mintLoka(amount);
                // await result.wait();
            } catch (error) {
                //console.log("transaction error " + errpr);
            }
        }
    };

    const adjustAmount = async (amountNumber: number) => {
        if (amountNumber >= 0) {
            setAmount(amountNumber);

            //var price = await getPrice();
            var total_ = amountNumber * nftPrice;
            setTotalPrice(total_);
        }
    };

    useEffect(() => {
        const data = window.localStorage.getItem("showConnectWallet");
        //if (data !== null) setShowConnectWallet(JSON.parse(data));
        if (!loggedIn) {
            const chainData = window.localStorage.getItem("lokaChain");
            // if (chainData !== null && chainData !== "undefined") setLokaChain(JSON.parse(chainData));
        } else {
            if (loggedIn) setLokaChain(DEFAULT_CHAIN.id);
        }
        //console.log("from state " + lokaChain + " " + showConnectWallet);
    }, []);

    useEffect(() => {
        if (nftContract.signer) {
            getOwnedLoka();
            getPrice();
            getClaimable();
            getClaimHistory();
        }
        //if (account) {
        setShowConnectWallet(account || loggedIn ? false : true);
        //}
        if (lokaChain) {
            setLokaChain(lokaChain);
            window.localStorage.setItem("lokaChain", JSON.stringify(lokaChain));
        }
        window.localStorage.setItem("showConnectWallet", JSON.stringify(account || loggedIn ? false : true));
    }, [contractSigner, nftContract.signer, account, showConnectWallet, chain, lokaChain]);
    //console.log("servercall | show connect wallet :" + showConnectWallet + " | chain :  " + (lokaChain != DEFAULT_CHAIN.id) + " " + lokaChain);
    const showSwitchToDefaultNetwork = !showConnectWallet && lokaChain != DEFAULT_CHAIN.id && !loggedIn ? true : false;

    if (!showConnectWallet && !showSwitchToDefaultNetwork) {
        return (
            <div className="relative h-full w-full justify-center overflow-auto   text-green-dark-10">
                <div className="min-w-[20px] md:flex lg:flex " style={{ justifyContent: "center", alignItems: "center" }}>
                    <div className="m-10  bg-white  px-10 py-5 text-left lg:h-[300px] lg:text-center" style={{ borderRadius: "20px", justifyContent: "center", alignItems: "center" }}>
                        <div className="mb-6 bg-white  text-center align-middle text-sm leading-6 text-gray-light-10 dark:text-gray-dark-10" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <div
                                style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                                className="h-[80px] w-[100px]"
                                onClick={async () => {
                                    var num = amount - 1;

                                    await adjustAmount(num);
                                }}
                            >
                                <button className="px-4">
                                    <img src="/minusIcon.svg" alt="-" width="30px" />
                                </button>
                            </div>
                            <div className="mint_number h-[80px] w-[100px]" style={{ color: "#256428", fontSize: "36px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <input
                                    type="text"
                                    placeholder="Type something..."
                                    id="myInput"
                                    value={amount}
                                    onChange={async (e) => {
                                        //await getPrice();
                                        adjustAmount(parseInt(e.currentTarget.value));
                                    }}
                                    style={{ width: "130px", padding: "5px", textAlign: "center" }}
                                ></input>
                            </div>
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }} className="h-[80px] w-[100px]">
                                <button
                                    className="px-4"
                                    onClick={async () => {
                                        var num = amount + 1;
                                        //await getPrice();
                                        await adjustAmount(num);
                                    }}
                                >
                                    <img src="/plusIcon.svg" alt="+" width="30px" />
                                </button>
                            </div>
                        </div>
                        <div className="mb-6  text-center align-middle text-sm leading-6 text-gray-light-10 dark:text-gray-dark-10" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Link href="#">
                                <button
                                    onClick={() => {
                                        mintLoka();
                                    }}
                                >
                                    <a className="button gradient inline-block rounded-full bg-[length:300%_300%] bg-center py-3 px-8 font-inter text-sm font-bold leading-none tracking-tight text-gray-50 hover:bg-left  hover:shadow-xl hover:shadow-blue-400/20 active:scale-95 dark:text-gray-900 sm:text-base md:text-base">Mint</a>
                                </button>
                            </Link>
                        </div>
                        <div className="mb-6  text-center align-middle text-sm leading-6 text-gray-light-10 dark:text-gray-dark-10" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            Total : {Intl.NumberFormat().format(totalPrice / 1000000)} USDC
                        </div>
                        <div className="mb-6  text-center align-middle text-sm leading-6 text-gray-light-10 dark:text-gray-dark-10" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <h2 className="text-center">
                                <span style={{ color: "#256428", fontSize: "25px", display: "flex", justifyContent: "center", alignItems: "center" }}> You have {owned} Lokas </span>
                            </h2>
                        </div>

                        <p className="text-sm font-bold leading-6 text-gray-light-12 dark:text-gray-dark-12"></p>
                    </div>
                    <div className="m-10  bg-white px-10  py-5 text-left lg:h-[300px] lg:text-center" style={{ borderRadius: "20px", justifyContent: "center", alignItems: "center" }}>
                        <div className="flex w-full text-center align-middle" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <div className="mint_number h-[80px] w-[100px]" style={{ color: "#256428", fontSize: "18px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                {claimable}
                            </div>
                        </div>

                        <div className="w-full md:flex lg:flex" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Link href="#">
                                <button
                                    onClick={() => {
                                        claim();
                                    }}
                                >
                                    <a className="button gradient inline-block rounded-full bg-[length:300%_300%] bg-center py-3 px-8 font-inter text-sm font-bold leading-none tracking-tight text-gray-50 hover:bg-left  hover:shadow-xl hover:shadow-blue-400/20 active:scale-95 dark:text-gray-900 sm:text-base md:text-base">Claim Bitcoin</a>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="min-h-[50px] min-w-[20px] md:flex lg:flex " style={{ justifyContent: "center", alignItems: "center" }}>
                    <hr className="min-w-[500px]" />
                </div>
                <div className="min-w-[20px] " style={{ color: "#256428", fontSize: "36px", display: "flex", justifyContent: "center", verticalAlign: "top" }}>
                    <div>{isOwner ? <Link href="/admin">Claim History</Link> : <p>Claim History</p>}</div>
                </div>
                <div className="min-h-[50px] min-w-[20px] md:flex lg:flex " style={{ justifyContent: "center", alignItems: "center" }}>
                    <div className="min-h-[200px]" style={{ color: "#256428", fontSize: "18px", display: "flex", justifyContent: "center", verticalAlign: "top" }}>
                        <div className="h-[100%] pb-[100px]">
                            {claimHistory.map((element: any) => (
                                <div className="flex w-full" key={element.id}>
                                    <div className="w-[400px]">{new Date(parseInt(element[0].toString()) * 1000).toString()}</div>
                                    <div>{(element[2] / 1000000000000000000).toString()} LBTC</div>
                                    <div></div>
                                </div>
                            ))}
                        </div>{" "}
                    </div>
                </div>
                <div className=" h-[120px] w-full justify-center overflow-hidden bg-[#256428] pt-[30px] text-center text-white ">© Loka Labs @2022</div>
            </div>
        );
    } else if (showSwitchToDefaultNetwork) {
        {
            //console.log("switch " + showConnectWallet + " " + lokaChain + " " + chain?.id);
        }
        return (
            <div className="relative  h-full w-full justify-center overflow-hidden bg-white text-green-dark-10">
                <div className="lg:py-30 relative z-10 m-auto flex min-h-[500px] max-w-screen-md flex-col items-center gap-8 py-[60px] px-4 text-center align-middle">
                    <h2 className="connect-hero-text text-[#256428]">
                        Please Switch Network to <span className="gradient move-gradient bg-[length:250%_250%] bg-clip-text text-transparent transition-none sm:py-20">{DEFAULT_CHAIN.name}</span>
                    </h2>
                </div>
                <div className="h-full w-full justify-center overflow-hidden bg-white pt-[30px] text-center text-white ">© Loka Labs @2022</div>
            </div>
        );
    } else {
        return (
            <div className="relative h-screen w-full justify-center overflow-hidden bg-white text-green-dark-10">
                <div className="lg:py-30 relative z-10 m-auto flex min-h-[500px] max-w-screen-md flex-col items-center gap-8 py-[60px] px-4 text-center align-middle">
                    <h2 className="connect-hero-text text-[#256428]">Please Connect Your Wallet</h2>
                </div>
                <div className="h-full w-full justify-center overflow-hidden bg-[#256428] pt-[30px] text-center text-white ">© Loka Labs @2022</div>
            </div>
        );
    }
};

export default DashboardContent;
