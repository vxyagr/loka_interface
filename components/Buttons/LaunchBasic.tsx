import Link from "next/link";
import type { FunctionComponent } from "react";

/**
 * ButtonLaunchBasicProps is a React Component properties that passed to React Component ButtonLaunchBasic
 */
type ButtonLaunchBasicProps = {};

/**
 * ButtonLaunchBasic is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const ButtonLaunchBasic: FunctionComponent<ButtonLaunchBasicProps> = ({}) => {
    const launchStyle = { color: "linear-gradient(77.68deg, #3BCAB0 -20.56%, #DA69EC 21.53%, #C0FFF4 83.03%);" };
    return (
        <Link href="/loka">
            <a className={`${launchStyle} button basic  px-[24px] py-[12px]`}>
                Launch <span className="mr-2 font-bold">&#8594;</span>
            </a>
        </Link>
    );
};

export default ButtonLaunchBasic;
