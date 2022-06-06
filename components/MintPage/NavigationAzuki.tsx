import Link from "next/link";
import type { FunctionComponent } from "react";
import { useState } from "react";
import Hamburger from "hamburger-react";
import Button from "react";

// Import components
import Logo from "../Logo";
import ButtonLaunchBasic from "../Buttons/LaunchBasic";
import ButtonThemeSwitcher from "../Buttons/ThemeSwitcher";

// Import logos

// Import utils
import RisedleLinks from "../../utils/links";

// Import popper
import { usePopper } from "react-popper";

// Import headless ui
import { Popover, Transition } from "@headlessui/react";

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
        <div className="z-70 fixed top-0 w-full px-5 pt-5 lg:px-8 lg:pt-8">
            <Hamburger
                direction="right"
                color="#FFFFFF"
                onToggle={(toggled) => {
                    if (toggled) {
                        // open a menu
                    } else {
                        // close a menu
                    }
                }}
            />
            <div className="max-w-11xl mx-auto flex h-full items-center justify-center border-b border-white border-opacity-0">
                <div className="flex-grow">
                    <div className="flex">
                        <Hamburger
                            direction="right"
                            color="#FFFFFF"
                            onToggle={(toggled) => {
                                if (toggled) {
                                    // open a menu
                                } else {
                                    // close a menu
                                }
                            }}
                        />
                        <a className="w-min-content" href="/">
                            <img className="bg-azukired h-7 rounded p-2 hover:bg-red-600" src="/Azuki Logo White.svg" />
                        </a>
                    </div>
                </div>
                <div className="hidden  items-center lg:flex">
                    <ul className="flex space-x-2">
                        <li>
                            <a
                                className="
                              first::pt-0 
                              text-2xs font-500 padding-huge relative flex h-7 flex-row items-center items-center items-center justify-center rounded bg-white bg-opacity-20 px-4 pt-0.5 font-mono uppercase tracking-wider text-white  duration-1000 duration-200 hover:bg-opacity-70"
                                href="/beanz"
                            >
                                <svg className=" h-4 fill-current  text-white" viewBox="0 0 1526 630" xmlns="http://www.w3.org/2000/svg">
                                    <g fillRule="nonzero">
                                        <path d="M426.306 169.543c9.754 20.718 11.115 45.202 4.876 67.068-26.541 93.031-165.556 117.279-267.641 131.634-42.968 6.042-53.127-58.38-10.376-65.855 353.603-61.817 200.445-174.304-89.261-150.936-37.927 3.059-59.803-18.393-62.811-47.832-3.384-33.121 22.239-64.204 66.761-57.059 128.472 20.62 313.466 27.43 358.452 122.98" />
                                        <path d="M151.224 499.848c258.517-38.533 325.544-158.468 25.264-138.99-37.822 2.453-45.115-51.864-8.07-59.447 75.204-15.392 205.392-29.175 260.823 36.935 31.279 37.306 30.061 91.834-11.683 132.821-54.977 53.979-175.15 93.55-247.173 119.752-24.317 8.847-52.528-2.637-61.945-26.739-15.546-39.788 10.582-59.532 42.784-64.332" />
                                        <path d="M242.292 242.716c5.041 88.456 27.318 233.019 43.438 351.928 5.12 37.772-48.945 48.637-58.82 11.823-31.537-117.567-57.513-231.991-76.848-352.136-4.874-30.291 11.019-53.91 36.351-58.808 43.656-8.442 54.613 24.989 55.879 47.193M933.837 155.505c14.39-43.867 56.548-50.898 81.624-28.631 27.32 24.259 31.838 93.215 70.224 193.17 16.316 42.486 54.8 113.011 56.33 114.985-8.39-13.928-39.244-17.02-53.428.666-2.062 2.942-1.648 2.43-1.464 2.038 16.83-34.92 34.71-225.307 20.798-378.287-3.21-35.316 17.41-55.587 45.003-58.835 31.584-3.717 64.676 22.344 58.797 56.446-33.129 192.146-19.538 339.081-40.949 404.604-20.355 62.289-76.543 58.722-100.495 21.629-14.157-21.924-28.825-71.705-40.757-104.865-22.976-63.851-56.41-123.195-75.975-188.416 17.787-6.551 59.327-4.327 59.263-4.192-25.243 50.973-31.413 183.553-4.895 264.974 8.015 24.606-2.54 48.195-23.442 56.062-24.995 9.409-54.13-10.583-54.899-39.854-1.252-47.753-20.155-237.048 4.265-311.494M797.56 114.35c10.879 20.167 39.422 26.441 57.003 12.973.136-.106-145.24 207.255-128.525 414 5.413 66.97-92.298 78.812-100.876 11.723-7.563-59.128 95.206-338.417 114.34-382.023 27.69-63.105 47.705-113.966 80.545-121.546 16.963-3.916 35.848 1.012 47.257 14.352 38.816 45.39-6.005 201.614 40.496 376.054 6.723 25.224-5.941 47.53-27.378 53.447-24.688 6.813-51.742-12.348-51.759-41.732-.11-181.73-31.173-337.384-31.103-337.248M660.226 212.43c-35.213.589-121.124-3.81-159.836-7.84-57.284-5.966-49.41-96.553 7.396-86.535 40.376 7.12 105.375 20.777 152.44 27.71 44.747 6.59 40.441 65.99 0 66.666" />
                                        <path d="M849.994 360.96c33.739 3.973 29.77 54.013-3.95 53.186-85.402-2.092-218.558 10.637-309.355 49.092-25.239 10.688-52.042 1.121-61.518-20.893-10.132-23.538 1.442-51.91 32.154-59.636 31.101-7.823 141.229-45.474 342.669-21.75M622.996 256.53c14.796 1.492 30.25 8.71 27.899 32.915-1.444 14.856-13.478 26.126-27.899 27.085-44.101 2.932-65.627 3.95-116.57 14.535-21.702 4.508-42.847-9.454-47.46-31.134-5.103-23.99 13.19-47.462 37.66-48.266 65.897-2.164 111.797 3.394 126.37 4.865M1518.543 122.655c31.082 48.684-51.494 101.795-141.042 172.473-76.594 60.454-148.798 130.558-155.615 139.327 15.33-17.99 3.824-55.755-25.05-62.195 24.983 5.872 160.113 54.63 275.84 80.66 29.647 6.668 47.729 36.824 40.673 62.752-8.822 32.419-51.391 44.19-81.064 28.727-119.434-62.241-205.568-70.71-260.839-84.896-30.053-7.713-38.488-44.373-22.827-70.705 13.836-23.266 60.106-54.706 93.947-80.247 133.787-100.975 197.772-185.157 204.59-185.157 23.56 0 34.557 48.012 23.271 51.845-19.373 6.58-104.022 35.524-207.309 31.848-40.293-1.433-48.997-58.852-3.253-66.587 176.809-29.893 228.898-64.49 258.678-17.845" />
                                    </g>
                                </svg>
                            </a>
                        </li>
                        <li>
                            <a
                                className="
                              first::pt-0 
                              text-2xs font-500 padding-huge relative flex h-7 flex-row items-center items-center items-center justify-center rounded bg-white bg-opacity-20 px-4 pt-0.5 font-mono uppercase tracking-wider text-white  duration-1000 duration-200 hover:bg-opacity-70"
                                href="/gallery"
                            >
                                Gallery
                            </a>
                        </li>
                        <li>
                            <a
                                className="
                              first::pt-0 
                              text-2xs font-500 padding-huge relative flex h-7 flex-row items-center items-center items-center justify-center rounded bg-white bg-opacity-20 px-4 pt-0.5 font-mono uppercase tracking-wider text-white  duration-1000 duration-200 hover:bg-opacity-70"
                                href="/garden"
                            >
                                The Garden
                            </a>
                        </li>
                        <li>
                            <a
                                className="
                              first::pt-0 
                              text-2xs font-500 padding-huge relative flex h-7 flex-row items-center items-center items-center justify-center rounded bg-white bg-opacity-20 px-4 pt-0.5 font-mono uppercase tracking-wider text-white  duration-1000 duration-200 hover:bg-opacity-70"
                                href="/mindmap"
                            >
                                Mindmap
                            </a>
                        </li>
                        <li>
                            <div
                                className="
                              first::pt-0 text-2xs font-500 padding-huge relative flex h-7 flex-row items-center items-center items-center justify-center rounded bg-white bg-opacity-20 pt-0.5 font-mono uppercase  tracking-wider text-white  duration-1000 duration-200 hover:bg-opacity-70"
                            >
                                <div className="block h-full">
                                    <button className="block flex h-full items-center border-transparent px-4 focus:border-transparent focus:outline-none focus:ring-0" id="headlessui-menu-button-1" type="button" aria-haspopup="true" aria-expanded="false">
                                        MORE{/* */}{" "}
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="ml-2 mb-0.5 h-2 w-2 fill-current">
                                            <path d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div
                                className="
                              first::pt-0 text-2xs font-500 padding-huge relative flex h-7 flex-row items-center items-center items-center justify-center rounded bg-white bg-opacity-20 pt-0.5 font-mono uppercase  tracking-wider text-white  duration-1000 duration-200 hover:bg-opacity-70"
                            >
                                <div className="block h-full">
                                    <button className="block flex h-full items-center border-transparent px-4 focus:border-transparent focus:outline-none focus:ring-0" id="headlessui-menu-button-2" type="button" aria-haspopup="true" aria-expanded="false">
                                        BUY{/* */}{" "}
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="ml-2 mb-0.5 h-2 w-2 fill-current">
                                            <path d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </li>
                        <li>
                            <a
                                target="_blank"
                                href="https://twitter.com/azukiofficial"
                                className="
                              } 
                              first::pt-0
                            text-2xs font-500 padding-huge relative flex h-7 flex-row items-center items-center items-center justify-center rounded bg-white bg-opacity-20 px-4 pt-0 font-mono uppercase tracking-wider text-white  duration-1000 duration-200 hover:bg-opacity-70"
                                rel="noreferrer"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className=" h-4 w-4 fill-current stroke-current" viewBox="0 0 40 40">
                                    <path d="M38.526 8.625a15.199 15.199 0 01-4.373 1.198 7.625 7.625 0 003.348-4.211 15.25 15.25 0 01-4.835 1.847 7.6 7.6 0 00-5.557-2.404c-4.915 0-8.526 4.586-7.416 9.346-6.325-.317-11.934-3.347-15.69-7.953C2.01 9.869 2.97 14.345 6.358 16.612a7.58 7.58 0 01-3.446-.953c-.084 3.527 2.444 6.826 6.105 7.56a7.63 7.63 0 01-3.438.13 7.618 7.618 0 007.112 5.286A15.306 15.306 0 011.42 31.79a21.55 21.55 0 0011.67 3.42c14.134 0 22.12-11.937 21.637-22.643a15.499 15.499 0 003.799-3.941z" />
                                </svg>
                            </a>
                        </li>
                        <li>
                            <a
                                target="_blank"
                                href="https://www.instagram.com/azuki/"
                                className="
                              } 
                              first::pt-0
                            text-2xs font-500 padding-huge relative flex h-7 flex-row items-center items-center items-center justify-center rounded bg-white bg-opacity-20 px-4 pt-0 font-mono uppercase tracking-wider text-white  duration-1000 duration-200 hover:bg-opacity-70"
                                rel="noreferrer"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className=" h-4 w-4 fill-current stroke-current" viewBox="0 0 40 40">
                                    <path d="M27.524 1.79c3.334.17 5.899 1.11 7.694 2.992 1.796 1.88 2.822 4.36 2.993 7.694 0 1.314.078 3.651.085 7.089v2.108c-.002 2.768-.014 4.702-.085 5.85-.171 3.335-1.112 5.9-2.993 7.695-1.88 1.796-4.36 2.822-7.694 2.993-1.15.071-3.143.083-5.88.085h-3.317c-2.768-.002-4.702-.014-5.85-.085-3.335-.171-5.9-1.112-7.695-2.993-1.796-1.795-2.822-4.36-2.993-7.694-.065-1.04-.08-2.771-.084-5.118v-4.812c.004-2.347.02-4.078.084-5.118.171-3.334 1.112-5.899 2.993-7.694 1.795-1.796 4.36-2.822 7.694-2.993 1.04-.065 2.771-.08 5.118-.084h4.847c2.361.004 4.043.02 5.083.084Zm-7.61 8.805c-2.65 0-4.873.94-6.668 2.736C11.45 15.212 10.51 17.35 10.51 20c0 2.65.94 4.873 2.736 6.669 1.88 1.795 4.018 2.736 6.668 2.736 2.65 0 4.874-.94 6.67-2.736 1.795-1.881 2.735-4.019 2.735-6.669 0-2.65-.94-4.873-2.736-6.669-1.795-1.88-4.018-2.736-6.669-2.736Zm0 3.25c1.71 0 3.164.598 4.36 1.795A6.076 6.076 0 0 1 26.07 20c0 1.624-.598 3.078-1.795 4.275-1.197 1.197-2.65 1.795-4.36 1.795-1.71 0-3.164-.598-4.36-1.795-1.198-1.112-1.796-2.565-1.796-4.275 0-1.71.598-3.163 1.795-4.36 1.197-1.197 2.65-1.796 4.36-1.796Zm9.833-5.9c-.599 0-1.112.257-1.54.684-.427.427-.683.94-.683 1.539 0 .598.256 1.111.684 1.539.427.427.94.684 1.539.684.598 0 1.111-.257 1.538-.684.428-.428.684-.94.684-1.54 0-.598-.256-1.11-.684-1.538-.427-.427-.94-.684-1.538-.684Z" />
                                </svg>
                            </a>
                        </li>
                        <li>
                            <a
                                target="_blank"
                                href="http://discord.gg/azuki"
                                className="
                              } 
                              first::pt-0
                            text-2xs font-500 padding-huge relative flex h-7 flex-row items-center items-center items-center justify-center rounded bg-white bg-opacity-20 px-4 pt-0 font-mono uppercase tracking-wider text-white  duration-1000 duration-200 hover:bg-opacity-70"
                                rel="noreferrer"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className=" h-4 w-4 fill-current stroke-current" viewBox="0 0 40 40">
                                    <path d="M33.567 7.554a32.283 32.283 0 00-7.969-2.472.12.12 0 00-.128.06c-.344.613-.725 1.411-.992 2.039a29.804 29.804 0 00-8.95 0 20.625 20.625 0 00-1.008-2.038.126.126 0 00-.128-.06 32.194 32.194 0 00-7.968 2.47.114.114 0 00-.053.046C1.296 15.18-.095 22.577.588 29.88c.003.036.023.07.05.092 3.349 2.459 6.593 3.952 9.776 4.941a.127.127 0 00.137-.045 23.203 23.203 0 002-3.253.124.124 0 00-.068-.172A21.379 21.379 0 019.43 29.99a.126.126 0 01-.012-.209c.205-.153.41-.313.607-.475a.121.121 0 01.126-.017c6.407 2.925 13.343 2.925 19.675 0a.12.12 0 01.128.015c.196.162.4.324.608.477a.126.126 0 01-.011.209c-.975.57-1.99 1.051-3.055 1.454a.125.125 0 00-.067.173 26.052 26.052 0 001.998 3.252c.031.043.087.062.138.046 3.199-.99 6.442-2.482 9.79-4.941a.126.126 0 00.052-.09c.816-8.445-1.368-15.78-5.789-22.283a.1.1 0 00-.05-.046zm-20.06 17.88c-1.928 0-3.517-1.771-3.517-3.946 0-2.175 1.558-3.946 3.518-3.946 1.975 0 3.549 1.787 3.518 3.946 0 2.175-1.558 3.946-3.518 3.946zm13.01 0c-1.93 0-3.52-1.771-3.52-3.946 0-2.175 1.56-3.946 3.52-3.946 1.974 0 3.548 1.787 3.517 3.946 0 2.175-1.543 3.946-3.518 3.946z" />
                                </svg>
                            </a>
                        </li>
                        <li>
                            <div
                                className="
                    first::pt-0 text-2xs font-500 padding-huge relative flex h-7 flex-row items-center items-center items-center justify-center rounded bg-white bg-opacity-20 px-4 pt-0.5 font-mono uppercase tracking-wider text-white  duration-1000 duration-200 hover:bg-opacity-70"
                            >
                                <div>
                                    <div>
                                        <div>
                                            <button id="headlessui-menu-button-3" type="button" aria-haspopup="true" aria-expanded="false">
                                                LANGUAGE
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
                                } else {
                                    // close a menu
                                }
                            }}
                        />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Navigation;
