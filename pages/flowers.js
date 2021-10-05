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
          // setPrivateSaleIsActive(false);
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
        //   allottedMints: "12",
        //   isWhiteListed: true,
        //   numHasMinted: "12"
        // });
        // console.log(res);
        }, handleError);

        setWorking(false);
        
    }, [account, loading]);


    useEffect(() => {
        // console.log("======================================");
        // console.log("Working: ", working);
        // console.log("SalesPaused: ", salesPaused);
        // console.log("privateSaleIsActive", privateSaleIsActive);
        // console.log("Max Mint Per Transaction: ", maxMintPerTransaction);
        // console.log("Max Mint Per Address: ", maxPerAddress);
        // console.log("Total tokens minted per addy: ", tokensMintedPerAddress);
        // console.log("Mint Number: ", mintNumber);
        // console.log("maxSupply: ", maxSupply);
        // console.log("is Whitlisted: ", whitelist && whitelist.isWhiteListed);
        // console.log("Whitelist numHasMinted: ", whitelist && whitelist.numHasMinted);
        // console.log("Whitelist allottedMints: ", whitelist && whitelist.allottedMints);
        // console.log("mintNumber: ", mintNumber);
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

        // console.log("Mint Disabled", mintDisabled);

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
      
        <div className="flex items-center flex-col max-w-2xl mx-auto text-center p-4">
            <div className="mt-6 md:mt-10 flex flex-col items-center">
                <Link href="/">
                    <p className="text-sm mt-8 opacity-50 cursor-pointer">occ <span className="text-xs">#1</span></p>
                </Link>
                <header className="text-5xl md:text-6xl font-snell ml-8">
                    flowers
                </header>

                <p className="text-center max-w-3xl mx-auto text-xl text-left mt-2 md:p-4 p-6">
                Fully on-chain generative NFTs for you to own, or to share 🌼 <br/>
                All the flowers have been minted from the flower shop and delivered to their respective addresses 🌺 
                You can still get them if the owners decide to sell their flowers in the secondary flower shops
                </p>
                <a href="https://opensea.io/collection/flowersonchain" target="_blank">
                  <p className="mint-button w-40 rounded-3xl bg-white text-black px-8 py-3 cursor-pointer mt-12"><em>view on opensea</em></p>
                </a>
            </div>
        </div>

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

        <div className="flex align-center flex-col max-w-2xl mx-auto text-center mt-10 p-4">
            <ul>
                <li><h3 className="quotes text-xl">“There are always flowers for those who want to see them” ~ Henri Matisse</h3></li>
                {/* <li><h3 className="quotes">“Every flower is a soul blossoming in nature” ~ Gerard De Nerwal</h3></li>
                <li><h3 className="quotes">“In joy and in sadness, flowers are our constant friends” ~ Unknown</h3></li> */}
            </ul>
        </div>


        <div className="flex align-center flex-col max-w-4xl mx-auto text-xl text-left mt-10 p-6">
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
              <a href="https://etherscan.io/address/0x5a876ffc6e75066f5ca870e20fca4754c1efe91f" target="_blank" className="hover:underline">
                  contract
              </a>
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
