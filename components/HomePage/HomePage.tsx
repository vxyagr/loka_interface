import Head from "next/head";
import type { FunctionComponent } from "react";
import Favicon from "../Favicon";
import Footer from "../Footer";
import Hero from "./HomeContent";
import PrivateSale from "./PrivateSale";
import Navigation from "../Navigation";
import HomePageMeta from "./HomePageMeta";
import Axios from "axios";

/**
 * HomePageProps is a React Component properties that passed to React Component HomePage
 */
type HomePageProps = {};

/**
 * HomePage is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const HomePage: FunctionComponent<HomePageProps> = ({}) => {
    // By default use dark theme
    const bgCol = { background: "radial-gradient(100.64% 150.78% at 50% -7.3%, #28556C 0%, rgba(10, 47, 12, 0.95) 41.22%, #0A2F0C 63.49%)" };
    return (
        <div className={`${bgCol} h-full w-full overflow-clip  font-inter`} style={{ background: "linear-gradient(89.93deg, #256428 11.39%, #3CADB5 86.52%)" }}>
            <Head>
                {/* <!-- HTML Meta Tags --> */}
                <title>Loka | Bitcoin Mining with Renewable Energy</title>
                <meta name="description" content="Invest and earn from professionally managed green energy Bitcoin mining infrastructure" />
                <HomePageMeta />
            </Head>
            <Favicon />
            <Navigation />
            <Hero />
        </div>
    );
};

export default HomePage;
