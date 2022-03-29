import Web3 from "web3";
import WalletConnectProvider from "@walletconnect/web3-provider";

const walletConectConfig = {
  rpc: {
    1: "https://data-seed-prebsc-1-s1.binance.org:8545",
    97: "https://data-seed-prebsc-1-s1.binance.org:8545",
  },
};

let web3;
let provider;
let connectWalletButton;

function app() {
  connectWalletButton = document.getElementById("connect-wallet");
  connectWalletButton.addEventListener("click", connectWallet);
}

async function connectWallet() {
  provider = new WalletConnectProvider(walletConectConfig);
  web3 = new Web3(provider);

  try {
    const signatureResult = document.getElementById("signature");
    await provider.enable();
    const accounts = await web3.eth.getAccounts();

    const signMessage = "Sign this message";
    const signature = await web3.eth.personal.sign(web3.utils.utf8ToHex(signMessage), accounts[0]);

    signatureResult.innerHTML = signature;
  } catch (e) {
    signatureResult.innerHTML = e;
  }
}

window.addEventListener("load", app);
