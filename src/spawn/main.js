import { ethers } from "ethers";
import darkForestJson from './DarkForest.json'
import { spawnCalldata } from './spawn'

const darkForestAbi = darkForestJson.abi;

let DarkForest;

export async function connectDarkForest() {
    //const accounts = await window.ethereum.enable();
    // const curProvider = window['ethereum'] || window.web3.currentProvider

    let provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
    let signer = provider.getSigner();

    //console.log('accounts: ', accounts);
    console.log('provider: ', provider);

    //let balance = await provider.getBalance('0x044272645b1Ff24f5050D23E44A0784100Bb77FF');

    DarkForest = new ethers.Contract('0xf8d4d6B8975407a6Ce32060558B25ec4CE8C4f58', darkForestAbi, signer);
    //console.log(balance);

    console.log(DarkForest);
}

export async function spawnPosition(x, y) {

    let calldata = await spawnCalldata(40, 40);

    console.log(calldata);

    let errorString;

    let result = await DarkForest.spawn(calldata[0], calldata[1], calldata[2], calldata[3])
        .catch((error) => {
            errorString = error.toString();
        });

    console.log("result: ", result);
    console.log("error: ", errorString);

}
