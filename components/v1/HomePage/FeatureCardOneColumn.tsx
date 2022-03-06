import Link from "next/link";
import type { FunctionComponent } from "react";

/**
 * FeatureCardOneColumnProps is a React Component properties that passed to React Component FeatureCardOneColumn
 */
type FeatureCardOneColumnProps = {};

/**
 * FeatureCardOneColumn is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const FeatureCardOneColumn: FunctionComponent<FeatureCardOneColumnProps> = ({}) => {
    return (
        <div className="m-auto max-w-4xl px-4">
            <div className="flex flex-col overflow-hidden rounded-2xl border border-gray-light-3 bg-gray-light-2 dark:border-gray-dark-3 dark:bg-gray-dark-2 sm:h-64 sm:flex-row sm:items-center">
                <div className="sm:basis-4/4 px-4 py-6 text-center sm:pl-8">
                    <h1 className="m-0 mb-4 text-base font-bold text-gray-light-12 dark:text-gray-dark-12 sm:text-center">Enjoy The Simplicity of Owning Green Energy Blockchain Mining Rigs</h1>
                    <p className="mb-6 text-sm leading-6 text-gray-light-10 dark:text-gray-dark-10">LoKa continuously performing high quality blockchain mining procedures, delivering yields to its NFT holders</p>
                    <p className="text-sm font-bold leading-6 text-gray-light-12 dark:text-gray-dark-12">
                        <Link href="/markets">
                            <a>LoKa &#8594;</a>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FeatureCardOneColumn;
