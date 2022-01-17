import { ethers } from "ethers";
import { spawnCalldata } from './spawn/spawn';
import address from './address.json'
import darkForestArtifact from './artifacts/DarkForest.json'

let darkForest;

export async function connectDarkForest() {
    const { ethereum } = window;

    let provider = new ethers.providers.Web3Provider(ethereum);
    let signer = provider.getSigner();
    console.log('signer: ', await signer.getAddress());

    darkForest = new ethers.Contract(address['DarkForest'], darkForestArtifact.abi, signer);

    console.log("Connect to Dark Forest Contract:", darkForest);
}

export async function spawnPosition(x, y) {

    let calldata = await spawnCalldata(x, y);

    if (!calldata) { return "Invalid inputs to generate witness."; }

    //console.log(calldata[3]);

    let errorMsg;

    let spawnTxn = await darkForest.spawn(calldata[0], calldata[1], calldata[2], calldata[3])
        .catch((error) => {
            errorMsg = error.data.message;
        });

    console.log("transaction: ", spawnTxn);
    console.log("error: ", errorMsg);

    if (spawnTxn) {
        alert('Spawn transaction sent.')
        await spawnTxn.wait();
        return `Spawn transaction confirmed: ${spawnTxn.hash}`;
    }

    return errorMsg;

}
