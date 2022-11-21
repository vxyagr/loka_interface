import type { FunctionComponent } from "react";
// Import components
import ButtonLaunchGradient from "../Buttons/LaunchGradient";
import PrivateSale from "./PrivateSale";
import Logo from "../Logo";
import Link from "next/link";
/**
 * HeroProps is a React Component properties that passed to React Component Hero
 */
type HeroProps = {};

/**
 * Hero is just yet another react component
 * <!-- <img src="dragonkin_final.jfif" className="absolute top-0 left-0 hidden w-full lg:flex" />  -->
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const Hero: FunctionComponent<HeroProps> = ({}) => {
    return (
        <div>
            <div className="relative h-full w-full justify-center overflow-hidden bg-white text-green-dark-10">
                <div className="relative z-20 m-auto hidden w-full   flex-col items-center gap-8 py-20 px-4 text-center align-middle lg:flex ">
                    <div className="max-w mx-auto pt-20">
                        <h1 className="mw-full hero-text mx-auto " style={{ color: "#1C4543" }}>
                            Earn Bitcoin Easily!
                            <br />{" "}
                            <span className="med-hero-text" style={{ color: "#256428" }}>
                                mined with <span style={{ color: "#256428" }}>green</span>
                                <br /> <span className="gradient move-gradient bg-[length:250%_250%] bg-clip-text text-transparent transition-none"> and renewable energy</span>
                            </span>
                        </h1>
                    </div>
                    <div className="max-w mx-auto">
                        <h2 className="text-green-dark-16 dark:text-green-dark-16 max-w-3xl text-base leading-relaxed" style={{ color: "#1C4543", fontSize: "16" }}>
                            <span style={{ fontSize: "20px" }}>Loka is a simple way to invest on a green energy powered bitcoin mining infrastructure, managed by professionals with transparency and reliability.</span>
                        </h2>
                    </div>
                    <div className=" w-full px-0" style={{ width: "full", display: "flex", textAlign: "center", justifyContent: "center", alignItems: "center" }}>
                        <button className={`m-0 flex h-[100px] w-[400px] cursor-pointer flex-row items-center justify-between rounded-[50px] bg-[#256428] py-[11px] px-[12px] text-left transition  duration-300  ease-in-out  hover:bg-[#3CADB5] active:scale-95`}>
                            <Link href="/dashboard">
                                <div className="w-full" style={{ width: "full", display: "flex", textAlign: "center", justifyContent: "center", alignItems: "center" }}>
                                    <span className="m-3 font-inter text-3xl text-sm font-semibold leading-none text-gray-light-12 dark:text-gray-dark-12" style={{ width: "full", display: "flex", textAlign: "center", justifyContent: "center", alignItems: "center" }}>
                                        Buy <Logo />
                                    </span>
                                </div>
                            </Link>
                        </button>
                    </div>
                </div>
                <div className="relative z-20 m-auto flex h-full w-full  flex-col  gap-8 py-12 px-4   text-left lg:hidden ">
                    <div className="max-w mx-auto py-4 pt-2">
                        <h1 className="mw-full sm-hero-text mx-auto " style={{ color: "#1C4543" }}>
                            Earn Bitcoin Easily!
                            <br />{" "}
                            <span className="med-hero-text" style={{ color: "#256428" }}>
                                mined with <span style={{ color: "#256428" }}>green</span>
                                <br /> <span className="gradient move-gradient bg-[length:250%_250%] bg-clip-text text-transparent transition-none"> and renewable energy</span>
                            </span>
                        </h1>
                    </div>
                    <div className="max-w mx-auto">
                        <h2 className="text-green-dark-16 dark:text-green-dark-16 max-w-3xl text-base leading-relaxed" style={{ color: "#1C4543", fontSize: "16" }}>
                            <span style={{ fontSize: "20px" }}>Loka is a simple way to invest on a green energy powered bitcoin mining infrastructure, managed by professionals with transparency and reliability.</span>
                        </h2>
                    </div>
                    <div className=" w-full px-0" style={{ width: "full", display: "flex", textAlign: "center", justifyContent: "center", alignItems: "center" }}>
                        <button className={`m-0 flex h-[70px] w-full cursor-pointer flex-row items-center justify-between rounded-[50px]  bg-[#256428] py-[11px] px-[12px] text-left transition  duration-300  ease-in-out  hover:bg-[#3CADB5] active:scale-95`}>
                            <Link href="/dashboard">
                                <div className="w-full" style={{ width: "full", display: "flex", textAlign: "center", justifyContent: "center", alignItems: "center" }}>
                                    <span className="m-3 font-inter text-3xl text-sm font-semibold leading-none text-gray-light-12 dark:text-gray-dark-12" style={{ width: "full", display: "flex", textAlign: "center", justifyContent: "center", alignItems: "center" }}>
                                        Buy <Logo />
                                    </span>
                                </div>
                            </Link>
                        </button>
                    </div>
                </div>
                <div className="relative h-full w-full justify-center overflow-hidden bg-white text-green-dark-10" style={{ background: "#E4FDF8" }}>
                    <div className="z-5 relative m-auto flex  max-w-screen-md flex-col items-center px-4 py-0 text-center align-top ">
                        <div className="min-w-[20px] md:flex lg:flex ">
                            <div className="m-10 min-w-[400px] px-10 py-2 " style={{ backgroundColor: "#1C4543", border: "1px solid #359688", borderRadius: "20px", color: "white" }}>
                                <h1 className="med-hero-text">Easy</h1>
                                <div className="p-5">
                                    <span style={{ color: "white", fontSize: "18px" }}>Skip the tedious effort of</span>
                                    <br />
                                    <br />
                                    <ul>
                                        <li>
                                            Months of finding the most productive and efficient mining site,
                                            <br />
                                        </li>
                                        <li>
                                            Months of purchasing and setting up mining site and hardware,
                                            <br />
                                        </li>
                                        <li>
                                            and 24/7 of continuously maintaining and tuning the mining system
                                            <br />
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="m-10 min-w-[400px] px-10 py-5" style={{ backgroundColor: "#256428", border: "1px solid #359688", borderRadius: "20px", color: "white" }}>
                                <h1 className="med-hero-text">Green</h1>
                                <div className="p-5">
                                    Our mining stations are strategically placed in an area with abundant amount of renewable energy and resources. <br />
                                    <br />
                                    The future of decentralization is environment friendly!
                                </div>
                            </div>
                            <div className="m-10 min-w-[400px] px-10 py-5" style={{ backgroundColor: "#359688", border: "1px solid #359688", borderRadius: "20px", color: "white" }}>
                                <h1 className="med-hero-text">Reliable</h1>
                                <div className="p-5">Our team consisted of experienced and reputable crypto miners, engineers, and seasoned business founders.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative h-[120px] w-full justify-center overflow-hidden bg-white text-green-dark-10"></div>
        </div>
    );
};

export default Hero;
