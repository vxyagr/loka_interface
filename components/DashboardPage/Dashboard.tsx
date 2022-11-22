// @ts-ignore
// Import components
import type { FunctionComponent } from "react";
import { chain, useNetwork, useAccount, useContract, useConnect, useSigner, useDisconnect, useEnsAvatar, useEnsName, useSwitchNetwork } from "wagmi";
import { DEFAULT_CHAIN, useLokaContext } from "../LokaWallet";
import { ethers, providers } from "ethers";
import React, { useState, useEffect } from "react";
import { USDCAbi, contractAbi } from "../Contracts";
import Link from "next/link";
import { Magic } from "magic-sdk";

type DBProps = {};

const DashboardContent: FunctionComponent<DBProps> = ({}) => {
    //check if non-Magic connected
    const { address } = useAccount();
    const { chain } = useNetwork();
    const account = address;

    const { data: signer, isError, isLoading } = useSigner();

    const { loggedIn, magicConnector, magicSigner } = useLokaContext();
    const contractSigner = loggedIn ? magicSigner : signer;

    const showConnectWallet = account || loggedIn ? false : true;
    const showSwitchToDefaultNetwork = !showConnectWallet && chain?.id != DEFAULT_CHAIN.id && !loggedIn ? true : false;

    const nftContract = new ethers.Contract(process.env.lokaNFTContract as string, contractAbi, contractSigner as ethers.Signer);
    const usdcContract = new ethers.Contract(process.env.USDCContract as string, USDCAbi, contractSigner as ethers.Signer);

    const [nftPrice, setNftPrice] = useState(0);
    const [amount, setAmount] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const getAvailable = async () => {
        var name = await nftContract.totalSupply();
    };

    const getPrice = async () => {
        try {
            var price = await nftContract.getPrice();
            setNftPrice(price);
            return price;
        } catch (e) {
            setNftPrice(0);
        }
    };

    const [owned, setOwned] = useState(0);
    const getOwnedLoka = async () => {
        try {
            var owned = await nftContract?.getLokaOwnedBy(account);
            setOwned(owned.length);
        } catch (e) {}
    };
    const checkAllowance = async () => {
        const allowance = await usdcContract.allowance(account, process.env.lokaNFTContract);
        return parseInt(allowance);
    };
    const mintLoka = async () => {
        if (totalPrice > 0) {
            //approve USDC transfer
            const allowance = await checkAllowance();
            try {
                if (allowance < totalPrice) {
                    const approveResult = await usdcContract.approve(process.env.lokaNFTContract, totalPrice - allowance);
                    var res = await approveResult.wait();
                }

                const result = await nftContract.mintLoka(amount);
                // await result.wait();
            } catch (e) {
                console.log("transaction error " + e.message);
            }
        }
    };

    const adjustAmount = async (amountNumber: number) => {
        if (amountNumber >= 0) {
            setAmount(amountNumber);

            var price = await getPrice();
            var total_ = amountNumber * price;
            setTotalPrice(total_);
        }
    };

    useEffect(() => {
        if (nftContract.signer) {
            getOwnedLoka();
            getPrice();
        }
    }, [contractSigner, nftContract.signer]);

    if (!showConnectWallet && !showSwitchToDefaultNetwork) {
        return (
            <div className="relative h-screen w-full justify-center overflow-hidden bg-white text-green-dark-10">
                <div className="relative z-10  flex w-screen flex-col items-center gap-8 py-[20px] px-4 text-center align-middle lg:py-10" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <div className="relative z-10 flex w-screen flex-col items-center gap-8 py-[20px] px-4 text-center align-middle lg:py-10" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <div className="px-4 py-6 text-center sm:basis-1/4 " style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <p className="mb-6 text-sm leading-6 text-gray-light-10 dark:text-gray-dark-10">
                                <div className="flex w-full text-center align-middle" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
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
                                <Link href="#">
                                    <button
                                        onClick={() => {
                                            mintLoka();
                                        }}
                                    >
                                        <a className="button gradient inline-block rounded-full bg-[length:300%_300%] bg-center py-3 px-8 font-inter text-sm font-bold leading-none tracking-tight text-gray-50 hover:bg-left  hover:shadow-xl hover:shadow-blue-400/20 active:scale-95 dark:text-gray-900 sm:text-base md:text-base">Mint</a>
                                    </button>
                                </Link>
                                <div>Total : {Intl.NumberFormat().format(totalPrice / 1000000)} USDC</div>
                                <div>
                                    <h2 className="med-hero-text">
                                        <span style={{ color: "#256428", fontSize: "25px", display: "flex", justifyContent: "center", alignItems: "center" }}> You have {owned} Lokas </span>
                                    </h2>
                                </div>
                            </p>
                            <p className="text-sm font-bold leading-6 text-gray-light-12 dark:text-gray-dark-12"></p>
                        </div>

                        <hr style={{ width: "800px" }} />
                        <div className="relative h-full w-full justify-center overflow-hidden bg-white text-green-dark-10">
                            <div className="z-5 relative m-auto flex  max-w-screen-md flex-col items-center gap-8 px-4 text-center align-top ">
                                <div className="min-w-[20px] md:flex lg:flex "></div>
                            </div>
                        </div>
                    </div>

                    <div className="md:flex lg:flex "></div>
                </div>
                <div className="fixed bottom-0 h-[120px] w-full justify-center overflow-hidden bg-[#256428] pt-[30px] text-center text-white ">© Loka Labs @2022</div>
            </div>
        );
    } else if (showSwitchToDefaultNetwork) {
        return (
            <div className="relative  h-screen w-full justify-center overflow-hidden bg-white text-green-dark-10">
                <div className="lg:py-30 relative z-10 m-auto flex max-w-screen-md flex-col items-center gap-8 py-[60px] px-4 text-center align-middle">
                    <h2 className="connect-hero-text text-green-dark-1">
                        Please Switch Network to <span className="gradient move-gradient bg-[length:250%_250%] bg-clip-text text-transparent transition-none sm:py-20">{DEFAULT_CHAIN.name}</span>
                    </h2>
                </div>
                <div className="fixed bottom-0 h-[120px] w-full justify-center overflow-hidden bg-[#256428] pt-[30px] text-center text-white ">© Loka Labs @2022</div>
            </div>
        );
    } else {
        return (
            <div className="relative h-screen w-full justify-center overflow-hidden bg-white text-green-dark-10">
                <div className="lg:py-30 relative z-10 m-auto flex max-w-screen-md flex-col items-center gap-8 py-[60px] px-4 text-center align-middle">
                    <h2 className="connect-hero-text text-green-dark-1">Please Connect Your Wallet</h2>
                </div>
                <div className="fixed bottom-0 h-[120px] w-full justify-center overflow-hidden bg-[#256428] pt-[30px] text-center text-white ">© Loka Labs @2022</div>
            </div>
        );
    }
};

export default DashboardContent;
