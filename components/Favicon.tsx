import { FunctionComponent } from "react";
import Head from "next/head";

type FaviconProps = {};

/**
 * React Component to render OpenGraph website
 */
const Favicon: FunctionComponent<FaviconProps> = ({}) => {
    return (
        <Head>
            <link rel="icon" type="image/png" href="/favico_loka.png" sizes="32x32" />
            <meta name="application-name" content="&nbsp;" />
            <meta name="msapplication-TileColor" content="#FFFFFF" />
        </Head>
    );
};

export default Favicon;
