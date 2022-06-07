import Link from "next/link";
import type { FunctionComponent } from "react";
import { useState } from "react";

import { Sling as Hamburger } from "hamburger-react";

// Import components
import Logo from "./Logo";
import ButtonLaunchBasic from "./Buttons/LaunchBasic";
import BurgerMenu from "./BurgerMenu";
import ButtonThemeSwitcher from "./Buttons/ThemeSwitcher";
import ButtonLaunchGradient from "./Buttons/LaunchGradient";

// Import logos

// Import utils
import RisedleLinks from "../utils/links";

// Import popper
import { usePopper } from "react-popper";

// Import headless ui
import { Popover, Transition } from "@headlessui/react";
import ButtonConnectWalletMobile from "./Buttons/ConnectWalletMobile";

/**
 * NavigationProps is a React Component properties that passed to React Component Navigation
 */
type NavigationProps = {};

/**
 * Navigation is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const Navigation: FunctionComponent<NavigationProps> = ({}) => {
    const bgStyle = { background: "linear-gradient(89.93deg, #0A2F0C 27.17%, #295771 76.4%, #0A2F0C 99.83%)" };
    const launchStyle = { background: "linear-gradient(85.79deg, #3BCAB0 5.43%, #DA69EC 49.91%, #C0FFF4 108.32%);border-radius: 10px;)" };
    const [openMenu, setOpenMenu] = useState(false);
    let [referenceElement1, setReferenceElement1] = useState<HTMLButtonElement | null>();
    let [popperElement1, setPopperElement1] = useState<HTMLDivElement | null>();
    let popper1 = usePopper(referenceElement1, popperElement1, {
        modifiers: [
            {
                name: "offset",
                options: {
                    offset: [0, 16],
                },
            },
        ],
    });

    let [referenceElement2, setReferenceElement2] = useState<HTMLButtonElement | null>();
    let [popperElement2, setPopperElement2] = useState<HTMLDivElement | null>();
    let popper2 = usePopper(referenceElement2, popperElement2, {
        placement: "bottom-end",
        modifiers: [
            {
                name: "offset",
                options: {
                    offset: [0, 16],
                },
            },
        ],
    });
    return (
        //<div className='{"background":"linear-gradient(89.93deg, #0A2F0C 27.17%, #295771 76.4%, #0A2F0C 99.83%)"} sticky  top-0 z-40 flex flex-row items-center justify-between bg-green-300 p-4 backdrop-blur-lg dark:bg-green-700 '>
        <>
            <div className={` lg h-15 sticky top-0 z-40 flex flex-row items-center justify-between py-1 backdrop-blur-lg `}>
                <div className="h-16 flex-none cursor-pointer p-4 md:w-[162.8px]">
                    <Link href="/">
                        <p className="flex items-center">
                            <Logo />
                        </p>
                    </Link>
                </div>

                <div className="items-right  hidden p-4 lg:flex">
                    <ul className="flex space-x-2">
                        <li>
                            <Link href="/about">
                                <p
                                    className=" first::pt-0 
                              text-2xs 
                              font-500 padding-huge relative flex h-7 cursor-pointer flex-row items-center items-center items-center justify-center rounded bg-white bg-opacity-20 px-4 pt-0.5 font-mono uppercase tracking-wider text-white  duration-1000 duration-200 hover:bg-opacity-70"
                                >
                                    About
                                </p>
                            </Link>
                        </li>
                        <li>
                            <Link href="/mint">
                                <p className="first::pt-0  text-2xs font-500 padding-huge relative flex h-7 cursor-pointer flex-row items-center items-center items-center justify-center rounded bg-white bg-opacity-20 px-4 pt-0.5 font-mono uppercase tracking-wider text-white  duration-1000 duration-200 hover:bg-opacity-70">Buy</p>
                            </Link>
                        </li>
                        <li>
                            <Link href="/roadmap">
                                <p
                                    className="first::pt-0 
                              text-2xs 
                              font-500 padding-huge relative flex h-7 cursor-pointer flex-row items-center items-center items-center justify-center rounded bg-white bg-opacity-20 px-4 pt-0.5 font-mono uppercase tracking-wider text-white  duration-1000 duration-200 hover:bg-opacity-70"
                                >
                                    Roadmap
                                </p>
                            </Link>
                        </li>
                        <li>
                            <Link href="/team">
                                <p
                                    className="first::pt-0 
                              text-2xs 
                              font-500 padding-huge relative flex h-7 cursor-pointer flex-row items-center items-center items-center justify-center rounded bg-white bg-opacity-20 px-4 pt-0.5 font-mono uppercase tracking-wider text-white  duration-1000 duration-200 hover:bg-opacity-70"
                                >
                                    Team
                                </p>
                            </Link>
                        </li>

                        <li>
                            <Link href="https://twitter.com/lokaversenft">
                                <p
                                    className="first::pt-0 
                              
                              text-2xs
                            font-500 padding-huge relative flex h-7 cursor-pointer flex-row items-center items-center items-center justify-center rounded bg-white bg-opacity-20 px-4 pt-0 font-mono uppercase tracking-wider text-white  duration-1000 duration-200 hover:bg-opacity-70"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className=" h-4 w-4 fill-current stroke-current" viewBox="0 0 40 40">
                                        <path d="M38.526 8.625a15.199 15.199 0 01-4.373 1.198 7.625 7.625 0 003.348-4.211 15.25 15.25 0 01-4.835 1.847 7.6 7.6 0 00-5.557-2.404c-4.915 0-8.526 4.586-7.416 9.346-6.325-.317-11.934-3.347-15.69-7.953C2.01 9.869 2.97 14.345 6.358 16.612a7.58 7.58 0 01-3.446-.953c-.084 3.527 2.444 6.826 6.105 7.56a7.63 7.63 0 01-3.438.13 7.618 7.618 0 007.112 5.286A15.306 15.306 0 011.42 31.79a21.55 21.55 0 0011.67 3.42c14.134 0 22.12-11.937 21.637-22.643a15.499 15.499 0 003.799-3.941z" />
                                    </svg>
                                </p>
                            </Link>
                        </li>
                        <li>
                            <Link href="https://www.instagram.com/lokaversenft/">
                                <p
                                    className="first::pt-0 
                              
                              text-2xs
                            font-500 padding-huge relative flex h-7 cursor-pointer flex-row items-center items-center items-center justify-center rounded bg-white bg-opacity-20 px-4 pt-0 font-mono uppercase tracking-wider text-white  duration-1000 duration-200 hover:bg-opacity-70"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className=" h-4 w-4 fill-current stroke-current" viewBox="0 0 40 40">
                                        <path d="M27.524 1.79c3.334.17 5.899 1.11 7.694 2.992 1.796 1.88 2.822 4.36 2.993 7.694 0 1.314.078 3.651.085 7.089v2.108c-.002 2.768-.014 4.702-.085 5.85-.171 3.335-1.112 5.9-2.993 7.695-1.88 1.796-4.36 2.822-7.694 2.993-1.15.071-3.143.083-5.88.085h-3.317c-2.768-.002-4.702-.014-5.85-.085-3.335-.171-5.9-1.112-7.695-2.993-1.796-1.795-2.822-4.36-2.993-7.694-.065-1.04-.08-2.771-.084-5.118v-4.812c.004-2.347.02-4.078.084-5.118.171-3.334 1.112-5.899 2.993-7.694 1.795-1.796 4.36-2.822 7.694-2.993 1.04-.065 2.771-.08 5.118-.084h4.847c2.361.004 4.043.02 5.083.084Zm-7.61 8.805c-2.65 0-4.873.94-6.668 2.736C11.45 15.212 10.51 17.35 10.51 20c0 2.65.94 4.873 2.736 6.669 1.88 1.795 4.018 2.736 6.668 2.736 2.65 0 4.874-.94 6.67-2.736 1.795-1.881 2.735-4.019 2.735-6.669 0-2.65-.94-4.873-2.736-6.669-1.795-1.88-4.018-2.736-6.669-2.736Zm0 3.25c1.71 0 3.164.598 4.36 1.795A6.076 6.076 0 0 1 26.07 20c0 1.624-.598 3.078-1.795 4.275-1.197 1.197-2.65 1.795-4.36 1.795-1.71 0-3.164-.598-4.36-1.795-1.198-1.112-1.796-2.565-1.796-4.275 0-1.71.598-3.163 1.795-4.36 1.197-1.197 2.65-1.796 4.36-1.796Zm9.833-5.9c-.599 0-1.112.257-1.54.684-.427.427-.683.94-.683 1.539 0 .598.256 1.111.684 1.539.427.427.94.684 1.539.684.598 0 1.111-.257 1.538-.684.428-.428.684-.94.684-1.54 0-.598-.256-1.11-.684-1.538-.427-.427-.94-.684-1.538-.684Z" />
                                    </svg>
                                </p>
                            </Link>
                        </li>
                        <li>
                            <Link href="http://discord.gg/">
                                <p
                                    className="first::pt-0 
                              
                              text-2xs
                            font-500 padding-huge relative flex h-7 cursor-pointer flex-row items-center items-center items-center justify-center rounded bg-white bg-opacity-20 px-4 pt-0 font-mono uppercase tracking-wider text-white  duration-1000 duration-200 hover:bg-opacity-70"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className=" h-4 w-4 fill-current stroke-current" viewBox="0 0 40 40">
                                        <path d="M33.567 7.554a32.283 32.283 0 00-7.969-2.472.12.12 0 00-.128.06c-.344.613-.725 1.411-.992 2.039a29.804 29.804 0 00-8.95 0 20.625 20.625 0 00-1.008-2.038.126.126 0 00-.128-.06 32.194 32.194 0 00-7.968 2.47.114.114 0 00-.053.046C1.296 15.18-.095 22.577.588 29.88c.003.036.023.07.05.092 3.349 2.459 6.593 3.952 9.776 4.941a.127.127 0 00.137-.045 23.203 23.203 0 002-3.253.124.124 0 00-.068-.172A21.379 21.379 0 019.43 29.99a.126.126 0 01-.012-.209c.205-.153.41-.313.607-.475a.121.121 0 01.126-.017c6.407 2.925 13.343 2.925 19.675 0a.12.12 0 01.128.015c.196.162.4.324.608.477a.126.126 0 01-.011.209c-.975.57-1.99 1.051-3.055 1.454a.125.125 0 00-.067.173 26.052 26.052 0 001.998 3.252c.031.043.087.062.138.046 3.199-.99 6.442-2.482 9.79-4.941a.126.126 0 00.052-.09c.816-8.445-1.368-15.78-5.789-22.283a.1.1 0 00-.05-.046zm-20.06 17.88c-1.928 0-3.517-1.771-3.517-3.946 0-2.175 1.558-3.946 3.518-3.946 1.975 0 3.549 1.787 3.518 3.946 0 2.175-1.558 3.946-3.518 3.946zm13.01 0c-1.93 0-3.52-1.771-3.52-3.946 0-2.175 1.56-3.946 3.52-3.946 1.974 0 3.548 1.787 3.517 3.946 0 2.175-1.543 3.946-3.518 3.946z" />
                                    </svg>
                                </p>
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="z-50 lg:hidden">
                    <button>
                        <Hamburger
                            direction="right"
                            color="#FFFFFF"
                            onToggle={(toggled) => {
                                if (toggled) {
                                    // open a menu
                                    setOpenMenu(true);
                                } else {
                                    setOpenMenu(false);
                                }
                            }}
                        />
                    </button>
                </div>
                {openMenu ? <BurgerMenu open={openMenu} /> : <></>}
            </div>
        </>
    );
};

export default Navigation;
