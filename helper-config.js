const uiConfig = {
    TVL: 2.6,
    TVT: 1.3,
};

const networkConfig = {
    1: {
        name: "mainnet",
        addressMarket: "0x4CF4dd3f71B67a7622ac250f8b10d266Dc5aEbcE",
        addressPositions: "0x021DBfF4A864Aa25c51F0ad2Cd73266Fde66199d",
        pools: [
            {
                name: "WETH",
                address: "0xB305369CC06FD05898b1DCFb96Ae27D0c783a89e",
                token: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
                apy: "12",
                dec: "18",
                tvl: "1000",
            },
            {
                name: "USDC",
                address: "0xE4FAEc0F9344dF83E71C4E0043e058304ACbcC09",
                token: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
                apy: "10",
                dec: "6",
                tvl: "1045474",
            },
            {
                name: "WBTC",
                address: "0xF2feC1B0A1ec000132A9E92e9d70ad96E93691b4",
                token: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
                apy: "6",
                dec: "8",
                tvl: "120",
            },
        ],
        pool: {
            WETH: {
                name: "WETH",
                address: "0xB305369CC06FD05898b1DCFb96Ae27D0c783a89e",
                token: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
                apy: "12",
                dec: "18",
                tvl: "1000",
            },
            USDC: {
                name: "USDC",
                address: "0xE4FAEc0F9344dF83E71C4E0043e058304ACbcC09",
                token: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
                apy: "10",
                dec: "6",
                tvl: "1045474",
            },
            WBTC: {
                name: "WBTC",
                address: "0xF2feC1B0A1ec000132A9E92e9d70ad96E93691b4",
                token: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
                apy: "6",
                dec: "8",
                tvl: "120",
            },
        },
    },
    137: {
        name: "polygon",
        addressMarket: "0x0D7087CA643F2FD3d331d02fe8D3503347893929",
        addressPositions: "0xb67cdbf6515110d980d3189AaE2D04E6fAd8B381",
        pools: [
            {
                name: "WBTC",
                address: "0x639D46Fbdf441AA555fBAEa5451B6D693Dc039f3",
                token: "0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6",
                apy: "0", // Placeholder, based on typical DeFi lending yields
                dec: "8",
                tvl: "0", // Newly deployed, no deposits yet
            },
            {
                name: "WETH",
                address: "0x72c07Ce1f215A1efa5454A8Fa7dA8D4254f3B2c5",
                token: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
                apy: "0", // Placeholder, slightly higher for WETH
                dec: "18",
                tvl: "0",
            },
            {
                name: "USDC",
                address: "0x4a8801dA1CA63B32b6395d88b2bdDd3c3edCd3C1",
                token: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
                apy: "0", // Placeholder, lower for stablecoin
                dec: "6",
                tvl: "0",
            },

        ],
        pool: {
            WBTC: {
                name: "WBTC",
                address: "0x639D46Fbdf441AA555fBAEa5451B6D693Dc039f3",
                token: "0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6",
                apy: "0",
                dec: "8",
                tvl: "0",
            },
            WETH: {
                name: "WETH",
                address: "0x72c07Ce1f215A1efa5454A8Fa7dA8D4254f3B2c5",
                token: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
                apy: "0",
                dec: "18",
                tvl: "0",
            },
            USDC: {
                name: "USDC",
                address: "0x4a8801dA1CA63B32b6395d88b2bdDd3c3edCd3C1",
                token: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
                apy: "0",
                dec: "6",
                tvl: "0",
            },

        },
    },
};

module.exports = {
    networkConfig,
    uiConfig,
};