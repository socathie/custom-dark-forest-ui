import { ethers } from "ethers";
import darkForestJson from './DarkForest.json'
import { spawnCalldata } from './spawn'

const darkForestAbi = darkForestJson.abi;

export async function getAccounts() {
    //const accounts = await window.ethereum.enable();
    // const curProvider = window['ethereum'] || window.web3.currentProvider

    const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");

    //console.log('accounts: ', accounts);
    console.log('provider: ', provider);

    let balance = await provider.getBalance('0x044272645b1Ff24f5050D23E44A0784100Bb77FF');

    let DarkForest = new ethers.Contract('0x14B2904A264ee55cBB4b1Ac847540B5107c39087', darkForestAbi, provider);
    console.log(balance);

    console.log(DarkForest);

    let calldata = spawnCalldata(40, 40);

    console.log(calldata);
}

//getAccounts();