# custom-dark-forest-ui

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Preparation

This repo is a minimal UI to interact with contracts developed in [custom-dark-forest](https://github.com/socathie/custom-dark-forest). Before running this app, you must:

1. Run `npm i` to install
2. Run a local chain with `npx hardhat node` [ganache-cli](https://github.com/trufflesuite/ganache).
3. Deploy the contracts in [custom-dark-forest](https://github.com/socathie/custom-dark-forest) with hardhat.
4. Replace the address in `src/address.json` with the deployed Dark Forest contract address.
5. Then run `npm start` in this directory.