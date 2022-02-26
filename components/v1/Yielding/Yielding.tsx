import type { FunctionComponent } from "react";
import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { ethers, providers } from "ethers";
import Web3 from "web3";
import Scroll from "./Scroll";
import Axios from "axios";

import Favicon from "../Favicon";
import Footer from "../Footer";
import { useMarkets } from "../../../utils/snapshot";
import MarketCard from "./MarketCard";
import ButtonConnectWalletDesktop from "../Buttons/ConnectWalletDesktop";
import ButtonThemeSwitcher from "../Buttons/ThemeSwitcher";
import Logo from "../Logo";
import ButtonConnectWalletMobile from "../Buttons/ConnectWalletMobile";
import MarketsPageMeta from "./YieldingMeta";
import { DEFAULT_CHAIN, RinkebyProvider, useWalletContext } from "../Wallet";
import { Button } from "../../../stories/Button";

/**
 * MarketsPageProps is a React Component properties that passed to React Component MarketsPage
 */
type MarketsPageProps = {};
var spply = 0;
var first = true;
var check = false;
/**
 * MarketsPage is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const MarketsPage: FunctionComponent<MarketsPageProps> = ({}) => {
    // Read global states
    const { chain } = useWalletContext();
    const { account } = useWalletContext();
    const { signer } = useWalletContext();

    // Read data from Snapshot API
    const marketsResponse = useMarkets(chain.unsupported ? DEFAULT_CHAIN.id : chain.chain.id);

    // UI states
    const showLoading = marketsResponse.isLoading;
    const showError = !showLoading && marketsResponse.error;
    const showData = !showLoading && !showError && marketsResponse.data;

    const Web3 = require("web3");
    //if (window.web3) {

    var contractAbi = require("./nftAbi.json");
    const contractAddres = "0xe440b9cBaF7b31513F8414abd1D6c7a63dd01DD8";

    // console.log(accountsList[0])

    // const provider = new providers.JsonRpcBatchProvider("https://rinkeby.infura.io/v3/8051d992532d4f65b1cea01cb751d577");
    const [uri, setURI] = useState("");

    const contract = new ethers.Contract(contractAddres, contractAbi, signer);
    const connection = contract.connect(contract.signer);
    const [allToken, setAllToken] = useState(0);
    const [totalSupply, setTotalSupply] = useState(0);
    const getTotalSupply = async () => {
        var supply = await contract.tokenQuantity(account);
        var allSupply = await contract.totalSupply();
        setTotalSupply(supply);
        setAllToken(allSupply);
        console.log("TOTAL SUPPLY " + totalSupply);
        var num = parseInt(totalSupply.toString()) + 1;
        var uri_ = '{"name": "LoKa #' + num + '","image": "https://voyager.co.id/img/LOKA_NFT.jpg","attributes": [{"trait_type": "Rig Tier", "value": "Dragon"},{"trait_type": "Multiplier", "value": "1.7"}]}';
        setURI(uri_);
        //setIsMinted(result);
    };

    const getMintedStatus = async () => {
        const result = await contract.isContentOwned(uri);
        console.log(result);
        //setIsMinted(result);
    };

    const mintToken = async () => {
        console.log("MINTING " + uri);
        const addr = account;
        const result = await contract.mintNFT(uri, {
            value: ethers.utils.parseEther("0.001"),
        });

        await result.wait();
        getTotalSupply();
    };
    const [ethYield, setEthYield] = useState(0);
    const getYield = async () => {
        const addr = account;
        var theYield = await contract.getYield();
        setEthYield(theYield / 1000000000);
    };
    if (first || uri == "") {
        getTotalSupply();
        getYield();
        first = false;
    }
    const claim = async () => {
        console.log("CLAIMING " + uri);
        const addr = account;
        await contract.claimYield();

        getYield();
    };
    const axios = require("axios");
    // const request = require("request");
    const [miningBalance, setMiningBalance] = useState(0);
    const [monthlyMiningBalance, setMonthlyMiningBalance] = useState(0);
    const [averageHashrate, setAverageHashrate] = useState(0);
    const [workers, setWorkers] = useState(0);
    const [ownerProfit, setOwnerProfit] = useState(0);

    const showYield = async () => {
        const account_address = "0xc72483d6aa551f9ab22b04ce2194e35f4e286c6c";
        const request_url = `https://eth.2miners.com/api/accounts/${account_address}`;
        const result = await axios.get(request_url);
        const daily = result.data["24hreward"] / 1000000000;

        const hashrate = result.data["hashrate"] / 1000000000;
        const workersOnline = result.data["workersOnline"];
        setOwnerProfit(daily * (totalSupply / allToken));
        const monthly = 30 * ownerProfit;
        setMiningBalance(daily);
        setMonthlyMiningBalance(monthly);
        setAverageHashrate(hashrate);
        setWorkers(workersOnline);
        console.log();
    };
    showYield();
    if (account) {
        return (
            <div className="relative flex h-full min-h-screen w-full flex-col overflow-hidden bg-gray-light-1 font-inter dark:bg-gray-dark-1">
                <Head>
                    {/* <!-- HTML Meta Tags --> */}
                    <Scroll />
                    <title>LoKa | Blockchain with Renewable Energy </title>
                    <meta name="description" content="Invest and earn from professionally managed green energy blockchain mining infrastructure" />
                    <MarketsPageMeta />
                </Head>
                <Favicon />

                <div className="container z-10 mx-auto max-w-full sm:z-20">
                    <div className="flex flex-row items-center justify-between p-4">
                        <div className="flex-none">
                            <Link href="/">
                                <a className="flex items-center">
                                    <Logo />
                                    <span className="traking-tight leading-0 self-center pl-2 font-inter text-base font-bold text-gray-light-12 dark:text-gray-light-1">LoKa</span>
                                </a>
                            </Link>
                        </div>
                        <div className="inline-block flex flex-none flex-row space-x-2">
                            <div className="hidden sm:inline-block"></div>

                            <div className="hidden sm:inline-block">
                                <ButtonConnectWalletDesktop />
                            </div>

                            <div className="inline-block h-[40px]">
                                <ButtonThemeSwitcher />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="z-10 flex min-h-screen flex-col">
                    {/* Headers */}
                    <div className="container mx-auto mt-8 max-w-[540px] px-4 sm:mt-16">
                        <div className="flex flex-col space-y-6 border-b border-dashed border-gray-light-9 pb-6 dark:border-gray-dark-9">
                            <div className="text-center">
                                <h1 className="text-2xl font-bold leading-8 tracking-[-0.02em] text-gray-light-12 dark:text-gray-dark-12 sm:text-[32px]">Your LoKa NFTs </h1>

                                <div className="overflow-hidden rounded-2xl border border-gray-light-3 bg-gray-light-2 dark:border-gray-dark-3 dark:bg-gray-dark-2 sm:h-64 sm:flex-row sm:items-center">
                                    <div className="sm:basis-8/8 px-4 py-6 text-center sm:pl-8">
                                        <h1 className="m-0 mb-8 text-base font-bold text-gray-light-12 dark:text-gray-dark-12 sm:text-lg">You have {totalSupply.toString()} LoKas </h1>
                                        <p className="mb-6 text-sm leading-6 text-gray-light-10 dark:text-gray-dark-10">
                                            {" "}
                                            <a
                                                onClick={() => {
                                                    mintToken();
                                                }}
                                                className="button gradient inline-block rounded-full bg-[length:300%_300%] bg-center py-3 px-8 font-inter text-sm font-bold leading-none tracking-tight text-gray-50 hover:bg-left  hover:shadow-xl hover:shadow-blue-400/20 active:scale-95 dark:text-gray-900 sm:text-base md:text-base"
                                            >
                                                Mint +1 LoKa
                                            </a>{" "}
                                            <br />
                                            <br />
                                            <a
                                                onClick={() => {
                                                    claim();
                                                }}
                                                className="button gradient inline-block rounded-full bg-[length:300%_300%] bg-center py-3 px-8 font-inter text-sm font-bold leading-none tracking-tight text-gray-50 hover:bg-left  hover:shadow-xl hover:shadow-blue-400/20 active:scale-95 dark:text-gray-900 sm:text-base md:text-base"
                                            >
                                                Claim {ethYield} ETH
                                            </a>
                                        </p>
                                        <p className="text-sm font-bold leading-6 text-gray-light-12 dark:text-gray-dark-12"></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Cards */}

                    <div className="container mx-auto mt-6 max-w-[800px] px-4 sm:mt-8">
                        <div className="text-center">
                            <h1 className="text-2xl font-bold leading-8 tracking-[-0.02em] text-gray-light-12 dark:text-gray-dark-12 sm:text-[32px]">Dashboard</h1>
                        </div>

                        <div className="m-auto max-w-4xl px-4">
                            <div className="flex flex-col overflow-hidden rounded-2xl border border-gray-light-3 bg-gray-light-2 dark:border-gray-dark-3 dark:bg-gray-dark-2 sm:h-64 sm:basis-1/4 sm:flex-row sm:items-center">
                                <div className="sm:basis-4/4 px-4 py-6 sm:pl-8">
                                    <h1 className="m-0 mb-4 text-base font-bold text-gray-light-12 dark:text-gray-dark-12 sm:text-lg">{ownerProfit.toString()} ETH</h1>
                                    <p className="mb-6 text-sm leading-6 text-gray-light-10 dark:text-gray-dark-10">
                                        This is your estimated daily profit from LoKa mining rigs based on your NFTs<br></br>Our total mining yield is {miningBalance.toString()}
                                    </p>
                                    <p className="text-sm font-bold leading-6 text-gray-light-12 dark:text-gray-dark-12"></p>
                                </div>
                            </div>

                            <div className="flex flex-col overflow-hidden rounded-2xl border border-gray-light-3 bg-gray-light-2 dark:border-gray-dark-3 dark:bg-gray-dark-2 sm:h-64 sm:flex-row sm:items-center">
                                <div className="sm:basis-4/4 px-4 py-6 sm:pl-8">
                                    <h1 className="m-0 mb-4 text-base font-bold text-gray-light-12 dark:text-gray-dark-12 sm:text-lg">{monthlyMiningBalance.toString()} ETH</h1>
                                    <p className="mb-6 text-sm leading-6 text-gray-light-10 dark:text-gray-dark-10">This is your estimated monthly profit from LoKa mining rigs based on your NFTs</p>
                                    <p className="text-sm font-bold leading-6 text-gray-light-12 dark:text-gray-dark-12"></p>
                                </div>
                            </div>
                            <div className="flex flex-col overflow-hidden rounded-2xl border border-gray-light-3 bg-gray-light-2 dark:border-gray-dark-3 dark:bg-gray-dark-2 sm:h-64 sm:flex-row sm:items-center">
                                <div className="sm:basis-4/4 px-4 py-6 sm:pl-8">
                                    <h1 className="m-0 mb-4 text-base font-bold text-gray-light-12 dark:text-gray-dark-12 sm:text-lg">{averageHashrate.toString()} GH/s</h1>
                                    <p className="mb-6 text-sm leading-6 text-gray-light-10 dark:text-gray-dark-10">Average hashrate within the last 24 hours</p>
                                    <p className="text-sm font-bold leading-6 text-gray-light-12 dark:text-gray-dark-12"></p>
                                </div>
                            </div>
                            <div className="flex flex-col overflow-hidden rounded-2xl border border-gray-light-3 bg-gray-light-2 dark:border-gray-dark-3 dark:bg-gray-dark-2 sm:h-64 sm:flex-row sm:items-center">
                                <div className="sm:basis-4/4 px-4 py-6 sm:pl-8">
                                    <h1 className="m-0 mb-4 text-base font-bold text-gray-light-12 dark:text-gray-dark-12 sm:text-lg">{workers.toString()} </h1>
                                    <p className="mb-6 text-sm leading-6 text-gray-light-10 dark:text-gray-dark-10">Workers Online</p>
                                    <p className="text-sm font-bold leading-6 text-gray-light-12 dark:text-gray-dark-12"></p>
                                </div>
                            </div>
                        </div>

                        {/* Cards loading state */}
                        {showLoading && (
                            <div className="grid grid-cols-1 gap-4">
                                <div className="flex flex-col rounded-[24px] border border-gray-light-3 bg-gray-light-1 p-4 dark:border-gray-dark-3 dark:bg-gray-dark-1">
                                    <div className="flex flex-row items-center space-x-4 pb-4">
                                        <div className="h-12 w-12 flex-none animate-pulse rounded-full bg-gray-light-3 dark:bg-gray-dark-3"></div>
                                        <div className="h-7 grow animate-pulse rounded-lg bg-gray-light-3 dark:bg-gray-dark-3"></div>
                                    </div>
                                    <div className="hidden h-[192px] animate-pulse bg-gray-light-3 dark:bg-gray-dark-3 sm:block"></div>
                                    <div className="flex flex-row border-b border-dashed border-gray-light-3 py-4 dark:border-gray-dark-3">
                                        <div className="h-7 grow animate-pulse rounded-lg bg-gray-light-3 dark:bg-gray-dark-3 "></div>
                                    </div>
                                    <div className="flex flex-row space-x-6 pt-4">
                                        <div className="h-[40px] basis-1/3 animate-pulse rounded-lg bg-gray-light-3 dark:bg-gray-dark-3"></div>
                                        <div className="h-[40px] basis-1/3 animate-pulse rounded-lg bg-gray-light-3 dark:bg-gray-dark-3"></div>
                                        <div className="h-[40px] basis-1/3 animate-pulse rounded-lg bg-gray-light-3 dark:bg-gray-dark-3"></div>
                                    </div>
                                </div>
                                <div className="flex flex-col rounded-[24px] border border-gray-light-3 bg-gray-light-1 p-4 dark:border-gray-dark-3 dark:bg-gray-dark-1">
                                    <div className="flex flex-row items-center space-x-4 pb-4">
                                        <div className="h-12 w-12 flex-none animate-pulse rounded-full bg-gray-light-3 dark:bg-gray-dark-3"></div>
                                        <div className="h-7 grow animate-pulse rounded-lg bg-gray-light-3 dark:bg-gray-dark-3"></div>
                                    </div>
                                    <div className="hidden h-[192px] animate-pulse bg-gray-light-3 dark:bg-gray-dark-3 sm:block"></div>
                                    <div className="flex flex-row border-b border-dashed border-gray-light-3 py-4 dark:border-gray-dark-3">
                                        <div className="h-7 grow animate-pulse rounded-lg bg-gray-light-3 dark:bg-gray-dark-3 "></div>
                                    </div>
                                    <div className="flex flex-row space-x-6 pt-4">
                                        <div className="h-[40px] basis-1/3 animate-pulse rounded-lg bg-gray-light-3 dark:bg-gray-dark-3"></div>
                                        <div className="h-[40px] basis-1/3 animate-pulse rounded-lg bg-gray-light-3 dark:bg-gray-dark-3"></div>
                                        <div className="h-[40px] basis-1/3 animate-pulse rounded-lg bg-gray-light-3 dark:bg-gray-dark-3"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {/* Cards display state */}
                        {showData && (
                            <div className="grid grid-cols-1 gap-4">
                                {marketsResponse.data?.markets.map((market) => {
                                    return (
                                        <div key={market.leveraged_token_address}>
                                            <MarketCard address={market.leveraged_token_address} initialNAV={market.nav_last} initialNAVChange={market.leveraged_token_price_change_percent} totalSupply={market.leveraged_token_total_supply} />{" "}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
                <div className="hidden sm:inline-block">
                    <Footer />
                </div>

                <div className="absolute -top-1/3 left-1/2 -translate-x-1/2 sm:-top-1/2">
                    <svg className="stroke-black dark:stroke-white" width="679" height="679" viewBox="0 0 679 679" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g opacity="0.5">
                            <circle opacity="0.1" cx="339.5" cy="339.5" r="130.173" />
                            <circle opacity="0.1" cx="339.5" cy="339.5" r="175.19" />
                            <circle opacity="0.05" cx="339.5" cy="339.5" r="227.709" />
                            <circle opacity="0.1" cx="339.5" cy="339.5" r="339" />
                        </g>
                    </svg>
                </div>

                <div className="absolute top-0 left-1/2 -translate-x-1/2">
                    <svg width="543" height="463" viewBox="0 0 543 463" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g filter="url(#filter0_f_733_108850)">
                            <rect x="126" y="208.087" width="14.5306" height="134.487" transform="rotate(-16.0921 126 208.087)" fill="#5FD4F4" />
                        </g>
                        <g filter="url(#filter1_f_733_108850)">
                            <rect x="244.65" y="166.715" width="14.5306" height="120.439" transform="rotate(-16.0921 244.65 166.715)" fill="#946800" />
                        </g>
                        <g filter="url(#filter2_f_733_108850)">
                            <rect x="211.865" y="166.715" width="14.5306" height="120.439" transform="rotate(-16.0921 211.865 166.715)" fill="#946800" />
                        </g>
                        <g filter="url(#filter3_f_733_108850)">
                            <rect x="369.544" y="143.297" width="14.5306" height="120.439" transform="rotate(-16.0921 369.544 143.297)" fill="#946800" />
                        </g>
                        <g filter="url(#filter4_f_733_108850)">
                            <rect x="284.46" y="192.475" width="14.5306" height="144.606" transform="rotate(-16.0921 284.46 192.475)" fill="#F4C6DB" />
                        </g>
                        <g filter="url(#filter5_f_733_108850)">
                            <rect x="136.148" y="130.028" width="14.5306" height="144.606" transform="rotate(-16.0921 136.148 130.028)" fill="#F4C6DB" />
                        </g>
                        <defs>
                            <filter id="filter0_f_733_108850" x="0.379997" y="78.4391" width="302.479" height="384.486" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                <feGaussianBlur stdDeviation="62.81" result="effect1_foregroundBlur_733_108850" />
                            </filter>
                            <filter id="filter1_f_733_108850" x="119.03" y="37.0675" width="298.585" height="370.988" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                <feGaussianBlur stdDeviation="62.81" result="effect1_foregroundBlur_733_108850" />
                            </filter>
                            <filter id="filter2_f_733_108850" x="86.245" y="37.0675" width="298.585" height="370.988" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                <feGaussianBlur stdDeviation="62.81" result="effect1_foregroundBlur_733_108850" />
                            </filter>
                            <filter id="filter3_f_733_108850" x="243.924" y="13.6495" width="298.585" height="370.988" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                <feGaussianBlur stdDeviation="62.81" result="effect1_foregroundBlur_733_108850" />
                            </filter>
                            <filter id="filter4_f_733_108850" x="158.84" y="62.8273" width="305.283" height="394.208" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                <feGaussianBlur stdDeviation="62.81" result="effect1_foregroundBlur_733_108850" />
                            </filter>
                            <filter id="filter5_f_733_108850" x="10.5279" y="0.379997" width="305.283" height="394.208" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                <feGaussianBlur stdDeviation="62.81" result="effect1_foregroundBlur_733_108850" />
                            </filter>
                        </defs>
                    </svg>
                </div>

                <div className="z-10 sm:hidden">
                    <ButtonConnectWalletMobile />
                </div>
            </div>
        );
    } else {
        return (
            <div className="relative flex h-full min-h-screen w-full flex-col overflow-hidden bg-gray-light-1 font-inter dark:bg-gray-dark-1">
                <Head>
                    {/* <!-- HTML Meta Tags --> */}
                    <title>LoKa | Blockchain with Renewable Energy </title>
                    <meta name="description" content="Invest and earn from professionally managed green energy blockchain mining infrastructure" />
                    <MarketsPageMeta />
                </Head>
                <Favicon />

                <div className="container z-10 mx-auto max-w-full sm:z-20">
                    <div className="flex flex-row items-center justify-between p-4">
                        <div className="flex-none">
                            <Link href="/">
                                <a className="flex items-center">
                                    <Logo />
                                    <span className="traking-tight leading-0 self-center pl-2 font-inter text-base font-bold text-gray-light-12 dark:text-gray-light-1">LoKa</span>
                                </a>
                            </Link>
                        </div>
                        <div className="inline-block flex flex-none flex-row space-x-2">
                            <div className="hidden sm:inline-block"></div>

                            <div className="hidden sm:inline-block">
                                <ButtonConnectWalletDesktop />
                            </div>

                            <div className="inline-block h-[40px]">
                                <ButtonThemeSwitcher />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="hidden sm:inline-block">
                    <Footer />
                </div>

                <div className="z-10 sm:hidden">
                    <ButtonConnectWalletMobile />
                </div>
            </div>
        );
    }
};

export default MarketsPage;
