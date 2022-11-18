import Head from "next/head";
import type { FunctionComponent } from "react";
import React, { useState } from "react";
import Favicon from "../Favicon";
import Footer from "../Footer";
import Dashboard from "./Dashboard";
import PrivateSale from "./PrivateSale";
import Navigation from "../AppNavigation";
import DashboardMeta from "./DashboardPageMeta";
import { useMarkets } from "../../utils/snapshot";
import ButtonConnectWalletMobile from "../Buttons/ConnectWalletMobile";

import { ethers, providers } from "ethers";

import ButtonConnectWalletDesktop from "../Buttons/ConnectWalletDesktop";
import Axios from "axios";

/**
 * HomePageProps is a React Component properties that passed to React Component HomePage
 */
type DashboardProps = {};
type MarketsPageProps = {};
var spply = 0;
var first = true;
var check = false;
/**
 * HomePage is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const DashboardPage: FunctionComponent<DashboardProps> = ({}) => {
    // By default use dark theme
    // Read global states

    const bgCol = { background: "radial-gradient(100.64% 150.78% at 50% -7.3%, #28556C 0%, rgba(10, 47, 12, 0.95) 41.22%, #0A2F0C 63.49%)" };
    return (
        <div className={`${bgCol} h-screen w-full font-inter  lg:h-full`} style={{ background: "linear-gradient(89.93deg, #256428 11.39%, #3CADB5 86.52%)" }}>
            <Head>
                {/* <!-- HTML Meta Tags --> */}
                <title>Loka | Crypto Mining with Renewable Energy </title>
                <meta name="description" content="Invest and earn from professionally managed green energy blockchain mining infrastructure" />
                <DashboardMeta />
            </Head>
            <Favicon />
            <Navigation />
            <Dashboard />
        </div>
    );
};

export default DashboardPage;
