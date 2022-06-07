import type { FunctionComponent } from "react";

/**
 * HomePageMetaProps is a React Component properties that passed to React Component HomePageMeta
 */
type HomePageMetaProps = {};

/**
 * HomePageMeta is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */

const HomePageMeta: FunctionComponent<HomePageMetaProps> = ({}) => {
    return (
        <>
            {/* <!-- Facebook Meta Tags --> */}
            <meta property="og:url" content="https://lokaverse.io/" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content="Loka Blockchain Mining with Renewable Energy" />
            <meta property="og:description" content="A simple way to invest on a green energy based blockchain infrastructure, managed by professionals with transparency and reliability" />
            <meta property="og:image" content="" />

            {/* <!-- Twitter Meta Tags --> */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta property="twitter:domain" content="lokaverse.io" />
            <meta property="twitter:url" content="https://lokaverse.io/" />
            <meta name="twitter:title" content="Loka Blockchain Mining with Renewable Energy" />
            <meta name="twitter:description" content="A simple way to invest on a green energy based blockchain infrastructure, managed by professionals with transparency and reliability" />
            <meta name="twitter:image" content="" />
        </>
    );
};

export default HomePageMeta;
