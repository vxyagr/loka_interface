import Link from "next/link";
import type { FunctionComponent } from "react";
import { useState } from "react";

// Import components
import Logo from "./Logo";
import BurgerMenu from "./BurgerMenu";
import NavigationMenu from "./NavigationMenu";

// Import popper
import { usePopper } from "react-popper";

// Import headless ui
import { Popover, Transition } from "@headlessui/react";
//import ButtonConnectWalletMobile from "./Buttons/ConnectWalletMobile";

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
            <div className={` lg sticky top-0 z-40 flex h-[72px] flex-row items-center justify-between py-1 backdrop-blur-lg `} style={{ background: "linear-gradient(89.93deg, #256428 11.39%, #3CADB5 86.52%)" }}>
                <div className="flex h-16 lg:hidden">
                    {
                        //<ButtonConnectWalletMobile />}
                    }
                </div>

                <div className="flex p-4 md:w-[162.8px] lg:flex">
                    <Link href="/">
                        <p className="hidden items-center lg:flex ">
                            <Logo />
                        </p>
                    </Link>
                </div>

                <NavigationMenu showWallet={true} />

                {openMenu ? <BurgerMenu open={openMenu} /> : <></>}
            </div>
        </>
    );
};

export default Navigation;
