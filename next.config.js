/** @type {import('next').NextConfig} */
require("dotenv").config;
module.exports = {
    reactStrictMode: true,
    swcMinify: false,
    env: {
        chainRPC: process.env.chainRPC,
        lokaNFTContract: process.env.lokaNFTContract,
        lokaYieldContract: process.env.lokaYieldContract,
        MAGIC_KEY: process.env.MAGIC_KEY,
        USDCContract: process.env.USDCContract,
        PRIVATE_KEY: process.env.PRIVATE_KEY,
    },
};
