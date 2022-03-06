import Link from "next/link";
import type { FunctionComponent } from "react";

/**
 * FeatureCardTwoColumnsProps is a React Component properties that passed to React Component FeatureCardTwoColumns
 */
type FeatureCardTwoColumnsProps = {};

/**
 * FeatureCardTwoColumns is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const FeatureCardTwoColumns: FunctionComponent<FeatureCardTwoColumnsProps> = ({}) => {
    return (
        <div className="m-auto flex max-w-4xl flex-col px-4 sm:flex-row">
            <div className="mb-4 flex basis-1/2 flex-col overflow-hidden rounded-2xl border border-gray-light-3 bg-gray-light-2 dark:border-gray-dark-3 dark:bg-gray-dark-2 sm:mb-0 sm:mr-2">
                <div className="px-4 py-6 sm:basis-1/3 sm:px-8">
                    <h1 className="m-0 mb-4 text-base font-bold text-gray-light-12 dark:text-gray-dark-12 sm:text-lg">0% Management Fees</h1>
                    <p className="mb-6 text-sm leading-6 text-gray-light-10 dark:text-gray-dark-10">Just like leveraging assets manually using lending protocol, you will not get charged for management fees.</p>
                    <p className="text-sm font-bold leading-6 text-gray-light-12 dark:text-gray-dark-12">
                        <Link href="https://docs.risedle.com/leveraged-tokens/ethrise-2x-long-eth/fees">
                            <a>Risedle Leveraged Tokens Fees &#8594;</a>
                        </Link>
                    </p>
                </div>
                <div className="inline-block sm:basis-2/3 "></div>
            </div>

            <div className="flex basis-1/2 flex-col overflow-hidden rounded-2xl border border-gray-light-3 bg-gray-light-2 dark:border-gray-dark-3 dark:bg-gray-dark-2 sm:ml-2">
                <div className="inline-block sm:basis-2/3 "></div>
                <div className="px-4 py-6 sm:basis-1/3 sm:px-8">
                    <h1 className="m-0 mb-4 text-base font-bold text-gray-light-12 dark:text-gray-dark-12 sm:text-lg">Floating Leverage</h1>
                    <p className="mb-6 text-sm leading-6 text-gray-light-10 dark:text-gray-dark-10">Risedle&apos;s unique rebalancing mechanism designed to minimize loss due to frequent rebalancing.</p>
                    <p className="text-sm font-bold leading-6 text-gray-light-12 dark:text-gray-dark-12">
                        <Link href="https://docs.risedle.com/leveraged-tokens/ethrise-2x-long-eth/ethrise-rebalancing-mechanism">
                            <a>Rebalancing Mechanism &#8594;</a>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FeatureCardTwoColumns;
