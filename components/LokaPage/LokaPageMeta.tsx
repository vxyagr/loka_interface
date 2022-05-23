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
            <meta property="og:title" content="Loka Mining" />
            <meta property="og:description" content="Crypto mining with green and renewable energy" />
            <meta property="og:image" content="" />

            {/* <!-- Twitter Meta Tags --> */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta property="twitter:domain" content="lokaverse.io" />
            <meta property="twitter:url" content="https://lokaverse.io/" />
            <meta name="twitter:title" content="Loka Mining" />
            <meta name="twitter:description" content="Crypto mining with green and renewable energy" />
            <meta name="twitter:image" content="" />
        </>
    );
};

export default LokaPageMeta;
