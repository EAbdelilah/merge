# Frontend Uniswap Max

## Quick start

```bash
yarn
yarn dev
```

# setup local test network

## Need to be done only once

=> On metamask :

-   Create a new account using this Private Key : _0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80_
-   Setup a new network with : (Add Network)
    -   Network name : Anvil
    -   New RPC URL : http://127.0.0.1:8545
    -   Chain ID : 1
    -   Currency symbol : ETHA

```sh
git https://github.com/Los-Byzantinos/Uniswap-Max
cd Uniswap-Max
make # This installs the project's dependencies.
```

Fill **ETH_RPC_URL** in `.env` (get it on [alchemy](https://www.alchemy.com/))

## Need to be done every time

=> In the contracts repository :

```sh
make anvil
```

Open an other terminal and :

```sh
make deploy-anvil
```

Copy the **Market** address from `./broadcast/Deployments.s.sol/1/run-latest.json`

=> Get back to the front repo and paste it in `helper-config.js`

```sh
yarn dev
```

Clear cache in metamask :

-   On Extension, click the account icon in the top-right corner. On Mobile, tap the hamburger icon in the top left to open the main menu.
-   Select Settings.
-   Select Advanced.
-   Scroll down and **Clear activity and nonce data**

You can dev !

0xcd94f136000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb922660000000000000000000000002260fac5e5542a773aa44fbcfedf7c193bc2c599000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb480000000000000000000000000000000000000000000000000000000000000bb800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000bebc20000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
