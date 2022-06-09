import type { FunctionComponent } from "react";
// Import components
import ButtonLaunchGradient from "../Buttons/LaunchGradient";
import PrivateSale from "./PrivateSale";

/**
 * HeroProps is a React Component properties that passed to React Component Hero
 */
type HeroProps = {};

/**
 * Hero is just yet another react component
 * <!-- <img src="dragonkin_final.jfif" className="absolute top-0 left-0 hidden w-full lg:flex" /> -->
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const Hero: FunctionComponent<HeroProps> = ({}) => {
    return (
        <div className="relative h-full w-full justify-center overflow-hidden">
            <div className="relative z-20 m-auto flex  max-w-screen-md flex-col items-center gap-8 px-4 py-32 text-center align-middle ">
                <div className="flex items-center">
                    <h1 className="med-hero-text">
                        About <span className="gradient move-gradient bg-[length:250%_250%] bg-clip-text text-transparent transition-none">Loka</span>
                    </h1>
                </div>
                <div className="mx-auto max-w-lg">
                    <h2 className="text-left text-base leading-relaxed text-white">
                        <p>Loka is designed to be an ever-growing web3 ecosystem using NFT and gamification factors for everyone in the world to participate in mining bitcoin using green and renewable energy.</p>
                        <br />
                        <p> Loka also means “realm” in Balinese, a parallel mystical world where Dragons, Elves, Dwarves and Goblins live represented by Loka NFTs — working together to mine orbs.</p>
                        <br />
                        <p> In real life, these NFTs represent fractional ownership of a high-efficiency modular Bitcoin mining farm running absorbing up to 2.5 Megawatt energy per batch, using the excess supply of hydro powerplant in Indonesia. NFT holders will get Bitcoin as the yield bridged into the Ethereum network in the form of RenBTC (wrapped BTC using Ren) and claimable after the mining operation starts.</p>
                    </h2>
                </div>
                <div className="flex items-center">
                    <h1 className="med-hero-text">
                        Coming <span className="gradient move-gradient bg-[length:250%_250%] bg-clip-text text-transparent transition-none">Soon</span>
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default Hero;
