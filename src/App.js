//import logo from './logo.svg';
import './App.css';
import PositionForm from "./positionForm"
import { useEffect, useState } from 'react';
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";

const testnetChainId = '0x6357d2e0';

function App() {

  const [currentAccount, setCurrentAccount] = useState(null);
  const [correctChain, setCorrectChain] = useState(null);

  const checkWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      alert("Make sure you have Metamask installed!");
      return;
    } else {
      console.log("Wallet exists! We're ready to go!")
    }

    const accounts = await ethereum.request({ method: 'eth_accounts' });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account: ", account);
      setCurrentAccount(account);
    } else {
      console.log("No authorized account found");
    }
  }

  const connectWalletHandler = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      alert("Please install Metamask!");
    }

    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      console.log("Found an account! Address: ", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (err) {
      console.log(err)
    }
  }

  const connectWalletButton = () => {
    return (
      <Button onClick={connectWalletHandler} variant="contained">
        Connect Wallet
      </Button>
    )
  }

  const checkChainId = async () => {
    const { ethereum } = window;
    let chainId = await ethereum.request({ method: 'eth_chainId' });
    console.log("Chain ID:", chainId, parseInt(chainId));
    if (chainId != testnetChainId) {
      try {
        await ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{
            chainId: testnetChainId
          }], // chainId must be in hexadecimal numbers
        });
        chainId = await ethereum.request({ method: 'eth_chainId' });
      } catch (error) {
        // This error code indicates that the chain has not been added to MetaMask
        // if it is not, then install it into the user MetaMask
        if (error.code == 4902) {
          try {
            await ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: testnetChainId,
                  chainName: 'Harmony Testnet',
                  nativeCurrency: {
                    name: 'ONE',
                    symbol: 'ONE',
                    decimals: 18
                  },
                  rpcUrls: ['https://api.s0.b.hmny.io'],
                  blockExplorerUrls: ['https://explorer.pops.one']
                },
              ],
            });
          } catch (addError) {
            console.error(addError);
          }
        }
        console.error(error);
      }
      window.location.reload();
    }

    setCorrectChain(chainId == testnetChainId);

  }

  useEffect(() => {
    checkWalletIsConnected();
    checkChainId();
  }, [])

  return (
    <div className="App">
      <div>
        {(currentAccount && correctChain) ? <PositionForm /> : (currentAccount ? <Alert severity="warning"> Please make sure you are connected to the correct network (Harmony testnet, Chain ID: 1666700000) in MetaMask then reload the page.</Alert> : connectWalletButton())}
      </div>
    </div>
  );
}

export default App;
