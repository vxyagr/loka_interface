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
            <img src="smal_bg.jpg" className="w-full lg:hidden" />

            <div className="relative z-20 m-auto flex  max-w-screen-md flex-col items-center gap-8 px-4 py-32 text-center align-middle ">
                <div className="flex items-center">
                    <h1 className="hero-text">
                        crypto mining with <span className="gradient move-gradient bg-[length:250%_250%] bg-clip-text text-transparent transition-none">green and renewable energy</span>
                    </h1>
                </div>
                <div className="mx-auto max-w-lg">
                    <h2 className="text-base leading-relaxed text-gray-light-10 dark:text-gray-dark-10">A simple way to invest on a green energy based blockchain infrastructure, managed by professionals with transparency and reliability.</h2>
                </div>
            </div>

            <PrivateSale />
        </div>
    );
};

export default Hero;
