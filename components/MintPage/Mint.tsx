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
/**
 * HeroProps is a React Component properties that passed to React Component Hero
 */
type HeroProps = { accountConnected: boolean };

/**
 * Hero is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
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

    // UI states

    const Web3 = require("web3");
    //if (window.web3) {

    var contractAbi = require("../../abis/LokaNFTABI.json");
    const contractAddres = "0x3455f69b67B6Ed3dEa836C5464c8710DABF0e38C";

    // console.log(accountsList[0])

    // const provider = new providers.JsonRpcBatchProvider("https://rinkeby.infura.io/v3/8051d992532d4f65b1cea01cb751d577");
    const [species, setSpecies] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [chosenImage, setChosenImage] = useState("species0.png");

    const contract = new ethers.Contract(contractAddres, contractAbi, signer);
    const connection = contract.connect(contract.signer);
    const [dragon, setDragon] = useState(0);
    const [elf, setElf] = useState(0);
    const [dwarf, setDwarf] = useState(0);
    const [goblin, setGoblin] = useState(0);
    const [walletConnected, setWalletConnected] = useState(false);
    const prices = [10, 120, 10, 10];
    const [nftPrice, setNftPrice] = useState(0);
    const [avail, setAvail] = useState(0);
    const [amount, setAmount] = useState(0);
    prices[1] = 225;

    const getAvailable = async () => {
        availableSpecies[0] = await contract.getAvailableSpecies(0);
        availableSpecies[1] = await contract.getAvailableSpecies(1);
        availableSpecies[2] = await contract.getAvailableSpecies(2);
        availableSpecies[3] = await contract.getAvailableSpecies(3);

        console.log("avao; " + availableSpecies);
    };
    var result1;
    const getPrices = async () => {
        prices[0] = await contract.getPrice(0);
        prices[1] = await contract.getPrice(1);
        prices[2] = await contract.getPrice(2);
        prices[3] = await contract.getPrice(3);
        // prices[0] = parseInt(result1);

        //setIsMinted(result);
    };
    //getPrices();
    //getAvailable();
    //await sleep(5000);

    const refreshData = async () => {
        //getAvailable();
        console.log("Refreshing");
        //console.log(dragon.toString());
        //await sleep(5000);
    };
    const speciesText = ["Dragon | 2x yield effectivity | APR 30%", "Elf | 1.3x yield effectivity | APR 18%", "Dwarf | 1.1x yield effectivity | APR 15%", "Goblin | 1x yield effectivity | APR 15%"];

    const [nftText, setNfttext] = useState("Choose Loka Species");
    const switchSpecies = async (speciesNumber: any) => {
        //getAvailable();
        setNfttext("Fetching onchain data...");

        console.log(speciesNumber);
        setSpecies(speciesNumber);
        setChosenImage("species" + speciesNumber + ".png");
        await getAvailable();
        await getPrices();

        console.log("avao 2; " + availableSpecies[speciesNumber]);
        var nftPrice_ = prices[speciesNumber] / 1000000000000000000;
        setNftPrice(nftPrice_);
        var avail_ = availableSpecies[speciesNumber];
        setAvail(avail_);
        adjustAmount(0);
        var txt_ = speciesText[speciesNumber] + " | " + availableSpecies[speciesNumber] + " left | " + prices[speciesNumber] / 1000000000000000000 + " ETH";
        var txt2_ = speciesText[speciesNumber] + " | " + avail + " left | " + nftPrice + " ETH";
        console.log(txt_);
        console.log(txt2_);
        setNfttext(txt_);
    };
    const [totalPrice, setTotalPrice] = useState(0);
    const adjustAmount = async (amountNumber: number) => {
        if (amountNumber >= 0) {
            setAmount(amountNumber);
            var total_ = amount * nftPrice;
            setTotalPrice(amount * nftPrice);
        }
    };

    useEffect(() => {
        // this hook will get called everytime when myArr has changed
        // perform some action which will get fired everytime when myArr gets updated
        console.log("Updated State", totalPrice);
    }, [totalPrice]);

    //refreshData();

    //getAvailable();
    //setTimeout(5000);
    //const delay = (ms) => new Promise((res) => setTimeout(res, ms));
    //await setTimeout(5000);
    const mintToken = async () => {
        console.log("MINTING " + species);
        const addr = account;
        const result = await contract.mintLoka(amount, species, {
            value: ethers.utils.parseEther(totalPrice.toString()),
        });

        await result.wait();
    };
    if (!showConnectWallet && !showSwitchToDefaultNetwork) {
        return (
            <div className="relative h-full w-full justify-center overflow-hidden">
                <div className="relative z-10 m-auto flex max-w-screen-md flex-col items-center gap-8 py-[20px] px-4 text-center align-middle lg:py-10">
                    <h2 className="med-hero-text">
                        Mint <span className="gradient move-gradient bg-[length:250%_250%] bg-clip-text text-transparent transition-none sm:py-20">Loka Miner</span>
                    </h2>
                    <div className="flex items-center">
                        <div className="lg:hidden">
                            <ReactRoundedImage image={chosenImage} roundedColor="#C1F6ED" imageWidth="180" imageHeight="180" roundedSize="13" borderRadius="1000" />
                        </div>
                        <div className="hidden lg:flex">
                            <ReactRoundedImage image={chosenImage} roundedColor="#C1F6ED" imageWidth="250" imageHeight="250" roundedSize="13" borderRadius="1000" />
                        </div>
                    </div>
                    <div className=" w-full px-4 lg:right-8 lg:w-full lg:max-w-2xl lg:px-0">
                        <h1 className="text-base leading-relaxed text-gray-light-10 dark:text-gray-dark-10">{nftText.toString()}</h1>
                    </div>
                    <div className="flex w-full items-center px-4 text-center lg:right-8 lg:w-full lg:max-w-2xl lg:px-0" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <div
                            onClick={() => {
                                switchSpecies(0);
                            }}
                            className="flex flex-row items-center p-2 text-center sm:basis-1/3"
                            style={{ cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center" }}
                        >
                            <div className="lg:hidden">
                                <ReactRoundedImage className="hidden items-center rounded-lg px-2 text-center sm:basis-1/4" image="species0.png" roundedColor="#C1F6ED" imageWidth="80" imageHeight="80" roundedSize="10" borderRadius="1000" />
                            </div>
                            <div className="hidden lg:flex">
                                <ReactRoundedImage className="hidden flex-row items-center rounded-lg px-2 text-center sm:basis-1/4 lg:flex" image="species0.png" roundedColor="#C1F6ED" imageWidth="100" imageHeight="100" roundedSize="10" borderRadius="1000" />
                            </div>
                        </div>
                        <div
                            onClick={() => {
                                switchSpecies(1);
                            }}
                            className="flex flex-row items-center p-2 text-center sm:basis-1/3"
                            style={{ cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center" }}
                        >
                            <div className="lg:hidden">
                                <ReactRoundedImage className="hidden items-center rounded-lg px-2 text-center sm:basis-1/4" image="species1.png" roundedColor="#C1F6ED" imageWidth="80" imageHeight="80" roundedSize="10" borderRadius="1000" />
                            </div>
                            <div className="hidden lg:flex">
                                <ReactRoundedImage className="hidden flex-row items-center rounded-lg px-2 text-center sm:basis-1/4 lg:flex" image="species1.png" roundedColor="#C1F6ED" imageWidth="100" imageHeight="100" roundedSize="10" borderRadius="1000" />
                            </div>
                        </div>
                        <div
                            onClick={() => {
                                switchSpecies(3);
                            }}
                            className="flex flex-row items-center p-2 text-center sm:basis-1/3"
                            style={{ cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center" }}
                        >
                            <div className="lg:hidden">
                                <ReactRoundedImage className="hidden items-center rounded-lg px-2 text-center sm:basis-1/4" image="species3.png" roundedColor="#C1F6ED" imageWidth="80" imageHeight="80" roundedSize="10" borderRadius="1000" />
                            </div>
                            <div className="hidden lg:flex">
                                <ReactRoundedImage className="hidden flex-row items-center rounded-lg px-2 text-center sm:basis-1/4 lg:flex" image="species3.png" roundedColor="#C1F6ED" imageWidth="100" imageHeight="100" roundedSize="10" borderRadius="1000" />
                            </div>
                        </div>
                    </div>
                    <div className="flex w-full text-center align-middle" style={{ cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <div
                            style={{ cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center" }}
                            className="h-[100px] w-[100px]"
                            onClick={() => {
                                var num = amount - 1;
                                adjustAmount(num);
                            }}
                        >
                            <button className="px-4">
                                <img src="/minusIcon.svg" alt="-" width="30px" />
                            </button>
                        </div>
                        <div className="mint_number h-[100px] w-[100px]" style={{ color: "#fff", fontSize: "46px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            {amount}
                        </div>
                        <div style={{ cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center" }} className="h-[100px] w-[100px]">
                            <button
                                className="px-4"
                                onClick={() => {
                                    var num = amount + 1;
                                    adjustAmount(num);
                                }}
                            >
                                <img src="/plusIcon.svg" alt="+" width="30px" />
                            </button>
                        </div>
                    </div>
                </div>
                <p
                    onClick={() => {
                        mintToken();
                    }}
                >
                    <div className="my-1 flex w-full items-center justify-center sm:absolute sm:my-1">
                        <div className="z-10 flex w-full flex-col items-center gap-8 px-4 text-center ">
                            <div className="bottom-8 h-14 w-full px-4 lg:bottom-16 lg:h-20  lg:w-48 lg:max-w-2xl lg:px-0">
                                <div className="flex h-14 flex-row items-center rounded-lg bg-violet-light-3 p-4 hover:bg-violet-light-4 dark:bg-violet-dark-2 hover:dark:bg-violet-dark-3 lg:h-20 " style={{ background: "linear-gradient(77.68deg, #3BCAB0 -20.56%, #DA69EC 21.53%, #C0FFF4 83.03%)", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <a className="align-middle" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                        <span className="leading-0 h-20 align-middle text-base font-semibold  leading-none text-gray-light-12 dark:text-gray-dark-12" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                            MINT FOR {totalPrice.toString()} ETH{" "}
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </p>
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
