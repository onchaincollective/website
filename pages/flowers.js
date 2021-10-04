import Head from "next/head";
import { useEffect, useState, useRef } from "react";
import Web3, { utils } from "web3";
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { Web3ReactProvider, useWeb3React } from "@web3-react/core";
import cn from "classnames";
import Link from 'next/link'


const contractAddress = "0x5a876ffc6e75066f5ca870e20fca4754c1efe91f";

const injected = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42] });
const wcConnector = new WalletConnectConnector({
  infuraId: "6041be06ca6b4e848a530e495d66e45d",
});

const defaultMintPrice = 0.025;

function getLibrary(provider) {
  return new Web3(provider);
}

const abi = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "approved",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "approved",
          "type": "bool"
        }
      ],
      "name": "ApprovalForAll",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_claimAmount",
          "type": "uint256"
        },
        {
          "internalType": "address[]",
          "name": "entries",
          "type": "address[]"
        }
      ],
      "name": "addToWhitelist",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "allSalesPaused",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "enablePublicSale",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "getApproved",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        }
      ],
      "name": "isApprovedForAll",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "maxMint",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "maxPerAddress",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "maxSupply",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "walletAddress",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amountOfTokens",
          "type": "uint256"
        }
      ],
      "name": "mintForFriend",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amountOfTokens",
          "type": "uint256"
        }
      ],
      "name": "mintForSelf",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_addr",
          "type": "address"
        }
      ],
      "name": "mintedInfoFor",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "numHasMinted",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "numTokensMinted",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "ownerOf",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "price",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "privateSaleIsActive",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address[]",
          "name": "entries",
          "type": "address[]"
        }
      ],
      "name": "removeFromWhitelist",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "_data",
          "type": "bytes"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "approved",
          "type": "bool"
        }
      ],
      "name": "setApprovalForAll",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "newMaxMint",
          "type": "uint256"
        }
      ],
      "name": "setMaxMint",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "newMaxPerAddress",
          "type": "uint256"
        }
      ],
      "name": "setMaxPerAddress",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "newPrice",
          "type": "uint256"
        }
      ],
      "name": "setPrice",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes4",
          "name": "interfaceId",
          "type": "bytes4"
        }
      ],
      "name": "supportsInterface",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "toggleAllSalesPaused",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "index",
          "type": "uint256"
        }
      ],
      "name": "tokenByIndex",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "index",
          "type": "uint256"
        }
      ],
      "name": "tokenOfOwnerByIndex",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "tokenURI",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_addr",
          "type": "address"
        }
      ],
      "name": "whitelistInfoFor",
      "outputs": [
        {
          "internalType": "bool",
          "name": "isWhiteListed",
          "type": "bool"
        },
        {
          "internalType": "uint256",
          "name": "numHasMinted",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "allottedMints",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "withdrawAll",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    }
  ]


export default function WrappedHome() {
    return (
        <Web3ReactProvider getLibrary={getLibrary}>
        <Home />
        </Web3ReactProvider>
    );
}

function Home() {
    const { activate, active, account, library } = useWeb3React();
    const [working, setWorking] = useState(false);
    const [loading, setLoading] = useState(false);
    const [transactionReceipt, setTransactionReceipt] = useState(false);
    const [maxMintPerTransaction, setMaxMintPerTransaction] = useState(0);
    const [mintPrice, setMintPrice] = useState(defaultMintPrice);
    const [privateSaleIsActive, setPrivateSaleIsActive] = useState(true);
    const [tokensMintedPerAddress, setTokensMintedPerAddress] = useState(0);
    const [whitelist, setWhitelist] = useState(null);
    const [maxPerAddress, setMaxPerAddress] = useState(0);
    const [mintButtonText, setMintButtonText] = useState("Mint for yourself");
    const [mintDisabled, setMintDisabled] = useState(false);
    const [salesPaused, setSalesPaused] = useState(false);
    const [mintFriend, setMintFriend] = useState(false);
    const [contract, setContract] = useState(null);
    const [error, setError] = useState(null);
    const [totalSupply, setTotalSupply] = useState(0);
    const [maxSupply, setMaxSupply] = useState(0);
    const [friendAddress, setFriendAddress] = useState("");
    const [realFriendAddress, setRealFriendAddress] = useState("");
    const [mintNumber, setMintNumber] = useState('');
    const [transactionHash, setTransactionHash] = useState(null);
    const friendField = useRef();
    const mintNumberField = useRef();

    useEffect( () => { 
        document.querySelector("body").classList.remove("home"); 
        document.querySelector("body").classList.add("flowers");
    });

    function getMintPrice (mintNumber, mintPrice) {
      if (mintNumber === 12) {
        return (mintPrice*mintNumber).toString().slice(0,3)
      }
      return (mintPrice*mintNumber).toString().slice(0,5)
    }

    useEffect(() => {
        if (!library) return;
        console.log("Fetching details for account: ", account)
        const contract = new library.eth.Contract(abi, contractAddress);

        setContract(contract);

        setMintButtonText("Mint " + mintNumber + " flowers (" + getMintPrice(mintNumber, mintPrice) + ` eth total)`);

        contract.methods
        .price()
        .call()
        .then((res) => {
            setMintPrice(utils.fromWei(res,'ether'));
        }, handleError);

        contract.methods
        .privateSaleIsActive()
        .call()
        .then((res) => {
          setPrivateSaleIsActive(res);
          // setPrivateSaleIsActive(true);
        }, handleError);

        contract.methods
        .totalSupply()
        .call()
        .then((res) => {
        setTotalSupply(parseInt(res));
        // setTotalSupply(4096)
        }, handleError);

        contract.methods
        .maxSupply()
        .call()
        .then((res) => {
        setMaxSupply(parseInt(res));
        }, handleError);

        contract.methods
        .allSalesPaused()
        .call()
        .then((res) => {
        setSalesPaused(res);
        // setSalesPaused(false);
        }, handleError);

        contract.methods
        .maxMint()
        .call()
        .then((res) => {
        setMaxMintPerTransaction(parseInt(res))
        }, handleError);

        contract.methods
        .maxPerAddress()
        .call()
        .then((res) => {
        setMaxPerAddress(parseInt(res))
        // setMaxPerAddress(3)
        }, handleError);

        contract.methods
        .mintedInfoFor(account)
        // .balanceOf(account)
        .call()
        .then((res) => {
        setTokensMintedPerAddress(parseInt(res));
        }, handleError);

        contract.methods
        .whitelistInfoFor(account)
        .call()
        .then((res) => {
        setWhitelist(res);
        // setWhitelist({
        //   allottedMints: "0",
        //   isWhiteListed: false,
        //   numHasMinted: "0"
        // });
        console.log(res);
        }, handleError);

        setWorking(false);
        
    }, [account, loading]);


    useEffect(() => {
        console.log("======================================");
        console.log("Working: ", working);
        console.log("SalesPaused: ", salesPaused);
        console.log("privateSaleIsActive", privateSaleIsActive);
        console.log("Max Mint Per Transaction: ", maxMintPerTransaction);
        console.log("Max Mint Per Address: ", maxPerAddress);
        console.log("Total tokens minted per addy: ", tokensMintedPerAddress);
        console.log("Mint Number: ", mintNumber);
        console.log("maxSupply: ", maxSupply);
        console.log("is Whitlisted: ", whitelist && whitelist.isWhiteListed);
        console.log("Whitelist numHasMinted: ", whitelist && whitelist.numHasMinted);
        console.log("Whitelist allottedMints: ", whitelist && whitelist.allottedMints);
        console.log("mintNumber: ", mintNumber);
        // console.log("totalSupply >= maxSupply", totalSupply >= maxSupply);
        // console.log("(totalSupply + mintNumber) > maxSupply", (totalSupply + mintNumber) > maxSupply);
        // console.log("(mintNumber > maxMintPerTransaction)", (mintNumber > maxMintPerTransaction));
        // console.log("((parseInt(whitelist.numHasMinted)+ mintNumber) >= parseInt(whitelist.allottedMints)))", (whitelist && whitelist.isWhiteListed && ((parseInt(whitelist.numHasMinted)+ mintNumber) >= parseInt(whitelist.allottedMints))));

        
        setMintButtonText("Mint " + mintNumber + (mintNumber === 1 ? " flower (" : " flowers (") + getMintPrice(mintNumber, mintPrice) + " eth total)");

        if (salesPaused) {
            setMintButtonText("Minting is paused right now");
            setMintDisabled(salesPaused);
        } else {
            if (totalSupply >= maxSupply) {
                setMintButtonText("Minting has ended");
            } else if (((totalSupply + mintNumber) > maxSupply)) {
                setMintButtonText("Minting will exceed max supply");
            } else if ((mintNumber > maxMintPerTransaction)) {
                setMintButtonText("Reached max limit per transaction");
            } else if ((tokensMintedPerAddress + mintNumber) > maxPerAddress) {
                setMintButtonText("Max mint per wallet exceeded");
            } else if (mintNumber < 1) {
                setMintButtonText("You need to mint atleast 1");
            }

            setMintDisabled(
                working || 
                (totalSupply >= maxSupply ) || 
                ((totalSupply + mintNumber) > maxSupply) || 
                (mintNumber > maxMintPerTransaction) || 
                ((tokensMintedPerAddress + mintNumber) > maxPerAddress) || 
                (mintNumber < 1)
            )

            if (privateSaleIsActive) {
                if (totalSupply >= maxSupply) {
                    setMintButtonText("Minting has ended");
                } else if (((totalSupply + mintNumber) > maxSupply)) {
                    setMintButtonText("Minting will exceed max supply");
                } else if ((mintNumber > maxMintPerTransaction)) {
                    setMintButtonText("Reached max limit per transaction");
                } else if ((tokensMintedPerAddress + mintNumber) > maxPerAddress) {
                    setMintButtonText("Max mint per wallet exceeded");
                } else if (mintNumber < 1) {
                    setMintButtonText("You need to mint atleast 1");
                } else if (whitelist && whitelist.isWhiteListed && ((parseInt(whitelist.numHasMinted)+ mintNumber) > parseInt(whitelist.allottedMints))) {
                    setMintButtonText("Max mint per wallet exceeded");
                    setMintDisabled(
                        working || 
                        (totalSupply >= maxSupply ) || 
                        ((totalSupply + mintNumber) > maxSupply) || 
                        (mintNumber > maxMintPerTransaction) || 
                        ((tokensMintedPerAddress + mintNumber) > maxPerAddress) || 
                        (mintNumber < 1) ||
                        (whitelist && whitelist.isWhiteListed && ((parseInt(whitelist.numHasMinted)+ mintNumber) > parseInt(whitelist.allottedMints)))
                    )
                } 
            }

            if (mintFriend && ((friendAddress === '') || !library.utils.isAddress(friendAddress))) {
              setMintDisabled(true);
            }
        } 

        console.log("Mint Disabled", mintDisabled);

    }, [working, 
        totalSupply, 
        maxSupply, 
        salesPaused, 
        mintNumber, 
        maxMintPerTransaction,
        maxPerAddress, 
        tokensMintedPerAddress,
        privateSaleIsActive,
        whitelist,
        mintFriend]);


    useEffect(() => {
        if (isNaN(mintNumber)) {
          setMintNumber("");
        }
    }, [mintNumber])

    
    useEffect(() => {
        if (!friendAddress) {
          setMintDisabled(true);
          return;
        };

        if (!library.utils.isAddress(friendAddress) || (friendAddress === '')) {
          setMintDisabled(true);
        } else {
          setRealFriendAddress(friendAddress);
          setMintDisabled(false);
        }
        
    }, [friendAddress]);

    
    function handleError(err) {
        console.log('===========');
        console.error(err);
        setWorking(false);
        setLoading(false);
        setError(err);
    }
    
    function mintForSelf() {
        setLoading(true);
        setWorking(true);
        setError(null);
        setTransactionHash(null);
        setTransactionReceipt(null);
        console.log("Mint number" + mintNumber);
        let price = (mintPrice*mintNumber).toString().slice(0,5);

        contract.methods
            .mintForSelf(mintNumber)
            .send({ from: account, value: utils.toWei(price.toString(), "ether") })
            .on("transactionHash", (txHash) => {
                console.log(txHash);
                setTransactionHash(res.transactionHash)
                getTransactionReceiptMined(txHash, 1000);
            })
            .then((res) => {
            console.log(res);
            setWorking(false);
            setLoading(false);
            setTransactionHash(res.transactionHash);
            }, handleError);
    }

    function getTransactionReceiptMined(txHash, interval) {
        const transactionReceiptAsync = (resolve, reject) => {
            library.eth.getTransactionReceipt(txHash, (error, receipt) => {
                console.log("++++++++++++++++");
                console.log(receipt);
                if (error) {
                    reject(error);
                } else if (receipt == null) {
                    setTimeout(() => transactionReceiptAsync(resolve, reject), 1000);
                } else {
                    setTransactionReceipt(receipt);
                    setLoading(false);
                    resolve(receipt);
                }
            });
        };

        if (typeof txHash === "string") {
            return new Promise(transactionReceiptAsync);
        } else {
            setLoading(false);
            throw new Error("Invalid Type: " + txHash);
        }
    };

    function mintForFriend() {
        if (!realFriendAddress) {
          friendField.current.focus();
        }
        setError(null);
        setLoading(true);
        setWorking(true);
        setTransactionHash(null);
        setTransactionReceipt(null);
        let price = (mintPrice*mintNumber).toString().slice(0,5);
        contract.methods
          .mintForFriend(realFriendAddress, mintNumber)
          .send({ from: account, value: utils.toWei(price.toString(), "ether") })
          .then((res) => {
            setWorking(false);
            setLoading(false);
            setTransactionHash(res.transactionHash);
          }, handleError);
    }
  
  return (
    <main className="occ-home">
        <Head>
            <title>Flowers • OCC #1</title>
            <meta name="title" content="Flowers • OCC #1"/>
            <meta name="description" content="On-chain flower NFTs for you to own or to share."/>

            <meta property="og:type" content="website"/>
            <meta property="og:url" content="https://www.occ.xyz/flowers"/>
            <meta property="og:title" content="Flowers • OCC #1"/>
            <meta property="og:description" content="On-chain flower NFTs for you to own or to share."/>
            <meta property="og:image" content="https://www.occ.xyz/flowers/social_image.png"/>

            <meta property="twitter:card" content="summary_large_image"/>
            <meta property="twitter:url" content="https://www.occ.xyz/flowers"/>
            <meta property="twitter:title" content="Flowers • OCC #1"/>
            <meta property="twitter:description" content="On-chain flower NFTs for you to own or to share."/>
            <meta property="twitter:image" content="https://www.occ.xyz/flowers/social_image.png"/>
            <link rel="icon" href="/flowers/favicon.ico" sizes="any" />
            <link rel="icon" href="/flowers/icon.png" type="image/png" />
            <link rel="apple-touch-icon" href="/flowers/apple-touch-icon.png" />
            <link rel="manifest" href="/manifest.webmanifest" />
            {/* Global Site Tag (gtag.js) - Google Analytics */}
            <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=G-WBMC04PLCN`}
            />
            <script
                dangerouslySetInnerHTML={{
                __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-WBMC04PLCN', {
                page_path: window.location.pathname,
                });
            `,
                }}
            />
        </Head>
      
        <div className="flex align-center flex-col max-w-2xl mx-auto text-center p-4">
            <div className="mt-6 md:mt-10">
                <Link href="/">
                    <p className="text-sm mt-8 opacity-50 cursor-pointer">occ <span className="text-xs">#1</span></p>
                </Link>
                <header className="text-5xl md:text-6xl font-snell ml-8">
                    flowers
                </header>

                <p className="text-center max-w-3xl mx-auto text-xl text-left mt-2 md:p-4 p-6">
                Fully on-chain generative NFTs for you to own, or to share 🌼 <br/>
                Each flower will cost you <em>0.025 eth + gas fees to mint.</em> You can mint for yourself or for a friend. 
                The flower will be programmatically generated at the precise moment you mint it.</p>
            </div>
        </div>
        
        {!active && (
            <div className="flex align-center flex-col max-w-4xl mx-auto text-xl text-left mt-10 pb-4">
                <ConnectButtons setWorking={setWorking} activate={activate} />
            </div>
        )}
        {/* <div className="btn rounded-full flex justify-center space-x-2 images-center shadow-md border-2 w-52 h-14 text-base font-normal m-2"
            onClick={withdrawStuff}>
            Withdraw
        </div> */}
        {active && privateSaleIsActive && (whitelist && !whitelist.isWhiteListed) && (
              <p className="text-center max-w-3xl mx-auto text-xl text-left mt-2 md:p-4 p-6">
                Looks like you're not in the pre-sale list. Public sale starts from 4th Oct 17:00 UTC
              </p>
        )}

        {active && (privateSaleIsActive ? (whitelist && whitelist.isWhiteListed) : true) && (
            <div>
                <p className="text-center max-w-2xl mx-auto text-xl text-left mt-4 mb-4 md:px-4 px-6">
                    {totalSupply} / {maxSupply} 🌺 have been minted so far
                </p>

                <div className="max-w-md mx-auto text-center mt-12 h-16 md:px-4 px-6">
                    <div className="flex items-end flex-col items-end w-full"
                    onChange={(event) => {
                    setMintNumber(parseInt(event.target.value));
                    }}>
                        <input
                        name="answer"
                        className="mint-qty-input flex text-md md:text-lg"
                        placeholder="Qty. (Max 12)"
                        min="1"
                        max="12"
                        value={mintNumber || ""}
                        onChange={(event) => {
                          setMintNumber(parseInt(event.target.value));
                          }}
                        />
                        <div className="mint-options flex flex-row justify-end">
                            <div className="radio">
                                <input
                                name="answer"
                                type="radio"
                                id="one"
                                hidden="hidden"
                                value="1"
                                />
                                <label
                                htmlFor="one"
                                className={mintNumber == 1 ? "mint-qty active": "mint-qty"}
                                >
                                <span className="flex italic font-light crimson-pro text-2xl">
                                    <svg width="16" height="16" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M24.5604 23.1506C22.6764 22.4941 18.5771 22.8342 17.2294 24.1325V15.4486C17.2294 15.0407 16.8997 14.7109 16.4917 14.7109C16.0838 14.7109 15.7541 15.0407 15.7541 15.4486V24.1325C14.4063 22.8342 10.3071 22.4941 8.42308 23.1506C7.87647 23.3417 12.3062 29.6045 15.4361 26.4753C15.5601 26.3514 15.6619 26.2319 15.7541 26.1139V28.7267C15.7541 29.1346 16.0838 29.4644 16.4917 29.4644C16.8997 29.4644 17.2294 29.1346 17.2294 28.7267V26.1139C17.3216 26.2319 17.4234 26.3514 17.5473 26.4753C20.6773 29.6045 25.107 23.3417 24.5604 23.1506Z" fill="#77B255"/>
                                    <path d="M12.4827 21.8286C12.026 21.6324 11.666 21.2112 11.4661 20.7125L10.5322 18.2738L8.12891 17.2462C7.14338 16.8228 6.74504 15.8284 7.16698 14.8421L8.17169 12.4956L7.16551 10.0841C6.76643 9.08828 7.27616 7.96849 8.27202 7.57015L10.6857 6.62519L11.7546 4.12891C12.1773 3.14338 13.1716 2.74504 14.1579 3.16698L16.5612 4.19678L18.9712 3.18911C19.4691 2.98921 20.0121 2.98552 20.4687 3.181C20.9253 3.37648 21.2905 3.78515 21.4904 4.28308L22.4302 6.71002L24.8711 7.75531C25.8566 8.17725 26.2543 9.17237 25.8338 10.1586L24.7634 12.6549L25.7703 15.0649C26.1694 16.0608 25.6597 17.1791 24.6638 17.5781L22.2509 18.5231L21.2455 20.8711C20.8235 21.8566 19.8277 22.2557 18.8421 21.8338L16.4019 20.7885L13.9919 21.7947C13.4933 21.9946 12.9393 22.0241 12.4827 21.8286Z" fill="#CCD6DD"/>
                                    <path d="M24.8711 7.75652L22.4302 6.71124L22.3896 6.60575C21.2351 7.59202 18.5426 9.81758 18.5426 9.81758L18.5478 9.90831C17.9805 9.45833 17.2738 9.17875 16.4941 9.17875V4.16922L14.1579 3.16894C13.1716 2.74699 12.1773 3.14533 11.7546 4.13086L10.6857 6.62715L10.6407 6.64485L14.1468 10.1517C13.5464 10.7515 13.1746 11.5814 13.1746 12.4983H8.17096L7.16698 14.8426C6.74504 15.8289 7.14338 16.824 8.12891 17.2467L10.5322 18.275L10.5337 18.2794L13.8503 14.4863C14.4567 15.2904 15.4105 15.8178 16.4941 15.8178H16.4978C16.5022 17.2777 16.5089 19.7076 16.5067 20.8347L18.8406 21.835C19.8262 22.2569 20.822 21.8579 21.244 20.8723L22.2487 18.5265L18.4187 15.1945C19.2596 14.5925 19.8129 13.6122 19.8129 12.499C19.8129 12.4466 19.7996 12.398 19.7974 12.3456C21.1267 12.4798 23.4496 12.6938 24.8298 12.8192L24.7619 12.6569L25.833 10.1599C26.2543 9.17359 25.8559 8.17847 24.8711 7.75652Z" fill="#E1E8ED"/>
                                    <path d="M16.493 16.1873C18.5301 16.1873 20.1814 14.5359 20.1814 12.4989C20.1814 10.4619 18.5301 8.81055 16.493 8.81055C14.456 8.81055 12.8047 10.4619 12.8047 12.4989C12.8047 14.5359 14.456 16.1873 16.493 16.1873Z" fill="#F4900C"/>
                                    </svg>
                                </span>
                                x1
                                </label>
                            </div>
                            <div className="radio mx-1 md:mx-2">
                                <input
                                name="answer"
                                type="radio"
                                id="four"
                                hidden="hidden"
                                value="4"
                                />
                                <label
                                htmlFor="four"
                                className={mintNumber == 4 ? "mint-qty active": "mint-qty"}
                                >
                                <span className="flex italic font-light crimson-pro">
                                    <svg width="16" height="16" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M30.1178 28.2927C30.1178 28.2927 30.1114 28.2608 30.096 28.2009C30.081 28.1405 30.0585 28.051 30.025 27.9363C29.9935 27.8199 29.949 27.6801 29.896 27.5139C29.8461 27.3447 29.7707 27.1649 29.6878 26.9588L29.5509 26.6362C29.501 26.5243 29.451 26.4042 29.389 26.2882C29.3292 26.1699 29.2666 26.0463 29.1987 25.9197C29.1294 25.7875 29.0582 25.6564 28.985 25.5263C28.8282 25.264 28.6539 24.9884 28.4647 24.6984C28.3669 24.5576 28.2627 24.4167 28.1571 24.2699C28.0488 24.1263 27.9397 23.9756 27.823 23.8276C27.7031 23.684 27.5817 23.5349 27.4542 23.3864C27.3255 23.2395 27.1989 23.0819 27.0574 22.939C26.779 22.6468 26.4902 22.339 26.1712 22.0531C26.0129 21.9083 25.8535 21.7582 25.6864 21.6145C25.6007 21.543 25.5144 21.4708 25.427 21.3986C25.4208 20.9494 25.3079 20.508 25.0979 20.1109C25.0979 20.1109 24.9262 19.7854 24.6029 19.2279C24.5205 19.0894 24.424 18.9389 24.3195 18.7749C24.2141 18.6114 24.1035 18.4325 23.9764 18.247C23.7176 17.8788 23.4299 17.4604 23.0819 17.028L22.8199 16.6945C22.729 16.5824 22.632 16.4717 22.535 16.3579C22.3397 16.1314 22.143 15.8934 21.9219 15.6642C21.7042 15.4324 21.4849 15.1911 21.2441 14.9594L20.883 14.6055C20.761 14.4869 20.6319 14.3729 20.505 14.2551C20.3765 14.1388 20.2472 14.0215 20.115 13.9055L19.7086 13.5632C19.4404 13.3292 19.1478 13.1159 18.8622 12.8925C18.7801 12.8302 18.6975 12.7687 18.6142 12.7079L18.4739 12.205C18.4496 12.1141 18.4204 12.0255 18.3988 11.9334L18.3338 11.6579C18.291 11.4745 18.2469 11.2922 18.2004 11.1111C18.1755 11.0212 18.1591 10.9287 18.1409 10.837C18.1231 10.7456 18.1044 10.6543 18.0848 10.5632L17.9695 10.0216C17.9307 9.84223 17.9045 9.66111 17.8717 9.48367C17.7304 8.77455 17.6331 8.08361 17.5199 7.44067C17.4983 7.27923 17.4744 7.12061 17.451 6.96517C17.4287 6.81273 17.4051 6.66047 17.3802 6.50842L17.3449 6.28755C17.3331 6.21473 17.3187 6.14286 17.3102 6.07173C17.292 5.93318 17.2727 5.79478 17.2522 5.65655C17.2159 5.40352 17.1768 5.1509 17.135 4.89873L17.1065 4.72561C17.0967 4.66905 17.0864 4.61348 17.0791 4.5593L17.0329 4.24886C16.9863 3.94064 16.9338 3.63334 16.8755 3.32711C16.8339 3.11248 16.8074 2.99673 16.8074 2.99673L16.8044 2.9833C16.7855 2.90231 16.7424 2.82897 16.681 2.77299C16.6195 2.71701 16.5424 2.68101 16.46 2.66978C16.3777 2.65855 16.2938 2.6726 16.2196 2.71008C16.1453 2.74756 16.0842 2.8067 16.0444 2.87967C16.0444 2.87967 15.9875 2.98392 15.8887 3.18173C15.7475 3.46731 15.6125 3.75589 15.4837 4.0473C15.3101 4.4218 15.1378 4.88661 14.9432 5.42461C14.893 5.56339 14.844 5.7026 14.7962 5.84223C14.7466 5.98611 14.7042 6.13623 14.658 6.28992C14.6105 6.44771 14.5644 6.60592 14.5197 6.76455C14.4733 6.92705 14.4258 7.09373 14.3801 7.26461C14.2159 7.95286 14.0414 8.70442 13.9316 9.5223C13.908 9.69667 13.8797 9.87273 13.8579 10.0524C13.6239 9.95973 13.3882 9.87548 13.158 9.79073C12.83 9.68117 12.5119 9.57036 12.1899 9.4838C12.0296 9.4393 11.8747 9.39023 11.7159 9.35217L11.2485 9.23936C10.9375 9.17273 10.639 9.10611 10.3414 9.06255C10.1932 9.03955 10.0503 9.01298 9.90624 8.99498L9.48324 8.94561C9.34599 8.9293 9.20774 8.92011 9.07499 8.91005C8.94186 8.90036 8.81242 8.89117 8.68342 8.88817C8.55536 8.88361 8.43111 8.87917 8.31049 8.87723L7.95461 8.88205C7.89724 8.88336 7.84155 8.88311 7.78574 8.8858L7.62011 8.89642L7.30886 8.91805L7.01867 8.95267C6.92711 8.96361 6.83974 8.97448 6.75449 8.99105C6.58436 9.02273 6.44367 9.04517 6.29355 9.08255L6.09805 9.1298C6.0693 9.13717 6.03849 9.14411 6.01574 9.1518L5.95586 9.17436C5.80492 9.23105 5.72467 9.2638 5.72467 9.2638C5.48661 9.36298 5.29655 9.57811 5.24486 9.85042C5.16317 10.2809 5.44592 10.696 5.8763 10.7777L5.87867 10.7781C5.87867 10.7781 5.96392 10.7943 6.12324 10.8199L6.18649 10.8302C6.20699 10.8344 6.22205 10.8414 6.24111 10.8469L6.35886 10.8844L6.67455 10.9835C6.70524 10.9938 6.73592 11.0017 6.76855 11.013L6.86905 11.0486L7.08167 11.1235L7.31342 11.2134L7.43461 11.2605L7.56074 11.3136C7.90061 11.4495 8.28211 11.6349 8.69005 11.8358C8.89399 11.942 9.10474 12.0502 9.32111 12.1707L9.4843 12.2598L9.64867 12.356C9.75924 12.4199 9.87161 12.4817 9.98411 12.549C10.208 12.6882 10.4385 12.8232 10.6694 12.9737C10.7851 13.0474 10.902 13.1207 11.0175 13.2014L11.37 13.4347L11.7215 13.6835C11.8407 13.7635 11.9577 13.8504 12.0754 13.937C12.3126 14.1062 12.5445 14.2906 12.7805 14.4696C13.2035 14.8062 13.6297 15.146 14.0364 15.5102C14.0551 15.6066 14.0739 15.7029 14.0934 15.7995C14.1154 15.926 14.1527 16.0524 14.1841 16.1792C14.2164 16.3064 14.25 16.4333 14.2847 16.5599L14.3574 16.8235C14.1615 16.8001 13.9643 16.7859 13.7702 16.7673L13.415 16.7359C13.2977 16.7234 13.1779 16.7235 13.0604 16.717C12.8244 16.7078 12.5913 16.6964 12.3604 16.6902C12.1282 16.689 11.8976 16.6927 11.6708 16.6944L11.3324 16.7016L10.9964 16.7206C10.7739 16.7342 10.5547 16.7514 10.3393 16.7668C10.1226 16.7885 9.90917 16.818 9.70005 16.8432C9.59542 16.8566 9.49186 16.8685 9.38924 16.8832C9.28649 16.8985 9.18411 16.9188 9.08317 16.9362C8.88514 16.971 8.68748 17.0079 8.49024 17.047C8.29699 17.0842 8.10711 17.1355 7.92286 17.1809C7.7383 17.2287 7.5588 17.2688 7.38405 17.3237C7.20924 17.3783 7.0393 17.431 6.87492 17.4859C6.71055 17.5404 6.55105 17.5894 6.39767 17.6541C6.24417 17.715 6.0958 17.7728 5.95355 17.8324L5.74399 17.919C5.67536 17.9464 5.60905 17.982 5.54374 18.0127C5.4133 18.0763 5.28817 18.1364 5.1693 18.197L4.99505 18.2852C4.93805 18.3142 4.88417 18.3408 4.82792 18.3742C4.71717 18.4377 4.61249 18.4977 4.51467 18.5567C4.42229 18.6112 4.33068 18.667 4.23986 18.724C4.15505 18.7775 4.07274 18.8265 4.0118 18.8755C3.88155 18.9705 3.77349 19.0589 3.68449 19.1267C3.5078 19.2659 3.41524 19.3449 3.41524 19.3449C3.27674 19.4642 3.18517 19.6265 3.17992 19.8237C3.17017 20.195 3.46292 20.4991 3.8338 20.4991H3.83417C3.83417 20.4991 3.95586 20.5167 4.18086 20.5138C4.29267 20.5105 4.43236 20.5184 4.59336 20.5104C4.67674 20.5039 4.75511 20.5143 4.84036 20.5182C4.92561 20.5232 5.01455 20.5279 5.10767 20.5313C5.19955 20.5341 5.29642 20.5379 5.39792 20.541C5.49874 20.5445 5.61386 20.554 5.72724 20.56C5.95755 20.5761 6.1983 20.5772 6.46124 20.6066C6.72292 20.6322 6.99361 20.644 7.28342 20.6841C7.42755 20.702 7.57405 20.717 7.72317 20.7329C7.7973 20.7387 7.87405 20.754 7.95049 20.7642L8.18205 20.7973L8.41705 20.8306C8.49599 20.8413 8.57486 20.849 8.65592 20.8651C8.8173 20.8941 8.98074 20.9225 9.14605 20.9485C9.2288 20.9626 9.31161 20.9739 9.39567 20.9904C9.47986 21.0085 9.56455 21.0239 9.64961 21.0407C9.81986 21.0732 9.99167 21.1084 10.1654 21.1391C10.3399 21.1778 10.5159 21.2186 10.6935 21.2561L10.9612 21.3122L11.2315 21.3802C11.4127 21.4238 11.5951 21.4646 11.7787 21.5104C11.9624 21.5615 12.1479 21.608 12.334 21.6572C12.5201 21.7036 12.7076 21.7584 12.8959 21.8125L13.1789 21.8933C13.2735 21.92 13.3688 21.9439 13.4635 21.9752C13.6534 22.0334 13.8435 22.0945 14.0354 22.1503C14.1314 22.1769 14.227 22.2085 14.3227 22.2409L14.6102 22.3363C14.9966 22.4513 15.3783 22.6012 15.7665 22.726C15.9587 22.7969 16.1498 22.8719 16.3434 22.9393C16.4397 22.9747 16.537 23.0062 16.6325 23.0445L16.9191 23.158C17.11 23.2342 17.3045 23.2997 17.4935 23.3802L17.7776 23.4986L18.063 23.6124C18.1586 23.6489 18.2523 23.6898 18.3457 23.7312L18.6261 23.8537C18.8135 23.9334 19.002 24.0095 19.1855 24.0947C19.3696 24.1768 19.5546 24.2571 19.7403 24.3355C19.9233 24.4177 20.1041 24.5022 20.2865 24.5815C20.3772 24.622 20.4682 24.6614 20.5598 24.6997L20.8276 24.824C21.0047 24.9082 21.185 24.9847 21.3624 25.0636C21.5357 25.149 21.7114 25.2279 21.885 25.3077C21.9721 25.347 22.0578 25.3881 22.1454 25.4253L22.4 25.547C22.5683 25.629 22.7386 25.7051 22.9068 25.7815C23.07 25.8618 23.2339 25.9406 23.3985 26.018C23.7284 26.1677 24.0384 26.3285 24.3506 26.4736C24.5071 26.546 24.6565 26.622 24.805 26.6962C24.9535 26.7704 25.103 26.8397 25.2484 26.91L25.6709 27.1229L26.083 27.323C26.3459 27.4594 26.6004 27.588 26.8467 27.7059C27.0718 27.8252 27.2988 27.9411 27.5275 28.0534C27.636 28.106 27.7376 28.1588 27.8342 28.2107L28.1165 28.3557C28.4845 28.5338 28.7674 28.688 28.9737 28.7857C29.0752 28.8359 29.1561 28.8727 29.2109 28.8975C29.2652 28.9227 29.2947 28.9348 29.2947 28.9348L29.326 28.9476C29.4322 28.9911 29.5489 29.0022 29.6614 28.9793C29.7365 28.9642 29.8078 28.9344 29.8714 28.8918C29.9349 28.8491 29.9894 28.7943 30.0318 28.7305C30.0742 28.6668 30.1036 28.5953 30.1183 28.5202C30.1331 28.4451 30.1329 28.3678 30.1178 28.2927Z" fill="#00B89C"/>
                                    <path d="M31.2136 28.8771C31.2136 28.8771 31.1502 28.7545 31.0245 28.5304C30.8423 28.2086 30.654 27.8903 30.4596 27.5758C30.3195 27.3537 30.1769 27.1332 30.0318 26.9143C29.8741 26.675 29.7018 26.4175 29.5089 26.1493C29.4106 26.01 29.3112 25.8714 29.2108 25.7336C29.1078 25.5912 29.0021 25.4446 28.8898 25.2971C28.7751 25.1455 28.659 24.9949 28.5418 24.8452C28.4198 24.6876 28.2967 24.531 28.1723 24.3752C27.9166 24.0581 27.6421 23.7339 27.3573 23.3985C27.069 23.0657 26.7613 22.7294 26.4457 22.382C26.315 22.2463 26.1828 22.1082 26.0493 21.9694L25.9606 21.7974C25.9151 21.7081 25.8676 21.6199 25.8203 21.5311C25.7745 21.4417 25.7218 21.3553 25.6824 21.2622C25.5991 21.0781 25.5113 20.8957 25.4235 20.7124C25.3306 20.5312 25.2597 20.3397 25.1782 20.1527L25.0581 19.8706L24.9977 19.7294L24.9447 19.5852L24.7292 19.0087C24.4611 18.2321 24.2354 17.4374 24.0616 16.6302C24.0252 16.4264 23.9853 16.2237 23.9462 16.0211C23.924 15.9204 23.9113 15.8174 23.8976 15.7147L23.8513 15.408C23.8368 15.3056 23.8171 15.2046 23.8065 15.1014L23.7756 14.7922C23.7522 14.5867 23.7228 14.3828 23.7137 14.1752C23.7001 13.9684 23.6746 13.764 23.6646 13.5575C23.6571 13.3506 23.6421 13.1446 23.6306 12.9394C23.6196 12.5264 23.5982 12.1172 23.5997 11.7074C23.5885 11.2996 23.602 10.8919 23.5991 10.4907C23.607 10.2896 23.6091 10.0894 23.6121 9.89112L23.6144 9.74275L23.62 9.5945L23.6297 9.29981C23.6367 8.90918 23.6605 8.524 23.6696 8.14875L23.6951 7.59231C23.6998 7.50106 23.7017 7.40987 23.7046 7.31968C23.7073 7.22943 23.7137 7.13993 23.7181 7.05125L23.7612 6.02237L23.7935 5.07768L23.8038 4.64193C23.8085 4.50131 23.8105 4.36475 23.8126 4.23337L23.8172 3.50562C23.8159 3.284 23.8132 3.08537 23.8074 2.91056C23.8026 2.73606 23.7993 2.5875 23.7918 2.46537C23.7866 2.344 23.7795 2.24981 23.7748 2.18631C23.7727 2.15405 23.77 2.12184 23.7666 2.08968L23.766 2.08406C23.7544 1.98393 23.7144 1.88921 23.6507 1.81113C23.5869 1.73304 23.5021 1.67485 23.4064 1.64344C23.3106 1.61204 23.2078 1.60873 23.1102 1.63392C23.0126 1.65911 22.9243 1.71173 22.8556 1.78556C22.8556 1.78556 22.8328 1.81018 22.7915 1.85893C22.7497 1.90756 22.6878 1.97975 22.611 2.07543C22.4551 2.26593 22.2345 2.54837 21.974 2.91881L21.7706 3.21218C21.7025 3.31631 21.629 3.42487 21.5566 3.5395C21.4093 3.768 21.2528 4.01668 21.0971 4.28918C21.0171 4.42456 20.9386 4.56575 20.8563 4.71106C20.7747 4.85687 20.6978 5.00993 20.6148 5.166C20.5344 5.32306 20.4511 5.48337 20.3702 5.65087L20.13 6.16806C20.0473 6.3489 19.9687 6.53155 19.8942 6.71587C19.8191 6.90437 19.7371 7.09512 19.6638 7.293C19.5205 7.69118 19.3687 8.10231 19.2435 8.53925C19.1073 8.97162 18.9959 9.42843 18.8859 9.897C18.8348 10.1362 18.7875 10.3761 18.7441 10.6168C18.696 10.8591 18.66 11.1085 18.6277 11.3602C18.595 11.6119 18.5556 11.8651 18.54 12.1251L18.5088 12.5152C18.4993 12.6461 18.4856 12.7764 18.4841 12.9092C18.4781 13.1744 18.4687 13.4416 18.4669 13.7102L18.466 13.8111L18.4691 13.9125L18.4758 14.1158C18.4808 14.2515 18.4838 14.3877 18.4908 14.5239C18.4991 14.7962 18.5295 15.0707 18.5551 15.3459L18.5996 15.7586C18.6151 15.8962 18.6405 16.0339 18.6608 16.1717C18.6648 16.196 18.6685 16.2203 18.6723 16.2447C18.5305 16.1655 18.3877 16.0879 18.244 16.012L17.4734 15.6232C17.3456 15.5583 17.2133 15.5001 17.0821 15.4406L16.6886 15.2631C16.5571 15.2049 16.428 15.1433 16.295 15.0885L15.895 14.9279C14.8298 14.5044 13.7403 14.1662 12.6595 13.9461C12.3914 13.8856 12.1216 13.8381 11.8543 13.7955C11.587 13.7527 11.3241 13.7048 11.059 13.6809L10.6661 13.6377C10.5359 13.6239 10.4071 13.6077 10.2776 13.6009C10.0188 13.5862 9.7644 13.569 9.5129 13.5599C8.50646 13.5322 7.55846 13.5737 6.69708 13.6944C5.83521 13.8024 5.06083 13.9774 4.38802 14.1644C4.2194 14.2089 4.05821 14.2609 3.90296 14.3118C3.75356 14.3599 3.60469 14.4097 3.4564 14.4611L3.24758 14.5336L3.04558 14.6114C2.91402 14.6617 2.78971 14.7142 2.67215 14.7615C2.19302 14.9518 1.87008 15.1359 1.63515 15.2619C1.54638 15.3099 1.45849 15.3596 1.37152 15.4108C1.31196 15.4451 1.2814 15.4646 1.2814 15.4646C1.12031 15.5678 0.999092 15.7227 0.937647 15.9039C0.78771 16.3454 1.02408 16.8249 1.46565 16.9749C1.46565 16.9749 1.49996 16.9866 1.56608 17.0054C1.63227 17.0251 1.73033 17.0536 1.85777 17.0866C2.10952 17.1556 2.49852 17.2384 2.93158 17.3575C3.04177 17.3844 3.15746 17.4152 3.27758 17.443L3.46183 17.4874L3.6574 17.5372C3.9229 17.6076 4.20771 17.6664 4.50796 17.744C5.10846 17.8966 5.77283 18.0539 6.47702 18.2467C7.18302 18.4266 7.92658 18.6504 8.69752 18.8816C8.88921 18.9459 9.08396 19.0032 9.27996 19.0637L9.87008 19.2603L10.0191 19.3095C10.0691 19.3247 10.1191 19.3404 10.1687 19.359L10.4681 19.4657C10.6678 19.5395 10.8723 19.5988 11.0733 19.6807C11.8852 19.9717 12.7117 20.3033 13.5508 20.6587C13.7609 20.7464 13.9726 20.8327 14.1828 20.9296L14.4993 21.0707C14.605 21.1178 14.7112 21.1636 14.8157 21.2164L15.4505 21.5154C15.5563 21.5662 15.6603 21.6227 15.766 21.6749L16.0835 21.8321C16.2967 21.9327 16.504 22.0516 16.7154 22.1601L17.0323 22.3241C17.1382 22.3777 17.2416 22.4392 17.3463 22.4963C17.5545 22.6138 17.7668 22.7227 17.9751 22.8396C18.1817 22.9601 18.3895 23.0784 18.5986 23.1946C19.425 23.6756 20.2461 24.1571 21.038 24.6509C21.2358 24.7739 21.4348 24.8917 21.6293 25.0158C21.8247 25.1381 22.0168 25.2615 22.2107 25.3791L23.3408 26.0911L23.8858 26.4395C24.065 26.5544 24.2455 26.6624 24.419 26.7754C24.7671 27.0001 25.1075 27.2137 25.4362 27.4192C25.5986 27.5245 25.7598 27.6256 25.9176 27.7245C26.0284 27.7945 26.1396 27.8638 26.2512 27.9324L26.3915 28.0302C26.4672 28.0814 26.5456 28.1271 26.621 28.1747C26.9396 28.3731 27.2608 28.5673 27.5846 28.7572L27.6246 28.7789L28.0128 29.0146C28.2324 29.147 28.4533 29.277 28.6756 29.4047C29.0781 29.6397 29.3993 29.8214 29.6221 29.9418C29.845 30.0623 29.9674 30.1233 29.9674 30.1233L29.9842 30.1318C30.114 30.1957 30.257 30.2282 30.4017 30.2268C30.5464 30.2253 30.6887 30.1898 30.8171 30.1232C31.2709 29.8885 31.4483 29.3306 31.2136 28.8771Z" fill="#009E83"/>
                                    <path d="M13.5897 11.0351C13.1962 9.6822 12.8351 8.5977 11.4822 8.99127C11.4574 8.99845 11.4326 9.00639 11.4077 9.01502C11.2223 9.0749 11.0444 9.15578 10.8774 9.25608C10.7643 9.32402 10.6284 9.21933 10.6621 9.09177C10.7183 8.87878 10.7466 8.65942 10.7465 8.43914C10.7465 7.0302 9.6043 6.98633 8.19536 6.98633C6.78643 6.98633 5.64424 7.0302 5.64424 8.43914C5.64424 8.46495 5.64493 8.49095 5.64624 8.51727C5.65093 8.6732 5.66955 8.82558 5.70099 8.97327C5.72718 9.09627 5.59705 9.19433 5.4878 9.13202C5.3311 9.04273 5.16539 8.97031 4.99343 8.91595C3.65005 8.49108 3.2638 9.56689 2.83899 10.9103C2.41411 12.2536 2.11155 13.3559 3.45493 13.7808C3.47949 13.7885 3.50455 13.7958 3.52999 13.8025C3.65799 13.8387 3.78661 13.8646 3.91486 13.8804C4.03686 13.8955 4.08618 14.0456 3.99705 14.1303C3.88315 14.2385 3.77952 14.357 3.68749 14.4844C2.8618 15.6261 3.76161 16.331 4.9033 17.1566C6.04499 17.9822 6.99624 18.616 7.82186 17.4743C7.83699 17.4534 7.85168 17.4319 7.86605 17.4098L7.86755 17.4076C7.92855 17.3175 8.06336 17.3193 8.11618 17.4145C8.12999 17.4393 8.14424 17.464 8.15899 17.4885C8.88593 18.6955 9.88699 18.1438 11.0939 17.4168C12.3009 16.6899 13.2567 16.063 12.5297 14.8561C12.5163 14.8338 12.5023 14.8118 12.4877 14.7902C12.3577 14.588 12.1998 14.4053 12.0185 14.2474C11.9151 14.1574 11.9797 13.987 12.1167 13.9913C12.3773 13.9994 12.6435 13.9674 12.9074 13.8906C14.2602 13.4969 13.9832 12.388 13.5897 11.0351Z" fill="#74A1F0"/>
                                    <path d="M10.7662 11.2004L10.7546 11.1928C10.7438 11.1855 10.7327 11.1788 10.7213 11.1725L10.6685 11.1419C10.6484 11.1317 10.6248 11.1187 10.5994 11.1071C10.574 11.0952 10.5457 11.0817 10.5161 11.0701C10.4858 11.057 10.4542 11.0456 10.4205 11.0338C10.3489 11.0085 10.2756 10.9883 10.2011 10.9734C10.045 10.9418 9.87261 10.9317 9.70005 10.9539C9.61361 10.9647 9.52755 10.9846 9.44199 11.0102C9.35561 11.0355 9.2702 11.064 9.18593 11.0956C9.1832 11.0113 9.17748 10.927 9.1688 10.8431C9.16005 10.7542 9.14586 10.667 9.12311 10.5829C9.0783 10.4148 9.00368 10.2591 8.9153 10.1266C8.87326 10.0633 8.82679 10.0031 8.77624 9.94643C8.75388 9.9207 8.73059 9.89579 8.70643 9.87174C8.68443 9.84868 8.66124 9.82762 8.64061 9.80862C8.62018 9.78956 8.59924 9.77268 8.58218 9.75793L8.53386 9.72068C8.52376 9.71252 8.51329 9.70483 8.50249 9.69762C8.49867 9.695 8.49486 9.69238 8.49105 9.68974C8.23393 9.51331 7.88099 9.51681 7.62555 9.72249L7.61474 9.73125C7.60724 9.737 7.59711 9.74556 7.58518 9.75662L7.53986 9.79743C7.52393 9.81343 7.50436 9.83187 7.48543 9.85237C7.4663 9.87293 7.4448 9.89568 7.42461 9.92031C7.4028 9.94499 7.38224 9.97162 7.36061 10.0001C7.31449 10.0604 7.2727 10.1239 7.23555 10.1902C7.15749 10.329 7.0948 10.4899 7.0628 10.6609C7.04649 10.7465 7.03886 10.8345 7.03686 10.9237C7.03434 11.0138 7.03515 11.104 7.0393 11.194L7.04005 11.2047C6.9568 11.1832 6.87281 11.1648 6.78824 11.1493C6.70049 11.1328 6.6128 11.1221 6.52574 11.1203C6.35174 11.1162 6.18143 11.1442 6.02943 11.192C5.95349 11.2157 5.88218 11.2441 5.81755 11.2751C5.7853 11.2904 5.75499 11.3049 5.7263 11.3212C5.69799 11.3359 5.6713 11.3522 5.64724 11.3667C5.62324 11.3809 5.60118 11.3963 5.58218 11.4086L5.53286 11.4446C5.51955 11.4539 5.50918 11.4621 5.50193 11.4682L5.49118 11.4771C5.24974 11.6745 5.1543 12.0143 5.28018 12.3171L5.28549 12.3299C5.28893 12.3387 5.29424 12.3509 5.30155 12.3654L5.32805 12.4203C5.33893 12.4401 5.35118 12.4641 5.36555 12.488C5.37993 12.5121 5.39574 12.5391 5.41374 12.5654C5.43136 12.5933 5.45111 12.6204 5.47236 12.6492C5.51736 12.7104 5.56665 12.7683 5.61986 12.8225C5.73124 12.9364 5.86818 13.0416 6.02336 13.1202C6.10093 13.1598 6.1833 13.1917 6.26836 13.2187C6.29205 13.2264 6.3163 13.2332 6.34036 13.2404C6.3258 13.2609 6.31093 13.2812 6.29699 13.3019C6.24643 13.3754 6.20111 13.4513 6.16436 13.5302C6.0903 13.6877 6.04711 13.8549 6.0293 14.0132C6.02071 14.0887 6.01747 14.1646 6.01961 14.2406C6.02055 14.2762 6.02168 14.3099 6.02493 14.3426C6.02693 14.3744 6.03105 14.4055 6.03455 14.4333C6.03793 14.4611 6.04299 14.4874 6.04661 14.5097L6.05955 14.5694C6.06274 14.5853 6.06599 14.5981 6.06868 14.6072L6.07236 14.6207C6.15536 14.9213 6.42755 15.146 6.75543 15.1532L6.76936 15.1536C6.7788 15.154 6.79205 15.154 6.8083 15.1532L6.8693 15.1512C6.8918 15.1492 6.91868 15.1477 6.94636 15.1442C6.97424 15.1409 7.0053 15.1373 7.03668 15.1315C7.07034 15.1261 7.1038 15.1195 7.13699 15.1117C7.21114 15.0953 7.28403 15.0737 7.35511 15.0469C7.5043 14.9911 7.65586 14.9084 7.79049 14.7982C7.85811 14.7433 7.92061 14.6809 7.97961 14.6139C7.9963 14.5953 8.0123 14.5759 8.02861 14.5568C8.04143 14.5784 8.05399 14.6002 8.06724 14.6214C8.11411 14.6973 8.16518 14.7694 8.22255 14.835C8.33668 14.9664 8.47205 15.0735 8.60968 15.1537C8.67843 15.1939 8.74736 15.2275 8.81374 15.2545C8.8468 15.2681 8.87793 15.2806 8.90924 15.2909C8.93911 15.302 8.96918 15.3107 8.99605 15.3187C9.02274 15.3269 9.04899 15.3329 9.0708 15.3386L9.13055 15.3509C9.14643 15.3544 9.15949 15.3566 9.16886 15.3578L9.18261 15.3599C9.49111 15.4055 9.80668 15.2473 9.9458 14.9504L9.95168 14.9377C9.95586 14.9292 9.96124 14.9172 9.96711 14.902L9.98993 14.8454C9.99724 14.8241 10.0067 14.7989 10.0147 14.7721C10.0229 14.7452 10.0322 14.7154 10.0396 14.6844C10.0483 14.6526 10.0551 14.6197 10.062 14.5846C10.0762 14.5144 10.0863 14.4384 10.0909 14.3589C10.1001 14.1999 10.0857 14.0278 10.0394 13.8601C10.0165 13.7761 9.98461 13.6936 9.94724 13.6126C9.90994 13.5305 9.86962 13.4499 9.82636 13.3709C9.7907 13.3063 9.75293 13.2429 9.71311 13.1808C9.78415 13.1609 9.85452 13.1387 9.92411 13.1142C10.009 13.0839 10.0927 13.0505 10.1751 13.0141C10.2569 12.9784 10.3356 12.938 10.4085 12.8905C10.5547 12.7961 10.6798 12.6771 10.7787 12.5522C10.826 12.4928 10.8689 12.43 10.9072 12.3644C10.9254 12.3336 10.9422 12.3046 10.9568 12.275C10.9719 12.2469 10.9849 12.2184 10.9966 12.1929C11.0084 12.1676 11.0181 12.1426 11.0269 12.1217L11.0475 12.0642C11.0532 12.0491 11.0572 12.0364 11.0597 12.0273L11.0637 12.014C11.1525 11.7149 11.0404 11.3802 10.7662 11.2004Z" fill="#D1E2FF"/>
                                    <path d="M8.19614 13.5935C8.76075 13.5935 9.21845 13.1357 9.21845 12.5711C9.21845 12.0065 8.76075 11.5488 8.19614 11.5488C7.63153 11.5488 7.17383 12.0065 7.17383 12.5711C7.17383 13.1357 7.63153 13.5935 8.19614 13.5935Z" fill="#FFB636"/>
                                    <path d="M25.867 17.1356C25.6103 17.2105 25.3435 17.2445 25.0763 17.2362C24.9393 17.232 24.8747 17.4024 24.9781 17.4923C25.1594 17.6502 25.3173 17.833 25.4473 18.0352C25.462 18.057 25.476 18.079 25.4893 18.101C26.2163 19.308 25.2605 19.9348 24.0535 20.6618C22.8466 21.3887 21.8455 21.9404 21.1186 20.7335C21.1039 20.709 21.0896 20.6843 21.0758 20.6594C21.023 20.5643 20.8882 20.5625 20.8272 20.6526L20.8257 20.6548C20.8113 20.6768 20.7966 20.6983 20.7815 20.7193C19.9558 21.861 19.0046 21.2272 17.8629 20.4015C16.7212 19.5758 15.8214 18.871 16.6471 17.7293C16.7391 17.602 16.8428 17.4835 16.9567 17.3752C17.0458 17.2905 16.9965 17.1404 16.8745 17.1253C16.7444 17.1093 16.6157 17.0832 16.4896 17.0474C16.4644 17.0408 16.4394 17.0336 16.4145 17.0257C15.0712 16.6008 15.3737 15.4986 15.7986 14.1552C16.2235 12.8118 16.6097 11.736 17.953 12.1609C18.125 12.2152 18.2907 12.2876 18.4474 12.377C18.5567 12.4393 18.6868 12.3413 18.6606 12.2182C18.6287 12.0682 18.6104 11.9156 18.6058 11.7622C18.6045 11.736 18.6038 11.7099 18.6038 11.6841C18.6038 10.2752 19.746 10.2313 21.155 10.2313C22.5639 10.2313 23.7061 10.2752 23.7061 11.6841C23.7061 11.9097 23.6767 12.1284 23.6217 12.3367C23.588 12.4642 23.7239 12.569 23.8369 12.501C24.0039 12.4008 24.1818 12.3199 24.3672 12.26C24.3921 12.2514 24.4169 12.2435 24.4417 12.2362C25.7946 11.8427 26.1557 12.9272 26.5493 14.28C26.943 15.6331 27.2198 16.742 25.867 17.1356ZM18.9874 6.50181C18.6531 5.35262 18.3463 4.43137 17.1971 4.76569C17.176 4.77181 17.155 4.77856 17.1338 4.78581C16.9764 4.83671 16.8252 4.9054 16.6833 4.99056C16.5873 5.04831 16.4718 4.95931 16.5005 4.851C16.5482 4.67008 16.5723 4.48374 16.5722 4.29663C16.5722 3.09975 15.6019 3.0625 14.4051 3.0625C13.2082 3.0625 12.238 3.09975 12.238 4.29663C12.238 4.31856 12.2386 4.34069 12.2397 4.363C12.2436 4.49324 12.2591 4.62286 12.2862 4.75031C12.3085 4.85481 12.1979 4.93806 12.1051 4.88513C11.972 4.80927 11.8312 4.74776 11.6851 4.70162C10.544 4.34075 10.2159 5.25456 9.85502 6.39569C9.49415 7.53681 9.23709 8.47312 10.3782 8.83406C10.3991 8.84069 10.4203 8.84675 10.442 8.85244C10.5507 8.88325 10.6599 8.90519 10.7689 8.91862C10.8725 8.93144 10.9144 9.059 10.8387 9.13087C10.7419 9.22281 10.6539 9.32351 10.5757 9.43169C9.87434 10.4015 10.6387 11.0002 11.6085 11.7016C12.5783 12.403 13.3863 12.9414 14.0877 11.9716C14.1011 11.953 14.1141 11.9341 14.1265 11.9149C14.1783 11.8383 14.2928 11.8398 14.3377 11.9207C14.3494 11.9418 14.3615 11.9628 14.3741 11.9836C14.9916 13.0089 15.842 12.5402 16.8672 11.9227C17.8925 11.3053 18.7044 10.7728 18.0869 9.7475C18.0756 9.72875 18.0637 9.71006 18.0512 9.6915C17.9408 9.51974 17.8066 9.36449 17.6526 9.23038C17.5648 9.15394 17.6197 9.00919 17.7361 9.01281C17.9574 9.01969 18.1835 8.9925 18.4076 8.92731C19.5569 8.59306 19.3217 7.651 18.9874 6.50181Z" fill="#FF929D"/>
                                    <path d="M24.0228 15.711L24.0189 15.7243C24.0164 15.7335 24.0123 15.7461 24.0066 15.7613L23.986 15.8187C23.9772 15.8395 23.9676 15.8646 23.9557 15.89C23.944 15.9155 23.9311 15.944 23.9159 15.972C23.9013 16.0016 23.8845 16.0306 23.8664 16.0615C23.828 16.127 23.785 16.1898 23.7378 16.2493C23.6389 16.3741 23.5137 16.4931 23.3676 16.5875C23.2946 16.635 23.2161 16.6754 23.1342 16.7111C23.0518 16.7475 22.9681 16.7809 22.8832 16.8112C22.8137 16.8357 22.7433 16.8579 22.6722 16.8778C22.7116 16.9398 22.75 17.003 22.7855 17.0679C22.8287 17.1469 22.8691 17.2276 22.9064 17.3096C22.9437 17.3906 22.9756 17.4731 22.9985 17.5571C23.0449 17.7248 23.0592 17.8969 23.05 18.0559C23.0457 18.1317 23.0361 18.2072 23.0211 18.2816C23.0142 18.3166 23.0074 18.3496 22.9987 18.3814C22.9914 18.4124 22.982 18.4423 22.9739 18.4691C22.9659 18.4959 22.9564 18.5211 22.9491 18.5425L22.9262 18.599C22.9217 18.6112 22.9165 18.6231 22.9108 18.6348L22.9049 18.6474C22.7657 18.9443 22.4502 19.1025 22.1417 19.0569L22.128 19.0548C22.1151 19.0531 22.1023 19.0508 22.0897 19.0479L22.0299 19.0356C22.0081 19.0299 21.9819 19.0239 21.9552 19.0158C21.9283 19.0077 21.8982 18.999 21.8683 18.988C21.837 18.9776 21.8058 18.9651 21.7728 18.9515C21.7025 18.9228 21.6343 18.8891 21.5687 18.8508C21.4312 18.7705 21.2957 18.6634 21.1816 18.532C21.1242 18.4665 21.0732 18.3944 21.0263 18.3184C21.0131 18.2973 21.0005 18.2755 20.9877 18.2538C20.9714 18.2729 20.9554 18.2923 20.9387 18.3109C20.8796 18.3778 20.8171 18.4403 20.7495 18.4952C20.6148 18.6054 20.4632 18.6881 20.3141 18.744C20.243 18.7707 20.1702 18.7924 20.096 18.8088C20.0611 18.8166 20.0283 18.8237 19.9957 18.8285C19.9644 18.8343 19.9332 18.8379 19.9054 18.8413C19.8777 18.8448 19.8508 18.8463 19.8283 18.8482L19.7673 18.8502C19.7511 18.851 19.7379 18.851 19.7284 18.8506L19.7144 18.8503C19.3866 18.843 19.1144 18.6183 19.0314 18.3177L19.0277 18.3043C19.0241 18.2918 19.021 18.2792 19.0186 18.2665L19.0056 18.2068C19.0021 18.1845 18.9969 18.1581 18.9936 18.1304C18.9901 18.1026 18.9859 18.0715 18.9839 18.0397C18.9809 18.0058 18.9792 17.9717 18.9786 17.9376C18.9765 17.8617 18.9797 17.7857 18.9883 17.7103C19.0061 17.552 19.0494 17.3848 19.1234 17.2273C19.1601 17.1484 19.2054 17.0725 19.256 16.999C19.2699 16.9783 19.2849 16.958 19.2994 16.9375C19.2753 16.9303 19.2511 16.9235 19.2274 16.9158C19.1422 16.8888 19.0599 16.8569 18.9824 16.8173C18.8271 16.7386 18.6902 16.6334 18.5789 16.5196C18.5257 16.4654 18.4764 16.4074 18.4314 16.3463C18.4102 16.3175 18.3904 16.2904 18.3727 16.2625C18.3547 16.2362 18.3389 16.2092 18.3246 16.1851C18.3102 16.1611 18.2979 16.1372 18.2871 16.1174L18.2606 16.0625C18.2547 16.0509 18.2493 16.0391 18.2445 16.027L18.2392 16.0141C18.1133 15.7113 18.2087 15.3716 18.4502 15.1741L18.4609 15.1653C18.4681 15.1591 18.4786 15.151 18.4919 15.1416L18.5412 15.1057C18.5601 15.0934 18.5822 15.0781 18.6062 15.0638C18.6303 15.0493 18.657 15.033 18.6853 15.0183C18.714 15.002 18.7442 14.9875 18.7766 14.9721C18.8451 14.9395 18.9159 14.9118 18.9884 14.8891C19.1404 14.8414 19.3107 14.8133 19.4847 14.8174C19.5718 14.8191 19.6595 14.8299 19.7472 14.8464C19.8311 14.8614 19.9153 14.8805 19.9991 14.9018L19.9983 14.8911C19.9942 14.8011 19.9933 14.7109 19.9959 14.6208C19.9979 14.5316 20.0055 14.4436 20.0218 14.358C20.0538 14.187 20.1165 14.0261 20.1946 13.8873C20.2317 13.821 20.2735 13.7575 20.3196 13.6971C20.3412 13.6687 20.3618 13.6421 20.3836 13.6174C20.4038 13.5928 20.4254 13.57 20.4444 13.5495C20.4634 13.529 20.4829 13.5105 20.4989 13.4945L20.5442 13.4537C20.5537 13.4448 20.5635 13.4364 20.5737 13.4283L20.5846 13.4196C20.84 13.214 21.1929 13.2104 21.4501 13.3868L21.4615 13.3947C21.4694 13.3999 21.4802 13.4076 21.4929 13.4178L21.5412 13.455C21.5583 13.4698 21.5792 13.4866 21.5996 13.5057C21.6202 13.5248 21.6434 13.5458 21.6654 13.5688C21.6891 13.5918 21.7116 13.6168 21.7352 13.6435C21.783 13.6969 21.8302 13.7574 21.8743 13.8236C21.9627 13.9561 22.0373 14.1119 22.0821 14.28C22.1049 14.3641 22.1191 14.4513 22.1278 14.5401C22.1365 14.6241 22.1422 14.7083 22.1449 14.7927C22.2292 14.7611 22.3146 14.7326 22.401 14.7073C22.4865 14.6817 22.5726 14.6618 22.659 14.651C22.8316 14.6288 23.0039 14.6389 23.1601 14.6705C23.2381 14.6861 23.3119 14.707 23.3794 14.7309C23.4131 14.7427 23.4447 14.7541 23.475 14.7672C23.5047 14.7788 23.5329 14.7923 23.5584 14.8041C23.5837 14.8158 23.6073 14.8288 23.6274 14.839L23.6802 14.8696C23.6944 14.8775 23.7057 14.8845 23.7134 14.8899L23.7251 14.8975C23.9995 15.0774 24.1116 15.4121 24.0228 15.711ZM16.5881 6.64341L16.5782 6.63691C16.5691 6.63074 16.5597 6.62498 16.55 6.61966L16.5052 6.59372C16.4881 6.58503 16.4681 6.57403 16.4465 6.56409C16.4249 6.55403 16.4009 6.54259 16.3757 6.53272C16.349 6.52145 16.3219 6.51115 16.2945 6.50185C16.2337 6.48034 16.1714 6.46317 16.1081 6.45047C15.9681 6.42191 15.8243 6.41634 15.6825 6.43397C15.6082 6.44381 15.5349 6.45979 15.4633 6.48172C15.3899 6.50322 15.3174 6.52742 15.2458 6.55428C15.2435 6.48261 15.2386 6.41105 15.2312 6.33972C15.2244 6.26513 15.2115 6.19123 15.1924 6.11878C15.1544 5.97597 15.0909 5.84372 15.0159 5.7311C14.9802 5.67735 14.9408 5.62622 14.8978 5.57809C14.8788 5.55624 14.859 5.53508 14.8385 5.51466C14.8198 5.49509 14.8001 5.47716 14.7826 5.46103C14.7652 5.44485 14.7475 5.43053 14.7329 5.41797L14.6919 5.38628C14.6834 5.37936 14.6745 5.37283 14.6653 5.36672C14.6621 5.36448 14.6588 5.36225 14.6556 5.36003C14.4371 5.21016 14.1373 5.21316 13.9204 5.38784L13.9112 5.39528C13.9048 5.40016 13.8962 5.40741 13.8861 5.41685L13.8476 5.45153C13.834 5.4651 13.8174 5.48078 13.8013 5.49822C13.7851 5.51566 13.7668 5.53497 13.7496 5.55591C13.7311 5.57691 13.7136 5.59947 13.6952 5.62366C13.6561 5.67493 13.6206 5.72889 13.589 5.78516C13.5227 5.90309 13.4694 6.03972 13.4422 6.18503C13.4287 6.25871 13.4214 6.33338 13.4202 6.40828C13.4181 6.4848 13.4188 6.56138 13.4222 6.63784C13.4224 6.64091 13.4227 6.64391 13.4229 6.64691C13.3522 6.62868 13.2808 6.61298 13.209 6.59984C13.1355 6.58547 13.0609 6.57724 12.986 6.57522C12.8431 6.57252 12.7007 6.59308 12.5644 6.63609C12.5028 6.65532 12.4427 6.6789 12.3844 6.70666C12.357 6.71966 12.3313 6.73203 12.3069 6.74585C12.2829 6.75835 12.2602 6.77222 12.2398 6.78447C12.2194 6.79659 12.2007 6.80966 12.1846 6.82009L12.1427 6.85059C12.1336 6.85689 12.1249 6.8636 12.1164 6.87072L12.1073 6.87822C11.9022 7.04591 11.8211 7.33459 11.9281 7.59178L11.9326 7.60272C11.9356 7.61022 11.9401 7.62047 11.9462 7.63285L11.9687 7.67953C11.978 7.69634 11.9884 7.71672 12.0006 7.73703C12.0128 7.75753 12.0262 7.78047 12.0416 7.80278C12.0565 7.82641 12.0733 7.84953 12.0914 7.87391C12.1296 7.9259 12.1715 7.9751 12.2167 8.02116C12.3165 8.12346 12.4322 8.20886 12.5594 8.27403C12.6253 8.30772 12.6953 8.33484 12.7676 8.35772C12.7877 8.36428 12.8083 8.3701 12.8287 8.37622C12.8164 8.3936 12.8037 8.41084 12.7919 8.42841C12.7489 8.49091 12.7104 8.55535 12.6792 8.62241C12.619 8.75201 12.5803 8.89055 12.5645 9.0326C12.5572 9.09669 12.5544 9.16123 12.5562 9.22572C12.5571 9.25603 12.558 9.28459 12.5607 9.31247C12.5624 9.33947 12.5659 9.36584 12.5689 9.38953C12.5718 9.41309 12.5761 9.43553 12.5792 9.45447L12.5902 9.5051C12.5929 9.51866 12.5956 9.52953 12.5979 9.53722L12.6011 9.54859C12.6716 9.80397 12.9028 9.99478 13.1812 10.001L13.1931 10.0012C13.2011 10.0016 13.2123 10.0016 13.2261 10.0009L13.2779 9.99922C13.2971 9.99753 13.3199 9.99628 13.3434 9.99334C13.3671 9.99047 13.3934 9.98747 13.4201 9.98253C13.4477 9.97841 13.4756 9.97234 13.5052 9.96572C13.5682 9.95177 13.6302 9.93337 13.6906 9.91066C13.8245 9.86074 13.9494 9.78938 14.0604 9.69935C14.1179 9.65272 14.1709 9.59966 14.2211 9.54278C14.2352 9.52703 14.2489 9.51053 14.2627 9.49428C14.2736 9.51259 14.2843 9.53116 14.2956 9.5491C14.3354 9.6136 14.3787 9.67491 14.4275 9.73053C14.5244 9.84216 14.6394 9.93309 14.7563 10.0013C14.812 10.0339 14.8699 10.0625 14.9296 10.0869C14.9577 10.0985 14.9842 10.1091 15.0107 10.1178C15.0361 10.1272 15.0617 10.1347 15.0845 10.1415C15.1072 10.1484 15.1294 10.1535 15.148 10.1583L15.1987 10.1688C15.2122 10.1718 15.2233 10.1737 15.2313 10.1747L15.243 10.1764C15.5051 10.2152 15.7731 10.0808 15.8913 9.8286L15.8963 9.81791C15.8999 9.81072 15.9044 9.80041 15.9094 9.78753L15.9287 9.73947C15.9349 9.72134 15.943 9.69997 15.9498 9.67722C15.9567 9.65441 15.9647 9.62903 15.9709 9.60266C15.9783 9.57566 15.9841 9.54772 15.9899 9.51797C16.002 9.45835 16.0106 9.39372 16.0144 9.32622C16.0222 9.19116 16.0101 9.04497 15.9707 8.90253C15.9505 8.83041 15.9243 8.76008 15.8924 8.69228C15.8607 8.62261 15.8265 8.55412 15.7897 8.48697C15.7594 8.43213 15.7274 8.37829 15.6936 8.32553C15.7539 8.30864 15.8137 8.28977 15.8728 8.26897C15.9449 8.24324 16.016 8.21487 16.0861 8.18391C16.1549 8.15445 16.2212 8.11933 16.2843 8.07891C16.4085 7.99872 16.5148 7.89766 16.5988 7.79159C16.6389 7.74108 16.6754 7.68778 16.708 7.6321C16.7234 7.60597 16.7377 7.58122 16.7501 7.55616C16.7629 7.53234 16.7739 7.5081 16.7839 7.48647C16.7939 7.46497 16.8021 7.44366 16.8096 7.42597L16.8271 7.37722C16.831 7.36692 16.8345 7.35645 16.8375 7.34584L16.8409 7.33453C16.9163 7.08035 16.8211 6.79603 16.5881 6.64341Z" fill="#FF473E"/>
                                    <path d="M22.1779 16.2685C22.1779 16.8331 21.7202 17.2908 21.1556 17.2908C20.591 17.2908 20.1333 16.8331 20.1333 16.2685C20.1333 15.7039 20.591 15.2462 21.1556 15.2462C21.7202 15.2462 22.1779 15.7039 22.1779 16.2685ZM14.4055 6.93945C13.9259 6.93945 13.5371 7.32827 13.5371 7.80783C13.5371 8.28739 13.9259 8.6762 14.4055 8.6762C14.8851 8.6762 15.2739 8.28739 15.2739 7.80783C15.2739 7.32827 14.885 6.93945 14.4055 6.93945Z" fill="#FFB636"/>
                                    <path d="M9.15648 20.7778C9.91277 20.7778 10.5259 20.1647 10.5259 19.4084C10.5259 18.6522 9.91277 18.0391 9.15648 18.0391C8.4002 18.0391 7.78711 18.6522 7.78711 19.4084C7.78711 20.1647 8.4002 20.7778 9.15648 20.7778Z" fill="#F8BBC6"/>
                                    <path d="M19.2245 17.5702C18.8309 16.2174 18.4698 15.1329 17.1169 15.5264C17.0922 15.5336 17.0673 15.5415 17.0424 15.5502C16.8571 15.6101 16.6791 15.6909 16.5121 15.7912C16.3991 15.8592 16.2631 15.7545 16.2968 15.6269C16.353 15.4139 16.3814 15.1946 16.3813 14.9743C16.3813 13.5654 15.2391 13.5215 13.8301 13.5215C12.4212 13.5215 11.279 13.5654 11.279 14.9743C11.279 15.0001 11.2797 15.0261 11.281 15.0524C11.2857 15.2084 11.3043 15.3607 11.3358 15.5084C11.3619 15.6314 11.2318 15.7295 11.1226 15.6672C10.9659 15.5779 10.8002 15.5055 10.6282 15.4511C9.28482 15.0262 8.89857 16.102 8.47375 17.4454C8.04888 18.7888 7.74632 19.891 9.08969 20.3159C9.11425 20.3237 9.13932 20.3309 9.16475 20.3376C9.29275 20.3739 9.42138 20.3997 9.54963 20.4155C9.67163 20.4306 9.72094 20.5807 9.63182 20.6654C9.51792 20.7737 9.41429 20.8922 9.32225 21.0195C8.49657 22.1612 9.39638 22.8661 10.5381 23.6917C11.6798 24.5174 12.631 25.1512 13.4566 24.0095C13.4718 23.9885 13.4864 23.967 13.5008 23.945L13.5023 23.9428C13.5633 23.8527 13.6981 23.8545 13.7509 23.9496C13.7648 23.9744 13.779 23.9991 13.7938 24.0237C14.5207 25.2306 15.5218 24.6789 16.7287 23.952C17.9356 23.225 18.8914 22.5982 18.1645 21.3912C18.151 21.3689 18.137 21.347 18.1225 21.3254C17.9925 21.1232 17.8345 20.9404 17.6533 20.7825C17.5499 20.6925 17.6145 20.5221 17.7515 20.5264C18.0121 20.5345 18.2783 20.5025 18.5421 20.4258C19.8949 20.032 19.618 18.9231 19.2245 17.5702Z" fill="#FFB636"/>
                                    <path d="M16.4009 17.7375L16.3893 17.7299C16.3785 17.7226 16.3675 17.7159 16.3561 17.7096L16.3033 17.679C16.2831 17.6688 16.2596 17.6559 16.2342 17.6442C16.2088 17.6323 16.1805 17.6189 16.1508 17.6072C16.1206 17.5941 16.0889 17.5827 16.0553 17.5709C15.9837 17.5456 15.9103 17.5254 15.8359 17.5105C15.6798 17.4789 15.5074 17.4689 15.3348 17.491C15.2484 17.5019 15.1623 17.5217 15.0768 17.5473C14.9904 17.5726 14.905 17.6011 14.8207 17.6327C14.818 17.5484 14.8122 17.4641 14.8036 17.3802C14.7948 17.2914 14.7806 17.2041 14.7579 17.12C14.7131 16.9519 14.6384 16.7962 14.5501 16.6637C14.508 16.6004 14.4616 16.5402 14.411 16.4835C14.3886 16.4578 14.3654 16.4329 14.3412 16.4089C14.3192 16.3858 14.296 16.3647 14.2754 16.3457C14.2549 16.3267 14.234 16.3098 14.2169 16.295L14.1686 16.2578C14.1585 16.2496 14.1481 16.2419 14.1373 16.2347C14.1334 16.2321 14.1296 16.2295 14.1258 16.2269C13.8687 16.0504 13.5158 16.0539 13.2603 16.2596L13.2495 16.2684C13.242 16.2741 13.2319 16.2827 13.2199 16.2937L13.1746 16.3345C13.1587 16.3505 13.1391 16.369 13.1202 16.3895C13.1011 16.41 13.0796 16.4328 13.0594 16.4574C13.0376 16.4821 13.017 16.5087 12.9954 16.5372C12.9493 16.5975 12.9075 16.661 12.8703 16.7273C12.7923 16.8661 12.7296 17.027 12.6976 17.198C12.6813 17.2836 12.6736 17.3716 12.6716 17.4609C12.6691 17.5509 12.6699 17.6411 12.6741 17.7311L12.6748 17.7418C12.5916 17.7203 12.5076 17.7019 12.423 17.6864C12.3353 17.6699 12.2476 17.6592 12.1605 17.6574C11.9865 17.6534 11.8162 17.6814 11.6642 17.7291C11.5883 17.7529 11.5169 17.7812 11.4523 17.8122C11.4201 17.8275 11.3898 17.842 11.3611 17.8583C11.3328 17.873 11.3061 17.8893 11.282 17.9038C11.258 17.918 11.2359 17.9334 11.2169 17.9457L11.1676 17.9817C11.1543 17.991 11.1439 17.9992 11.1367 18.0054L11.1259 18.0142C10.8845 18.2116 10.7891 18.5514 10.9149 18.8542L10.9203 18.867C10.9237 18.8759 10.929 18.888 10.9363 18.9025L10.9628 18.9574C10.9737 18.9772 10.9859 19.0012 11.0003 19.0251C11.0147 19.0492 11.0305 19.0762 11.0485 19.1025C11.0661 19.1304 11.0859 19.1575 11.1071 19.1863C11.1521 19.2475 11.2014 19.3054 11.2546 19.3596C11.366 19.4735 11.5029 19.5787 11.6581 19.6573C11.7357 19.6969 11.8181 19.7289 11.9031 19.7558C11.9268 19.7635 11.9511 19.7704 11.9751 19.7775C11.9606 19.798 11.9457 19.8183 11.9318 19.839C11.8812 19.9125 11.8359 19.9884 11.7991 20.0674C11.7251 20.2249 11.6819 20.392 11.6641 20.5503C11.6555 20.6258 11.6522 20.7017 11.6544 20.7777C11.6553 20.8134 11.6564 20.847 11.6597 20.8797C11.6617 20.9115 11.6658 20.9426 11.6693 20.9704C11.6727 20.9982 11.6778 21.0245 11.6814 21.0469L11.6943 21.1065C11.6975 21.1224 11.7008 21.1352 11.7034 21.1444L11.7071 21.1578C11.7901 21.4584 12.0623 21.6831 12.3902 21.6904L12.4041 21.6907C12.4136 21.6911 12.4268 21.6911 12.4431 21.6903L12.5041 21.6883C12.5266 21.6864 12.5534 21.6849 12.5811 21.6814C12.609 21.678 12.6401 21.6744 12.6714 21.6686C12.7051 21.6632 12.7386 21.6566 12.7718 21.6489C12.8459 21.6324 12.9188 21.6108 12.9899 21.584C13.1391 21.5282 13.2906 21.4455 13.4253 21.3353C13.4929 21.2804 13.5554 21.218 13.6144 21.151C13.6311 21.1324 13.6471 21.113 13.6634 21.0939C13.6762 21.1155 13.6888 21.1374 13.702 21.1585C13.7489 21.2344 13.7999 21.3065 13.8573 21.3721C13.9714 21.5035 14.1068 21.6106 14.2444 21.6909C14.3132 21.731 14.3821 21.7646 14.4485 21.7916C14.4816 21.8052 14.5127 21.8177 14.544 21.828C14.5739 21.8391 14.6039 21.8479 14.6308 21.8559C14.6575 21.864 14.6838 21.87 14.7056 21.8757L14.7653 21.888C14.7812 21.8915 14.7943 21.8937 14.8036 21.8949L14.8174 21.897C15.1259 21.9426 15.4414 21.7844 15.5806 21.4875L15.5864 21.4749C15.5906 21.4664 15.596 21.4543 15.6019 21.4391L15.6247 21.3825C15.632 21.3612 15.6415 21.336 15.6495 21.3092C15.6576 21.2824 15.667 21.2525 15.6743 21.2215C15.6831 21.1897 15.6898 21.1568 15.6968 21.1217C15.7109 21.0515 15.7211 20.9755 15.7256 20.896C15.7348 20.737 15.7204 20.5649 15.6741 20.3972C15.6513 20.3132 15.6194 20.2307 15.582 20.1497C15.5447 20.0676 15.5044 19.987 15.4611 19.908C15.4255 19.8434 15.3877 19.78 15.3479 19.7179C15.4189 19.698 15.4893 19.6758 15.5589 19.6513C15.6438 19.621 15.7275 19.5876 15.8099 19.5512C15.8917 19.5155 15.9703 19.4751 16.0433 19.4276C16.1894 19.3332 16.3146 19.2142 16.4134 19.0894C16.4607 19.0299 16.5037 18.9671 16.542 18.9015C16.5601 18.8707 16.5769 18.8417 16.5916 18.8121C16.6067 18.784 16.6196 18.7555 16.6314 18.73C16.6432 18.7047 16.6528 18.6797 16.6616 18.6588L16.6823 18.6014C16.688 18.5862 16.692 18.5735 16.6945 18.5644L16.6984 18.5511C16.7873 18.252 16.6752 17.9173 16.4009 17.7375Z" fill="#FFD469"/>
                                    <path d="M13.8309 20.1306C14.3955 20.1306 14.8532 19.6729 14.8532 19.1082C14.8532 18.5436 14.3955 18.0859 13.8309 18.0859C13.2663 18.0859 12.8086 18.5436 12.8086 19.1082C12.8086 19.6729 13.2663 20.1306 13.8309 20.1306Z" fill="#FFB636"/>
                                    </svg>
                                </span>
                                x4
                                </label>
                            </div>
                            <div className="radio">
                                <input
                                name="answer"
                                type="radio"
                                id="twelve"
                                hidden="hidden"
                                value="12"
                                />
                                <label
                                htmlFor="twelve"
                                className={mintNumber == 12 ? "mint-qty active": "mint-qty"}
                                >
                                <span className="flex italic font-light crimson-pro">
                                    <svg width="16" height="16" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                                        <path d="M14.1402 18.6606C13.6292 18.2661 13.0087 19.0511 13.5192 19.4446C14.7217 20.3731 15.3862 21.5766 15.7347 22.9026C14.3552 22.5666 12.4752 22.9311 11.4997 23.7776C11.2727 23.9741 11.2032 24.3771 11.4882 24.5696C12.7697 25.4366 14.6342 25.3391 16.0282 24.6831C16.1797 26.6981 15.8512 28.8376 15.6452 30.6751C15.5747 31.3136 16.5662 31.4486 16.6377 30.8061C17.0902 26.7386 17.8882 21.5541 14.1397 18.6606" fill="#A0ECE6"/>
                                        <path d="M20.1851 17.4028C20.6961 17.0083 21.3161 17.7933 20.8061 18.1868C19.6031 19.1143 18.9391 20.3188 18.5906 21.6448C19.9701 21.3078 21.8501 21.6733 22.8256 22.5188C23.0526 22.7153 23.1216 23.1193 22.8371 23.3118C21.5551 24.1778 19.6906 24.0803 18.2971 23.4243C18.1461 25.4393 18.4746 27.5788 18.6801 29.4163C18.7511 30.0558 17.7596 30.1898 17.6881 29.5473C17.2361 25.4808 16.4371 20.2953 20.1861 17.4028" fill="#A0ECE6"/>
                                        <path d="M24.4699 17.1935C23.5354 16.0265 22.0179 15.627 20.6604 16.386C18.5829 17.546 17.6249 19.604 17.1859 21.891C16.5209 19.849 15.2414 18.2885 12.8679 18.182C8.9514 18.006 9.71541 23.437 9.71291 26.132C9.71191 27.1 10.4699 27.1885 10.4699 26.221C10.4714 24.428 10.2494 19.176 13.1379 19.7465C17.2944 20.568 16.4169 27.6995 16.1579 30.566C16.0709 31.528 17.5709 31.488 17.6579 30.533C17.6779 30.314 17.6979 30.077 17.7179 29.826C18.0489 29.7725 18.3459 29.528 18.3459 29.0965C18.3354 26.3905 18.2489 23.695 18.9764 21.0615C19.3704 19.631 20.2144 18.172 21.6449 17.5955C24.3484 16.5065 23.7359 21.0905 23.2534 22.248C22.8854 23.131 23.1429 23.8175 23.5139 22.925C24.2799 21.092 25.8419 18.91 24.4699 17.1955" fill="#47D3A7"/>
                                        <path d="M8.30189 8.9988L6.9524 7.4838C6.9524 7.4838 6.5349 5.0783 8.6939 6.4668L9.3199 8.4018L8.30189 8.9963" fill="#DDE4E9"/>
                                        <path d="M9.34494 8.44155L8.71094 6.51555C8.71094 6.51555 9.28494 4.14305 10.7109 6.27705L10.5134 8.30055L9.34294 8.44155" fill="#C8D2D9"/>
                                        <path d="M9.84961 8.22401L10.7216 6.26201C10.7216 6.26201 12.8616 4.81101 12.4621 7.50001L10.8676 8.94801L9.84961 8.22401Z" fill="#DDE4E9"/>
                                        <path d="M9.99273 11.1296L9.87923 13.1541C9.87923 13.1541 8.47273 15.1491 7.92773 12.6416L8.85323 10.8301L9.99273 11.1296Z" fill="#DDE4E9"/>
                                        <path d="M10.8536 9.35547L12.8006 9.96847C12.8006 9.96847 14.2681 11.9735 11.6196 11.9625L10.1641 10.521L10.8536 9.35547Z" fill="#DDE4E9"/>
                                        <path d="M8.86011 10.7861L7.94711 12.5976C7.94711 12.5976 5.86261 13.8671 6.36261 11.3496L7.93361 10.0566L8.86011 10.7861Z" fill="#C8D2D9"/>
                                        <path d="M8.25283 10.5647L6.36183 11.2922C6.36183 11.2922 3.96433 10.8312 6.02633 9.30273L8.05783 9.40223L8.25283 10.5647Z" fill="#DDE4E9"/>
                                        <path d="M8.05621 9.76734L6.08571 9.29284C6.08571 9.29284 4.37571 7.55284 6.94071 7.46484L8.55621 8.69834L8.05621 9.76734Z" fill="#C8D2D9"/>
                                        <path d="M10.2031 8.88847L12.1986 7.66797C12.1986 7.66797 15.0151 7.69147 12.9936 9.85647L10.6676 10.168L10.2031 8.88847Z" fill="#C8D2D9"/>
                                        <path d="M9.29492 11.0977C10.1579 11.0977 10.8574 10.3981 10.8574 9.53516C10.8574 8.67221 10.1579 7.97266 9.29492 7.97266C8.43198 7.97266 7.73242 8.67221 7.73242 9.53516C7.73242 10.3981 8.43198 11.0977 9.29492 11.0977Z" fill="#F8AE1C"/>
                                        <path d="M8.95015 9.84175C8.74148 9.60653 8.60893 9.31363 8.56993 9.00162C8.53092 8.68961 8.58731 8.3731 8.73165 8.09375C8.49309 8.18134 8.27947 8.32576 8.1093 8.51451C7.93913 8.70326 7.81753 8.93064 7.75504 9.17697C7.69255 9.4233 7.69104 9.68115 7.75065 9.92819C7.81026 10.1752 7.9292 10.404 8.09715 10.5947C8.2656 10.7854 8.47807 10.932 8.71608 11.0219C8.9541 11.1117 9.21046 11.1421 9.46288 11.1103C9.71529 11.0785 9.95613 10.9855 10.1644 10.8395C10.3727 10.6934 10.5422 10.4987 10.6582 10.2722C10.3632 10.3806 10.0424 10.3974 9.73771 10.3206C9.43301 10.2438 9.15855 10.0769 8.95015 9.84175Z" fill="#CA8A2A"/>
                                        <path d="M10.5352 10.6211L11.7587 12.2401C11.7587 12.2401 11.9777 14.6706 9.93866 13.1121L9.47266 11.1316L10.5352 10.6211Z" fill="#C8D2D9"/>
                                        <path d="M20.9582 12.3961L19.6087 10.8861C19.6087 10.8861 19.1907 8.48065 21.3502 9.86915L21.9767 11.8046L20.9582 12.3986" fill="#86CDEC"/>
                                        <path d="M22.0046 11.8358L21.3691 9.9103C21.3691 9.9103 21.9441 7.5373 23.3691 9.6718L23.1726 11.6953L22.0026 11.8358" fill="#8ABDD8"/>
                                        <path d="M22.5098 11.6204L23.3818 9.65842C23.3818 9.65842 25.5213 8.20742 25.1213 10.8969L23.5283 12.3449L22.5098 11.6204Z" fill="#86CDEC"/>
                                        <path d="M22.6495 14.5241L22.533 16.5491C22.533 16.5491 21.1275 18.5431 20.584 16.0361L21.5085 14.2246L22.6495 14.5241Z" fill="#86CDEC"/>
                                        <path d="M23.5084 12.752L25.4554 13.3655C25.4554 13.3655 26.9244 15.3705 24.2749 15.3595L22.8184 13.918L23.5084 12.752Z" fill="#86CDEC"/>
                                        <path d="M21.5143 14.1826L20.6023 15.9941C20.6023 15.9941 18.5183 17.2641 19.0163 14.7461L20.5878 13.4531L21.5143 14.1826Z" fill="#8ABDD8"/>
                                        <path d="M20.9086 13.9588L19.0171 14.6868C19.0171 14.6868 16.6206 14.2258 18.6831 12.6973L20.7146 12.7963L20.9086 13.9588Z" fill="#DDE4E9"/>
                                        <path d="M20.7114 13.1619L18.7399 12.6869C18.7399 12.6869 17.0299 10.9469 19.5954 10.8594L21.2104 12.0929L20.7114 13.1619Z" fill="#8ABDD8"/>
                                        <path d="M22.8359 12.2591L24.8319 11.0391C24.8319 11.0391 27.6484 11.0616 25.6269 13.2276L23.3004 13.5381L22.8359 12.2591Z" fill="#8ABDD8"/>
                                        <path d="M21.9517 14.4951C22.8149 14.4951 23.5147 13.7954 23.5147 12.9321C23.5147 12.0689 22.8149 11.3691 21.9517 11.3691C21.0885 11.3691 20.3887 12.0689 20.3887 12.9321C20.3887 13.7954 21.0885 14.4951 21.9517 14.4951Z" fill="#ECD4A9"/>
                                        <path d="M21.6101 13.2343C21.4015 12.9991 21.269 12.7062 21.2299 12.3942C21.1908 12.0823 21.247 11.7658 21.3911 11.4863C21.1526 11.574 20.9391 11.7185 20.769 11.9073C20.5989 12.0961 20.4774 12.3235 20.4151 12.5698C20.3527 12.8162 20.3512 13.074 20.4109 13.321C20.4706 13.5679 20.5896 13.7967 20.7576 13.9873C21.0321 14.2977 21.4188 14.4864 21.8324 14.5119C22.2461 14.5374 22.6529 14.3977 22.9636 14.1233C23.1146 13.9893 23.2301 13.8348 23.3181 13.6653C23.023 13.7736 22.7022 13.7905 22.3975 13.7136C22.0928 13.6367 21.8183 13.4697 21.6101 13.2343Z" fill="#E7CB9F"/>
                                        <path d="M23.1714 13.9941L24.3939 15.6121C24.3939 15.6121 24.6119 18.0441 22.5734 16.4846L22.1074 14.5041L23.1714 13.9941Z" fill="#8ABDD8"/>
                                        <path d="M13.4504 12.5209L12.1009 11.0109C12.1009 11.0109 11.6829 8.60541 13.8419 9.99441L14.4679 11.9289L13.4504 12.5234" fill="#86CDEC"/>
                                        <path d="M14.4968 11.9587L13.8613 10.0327C13.8613 10.0327 14.4348 7.66074 15.8613 9.79474L15.6648 11.8187L14.4953 11.9587" fill="#8ABDD8"/>
                                        <path d="M15 11.7396L15.8715 9.77763C15.8715 9.77763 18.0125 8.32663 17.6125 11.0156L16.0175 12.4636L15 11.7396Z" fill="#86CDEC"/>
                                        <path d="M15.1451 14.6433L15.0306 16.6678C15.0306 16.6678 13.6236 18.6628 13.0801 16.1553L14.0036 14.3438L15.1451 14.6433Z" fill="#86CDEC"/>
                                        <path d="M16.0054 12.8711L17.9534 13.4846C17.9534 13.4846 19.4224 15.4946 16.7719 15.4786L15.3164 14.0371L16.0054 12.8711Z" fill="#86CDEC"/>
                                        <path d="M14.0105 14.3018L13.0975 16.1133C13.0975 16.1133 11.013 17.3838 11.513 14.8653L13.0825 13.5723L14.0105 14.3018Z" fill="#8ABDD8"/>
                                        <path d="M13.4056 14.0794L11.5146 14.8074C11.5146 14.8074 9.11657 14.3464 11.1786 12.8184L13.2106 12.9169L13.4056 14.0794Z" fill="#DDE4E9"/>
                                        <path d="M13.2055 13.2854L11.2345 12.8099C11.2345 12.8099 9.52404 11.0699 12.0885 10.9824L13.7035 12.2159L13.2055 13.2854Z" fill="#8ABDD8"/>
                                        <path d="M15.3281 12.3826L17.3241 11.1621C17.3241 11.1621 20.1416 11.1856 18.1201 13.3506L15.7931 13.6621L15.3281 12.3826Z" fill="#8ABDD8"/>
                                        <path d="M14.4453 14.6172C15.3083 14.6172 16.0078 13.9176 16.0078 13.0547C16.0078 12.1917 15.3083 11.4922 14.4453 11.4922C13.5824 11.4922 12.8828 12.1917 12.8828 13.0547C12.8828 13.9176 13.5824 14.6172 14.4453 14.6172Z" fill="#ECD4A9"/>
                                        <path d="M14.1015 13.3574C13.8927 13.1222 13.7601 12.8293 13.721 12.5173C13.6819 12.2053 13.7382 11.8888 13.8825 11.6094C13.644 11.697 13.4304 11.8415 13.2604 12.0303C13.0904 12.2191 12.9691 12.4466 12.9069 12.6929C12.8447 12.9393 12.8435 13.1971 12.9036 13.444C12.9636 13.6909 13.083 13.9194 13.2513 14.1097C13.4196 14.3 13.6319 14.4464 13.8696 14.5361C14.1073 14.6258 14.3633 14.6561 14.6154 14.6244C14.8675 14.5928 15.1081 14.5001 15.3163 14.3544C15.5244 14.2087 15.6939 14.0144 15.81 13.7884C15.5149 13.8969 15.1939 13.9138 14.8891 13.8369C14.5843 13.76 14.3097 13.5929 14.1015 13.3574Z" fill="#E7CB9F"/>
                                        <path d="M15.6651 14.1152L16.8881 15.7342C16.8881 15.7342 17.1061 18.1652 15.0676 16.6067L14.6016 14.6262L15.6651 14.1152Z" fill="#8ABDD8"/>
                                        <path d="M15.8034 14.89C15.8034 14.89 14.7934 14.485 14.5779 13.1795C14.3589 11.8735 13.4189 12.1665 13.4189 12.1665L11.5249 14.5995C11.6449 13.1795 11.7159 11.2345 11.2439 10.8075C10.4789 10.121 9.4654 11.293 9.4654 11.293C9.4654 11.293 8.7119 12.0745 7.4189 11.787C6.1259 11.5005 6.0439 12.481 6.0439 12.481L7.8224 15.552C6.5499 15.006 4.9444 14.425 4.4279 14.712C3.5304 15.21 4.3089 16.552 4.3089 16.552C4.3089 16.552 4.8039 17.516 4.1129 18.646C3.4244 19.777 4.3244 20.1715 4.3244 20.1715L7.2194 19.6C6.4484 20.7475 5.5849 22.2105 5.7709 22.77C6.0939 23.7435 7.5579 23.226 7.5579 23.226C7.5579 23.226 8.5959 22.9195 9.5779 23.808C10.5599 24.6965 11.1159 23.883 11.1159 23.883L11.0844 19.843C11.7279 20.9825 13.2014 23.4515 13.9859 23.5355C15.0069 23.647 15.1434 22.103 15.1434 22.103C15.1434 22.103 15.2994 21.029 16.5139 20.5045C17.7329 19.982 17.2219 19.1385 17.2219 19.1385L14.2434 17.8045C15.4514 17.3945 16.7364 16.8545 16.9174 16.358C17.2684 15.3925 15.8029 14.892 15.8029 14.892" fill="#F46384"/>
                                        <path d="M11.0859 19.9609C11.0859 19.9609 13.9299 22.4579 15.7864 20.9754C15.7864 20.9754 15.0679 21.6884 15.1454 22.0994C15.1454 22.0994 14.9719 23.3504 14.3289 23.5039C14.3289 23.5039 13.8599 23.6604 13.4374 23.2169C13.0144 22.7734 11.7859 21.0869 11.0859 19.9609Z" fill="#D34D75"/>
                                        <path d="M9.2489 22.8558C9.2489 22.8558 7.7864 23.3733 7.4624 22.4008C7.2789 21.8413 8.1399 20.3783 8.9104 19.2318L6.0164 19.8023C6.0164 19.8023 5.1129 19.4068 5.8039 18.2778C6.4944 17.1468 6.0019 16.1818 6.0019 16.1818C6.0019 16.1818 5.5404 15.3838 5.7404 14.7913C5.1604 14.6343 4.6709 14.5743 4.4279 14.7103C3.5304 15.2083 4.3089 16.5503 4.3089 16.5503C4.3089 16.5503 4.8039 17.5143 4.1129 18.6443C3.4244 19.7753 4.3244 20.1698 4.3244 20.1698L7.2194 19.5983C6.4484 20.7458 5.5849 22.2088 5.7709 22.7683C6.0939 23.7418 7.5579 23.2243 7.5579 23.2243C7.5579 23.2243 8.5959 22.9178 9.5779 23.8063C10.5599 24.6948 11.1159 23.8813 11.1159 23.8813L11.1124 23.3083C10.1809 22.5833 9.2484 22.8558 9.2484 22.8558" fill="#D34D75"/>
                                        <path d="M9.51492 15.1834L7.73742 12.1119C7.73742 12.1119 7.74742 11.9869 7.81842 11.8404C7.68435 11.8323 7.55111 11.8137 7.41992 11.7849C6.12692 11.4984 6.04492 12.4789 6.04492 12.4789L7.12892 14.3474C7.82942 14.5004 8.73642 14.8474 9.51492 15.1834Z" fill="#D34D75"/>
                                        <path d="M10.2187 19.1582C11.2769 19.1582 12.1347 18.3003 12.1347 17.2422C12.1347 16.184 11.2769 15.3262 10.2187 15.3262C9.16056 15.3262 8.30273 16.184 8.30273 17.2422C8.30273 18.3003 9.16056 19.1582 10.2187 19.1582Z" fill="#FFC84D"/>
                                        <path d="M14.311 16.0008C14.11 15.9333 13.908 15.8658 13.7125 15.7878C13.3785 15.6548 12.93 15.9598 12.8025 16.2928C12.737 16.4648 12.737 16.6523 12.807 16.8053C12.8865 16.9803 13.024 17.0563 13.196 17.1268C13.3915 17.2058 13.5945 17.2743 13.7945 17.3418C14.139 17.4563 14.57 17.1848 14.7025 16.8368C14.8525 16.4553 14.657 16.1163 14.311 16.0018" fill="#E45A6F"/>
                                        <path d="M12.589 13.8791C12.4175 14.0051 12.2455 14.1301 12.0685 14.2436C11.764 14.4401 11.754 14.9796 11.9495 15.2756C12.0515 15.4311 12.206 15.5386 12.372 15.5716C12.5585 15.6066 12.7 15.5421 12.859 15.4406C13.036 15.3271 13.209 15.2021 13.3815 15.0771C13.6735 14.8621 13.7045 14.3551 13.498 14.0441C13.2705 13.7026 12.8815 13.6646 12.589 13.8791Z" fill="#E45A6F"/>
                                        <path d="M9.91305 13.2729C9.88655 13.4844 9.85855 13.6944 9.82005 13.9034C9.75355 14.2579 10.1386 14.6359 10.4881 14.6974C10.6706 14.7289 10.8551 14.6924 10.9931 14.5929C11.1476 14.4809 11.1966 14.3339 11.2321 14.1504C11.2741 13.9424 11.3016 13.7324 11.3271 13.5219C11.3716 13.1619 11.0246 12.7919 10.6566 12.7264C10.2536 12.6564 9.95805 12.9134 9.91355 13.2729" fill="#E45A6F"/>
                                        <path d="M7.47199 14.6165C7.62299 14.766 7.77499 14.9155 7.91549 15.0715C8.15599 15.339 8.69399 15.261 8.95299 15.0205C9.09049 14.8935 9.17099 14.7255 9.17799 14.5555C9.17999 14.364 9.09249 14.236 8.96799 14.0965C8.82799 13.9395 8.67649 13.79 8.52499 13.641C8.26449 13.3865 7.75849 13.44 7.48599 13.693C7.18749 13.971 7.21199 14.3615 7.47199 14.6165Z" fill="#E45A6F"/>
                                        <path d="M6.25361 16.849C6.45761 16.9115 6.65961 16.977 6.85611 17.051C7.19411 17.18 7.63511 16.8675 7.75761 16.5335C7.82061 16.3585 7.81711 16.1715 7.74411 16.019C7.66011 15.8465 7.52511 15.7725 7.35161 15.7055C7.15461 15.6285 6.95161 15.564 6.74861 15.5005C6.40361 15.3915 5.97661 15.671 5.84911 16.0205C5.70611 16.405 5.90861 16.741 6.25361 16.849Z" fill="#E45A6F"/>
                                        <path d="M6.76026 19.248C6.95526 19.163 7.15076 19.081 7.34926 19.0085C7.69126 18.8865 7.81976 18.362 7.69526 18.029C7.63537 17.8614 7.51175 17.7241 7.35126 17.647C7.17426 17.57 7.02126 17.601 6.84626 17.6645C6.64876 17.736 6.45226 17.819 6.25676 17.903C5.92476 18.0455 5.78076 18.536 5.91076 18.8825C6.05426 19.2665 6.42826 19.3915 6.76026 19.248Z" fill="#E45A6F"/>
                                        <path d="M8.41343 20.772C8.48643 20.571 8.55993 20.3725 8.64693 20.1775C8.78993 19.8495 8.50043 19.3935 8.17493 19.2535C8.00243 19.181 7.81443 19.1755 7.65993 19.241C7.48243 19.315 7.40093 19.447 7.32743 19.619C7.23993 19.8125 7.16493 20.0105 7.09293 20.21C6.96743 20.551 7.22393 20.9915 7.56593 21.137C7.94243 21.2945 8.28693 21.113 8.41343 20.772Z" fill="#E45A6F"/>
                                        <path d="M10.729 20.9707C10.6877 20.7626 10.6532 20.5531 10.6255 20.3427C10.58 19.9842 10.0985 19.7412 9.74453 19.7892C9.56784 19.8117 9.407 19.9025 9.29653 20.0422C9.18453 20.1967 9.18253 20.3507 9.20403 20.5362C9.22853 20.7472 9.26853 20.9562 9.30653 21.1642C9.37203 21.5207 9.81903 21.7687 10.1865 21.7177C10.5925 21.6622 10.7965 21.3272 10.729 20.9707Z" fill="#E45A6F"/>
                                        <path d="M13.029 19.9072C12.8836 19.7523 12.7433 19.5928 12.6085 19.4287C12.383 19.1472 11.8455 19.1952 11.572 19.4217C11.5028 19.4764 11.4451 19.5442 11.4022 19.6213C11.3593 19.6983 11.332 19.7831 11.322 19.8707C11.308 20.0632 11.385 20.1947 11.5025 20.3412C11.6355 20.5062 11.778 20.6637 11.9205 20.8207C12.1645 21.0882 12.675 21.0637 12.96 20.8277C13.2765 20.5677 13.2725 20.1767 13.029 19.9072Z" fill="#E45A6F"/>
                                        <path d="M14.2836 18.3822C14.1024 18.2719 13.9246 18.156 13.7506 18.0347C13.4551 17.8267 12.9506 18.0182 12.7456 18.3112C12.6427 18.4561 12.6012 18.6358 12.6301 18.8112C12.6666 18.9997 12.7811 19.1062 12.9331 19.2147C13.1056 19.3377 13.2856 19.4522 13.4646 19.5632C13.7736 19.7537 14.2566 19.5927 14.4696 19.2847C14.7001 18.9482 14.5916 18.5732 14.2831 18.3822" fill="#E45A6F"/>
                                        <path d="M10.5044 19.6622C10.4906 19.4774 10.4826 19.2921 10.4804 19.1067C10.4734 18.7872 10.1499 18.6067 9.89439 18.6742C9.75432 18.7176 9.63464 18.8101 9.55739 18.9347C9.46439 19.0812 9.45089 19.2217 9.45339 19.3867C9.45739 19.5722 9.46639 19.7587 9.48039 19.9422C9.48331 20.0115 9.5017 20.0793 9.53422 20.1406C9.56673 20.2019 9.61254 20.2551 9.6683 20.2964C9.72406 20.3377 9.78834 20.3659 9.85645 20.3792C9.92455 20.3924 9.99475 20.3902 10.0619 20.3727C10.3559 20.2952 10.5244 19.9787 10.5044 19.6622Z" fill="white"/>
                                        <path d="M8.93109 19.4403C9.02459 19.2793 9.11759 19.1208 9.22109 18.9628C9.39509 18.6973 9.22609 18.3643 8.97859 18.2813C8.83782 18.2369 8.68551 18.2467 8.55159 18.3088C8.39409 18.3783 8.30409 18.4873 8.21509 18.6253C8.11259 18.7818 8.01659 18.9418 7.92509 19.1018C7.88917 19.1611 7.86687 19.2277 7.85984 19.2967C7.8528 19.3656 7.86119 19.4353 7.8844 19.5006C7.90761 19.566 7.94507 19.6253 7.99405 19.6744C8.04303 19.7235 8.10231 19.761 8.16759 19.7843C8.45459 19.8808 8.77059 19.7118 8.93109 19.4403Z" fill="white"/>
                                        <path d="M8.07882 18.3875C8.23732 18.288 8.39382 18.19 8.55632 18.0965C8.83382 17.94 8.83732 17.568 8.65532 17.3775C8.54992 17.2755 8.41089 17.2154 8.26432 17.2085C8.09132 17.197 7.96182 17.2525 7.81782 17.3325C7.65532 17.4255 7.49932 17.523 7.34132 17.6225C7.28206 17.6588 7.23159 17.7077 7.19358 17.7659C7.15556 17.824 7.13095 17.8899 7.12152 17.9587C7.1121 18.0275 7.11809 18.0975 7.13907 18.1638C7.16005 18.23 7.19549 18.2907 7.24282 18.3415C7.45382 18.5595 7.81232 18.5575 8.07882 18.3875Z" fill="white"/>
                                        <path d="M7.66752 17.0469C7.85102 17.0664 8.03602 17.0899 8.21952 17.1199C8.53452 17.1719 8.77152 16.8854 8.75102 16.6239C8.73354 16.4777 8.66267 16.3431 8.55202 16.2459C8.42552 16.1274 8.29052 16.0894 8.12702 16.0629C7.94374 16.0331 7.75967 16.0082 7.57502 15.9884C7.50619 15.9793 7.43619 15.9856 7.37009 16.0068C7.30398 16.0281 7.24343 16.0638 7.1928 16.1113C7.14218 16.1588 7.10274 16.217 7.07736 16.2816C7.05197 16.3462 7.04127 16.4157 7.04602 16.4849C7.07202 16.7869 7.35502 17.0099 7.66752 17.0469Z" fill="white"/>
                                        <path d="M8.35386 15.6148C8.46836 15.7603 8.58336 15.9068 8.69136 16.0603C8.87536 16.3193 9.24536 16.2853 9.41486 16.0848C9.50286 15.9783 9.55036 15.8318 9.54486 15.6783C9.53886 15.5038 9.46986 15.3813 9.37486 15.2473C9.26686 15.0943 9.15186 14.9478 9.03936 14.8013C8.99729 14.7461 8.94345 14.701 8.88176 14.6692C8.82007 14.6374 8.75207 14.6197 8.6827 14.6174C8.61333 14.6152 8.54432 14.6284 8.4807 14.6561C8.41707 14.6839 8.36043 14.7254 8.31486 14.7778C8.11836 15.0093 8.15736 15.3658 8.35386 15.6148Z" fill="white"/>
                                        <path d="M9.78918 14.8632C9.78918 15.0487 9.78718 15.2342 9.77818 15.4207C9.75918 15.7392 10.0692 15.9432 10.3282 15.8922C10.4637 15.8637 10.5932 15.7787 10.6827 15.6562C10.7862 15.5152 10.8082 15.3762 10.8187 15.2122C10.8282 15.0257 10.8312 14.8402 10.8322 14.6547C10.8338 14.5853 10.82 14.5164 10.7917 14.453C10.7634 14.3896 10.7213 14.3333 10.6686 14.2882C10.6158 14.2431 10.5537 14.2102 10.4867 14.1921C10.4197 14.1739 10.3495 14.1709 10.2812 14.1832C9.98468 14.2442 9.79218 14.5467 9.78918 14.8632Z" fill="white"/>
                                        <path d="M11.2727 15.1116C11.1689 15.266 11.0612 15.4177 10.9497 15.5666C10.7587 15.8216 10.9022 16.1641 11.1437 16.2651C11.2727 16.3186 11.4267 16.3186 11.5702 16.2681C11.7352 16.2091 11.8307 16.1061 11.9322 15.9761C12.0447 15.8256 12.1497 15.6736 12.2547 15.5191C12.2947 15.4624 12.3217 15.3975 12.3334 15.3291C12.3452 15.2607 12.3416 15.1905 12.3228 15.1237C12.304 15.0568 12.2706 14.9951 12.2249 14.9428C12.1792 14.8905 12.1224 14.8491 12.0587 14.8216C11.7777 14.7056 11.4492 14.8511 11.2727 15.1116Z" fill="white"/>
                                        <path d="M12.4925 16.1511C12.3155 16.2031 12.137 16.2521 11.9545 16.2956C11.6445 16.3681 11.534 16.7231 11.656 16.9556C11.721 17.0766 11.84 17.1781 11.983 17.2301C12.146 17.2896 12.2855 17.2731 12.4455 17.2371C12.626 17.1951 12.807 17.1451 12.9845 17.0946C13.2885 17.0066 13.4105 16.6766 13.2835 16.4326C13.143 16.1636 12.798 16.0656 12.4925 16.1511Z" fill="white"/>
                                        <path d="M11.9298 18.946C11.8153 18.8005 11.6998 18.653 11.5933 18.5005C11.4078 18.2405 11.0383 18.273 10.8673 18.475C10.7765 18.5906 10.7296 18.7346 10.7348 18.8815C10.7418 19.0535 10.8098 19.1775 10.9053 19.311C11.0138 19.4645 11.1263 19.611 11.2418 19.7565C11.2837 19.8118 11.3374 19.8571 11.399 19.8891C11.4606 19.9211 11.5286 19.9391 11.598 19.9416C11.6674 19.9441 11.7364 19.9312 11.8002 19.9038C11.864 19.8763 11.9209 19.8351 11.9668 19.783C12.1618 19.5525 12.1228 19.195 11.9298 18.946Z" fill="white"/>
                                        <path d="M12.6985 17.7916C12.5295 17.714 12.3628 17.6316 12.1985 17.5446C11.917 17.3941 11.6015 17.5906 11.539 17.8466C11.5075 17.9806 11.5315 18.1346 11.604 18.2676C11.688 18.4211 11.8045 18.5001 11.951 18.5771C12.117 18.6651 12.283 18.7451 12.451 18.8241C12.5133 18.8546 12.5816 18.8709 12.651 18.8718C12.7204 18.8727 12.7892 18.8581 12.8522 18.8292C12.9153 18.8002 12.9712 18.7576 13.0158 18.7044C13.0603 18.6512 13.0925 18.5887 13.11 18.5216C13.1805 18.2271 12.9865 17.9266 12.701 17.7916" fill="white"/>
                                        <path d="M16.1967 15.4295C16.1967 15.4295 17.2067 15.024 17.4222 13.7185C17.6412 12.413 18.5812 12.706 18.5812 12.706L20.4752 15.1385C20.3552 13.7185 20.2842 11.7735 20.7562 11.3465C21.5212 10.66 22.5347 11.832 22.5347 11.832C22.5347 11.832 23.2882 12.6135 24.5812 12.326C25.8742 12.04 25.9562 13.0205 25.9562 13.0205L24.1777 16.091C25.4502 15.545 27.0557 14.964 27.5722 15.251C28.4697 15.749 27.6912 17.091 27.6912 17.091C27.6912 17.091 27.1962 18.055 27.8872 19.185C28.5757 20.316 27.6757 20.7105 27.6757 20.7105L24.7807 20.139C25.5517 21.2865 26.4152 22.7495 26.2292 23.309C25.9062 24.2825 24.4422 23.765 24.4422 23.765C24.4422 23.765 23.4042 23.4585 22.4222 24.347C21.4402 25.2355 20.8842 24.422 20.8842 24.422L20.9157 20.382C20.2722 21.5215 18.7987 23.9905 18.0142 24.0745C16.9932 24.186 16.8567 22.642 16.8567 22.642C16.8567 22.642 16.7007 21.568 15.4862 21.0435C14.2672 20.521 14.7782 19.6775 14.7782 19.6775L17.7567 18.3435C16.5487 17.9335 15.2637 17.3935 15.0827 16.898C14.7317 15.9315 16.1972 15.4315 16.1972 15.4315" fill="#F46384"/>
                                        <path d="M20.9153 20.5C20.9153 20.5 18.0713 22.997 16.2148 21.5145C16.2148 21.5145 16.9333 22.2275 16.8558 22.6385C16.8558 22.6385 17.0293 23.8895 17.6723 24.043C17.6723 24.043 18.1413 24.1995 18.5638 23.756C18.9868 23.3125 20.2153 21.626 20.9153 20.5Z" fill="#D34D75"/>
                                        <path d="M22.7518 23.3969C22.7518 23.3969 24.2143 23.9144 24.5383 22.9419C24.7218 22.3824 23.8608 20.9194 23.0903 19.7729L25.9843 20.3434C25.9843 20.3434 26.8878 19.9479 26.1968 18.8189C25.5063 17.6879 25.9988 16.7234 25.9988 16.7234C25.9988 16.7234 26.4603 15.9254 26.2603 15.3324C26.8403 15.1754 27.3298 15.1154 27.5728 15.2514C28.4703 15.7494 27.6918 17.0914 27.6918 17.0914C27.6918 17.0914 27.1968 18.0554 27.8878 19.1854C28.5763 20.3164 27.6763 20.7109 27.6763 20.7109L24.7813 20.1394C25.5523 21.2869 26.4158 22.7499 26.2298 23.3094C25.9068 24.2829 24.4428 23.7654 24.4428 23.7654C24.4428 23.7654 23.4048 23.4589 22.4228 24.3474C21.4408 25.2359 20.8848 24.4224 20.8848 24.4224L20.8883 23.8494C21.8198 23.1244 22.7523 23.3969 22.7523 23.3969" fill="#D34D75"/>
                                        <path d="M22.4863 15.7242L24.2638 12.6527C24.2638 12.6527 24.2538 12.5277 24.1828 12.3812C24.3088 12.3732 24.4418 12.3567 24.5813 12.3257C25.8743 12.0397 25.9563 13.0202 25.9563 13.0202L24.8723 14.8882C24.1718 15.0412 23.2648 15.3882 22.4863 15.7242Z" fill="#D34D75"/>
                                        <path d="M21.7812 19.6972C22.8394 19.6972 23.6972 18.8394 23.6972 17.7812C23.6972 16.7231 22.8394 15.8652 21.7812 15.8652C20.7231 15.8652 19.8652 16.7231 19.8652 17.7812C19.8652 18.8394 20.7231 19.6972 21.7812 19.6972Z" fill="#FFC84D"/>
                                        <path d="M17.6886 16.5418C17.8896 16.4743 18.0916 16.4068 18.2871 16.3288C18.6211 16.1958 19.0696 16.5008 19.1971 16.8338C19.2626 17.0058 19.2626 17.1933 19.1926 17.3463C19.1131 17.5223 18.9756 17.5973 18.8036 17.6678C18.6081 17.7478 18.4051 17.8153 18.2051 17.8828C17.8606 17.9973 17.4296 17.7258 17.2971 17.3778C17.1471 16.9968 17.3426 16.6573 17.6886 16.5428" fill="#E45A6F"/>
                                        <path d="M19.409 14.4201C19.5805 14.5461 19.7525 14.6711 19.9295 14.7846C20.234 14.9811 20.244 15.5211 20.0485 15.8166C20.0011 15.8914 19.9393 15.9561 19.8668 16.0069C19.7943 16.0577 19.7125 16.0936 19.626 16.1126C19.4395 16.1476 19.298 16.0831 19.139 15.9816C18.962 15.8681 18.789 15.7431 18.6165 15.6181C18.3245 15.4031 18.2935 14.8966 18.5 14.5851C18.7275 14.2436 19.1165 14.2056 19.409 14.4201Z" fill="#E45A6F"/>
                                        <path d="M22.0878 13.8144C22.1143 14.0254 22.1423 14.2354 22.1808 14.4444C22.2473 14.7989 21.8623 15.1769 21.5128 15.2384C21.4259 15.2552 21.3365 15.2547 21.2498 15.2368C21.1631 15.2188 21.0809 15.1839 21.0078 15.1339C20.8533 15.0224 20.8043 14.8749 20.7688 14.6914C20.7289 14.4834 20.6972 14.2739 20.6738 14.0634C20.6293 13.7029 20.9763 13.3329 21.3443 13.2674C21.7473 13.1974 22.0428 13.4544 22.0873 13.8144" fill="#E45A6F"/>
                                        <path d="M24.5283 15.1572C24.3773 15.3067 24.2253 15.4562 24.0848 15.6122C23.8443 15.8797 23.3063 15.8017 23.0473 15.5612C22.9139 15.4419 22.833 15.2748 22.8223 15.0962C22.8203 14.9047 22.9078 14.7767 23.0323 14.6372C23.1723 14.4802 23.3238 14.3307 23.4753 14.1822C23.7358 13.9272 24.2418 13.9812 24.5143 14.2342C24.8128 14.5117 24.7883 14.9022 24.5283 15.1572Z" fill="#E45A6F"/>
                                        <path d="M25.7438 17.3892C25.5398 17.4517 25.3378 17.5172 25.1413 17.5912C24.8033 17.7202 24.3623 17.4077 24.2398 17.0737C24.1768 16.8997 24.1803 16.7122 24.2533 16.5602C24.3373 16.3872 24.4723 16.3132 24.6458 16.2467C24.8428 16.1697 25.0458 16.1052 25.2488 16.0417C25.5938 15.9322 26.0208 16.2117 26.1483 16.5617C26.2913 16.9452 26.0888 17.2812 25.7438 17.3892Z" fill="#E45A6F"/>
                                        <path d="M25.2394 19.7895C25.0444 19.7035 24.8489 19.6215 24.6504 19.5495C24.3084 19.4275 24.1799 18.903 24.3044 18.57C24.3699 18.396 24.4949 18.2575 24.6484 18.188C24.8254 18.111 24.9784 18.142 25.1534 18.2055C25.3509 18.277 25.5474 18.36 25.7429 18.444C26.0749 18.5875 26.2189 19.077 26.0889 19.4235C25.9454 19.807 25.5714 19.932 25.2394 19.7895Z" fill="#E45A6F"/>
                                        <path d="M23.5835 21.313C23.5128 21.1122 23.4349 20.9139 23.35 20.7185C23.207 20.3905 23.4965 19.9345 23.822 19.7945C23.9945 19.722 24.1825 19.7165 24.337 19.782C24.5145 19.856 24.596 19.988 24.6695 20.16C24.757 20.3535 24.832 20.5515 24.904 20.751C25.0295 21.092 24.773 21.5325 24.431 21.678C24.0545 21.8355 23.71 21.654 23.5835 21.313Z" fill="#E45A6F"/>
                                        <path d="M21.2725 21.5118C21.313 21.3028 21.3495 21.0928 21.376 20.8838C21.4215 20.5253 21.903 20.2823 22.257 20.3303C22.4385 20.3568 22.6015 20.4473 22.705 20.5833C22.817 20.7378 22.819 20.8918 22.7975 21.0773C22.773 21.2893 22.733 21.4973 22.695 21.7053C22.6295 22.0618 22.1825 22.3098 21.815 22.2588C21.409 22.2033 21.205 21.8683 21.2725 21.5118Z" fill="#E45A6F"/>
                                        <path d="M18.9692 20.4482C19.1147 20.2917 19.2562 20.1337 19.3897 19.9697C19.6152 19.6882 20.1527 19.7362 20.4262 19.9627C20.5692 20.0797 20.6607 20.2432 20.6762 20.4127C20.6902 20.6042 20.6132 20.7357 20.4957 20.8822C20.3627 21.0472 20.2202 21.2047 20.0777 21.3617C19.8337 21.6292 19.3232 21.6047 19.0382 21.3687C18.7217 21.1087 18.7257 20.7182 18.9692 20.4482Z" fill="#E45A6F"/>
                                        <path d="M17.714 18.923C17.897 18.8095 18.075 18.6975 18.247 18.5755C18.5425 18.3675 19.047 18.56 19.252 18.852C19.3565 19.0035 19.3985 19.186 19.3675 19.352C19.331 19.5405 19.2165 19.648 19.0645 19.7555C18.892 19.8785 18.712 19.993 18.533 20.104C18.224 20.2945 17.741 20.1335 17.528 19.8255C17.2975 19.4895 17.406 19.1145 17.7145 18.923" fill="#E45A6F"/>
                                        <path d="M21.4938 20.1993C21.5068 20.0148 21.5163 19.8303 21.5178 19.6438C21.5248 19.3243 21.8483 19.1438 22.1038 19.2113C22.2348 19.2483 22.3593 19.3433 22.4408 19.4718C22.5338 19.6183 22.5473 19.7588 22.5448 19.9238C22.5408 20.1092 22.5318 20.2944 22.5178 20.4793C22.5149 20.5486 22.4965 20.6164 22.464 20.6777C22.4315 20.739 22.3856 20.7922 22.3299 20.8335C22.2741 20.8748 22.2098 20.9031 22.1417 20.9163C22.0736 20.9295 22.0034 20.9273 21.9363 20.9098C21.6423 20.8323 21.4738 20.5158 21.4938 20.1993Z" fill="white"/>
                                        <path d="M23.0644 19.9798C22.9721 19.818 22.8754 19.6588 22.7744 19.5023C22.6004 19.2368 22.7694 18.9038 23.0169 18.8208C23.1484 18.7758 23.3034 18.7858 23.4439 18.8483C23.6014 18.9178 23.6914 19.0268 23.7804 19.1648C23.8829 19.3213 23.9789 19.4813 24.0704 19.6413C24.1065 19.7005 24.1288 19.7671 24.1359 19.8361C24.143 19.9051 24.1346 19.9748 24.1114 20.0401C24.0882 20.1055 24.0507 20.1649 24.0017 20.2139C23.9526 20.263 23.8933 20.3005 23.8279 20.3238C23.5409 20.4203 23.2249 20.2513 23.0644 19.9798Z" fill="white"/>
                                        <path d="M23.9183 18.9266C23.7598 18.8271 23.6033 18.7291 23.4408 18.6356C23.1633 18.4801 23.1598 18.1071 23.3418 17.9166C23.4368 17.8191 23.5813 17.7566 23.7328 17.7476C23.9058 17.7361 24.0353 17.7916 24.1793 17.8716C24.3418 17.9646 24.4978 18.0621 24.6558 18.1626C24.715 18.1987 24.7655 18.2476 24.8035 18.3056C24.8415 18.3637 24.8661 18.4295 24.8755 18.4982C24.885 18.567 24.879 18.6369 24.858 18.7031C24.837 18.7692 24.8016 18.8299 24.7543 18.8806C24.5433 19.0986 24.1848 19.0966 23.9183 18.9266Z" fill="white"/>
                                        <path d="M24.3328 17.586C24.1493 17.6065 23.9643 17.63 23.7808 17.659C23.4658 17.711 23.2288 17.4245 23.2493 17.163C23.2623 17.0265 23.3338 16.8885 23.4483 16.785C23.5748 16.667 23.7098 16.6285 23.8733 16.6025C24.0578 16.571 24.2423 16.548 24.4253 16.5275C24.4941 16.5184 24.564 16.5247 24.6301 16.5459C24.6961 16.5671 24.7567 16.6027 24.8073 16.6502C24.8579 16.6976 24.8974 16.7557 24.9228 16.8203C24.9482 16.8849 24.959 16.9543 24.9543 17.0235C24.9278 17.326 24.6453 17.549 24.3328 17.586Z" fill="white"/>
                                        <path d="M23.6449 16.1539C23.5304 16.2999 23.4154 16.4459 23.3074 16.5994C23.1234 16.8584 22.7534 16.8239 22.5839 16.6239C22.4927 16.5086 22.4465 16.3641 22.4539 16.2174C22.4599 16.0434 22.5289 15.9204 22.6239 15.7869C22.7319 15.6334 22.8469 15.4869 22.9594 15.3404C23.0015 15.2852 23.0553 15.24 23.117 15.2082C23.1787 15.1764 23.2467 15.1587 23.3161 15.1565C23.3854 15.1542 23.4544 15.1675 23.518 15.1952C23.5817 15.223 23.6383 15.2645 23.6839 15.3169C23.8804 15.5484 23.8414 15.9049 23.6449 16.1539Z" fill="white"/>
                                        <path d="M22.2111 15.4017C22.2111 15.5872 22.2131 15.7727 22.2221 15.9592C22.2411 16.2777 21.9311 16.4817 21.6721 16.4312C21.5292 16.3983 21.4032 16.3146 21.3176 16.1957C21.2141 16.0542 21.1921 15.9152 21.1816 15.7512C21.1728 15.5655 21.1683 15.3796 21.1681 15.1937C21.1666 15.1243 21.1804 15.0555 21.2088 14.9921C21.2371 14.9288 21.2791 14.8725 21.3319 14.8274C21.3846 14.7823 21.4467 14.7494 21.5136 14.7312C21.5806 14.713 21.6508 14.7099 21.7191 14.7222C22.0156 14.7827 22.2081 15.0852 22.2111 15.4017Z" fill="white"/>
                                        <path d="M20.7257 15.6509C20.8302 15.8054 20.9367 15.9574 21.0487 16.1059C21.2397 16.3609 21.0962 16.7039 20.8547 16.8044C20.7177 16.8575 20.566 16.8585 20.4282 16.8074C20.2632 16.7489 20.1677 16.6464 20.0662 16.5154C19.9553 16.3653 19.8478 16.2128 19.7437 16.0579C19.7037 16.0012 19.6768 15.9363 19.665 15.8679C19.6532 15.7995 19.6568 15.7293 19.6756 15.6625C19.6944 15.5956 19.7278 15.5338 19.7735 15.4816C19.8192 15.4293 19.876 15.3879 19.9397 15.3604C20.2207 15.2449 20.5492 15.3904 20.7257 15.6509Z" fill="white"/>
                                        <path d="M19.5056 16.6886C19.6826 16.7406 19.8611 16.7891 20.0436 16.8321C20.3536 16.9046 20.4641 17.2596 20.3421 17.4921C20.2771 17.6131 20.1582 17.7146 20.0152 17.7666C19.8522 17.8261 19.7127 17.8106 19.5527 17.7736C19.3719 17.7304 19.1921 17.6829 19.0137 17.6311C18.9466 17.613 18.8844 17.5803 18.8314 17.5353C18.7785 17.4902 18.7363 17.4341 18.7077 17.3708C18.6791 17.3075 18.6649 17.2386 18.6661 17.1691C18.6673 17.0997 18.6839 17.0314 18.7147 16.9691C18.8552 16.7001 19.2001 16.6026 19.5056 16.6886Z" fill="white"/>
                                        <path d="M20.0697 19.485C20.1842 19.3395 20.2997 19.192 20.4062 19.0395C20.5917 18.7795 20.9612 18.812 21.1322 19.014C21.2187 19.1185 21.2682 19.267 21.2647 19.4205C21.2577 19.5925 21.1897 19.7165 21.0942 19.85C20.9857 20.0035 20.8732 20.15 20.7577 20.2955C20.7157 20.3509 20.662 20.3962 20.6004 20.4282C20.5388 20.4602 20.4708 20.4781 20.4015 20.4807C20.3321 20.4832 20.263 20.4703 20.1992 20.4428C20.1354 20.4154 20.0786 20.3741 20.0327 20.322C19.8377 20.0915 19.8767 19.734 20.0697 19.485Z" fill="white"/>
                                        <path d="M19.3019 18.3283C19.4724 18.2493 19.6389 18.1683 19.8069 18.0813C20.0884 17.9318 20.4039 18.1273 20.4664 18.3833C20.4979 18.5183 20.4739 18.6713 20.4014 18.8043C20.3174 18.9578 20.2009 19.0368 20.0544 19.1138C19.8884 19.2018 19.7224 19.2818 19.5544 19.3608C19.4921 19.3913 19.4237 19.4076 19.3543 19.4085C19.2849 19.4094 19.2162 19.3948 19.1531 19.3659C19.09 19.3369 19.0342 19.2943 18.9896 19.2411C18.945 19.1879 18.9128 19.1254 18.8954 19.0583C18.8249 18.7638 19.0189 18.4633 19.3044 18.3283" fill="white"/>
                                        <path d="M22.4839 9.84225C22.4839 9.84225 21.8979 8.93025 22.4744 7.73875C23.0514 6.54625 22.1164 6.24075 22.1164 6.24075L19.1624 7.12925C20.0834 6.04125 21.2669 4.49575 21.1294 3.87425C20.9054 2.87425 19.3989 3.23925 19.3989 3.23925C19.3989 3.23925 18.3329 3.44125 17.4434 2.45875C16.5544 1.47625 15.9204 2.22825 15.9204 2.22825L15.5924 5.75825C14.8729 4.57875 13.8989 3.17425 13.3109 3.10975C12.2924 2.99575 12.1519 4.54025 12.1519 4.54025C12.1519 4.54025 11.9949 5.61275 10.7779 6.13525C9.56037 6.65725 10.0674 7.50075 10.0674 7.50075L12.7579 8.70975C11.4659 9.19925 9.91487 9.89275 9.74287 10.4558C9.44337 11.4368 10.9349 11.8623 10.9349 11.8623C10.9349 11.8623 11.9599 12.2148 12.2489 13.5068C12.5339 14.7998 13.4594 14.4598 13.4594 14.4598L15.7714 11.1448C15.6359 12.4468 15.4104 15.3133 15.9989 15.8358C16.7674 16.5178 17.7714 15.3378 17.7714 15.3378C17.7714 15.3378 18.5214 14.5528 19.8174 14.8283C21.1119 15.1063 21.1854 14.1238 21.1854 14.1238L19.5289 11.3113C20.7509 11.6763 22.1119 11.9803 22.5489 11.6803C23.3929 11.0993 22.4864 9.84025 22.4864 9.84025" fill="#EFA8B6"/>
                                        <path d="M15.6993 11.25C15.6993 11.25 16.5733 14.9305 18.9438 14.798C18.9438 14.798 17.9478 14.9625 17.7698 15.343C17.7698 15.343 16.9058 16.264 16.2933 16.016C16.2933 16.016 15.8203 15.8705 15.7328 15.265C15.6443 14.659 15.6178 12.572 15.6993 11.25Z" fill="#E295A8"/>
                                        <path d="M12.5244 12.5459C12.5244 12.5459 11.0319 12.1204 11.3324 11.1389C11.5064 10.5764 13.0549 9.88294 14.3474 9.39444L11.6579 8.18444C11.6579 8.18444 11.1494 7.33944 12.3684 6.81894C13.5864 6.29744 13.7404 5.22344 13.7404 5.22344C13.7404 5.22344 13.8264 4.30644 14.3334 3.93894C13.9524 3.47644 13.5874 3.14394 13.3089 3.11344C12.2904 2.99944 12.1499 4.54394 12.1499 4.54394C12.1499 4.54394 11.9929 5.61644 10.7759 6.13894C9.55842 6.66094 10.0654 7.50444 10.0654 7.50444L12.7559 8.71344C11.4639 9.20294 9.91292 9.89644 9.74092 10.4594C9.44142 11.4404 10.9329 11.8659 10.9329 11.8659C10.9329 11.8659 11.9579 12.2184 12.2469 13.5104C12.5319 14.8034 13.4574 14.4634 13.4574 14.4634L13.7849 13.9929C13.4439 12.8624 12.5254 12.5459 12.5254 12.5459" fill="#E295A8"/>
                                        <path d="M17.1837 6.44316L17.5113 2.91316C17.5113 2.91316 17.5913 2.81716 17.7348 2.73916C17.6299 2.6544 17.5314 2.56198 17.4403 2.46266C16.5512 1.48016 15.9172 2.23216 15.9172 2.23216L15.7188 4.38266C16.2038 4.91416 16.7417 5.72166 17.1837 6.44516" fill="#E295A8"/>
                                        <path d="M16.5659 10.4443C17.6238 10.4443 18.4814 9.58668 18.4814 8.52878C18.4814 7.47088 17.6238 6.61328 16.5659 6.61328C15.508 6.61328 14.6504 7.47088 14.6504 8.52878C14.6504 9.58668 15.508 10.4443 16.5659 10.4443Z" fill="#FFC84D"/>
                                        <path d="M20.6254 9.88548C20.4972 9.71617 20.3748 9.54257 20.2584 9.36498C20.0629 9.06298 19.5229 9.05248 19.2269 9.24998C19.0709 9.35148 18.9659 9.50498 18.9324 9.67098C18.8949 9.86048 18.9624 10.001 19.0629 10.1575C19.1779 10.336 19.3024 10.508 19.4279 10.679C19.6429 10.971 20.1509 11.0005 20.4619 10.794C20.8019 10.569 20.8409 10.1795 20.6254 9.88548Z" fill="#E45A6F"/>
                                        <path d="M20.4477 7.16171C20.2342 7.16521 20.0207 7.16671 19.8107 7.15671C19.4497 7.14021 19.1297 7.57471 19.1177 7.93021C19.1107 8.11571 19.1732 8.29371 19.2902 8.41521C19.4227 8.55221 19.5752 8.58271 19.7617 8.59071C19.9727 8.60121 20.1862 8.59971 20.3987 8.59671C20.7617 8.59071 21.0787 8.19421 21.0917 7.82121C21.1072 7.41321 20.8107 7.15621 20.4477 7.16171Z" fill="#E45A6F"/>
                                        <path d="M18.6147 5.11519C18.4717 5.27219 18.3242 5.42769 18.1737 5.57619C17.9147 5.82619 18.0082 6.35819 18.2602 6.61119C18.3892 6.74219 18.5612 6.81919 18.7292 6.81819C18.9232 6.81619 19.0472 6.72419 19.1827 6.59469C19.3367 6.44919 19.4792 6.29369 19.6227 6.13769C19.8667 5.87019 19.7987 5.36619 19.5362 5.10069C19.2487 4.8107 18.8597 4.84769 18.6147 5.11519Z" fill="#E45A6F"/>
                                        <path d="M15.8455 4.79444C15.885 5.00494 15.9215 5.21394 15.9445 5.42294C15.987 5.78144 16.4685 6.02844 16.821 5.98344C16.9983 5.96255 17.1603 5.87275 17.272 5.73344C17.386 5.57994 17.3895 5.42394 17.3665 5.23844C17.3425 5.02844 17.305 4.81944 17.2675 4.60944C17.2035 4.25244 16.7605 4.00244 16.3915 4.05094C15.9875 4.10444 15.7815 4.43744 15.8455 4.79444Z" fill="#E45A6F"/>
                                        <path d="M13.5592 5.91004C13.6897 6.08054 13.8162 6.25004 13.9347 6.42454C14.1352 6.72554 14.6757 6.72654 14.9677 6.52404C15.1227 6.41904 15.2272 6.26404 15.2557 6.09804C15.2882 5.90854 15.2207 5.76954 15.1167 5.61354C15.0007 5.43654 14.8707 5.26704 14.7437 5.09704C14.5242 4.80954 14.0152 4.78954 13.7087 5.00104C13.3712 5.23204 13.3407 5.62254 13.5592 5.91004Z" fill="#E45A6F"/>
                                        <path d="M12.5843 8.16256C12.7943 8.20606 13.0023 8.25306 13.2033 8.30806C13.5528 8.40556 13.9643 8.05306 14.0528 7.70956C14.0776 7.62482 14.0851 7.53597 14.0748 7.44828C14.0646 7.3606 14.0369 7.27585 13.9933 7.19906C13.8968 7.03406 13.7538 6.97256 13.5743 6.92156C13.3695 6.86674 13.1631 6.81788 12.9553 6.77506C12.6018 6.69906 12.2013 7.01506 12.1078 7.37406C12.0023 7.77006 12.2318 8.08706 12.5843 8.16256Z" fill="#E45A6F"/>
                                        <path d="M13.0542 10.3626C13.2292 10.2416 13.4057 10.1226 13.5882 10.0131C13.8947 9.82763 13.9212 9.28963 13.7377 8.98563C13.6927 8.90955 13.633 8.84318 13.5621 8.79039C13.4912 8.7376 13.4105 8.69944 13.3247 8.67813C13.1382 8.63513 12.9947 8.69563 12.8352 8.79263C12.6536 8.90176 12.476 9.01733 12.3027 9.13913C12.0037 9.34413 11.9582 9.85213 12.1517 10.1686C12.3677 10.5156 12.7547 10.5671 13.0542 10.3626Z" fill="#E45A6F"/>
                                        <path d="M14.8248 11.8654C14.9138 11.6709 15.0033 11.4794 15.1038 11.2929C15.2748 10.9744 15.0243 10.4964 14.7078 10.3314C14.5433 10.2474 14.3583 10.2254 14.1968 10.2794C14.0153 10.3379 13.9228 10.4629 13.8338 10.6274C13.7328 10.8139 13.6438 11.0069 13.5528 11.1984C13.4018 11.5284 13.6193 11.9884 13.9513 12.1584C14.3143 12.3499 14.6733 12.1944 14.8248 11.8654Z" fill="#E45A6F"/>
                                        <path d="M17.3165 12.3302C17.2875 12.1197 17.2662 11.9082 17.2525 11.6962C17.228 11.3357 16.763 11.0632 16.4085 11.0897C16.2235 11.1027 16.053 11.1837 15.9435 11.3117C15.82 11.4607 15.808 11.6132 15.82 11.8012C15.831 12.0122 15.8575 12.2232 15.8825 12.4342C15.927 12.7937 16.3575 13.0682 16.726 13.0402C17.1355 13.0107 17.3605 12.6907 17.3165 12.3302Z" fill="#E45A6F"/>
                                        <path d="M19.2238 11.8137C19.1392 11.6188 19.0613 11.421 18.9903 11.2207C18.8698 10.8807 18.3453 10.7442 18.0133 10.8662C17.8383 10.9287 17.6983 11.0537 17.6283 11.2067C17.5493 11.3832 17.5773 11.5332 17.6413 11.7117C17.7113 11.9127 17.7913 12.1092 17.8733 12.3047C18.0128 12.6377 18.5003 12.7862 18.8508 12.6592C19.2373 12.5192 19.3643 12.1492 19.2238 11.8152" fill="#E45A6F"/>
                                        <path d="M15.4036 10.6664C15.4996 10.507 15.6003 10.3504 15.7056 10.1969C15.8866 9.93539 15.7256 9.59739 15.4796 9.50739C15.3399 9.46065 15.1878 9.46724 15.0526 9.52589C14.8926 9.59139 14.8001 9.69689 14.7071 9.83339C14.6006 9.98689 14.5031 10.1439 14.4041 10.3024C14.3665 10.3609 14.3425 10.427 14.3338 10.4959C14.325 10.5649 14.3318 10.6349 14.3536 10.7009C14.3754 10.7669 14.4117 10.8272 14.4598 10.8773C14.5079 10.9275 14.5666 10.9663 14.6316 10.9909C14.9146 11.0954 15.2361 10.9354 15.4036 10.6664Z" fill="white"/>
                                        <path d="M14.2471 9.57578C14.415 9.49694 14.5852 9.42324 14.7576 9.35478C15.0546 9.23828 15.1096 8.86928 14.9561 8.65778C14.8666 8.5405 14.7367 8.46067 14.5916 8.43378C14.4226 8.39828 14.2876 8.43528 14.1361 8.49628C13.9601 8.56378 13.7911 8.63928 13.6206 8.71628C13.5571 8.74419 13.5007 8.78579 13.4552 8.83809C13.4097 8.8904 13.3763 8.95212 13.3575 9.01883C13.3387 9.08554 13.3348 9.15558 13.3463 9.22395C13.3577 9.29232 13.3841 9.35731 13.4236 9.41428C13.6011 9.65778 13.9586 9.70528 14.2471 9.57578Z" fill="white"/>
                                        <path d="M14.1617 8.22694C14.3472 8.23644 14.5332 8.24694 14.7182 8.26444C15.0332 8.29844 15.2532 7.99744 15.2142 7.73594C15.1872 7.59165 15.1086 7.46211 14.9932 7.37144C14.8597 7.26194 14.7232 7.23294 14.5577 7.21494C14.3732 7.19544 14.1877 7.18444 14.0012 7.17494C13.932 7.17016 13.8626 7.18084 13.7981 7.2062C13.7336 7.23157 13.6755 7.27098 13.6281 7.32159C13.5807 7.37219 13.5452 7.43272 13.5241 7.49877C13.503 7.56481 13.4969 7.63473 13.5062 7.70344C13.5507 8.00344 13.8462 8.20844 14.1617 8.22694Z" fill="white"/>
                                        <path d="M14.5976 6.88908C14.7386 7.01308 14.8766 7.13908 15.0086 7.26958C15.2321 7.49458 15.5931 7.39758 15.7276 7.17258C15.798 7.0434 15.8185 6.89286 15.7851 6.74958C15.7491 6.57858 15.6611 6.46908 15.5451 6.35458C15.4122 6.22453 15.2765 6.09733 15.1381 5.97308C15.087 5.9258 15.0261 5.89042 14.9597 5.86948C14.8933 5.84855 14.8231 5.84257 14.7541 5.85199C14.6851 5.86141 14.6191 5.88598 14.5608 5.92395C14.5024 5.96192 14.4532 6.01233 14.4166 6.07158C14.2636 6.33308 14.3646 6.67908 14.5976 6.88908Z" fill="white"/>
                                        <path d="M15.9914 6.12202C16.0009 6.30702 16.0069 6.49352 16.0089 6.68002C16.0069 6.99852 16.3294 7.18502 16.5839 7.11952C16.7174 7.08552 16.8409 6.99152 16.9254 6.86452C17.0199 6.71902 17.0359 6.57852 17.0359 6.41452C17.0359 6.22702 17.0289 6.04252 17.0184 5.85702C17.0165 5.78762 16.9991 5.71953 16.9674 5.65773C16.9358 5.59592 16.8907 5.54198 16.8356 5.49984C16.7804 5.4577 16.7165 5.42844 16.6485 5.4142C16.5806 5.39996 16.5103 5.40109 16.4429 5.41752C16.1514 5.49252 15.9744 5.80602 15.9914 6.12202Z" fill="white"/>
                                        <path d="M17.5953 6.34026C17.4893 6.49176 17.3783 6.64226 17.2633 6.78826C17.0623 7.03676 17.1983 7.38326 17.4393 7.49176C17.5648 7.54626 17.7198 7.55226 17.8658 7.50376C18.0318 7.44976 18.1288 7.34876 18.2333 7.22226C18.3488 7.07476 18.4583 6.92526 18.5668 6.77476C18.6079 6.7189 18.6362 6.65464 18.6496 6.58657C18.663 6.5185 18.6611 6.44832 18.6442 6.38104C18.6273 6.31376 18.5957 6.25106 18.5517 6.19741C18.5078 6.14377 18.4525 6.10052 18.3898 6.07076C18.1128 5.94876 17.7803 6.08426 17.5953 6.34026Z" fill="white"/>
                                        <path d="M18.6596 7.40437C18.4846 7.46887 18.3126 7.53137 18.1331 7.58787C17.8301 7.68437 17.7491 8.04787 17.8881 8.27037C17.9606 8.38737 18.0861 8.47737 18.2326 8.51887C18.4006 8.56587 18.5381 8.53837 18.6971 8.48987C18.8741 8.43337 19.0486 8.36887 19.2236 8.30337C19.289 8.28041 19.3484 8.24317 19.3976 8.19434C19.4468 8.14552 19.4845 8.08635 19.508 8.02113C19.5315 7.95591 19.5401 7.88628 19.5333 7.8173C19.5265 7.74832 19.5044 7.68173 19.4686 7.62237C19.3081 7.36437 18.9576 7.29287 18.6596 7.40437Z" fill="white"/>
                                        <path d="M19.0583 8.95459C18.8824 8.89456 18.7081 8.82954 18.5358 8.75959C18.2403 8.63959 17.9453 8.86609 17.9103 9.12559C17.8931 9.27149 17.9309 9.41858 18.0163 9.53809C18.1148 9.68109 18.2373 9.74959 18.3903 9.81209C18.5628 9.88259 18.7373 9.94609 18.9123 10.0076C19.2123 10.1121 19.5043 9.91359 19.5378 9.64059C19.5798 9.34059 19.3568 9.06059 19.0583 8.95459Z" fill="white"/>
                                        <path d="M16.9768 10.9072C16.9666 10.7215 16.9611 10.5356 16.9603 10.3497C16.9603 10.0302 16.6393 9.84268 16.3838 9.90718C16.2428 9.94769 16.1218 10.0391 16.0443 10.1637C15.9483 10.3082 15.9318 10.4482 15.9318 10.6117C15.9303 10.7992 15.9383 10.9857 15.9478 11.1702C15.9499 11.2395 15.9674 11.3076 15.999 11.3693C16.0306 11.4311 16.0756 11.4851 16.1306 11.5273C16.1856 11.5696 16.2494 11.5991 16.3172 11.6137C16.385 11.6282 16.4553 11.6276 16.5228 11.6117C16.8173 11.5357 16.9903 11.2217 16.9768 10.9072Z" fill="white"/>
                                        <path d="M18.2726 10.4095C18.1803 10.2484 18.0923 10.0848 18.0086 9.91901C17.8656 9.63351 17.4921 9.61001 17.2956 9.78301C17.1876 9.88253 17.1195 10.018 17.1041 10.164C17.0841 10.337 17.1331 10.4685 17.2071 10.616C17.2916 10.784 17.3786 10.945 17.4706 11.107C17.5039 11.1682 17.5504 11.2211 17.6067 11.2621C17.663 11.3031 17.7277 11.331 17.7961 11.344C17.8645 11.3569 17.935 11.3544 18.0023 11.3368C18.0697 11.3192 18.1323 11.2868 18.1856 11.242C18.4116 11.042 18.4271 10.685 18.2726 10.4095Z" fill="white"/>
                                        <path d="M16.6905 17.5105L15.341 15.9955C15.341 15.9955 14.9235 13.59 17.0835 14.9785L17.7095 16.914L16.6905 17.5085" fill="#DDE4E9"/>
                                        <path d="M17.7371 16.9474L17.1016 15.0214C17.1016 15.0214 17.6766 12.6489 19.1066 14.7829L18.9096 16.8064L17.7396 16.9474" fill="#C8D2D9"/>
                                        <path d="M18.2441 16.7291L19.1166 14.7681C19.1166 14.7681 21.2561 13.3166 20.8571 16.0056L19.2631 17.4541L18.2441 16.7291Z" fill="#DDE4E9"/>
                                        <path d="M18.3868 19.6354L18.2718 21.6599C18.2718 21.6599 16.8653 23.6549 16.3223 21.1474L17.2458 19.3359L18.3868 19.6354Z" fill="#DDE4E9"/>
                                        <path d="M19.2447 17.8613L21.1922 18.4748C21.1922 18.4748 22.6612 20.4798 20.0122 20.4688L18.5547 19.0273L19.2447 17.8613Z" fill="#DDE4E9"/>
                                        <path d="M17.2502 19.292L16.3372 21.1035C16.3372 21.1035 14.2532 22.373 14.7532 19.8555L16.3232 18.5625L17.2502 19.292Z" fill="#C8D2D9"/>
                                        <path d="M16.6454 19.0647L14.7549 19.7922C14.7549 19.7922 12.3564 19.3312 14.4193 17.8027L16.4509 17.9022L16.6454 19.0647Z" fill="#DDE4E9"/>
                                        <path d="M16.4458 18.2717L14.4748 17.7973C14.4748 17.7973 12.7643 16.0567 15.3288 15.9688L16.9448 17.2022L16.4458 18.2717Z" fill="#C8D2D9"/>
                                        <path d="M18.5918 17.3929L20.5878 16.1719C20.5878 16.1719 23.4048 16.1954 21.3833 18.3604L19.0563 18.6719L18.5918 17.3929Z" fill="#C8D2D9"/>
                                        <path d="M17.686 19.6026C18.5493 19.6026 19.249 18.9028 19.249 18.0396C19.249 17.1763 18.5493 16.4766 17.686 16.4766C16.8228 16.4766 16.123 17.1763 16.123 18.0396C16.123 18.9028 16.8228 19.6026 17.686 19.6026Z" fill="#F8AE1C"/>
                                        <path d="M17.3402 18.3457C17.1317 18.1103 16.9993 17.8175 16.9603 17.5055C16.9213 17.1935 16.9775 16.8771 17.1217 16.5977C16.9392 16.664 16.7707 16.7641 16.6252 16.8927C16.315 17.1673 16.1263 17.5538 16.1007 17.9673C16.075 18.3809 16.2143 18.7877 16.4882 19.0987C16.6567 19.289 16.8691 19.4353 17.107 19.525C17.3449 19.6146 17.6011 19.6449 17.8533 19.6131C18.1055 19.5813 18.3462 19.4885 18.5544 19.3426C18.7626 19.1968 18.9321 19.0023 19.0482 18.7762C18.7532 18.8845 18.4324 18.9014 18.1277 18.8246C17.823 18.7478 17.5485 18.5809 17.3402 18.3457Z" fill="#CA8A2A"/>
                                        <path d="M18.9273 19.125L20.1503 20.744C20.1503 20.744 20.3678 23.1745 18.3288 21.616L17.8633 19.6355L18.9273 19.125Z" fill="#C8D2D9"/>
                                        </svg> 
                                </span>
                                x12
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center flex-row w-full md:max-w-md mx-auto text-xl text-left md:px-4 px-6">
                    <div className="flex flex-col items-center w-full">
                        {mintFriend && (
                            <input
                                ref={friendField}
                                className="friend-input mt-6"
                                value={friendAddress}
                                onChange={(event) => {
                                setFriendAddress(event.target.value);
                                }}
                                disabled={false}
                                placeholder={"Your friend's wallet address"}
                            />
                        )}
                        <MintButton
                            disabled={working || mintDisabled || loading}
                            onClick={mintFriend? mintForFriend : mintForSelf}
                            className={"mt-6 p-2 py-4 justify-center disabled:opacity-50 disabled:cursor-not-allowed mint-button text-xl bg-white w-full text-black px-8 cursor-pointer"}
                            >
                            <em>{loading ? "Minting your flower now" : mintButtonText}</em>
                        </MintButton>
                        <p  className="mt-6 text-lg cursor-pointer text-center hover:underline hover:opacity-100 disabled:cursor-not-allowed"
                            onClick={() => {
                              setMintFriend(!mintFriend);
                            }}
                            hidden={salesPaused || loading}
                            >
                            <em>{mintFriend? 'Mint for yourself instead?' : 'Mint for a friend instead?'}</em>
                        </p>
                    </div>
                </div>
                <div className="text-center max-w-2xl mx-auto text-xl mt-12 md:px-4 px-6">
                  {!error && (transactionHash || transactionReceipt) && (
                    <div className="text-green-500 text-xl font-normal mt-4 text-center">
                        <p>🌺👃🌺 </p>
                        <span>{mintFriend? 'Your friend has received the flowers ' : 'Your flowers have bloomed'}</span>
                        <br/>
                        <a
                          href={`https://etherscan.io/tx/${transactionHash}`}
                          target="_blank"
                          className="font-normal text-sm cursor-pointer underline"
                        >View on Etherscan</a>
                    </div>
                  )}
                  {error && (
                      <div className="mt-8 text-center">
                          <p className="text-white-500 text-lg font-normal mt-4">
                              {/* 🥀 Oops! Something happend. We were not able to mint your flower 🥀 */}
                              🥀 {error.message} 🥀 
                          </p>
                          <div className={transactionHash ? "flex" : "hidden"}>
                            Your transaction may still go through. 
                            <a href={transactionHash ? transactionHash : error.message.transactionHash} target="_blank" className="opacity-70 underline hover:cursor-pointer"><em>View on Etherscan</em></a>
                          </div>
                      </div>
                  )}
                </div>
            </div>
        )}



        <div className="mt-10 max-w-6xl mx-auto text-center flex flex-col md:flex-row justify-center items-center flower-tease px-4">
            <div className="w-full rounded-2xl p-4">
                <object data="/flowers/middleflower.svg" type="image/svg+xml" className="w-full rounded-2xl"></object>
            </div>
            <div className="w-full rounded-2xl p-4">
                <object data="/flowers/4.svg" type="image/svg+xml" className="w-full rounded-2xl"></object>
            </div>
            <div className="w-full rounded-2xl p-4">
                <object data="/flowers/5.svg" type="image/svg+xml" className="w-full rounded-2xl"></object>
            </div>
        </div>
        <div className="mt-2 max-w-6xl mx-auto text-center flex flex-col md:flex-row justify-center items-center flower-tease px-4">
            <div className="w-full rounded-2xl p-4">
                <object data="/flowers/3.svg" type="image/svg+xml" className="w-full rounded-2xl"></object>
            </div>
            <div className="w-full rounded-2xl p-4">
                <object data="/flowers/6.svg" type="image/svg+xml" className="w-full rounded-2xl"></object>
            </div>
            <div className="w-full rounded-2xl p-4">
                <object data="/flowers/rightflower.svg" type="image/svg+xml" className="w-full rounded-2xl"></object>
            </div>
        </div>
        <div className="mt-2 max-w-6xl mx-auto text-center flex flex-col md:flex-row justify-center items-center flower-tease px-4">
            <div className="w-full rounded-2xl p-4">
                <object data="/flowers/9.svg" type="image/svg+xml" className="w-full rounded-2xl"></object>
            </div>
            <div className="w-full rounded-2xl p-4">
                <img src="/flowers/10.png" className="w-full rounded-2xl"/>
            </div>
            <div className="w-full rounded-2xl p-4">
                <object data="/flowers/8.svg" type="image/svg+xml" className="w-full rounded-2xl"></object>
            </div>
        </div>


        <div className="flex align-center flex-col max-w-4xl mx-auto text-xl text-left mt-10 md:p-4 p-6">
            <p className="mt-2 opacity-90">
            OCC#1 🌺 Flowers is a collection 4096 programatically generated on-chain flowers, for you to own or to share. 
            Each flower is 100% generated on-chain, including it's metadata. No ipfs/arweave, no external rendering script. Just SVGs created by the contract.
            </p>

            <h1 className="text-xl mt-16 crimson-pro">What is the roadmap?</h1>
            <p className="mt-2 opacity-90">
              We are florists, and this is a flower shop. Buy art you like, appreciate &amp; resonate with. But if you care, the 1 in occ#1 is there for a reason.
            </p>
            
            <div className="flex flex-col md:flex-row items-center mt-16 ">
              <div className="mr-0 md:mr-8 ">
                <h1 className="text-xl crimson-pro">What about the traits?</h1>
                <p className="mt-2 opacity-90">
                Again, ser, we've talked about this. This is a flower shop 💐 Some flowers are nice. Some are too nice. 
                The rest, are just the right amount of nice. To keep, or to gift 🫂 Call your mom/dad/friend/lover, buy them a flower. Then explain to them what nfts are. 
                Buuut if you really wanna know – we've put in an extensive amount of work in setting up numerous traits, 
                with predictable amounts of rarities built into the contract 🧑‍🔬Check your flower on opensea, when minting starts. 
                Since all flowers are randomly generated on-chain, we'll find out the precise rarities of your flower at the same time you do.
                </p>
              </div>
              <img src="/flowers/traits.png" className="w-full md:w-5/12 mt-8 md:mt-0 rounded-2xl"/>
            </div>

            <h1 className="text-xl mt-16 crimson-pro">What's on-chain?</h1>
            <p className="mt-2 opacity-90">
            Most recently popularized by the Loot Project, on-chain implies that the ingredients that make up your NFT art, 
            its metadata, and the image/animation/etc. itself are generated and stored on the Ethereum blockchain – which to 
            us is mind-blowing and fascinating. Other examples of this include Blitmap, Anonymice &amp; OnChainMonkey.
            </p>
            <p className="mt-2 opacity-90">
              So.. what?
            </p>
            <p className="mt-2 opacity-90 italic">
            "Most NFTs hold only the metadata and ownership information and then link to an external service for the actual asset. This is mostly fine, 
            however the service storing that asset may disappear or the data go corrupt. Probably not, but maybe. Even if the (minting website) 
            disappears at some point, (on-chain NFTs) will be around as long as the blockchain itself." – excerpt from cranes.supply
            </p>

            <h1 className="text-xl mt-16 crimson-pro">What is the On chain collective?</h1>
            <p className="mt-2 opacity-90">
            OCC is more than a run-of-the-mill NFT art project. Our goal is to channel our love for art and technology, collaborate with other digital 
            &amp; traditional artists, and use completely on-chain tech to make beautiful NFT collectibles that, hopefully, make you happy 🌻Every NFT 
            mint we do is 100% generated on-chain in the smart contract and lives on as an immutable ERC-721 token on the Ethereum Blockchain forever.
            </p>

            <p className="mt-2 opacity-90">
            Our first mint (of season 1): flowers is a collection of beautiful flower NFTs that are programmatically generated at the precise moment 
            you mint it 🌼
            </p>

            <p className="mt-8">🌺👃🌺</p>
        </div>
        <div className="flex align-center flex-col max-w-2xl mx-auto text-center mt-10 mb-12 p-4">
            <div className="text-md ">
              <Link href="/faqs">
                  <p className="hover:underline inline-flex cursor-pointer">faqs</p>
              </Link>
              {" "}&bull;{" "}
              <a href="https://opensea.io/collection/flowersonchain" target="_blank" className="hover:underline">
                  opensea
              </a>
              {" "}&bull;{" "}
              <a href="https://twitter.com/OnChainCo" target="_blank" className="hover:underline">
                  twitter
              </a>
              {" "}&bull;{" "}
              <a href="https://discord.com/invite/BUCup66VKc" target="_blank" className="hover:underline">
                  discord
              </a>
            </div>
        </div>
    </main>
  );
}


function ConnectButtons({ activate, setWorking }) {
    const cls =
      "btn rounded-full flex justify-center space-x-2 images-center shadow-md border-2 w-52 h-14 text-base font-normal m-2";
    return (
      <>
        {/* <h3>Connect your wallet</h3> */}
        <div className="flex flex-col md:flex-row items-center justify-center">
          <button
            onClick={() => {
              setWorking(true);
              activate(injected);
            }}
            className={cn(cls, "text-yellow-600 border-yellow-600")}
          >
            <img src="/flowers/metamask-fox.svg" className="h-5 w-5" />
            <span className="roboto">Metamask</span>
          </button>
          <button
            onClick={() => {
              setWorking(true);
              activate(wcConnector);
            }}
            className={cn(cls, "text-blue-500 border-blue-600")}
          >
            <img src="/flowers/walletconnect-logo.svg" className="h-5 w-5" />
            <span className="roboto">WalletConnect</span>
          </button>
        </div>
      </>
    );
  }

  function MintButton({ className, ...props }) {
    return (
      <button
        className={cn(className)}
        {...props}
      />
    );
  }
