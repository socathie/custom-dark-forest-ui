import { ethers } from "ethers";
import { spawnCalldata } from './spawn/spawn';
import address from './address.json'

const abi = [
    'function spawn (uint[2] a, uint[2][2] b, uint[2] c, uint[1] input)'
]

let darkForest;

export async function connectDarkForest() {
    let provider = new ethers.providers.JsonRpcProvider();
    let signer = provider.getSigner();
    console.log('signer: ', await signer.getAddress());

    darkForest = new ethers.Contract(address['DarkForest'], abi, signer);

    console.log("Connect to Dark Forest Contract:", darkForest);
}

export async function spawnPosition(x, y) {

    let calldata = await spawnCalldata(x, y);

    if (!calldata) { return "Invalid inputs to generate witness."; }

    //console.log(calldata[3]);

    let errorString;

    let result = await darkForest.spawn(calldata[0], calldata[1], calldata[2], calldata[3])
        .catch((error) => {
            errorString = error.toString();
        });

    //console.log("result: ", result);
    //console.log("error: ", errorString);

    if (result) { return result; }

    return errorString;

}
