import type { FunctionComponent } from "react";
import PrivateSaleButton from "./PrivateSaleButton";

/**
 * HeroFooterProps is a React Component properties that passed to React Component HeroFooter
 */
type HeroFooterProps = {};

/**
 * HeroFooter is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const HeroFooter: FunctionComponent<HeroFooterProps> = ({}) => {
    return (
        <div className="my-1 flex w-full items-center justify-center sm:absolute sm:my-1">
            <div className="z-10 flex w-full flex-col items-center gap-8 px-4 text-center ">
                <PrivateSaleButton />
            </div>
        </div>
    );
};

export default HeroFooter;
