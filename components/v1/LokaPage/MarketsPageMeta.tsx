import type { FunctionComponent } from "react";

/**
 * MarketsPageMetaProps is a React Component properties that passed to React Component MarketsPageMeta
 */
type LokaPageMetaProps = {};

/**
 * MarketsPageMeta is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */

const LokaPageMeta: FunctionComponent<LokaPageMetaProps> = ({}) => {
    return (
        <>
            {/* <!-- Facebook Meta Tags --> */}
            <meta property="og:url" content="https://loka-interface.vercel.apps/" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content="Loka" />
            <meta property="og:description" content="Invest, earn and build on the decentralized crypto leveraged ETFs market protocol" />
            <meta property="og:image" content="https://risedle.com/og/Markets.png" />

            {/* <!-- Twitter Meta Tags --> */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta property="twitter:domain" content="risedle.com" />
            <meta property="twitter:url" content="https://risedle.com/" />
            <meta name="twitter:title" content="Risedle Protocol" />
            <meta name="twitter:description" content="Invest, earn and build on the decentralized crypto leveraged ETFs market protocol" />
            <meta name="twitter:image" content="https://risedle.com/og/Markets.png" />
        </>
    );
};

export default LokaPageMeta;
