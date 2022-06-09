import type { FunctionComponent } from "react";
// Import components
import ButtonLaunchGradient from "../Buttons/LaunchGradient";
import PrivateSale from "./PrivateSale";
// @ts-ignore
import ReactRoundedImage from "react-rounded-image";
import MyPhoto from "../../public/dragonkin_final.jpg";
import { useMarkets } from "../../utils/snapshot";
import ButtonConnectWalletMobile from "../Buttons/ConnectWalletMobile";
import ButtonConnectWalletDesktop from "../Buttons/ConnectWalletDesktop";
import { DEFAULT_CHAIN, RinkebyProvider, useWalletContext } from "../Wallet";
import { ethers, providers } from "ethers";
import React, { useState, useEffect } from "react";
import NFTCard from "./NFTCard";
import Link from "next/link";
/**
 * HeroProps is a React Component properties that passed to React Component Hero
 */
type HeroProps = { accountConnected: boolean };

/**
 * Hero is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 *
 */

interface ICard {
    yield: number;
    tokenId: number;
}
const Hero: FunctionComponent<HeroProps> = (props) => {
    const handleClick = () => {
        console.log("Click happened");
    };
    const { chain } = useWalletContext();
    const { account } = useWalletContext();
    const { signer } = useWalletContext();
    const showConnectWallet = account ? false : true;
    const showSwitchToDefaultNetwork = !showConnectWallet && chain.unsupported ? true : false;
    const availableSpecies = [0, 0, 0, 0];

    //setIsConnected(props.accountConnected);

    // Read data from Snapshot API
    const marketsResponse = useMarkets(chain.unsupported ? DEFAULT_CHAIN.id : chain.chain.id);
    const items: ICard[] = [];
    const [allCards, setAllCards] = useState();
    // UI states

    const Web3 = require("web3");
    //if (window.web3) {

    var contractAbi = require("../../abis/LokaNFTABI.json");
    const contractAddres = "0xaa015398ebD1f97cB7D887c5aC6dFaaD198E68Bf";

    // console.log(accountsList[0])

    // const provider = new providers.JsonRpcBatchProvider("https://rinkeby.infura.io/v3/8051d992532d4f65b1cea01cb751d577");

    const contract = new ethers.Contract(contractAddres, contractAbi, signer);
    const [lokaCards, setLokaCards] = useState([]);
    const prices = [10, 120, 10, 10];
    const [dataFetched, setDataFethced] = useState(false);
    const [cardLoaded, setCardLoaded] = useState(false);
    prices[1] = 225;

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
        //setOwnerProfit(daily * (ownedToken / allToken));
        setOwnerProfit(daily);
        const monthly = 30 * ownerProfit;
        setMiningBalance(daily);
        setMonthlyMiningBalance(monthly);
        setAverageHashrate(hashrate);
        setWorkers(workersOnline);
        console.log();
    };
    showYield();
    const [cardData, setCardData] = useState([]);
    const getLokas = async () => {
        console.log("geting items " + items.length);
        //if (dataFetched) return;
        var listLokas = await contract.lokasOfOwner(account);
        //console.log("lokas " + listLokas);
        setDataFethced(true);
        //if (items.length == listLokas.length && items.length > 0) return;
        for (const [index, value] of listLokas.entries()) {
            var card_: ICard = { tokenId: 0, yield: 0 };
            card_.tokenId = value[0];
            card_.yield = value[1];
            items.push(card_);
        }
        var cards = [];
        var i = 0;
        for (const [index, value] of listLokas.entries()) {
            cards[i] = <NFTCard key={1} tokenId={value[0]} yield={value[1]} />;
            i++;
        }
        console.log("items " + items[0].tokenId);

        return cards;
        //setLokaCards(items);
    };
    //console.log("current item " + items.length);
    //getLokas();
    //const cards=[];
    if (!dataFetched) {
        var cards = (async () => {
            const cards = await getLokas();
            return cards;
        })();

        //getLokas();
    } else {
        if (!cardLoaded) {
            //console.log("card content " + cards)
        }
    }

    const renderCards = () => {
        //console.log("trial " + cards);
        //items.push({ tokenId: 1, yield: 1 });
        //while (items.length <= 0) getLokas();

        //setDataFethced(true);
        //if (items.length == listLokas.length && items.length > 0) return;
        var i = 0;
        /*
        for (const [index, value] of listLokas.entries()) {
            cards[i] = <NFTCard key={1} tokenId={value[0]} yield={value[1]} />;
            i++;
        }*/
        var yessir = [<NFTCard key={1} tokenId={5} yield={77} />, <NFTCard key={1} tokenId={5} yield={88} />];
        //return cards;
        var cards = (async () => {
            const cards = await getLokas();
            return cards;
        })();
        return items.map((card) => {
            return <NFTCard key={card.tokenId} tokenId={card.tokenId} yield={card.yield} />;
        });
    };
    //setAllCards(renderCards());
    //renderCards();

    //getLokas();
    useEffect(() => {
        //getLokas();
        //console.log("getting lokas use effect " + items.length);
    }, [items.length]); // <-- empty dependency array

    if (!showConnectWallet && !showSwitchToDefaultNetwork) {
        return (
            <div className="relative h-full w-full justify-center overflow-hidden lg:h-full">
                <div className="relative z-10 m-auto flex w-screen flex-col items-center gap-8 py-[20px] px-4 text-center align-middle lg:py-10">
                    <h2 className="med-hero-text">
                        Loka <span className="gradient move-gradient bg-[length:250%_250%] bg-clip-text text-transparent transition-none sm:py-20">Dashboard</span>
                    </h2>
                    <div>
                        <div className="px-4 py-6 text-center sm:basis-1/4 sm:pl-8">
                            <p className="mb-6 text-sm leading-6 text-gray-light-10 dark:text-gray-dark-10">
                                <div>You have</div> <span className="items-center justify-center text-4xl text-gray-light-12 dark:text-gray-dark-12">{0} ETH</span> <div>of dividend</div>
                                <Link href="#">
                                    <a className="button gradient inline-block rounded-full bg-[length:300%_300%] bg-center py-3 px-8 font-inter text-sm font-bold leading-none tracking-tight text-gray-50 hover:bg-left  hover:shadow-xl hover:shadow-blue-400/20 active:scale-95 dark:text-gray-900 sm:text-base md:text-base">Claim</a>
                                </Link>
                            </p>
                            <p className="text-sm font-bold leading-6 text-gray-light-12 dark:text-gray-dark-12"></p>
                        </div>
                        <div className="mt-6 h-full grid-cols-2 gap-x-4 gap-y-1 px-4 text-center sm:basis-2/4 sm:pl-8 md:flex lg:flex" style={{ justifyContent: "center", alignItems: "center" }}>
                            <div className="relative z-10 my-2  h-[100px] overflow-hidden rounded-2xl px-20 ">
                                <div className="relative aspect-square w-full " style={{ justifyContent: "center", alignItems: "center" }}>
                                    <div className="flex items-center justify-center text-3xl text-slate-50">
                                        <span className="items-center justify-center text-gray-light-12 dark:text-gray-dark-12">{workers.toString()} </span>
                                    </div>
                                    <div className="p-2 text-sm text-gray-light-12 dark:text-gray-dark-12">Workers Online</div>
                                </div>
                            </div>

                            <div className="relative z-10 my-2  h-[100px] overflow-hidden rounded-2xl px-20  ">
                                <div className="relative aspect-square w-full " style={{ justifyContent: "center", alignItems: "center" }}>
                                    <div className="flex items-center justify-center text-3xl text-slate-50">
                                        <span className="items-center justify-center text-gray-light-12 dark:text-gray-dark-12">{averageHashrate.toFixed(2).toString()} GH/s</span>
                                    </div>
                                    <div className="p-2 text-sm text-gray-light-12 dark:text-gray-dark-12">24h Hashrate</div>
                                </div>
                            </div>

                            <div className="relative z-10 my-2 h-[100px] overflow-hidden rounded-2xl px-20  ">
                                <div className="relative aspect-square w-full " style={{ justifyContent: "center", alignItems: "center" }}>
                                    <div className="flex items-center justify-center text-3xl text-slate-50">
                                        <span className="items-center justify-center text-gray-light-12 dark:text-gray-dark-12">{miningBalance.toFixed(2).toString()} ETH</span>
                                    </div>
                                    <div className="p-2 text-sm text-gray-light-12 dark:text-gray-dark-12">24h yield</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="md:flex lg:flex ">
                        <NFTCard tokenId={0} yield={20} />
                        <NFTCard tokenId={0} yield={20} />
                        <NFTCard tokenId={0} yield={20} />
                        <NFTCard tokenId={0} yield={20} />
                        <NFTCard tokenId={0} yield={20} />
                        {renderCards()}
                    </div>
                </div>
            </div>
        );
    } else if (showSwitchToDefaultNetwork) {
        return (
            <div className="lg:py-30 relative z-10 m-auto flex max-w-screen-md flex-col items-center gap-8 py-[60px] px-4 text-center align-middle">
                <h2 className="med-hero-text">
                    Please Switch Network to <span className="gradient move-gradient bg-[length:250%_250%] bg-clip-text text-transparent transition-none sm:py-20">{DEFAULT_CHAIN.name}</span>
                </h2>
            </div>
        );
    } else {
        return (
            <div className="lg:py-30 relative z-10 m-auto flex max-w-screen-md flex-col items-center gap-8 py-[60px] px-4 text-center align-middle">
                <h2 className="med-hero-text">Please Connect Your Wallet</h2>
            </div>
        );
    }
};

export default Hero;
