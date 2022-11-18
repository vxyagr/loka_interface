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
        <div className="fixed bottom-8 h-20 w-full px-4 lg:bottom-8  lg:w-full lg:max-w-2xl lg:px-0">
            <div className="flex flex-row items-center rounded-lg p-1 sm:basis-2/3"></div>

            <div className="flex h-[90px] flex-row items-center rounded-lg  bg-green-dark-2 hover:bg-violet-dark-3 sm:basis-1/3">
                <Link href="/mint">
                    <a className="">
                        <span className="leading-0 h-74 pl-8 align-middle text-base font-semibold  leading-none ">
                            <span style={{ color: "white", fontSize: "30px" }}>Get LOKA and earn Bitcoin now </span>
                        </span>
                    </a>
                </Link>
            </div>
        </div>
    );
};

export default Resources;
