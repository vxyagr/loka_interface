import Link from "next/link";
import type { FunctionComponent } from "react";
import RisedleLinks from "../../utils/links";

/**
 * ResourcesProps is a React Component properties that passed to React Component Resources
 */
type ResourcesProps = {};

/**
 * Resources is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const Resources: FunctionComponent<ResourcesProps> = ({}) => {
    return (
        <div className="bottom-8 h-14 w-full px-4 lg:bottom-16 lg:h-20  lg:w-48 lg:max-w-2xl lg:px-0">
            <div className="flex h-14 flex-row items-center rounded-lg bg-violet-light-3 p-4 hover:bg-violet-light-4 dark:bg-violet-dark-2 hover:dark:bg-violet-dark-3 lg:h-20 " style={{ background: "linear-gradient(77.68deg, #3BCAB0 -20.56%, #DA69EC 21.53%, #C0FFF4 83.03%)", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Link href="">
                    <a className="align-middle" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <span className="leading-0 h-20 align-middle text-base font-semibold  leading-none text-gray-light-12 dark:text-gray-dark-12" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            MINT FOR 0.5 ETH{" "}
                        </span>
                    </a>
                </Link>
            </div>
        </div>
    );
};

export default Resources;
