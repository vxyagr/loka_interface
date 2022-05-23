import Head from "next/head";
import type { FunctionComponent } from "react";
import Favicon from "../Favicon";
import Footer from "../Footer";
import Hero from "./Hero";
import HeroFooter from "./HeroFooter";
import Navigation from "./Navigation";
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
    const bgCol = { background: "green" };
    return (
        <div className={`h-screen w-full overflow-clip bg-green-900 font-inter`}>
            <Head>
                {/* <!-- HTML Meta Tags --> */}
                <title>LoKa | Blockchain with Renewable Energy</title>
                <meta name="description" content="Invest and earn from professionally managed green energy blockchain mining infrastructure" />
                <HomePageMeta />
            </Head>
            <Favicon />
            <Navigation />
            <Hero />
        </div>
    );
};

export default HomePage;
