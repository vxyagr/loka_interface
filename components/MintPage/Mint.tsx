import type { FunctionComponent } from "react";
// Import components
import ButtonLaunchGradient from "../Buttons/LaunchGradient";
import PrivateSale from "./PrivateSale";
import ReactRoundedImage from "react-rounded-image";
import MyPhoto from "../../public/dragonkin_final.jpg";
import { useMarkets } from "../../utils/snapshot";
import ButtonConnectWalletMobile from "../Buttons/ConnectWalletMobile";
import ButtonConnectWalletDesktop from "../Buttons/ConnectWalletDesktop";
import { DEFAULT_CHAIN, RinkebyProvider, useWalletContext } from "../Wallet";
import { ethers, providers } from "ethers";
import React, { useState } from "react";
/**
 * HeroProps is a React Component properties that passed to React Component Hero
 */
type HeroProps = {};

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

    // Read data from Snapshot API
    const marketsResponse = useMarkets(chain.unsupported ? DEFAULT_CHAIN.id : chain.chain.id);

    // UI states
    const showLoading = marketsResponse.isLoading;
    const showError = !showLoading && marketsResponse.error;
    const showData = !showLoading && !showError && marketsResponse.data;

    const Web3 = require("web3");
    //if (window.web3) {

    var contractAbi = require("../../abis/LokaNFTABI.json");
    const contractAddres = "0x3455f69b67B6Ed3dEa836C5464c8710DABF0e38C";

    // console.log(accountsList[0])

    // const provider = new providers.JsonRpcBatchProvider("https://rinkeby.infura.io/v3/8051d992532d4f65b1cea01cb751d577");
    const [species, setSpecies] = useState(1);
    const [quantity, setQuantity] = useState(1);
    const [chosenImage, setChosenImage] = useState("species0.png");

    const contract = new ethers.Contract(contractAddres, contractAbi, signer);
    const connection = contract.connect(contract.signer);
    const [dragon, setDragon] = useState(0);
    const [elf, setElf] = useState(0);
    const [dwarf, setDwarf] = useState(0);
    const [goblin, setGoblin] = useState(0);

    const getAvailable = async () => {
        var dragon_ = await contract.getAvailableSpecies(0);
        var elf_ = await contract.getAvailableSpecies(1);
        var dwarf_ = await contract.getAvailableSpecies(2);
        var goblin_ = await contract.getAvailableSpecies(3);
        setDragon(dragon_);
        setElf(elf_);
        setDwarf(dwarf_);
        setGoblin(goblin_);
        //setIsMinted(result);
    };

    const sleep = (milliseconds) => {
        return new Promise((resolve) => setTimeout(resolve, milliseconds));
    };
    //getAvailable();
    //await sleep(5000);

    const refreshData = async () => {
        //getAvailable();
        console.log("Refreshing");
        //console.log(dragon.toString());
        //await sleep(5000);
    };

    const switchSpecies = async (speciesNumber) => {
        //getAvailable();
        console.log(speciesNumber);
        setSpecies(speciesNumber);
        setChosenImage("species" + speciesNumber + ".png");
    };

    //refreshData();

    //getAvailable();
    //setTimeout(5000);
    //const delay = (ms) => new Promise((res) => setTimeout(res, ms));
    //await setTimeout(5000);
    const mintToken = async () => {
        console.log("MINTING " + species);
        const addr = account;
        const result = await contract.mintLoka(1, 1, {
            value: ethers.utils.parseEther("0.03"),
        });

        await result.wait();
    };

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
                    <h1 className="text-base leading-relaxed text-gray-light-10 dark:text-gray-dark-10">Dragon | 2x Yield Effectivity | APR 30% </h1>
                </div>
                <div className="flex w-full items-center px-4 text-center lg:right-8 lg:w-full lg:max-w-2xl lg:px-0" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <div
                        onClick={() => {
                            switchSpecies(0);
                        }}
                        className="flex flex-row items-center p-2 text-center sm:basis-1/4"
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
                        className="flex flex-row items-center p-2 text-center sm:basis-1/4"
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
                            switchSpecies(2);
                        }}
                        className="flex flex-row items-center p-2 text-center sm:basis-1/4"
                        style={{ cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center" }}
                    >
                        <div className="lg:hidden">
                            <ReactRoundedImage className="hidden items-center rounded-lg px-2 text-center sm:basis-1/4" image="species2.png" roundedColor="#C1F6ED" imageWidth="80" imageHeight="80" roundedSize="10" borderRadius="1000" />
                        </div>
                        <div className="hidden lg:flex">
                            <ReactRoundedImage className="hidden flex-row items-center rounded-lg px-2 text-center sm:basis-1/4 lg:flex" image="species2.png" roundedColor="#C1F6ED" imageWidth="100" imageHeight="100" roundedSize="10" borderRadius="1000" />
                        </div>
                    </div>
                    <div
                        onClick={() => {
                            switchSpecies(3);
                        }}
                        className="flex flex-row items-center p-2 text-center sm:basis-1/4"
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
                <div className="flex w-full" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <button className="px-4">
                        <img src="/minusIcon.svg" alt="-" />
                    </button>
                    <div className="mint_number" style={{ color: "#fff", fontSize: "46px" }}>
                        0
                    </div>
                    <button className="px-4">
                        <img src="/plusIcon.svg" alt="+" />
                    </button>
                </div>
            </div>
            <p
                onClick={() => {
                    mintToken();
                }}
            >
                <PrivateSale />
            </p>
        </div>
    );
};

export default Hero;
