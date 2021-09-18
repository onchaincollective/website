import Head from "next/head";
import { useEffect, useState, useRef } from "react";
import Web3, { utils } from "web3";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { Web3ReactProvider, useWeb3React } from "@web3-react/core";
import cn from "classnames";
import debounce from "debounce";

const contractAddress =
  process.env.NODE_ENV === "production"
    ? "0x7D8391074074F725CbD6df368987e948D3fc7ED6"
    : "0x7D8391074074F725CbD6df368987e948D3fc7ED6";

const soldOut = false; // omg!

const mintPrice = 0.00000000002;

const injected = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42] });
const wcConnector = new WalletConnectConnector({
  infuraId: "cddde80366fc42c2ac9202c6a0f9850b",
});

function getLibrary(provider) {
  return new Web3(provider);
}

const abi = [
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
				"name": "newMaxSupply",
				"type": "uint256"
			}
		],
		"name": "setMaxSupply",
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
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "withdrawAll",
		"outputs": [],
		"stateMutability": "payable",
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
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "seed",
				"type": "string"
			}
		],
		"name": "getAColor",
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
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getCoreSize",
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
			},
			{
				"internalType": "string",
				"name": "mainColor",
				"type": "string"
			}
		],
		"name": "getPetals",
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
	}
];

export default function WrappedHome() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Home />
    </Web3ReactProvider>
  );
}

function Home() {
  const { activate, active, account, library } = useWeb3React();
  console.log(account);
  const [working, setWorking] = useState(false);
  const [contract, setContract] = useState(null);
  const [error, setError] = useState(null);
  const [yearTotal, setYearTotal] = useState(0);
  // const [friendAddress, setFriendAddress] = useState("");
  // const [realFriendAddress, setRealFriendAddress] = useState("");
  const [mintNumber, setMintNumber] = useState("");
  const [transactionHash, setTransactionHash] = useState(null);
  // const friendField = useRef();
  const mintNumberField = useRef();

  useEffect(() => {
    if (!library) return;

    const contract = new library.eth.Contract(abi, contractAddress);
    console.log(contract)
    setContract(contract);

    // contract.methods
    //   .currentYearTotalSupply()
    //   .call()
    //   .then((res) => {
    //     setYearTotal(res);
    //   }, handleError);

    setWorking(false);
  }, [account]);


  // useEffect(() => {
  //   if (!friendAddress) return;

  //   if (friendAddress.match(/0x[a-fA-F0-9]{40}/)) {
  //     setRealFriendAddress(friendAddress);
  //     return;
  //   }

  //   if (friendAddress.match(/\./)) {
  //     debouncedLookup();
  //   }
  // }, [friendAddress]);

  function handleError(err) {
    console.error(err);
    setWorking(false);
    setError(err);
  }

  function craftForSelf() {
    setWorking(true);
    console.log(mintNumber);
    contract.methods
      .mintForSelf(mintNumber)
      .send({ from: account, value: utils.toWei("0.015", "ether") })
      .then((res) => {
        console.log(res);
        setWorking(false);
        setTransactionHash(res.transactionHash);
      }, handleError);
  }

  // function craftForFriend() {
  //   if (!realFriendAddress) {
  //     friendField.current.focus();
  //   }

  //   setWorking(true);

  //   contract.methods
  //     .craftForFriend(realFriendAddress)
  //     .send({ from: account, value: utils.toWei("0.02", "ether") })
  //     .then((res) => {
  //       setWorking(false);
  //       setTransactionHash(res.transactionHash);
  //     }, handleError);
  // }

  // const debouncedLookup = debounce(async () => {
  //   setWorking(true);
  //   try {
  //     const address = await library.eth.ens.getAddress(friendAddress);
  //     setRealFriendAddress(address);
  //   } catch {}

  //   setWorking(false);
  // }, 1000);

  return (
    <main className="max-w-4xl mx-auto text-base md:text-2xl">
      <Head>
        <title>Flowers • For you, or a special someone in your life 🌼</title>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
      </Head>

      <div className="p-5 md:p-16">
        <p className="text-sm mb-4">On-chain collective #1</p>
        <header className="leading-normal">
          <img src="/logo.png" className="w-1/3" />
        </header>

        <div className="h-8"></div>

        <div className="md:flex justify-between">
          <div className="w-full flex-auto text-sm leading-normal md:max-w-xs">
            <p className="mb-4">
              Fully on-chain, randomly generated unique flowers. For you, or a special someone in your life 🌼
            </p>
            <p className="mb-4">
              Flowers are composed of unique petal designs and many colors – all of which come together to make each flower uniquely yours.
            </p>
            <p className="mb-4">
              Flowers is the first of five projects created as part of the on-chain collective. 
              Our goal is to channel our shared love for art and technology, and use completely on-chain tech 
              to make beautiful things for you to hold on to and enjoy, or to share with a friend :)
            </p>
          </div>

          <div className="h-6 md:hidden"></div>

          <div className="flex-0 w-full flex flex-col md:ml-6 space-y-4 md:max-w-xs">
            {!active && (
              <ConnectButtons setWorking={setWorking} activate={activate} />
            )}
            {active && (
              <div>
                {/* <div className="h-2"></div>

                <div className="flex flex-row">
                  <input
                    ref={friendField}
                    className="input text-sm md:text-lg rounded-2xl rounded-b-none"
                    value={friendAddress}
                    onChange={(event) => {
                      setFriendAddress(event.target.value);
                    }}
                    disabled={false}
                    placeholder={"0x… or ENS domain"}
                  />
                  <MintButton
                    disabled={false}
                    className="rounded-2xl rounded-t-none"
                    onClick={craftForFriend}
                  >
                    Mint for a friend (Ξ0.01)
                  </MintButton>
                </div>

                {realFriendAddress && (
                  <div className="text-sm truncate">
                    Sending to{" "}
                    <code className="bg-gray-100" title={realFriendAddress}>
                      {realFriendAddress}
                    </code>
                  </div>
                )} */}

                {/* <div className="h-2"></div> */}

                {transactionHash && (
                  <div className="text-green-500 text-xs flex flex-col space-y-2">
                    <span>Success!</span>
                    <a
                      href={`https://etherscan.io/tx/${transactionHash}`}
                      className="btn font-normal bg-gray-100 rounded-full shadow-md"
                    >
                      View transaction on Etherscan
                    </a>
                  </div>
                )}
                {error && (
                  <div className="text-red-500 text-xs">{error.message}</div>
                )}

                <div className="text-sm leading-normal">
                  <p>
                    <strong>Each flower cost you Ξ0.01 + gas fees to mint</strong>{" "}
                  </p>
                  <p>
                    The flowers generated will be different depending on your wallet address
                  </p>
                  {/* <p>
                    You can mint one for yourself or for a friend. The flowers generated
                    will be different depending on its number and the
                    destination address.
                  </p> */}
                  <input
                    ref={mintNumberField}
                    className="input text-sm rounded-2xl bg-white mt-8"
                    value={mintNumber}
                    onChange={(event) => {
                      setMintNumber(event.target.value);
                    }}
                    disabled={working}
                    placeholder={"Number of flowers to mint "}
                  />

                  <MintButton
                    disabled={working || soldOut}
                    onClick={craftForSelf}
                    className="p-2 justify-center mt-2"
                  >
                    Mint Now
                  </MintButton>

                  {/* <p className="pt-8">
                    {yearTotal}/5,000 flowers have been minted in{" "}
                    {new Date().getFullYear()}.
                  </p> */}

                  {/* <progress className="w-full" max={1000} value={yearTotal} /> */}

                  {/* <p>
                    If all 1,000 cranes are minted in a year, holders get to
                    mint a <em>Special Edition Mega Luck</em> crane for free (gas only.)
                  </p> */}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <img src="/last-0.svg" className="" />
      </div>

      <div className="p-5 md:p-16 ">
      <h1 className="mb-4">FAQ</h1>
        <div className="md:flex justify-between flex-row text-sm">
          <div className="w-full flex-auto text-sm leading-normal md:max-w-xs">
            <div className="mb-4">
              <H4>Why flowers?</H4>
              <p className="mt-1">Ask yourself – why not?</p>
            </div>
            <div className="mb-4">
              <H4>Who made this?</H4>
              <p className="mt-1">
                Flowers, and the upcoming releases under by the <em>on-chain collective</em> are designed and coded 
                by {' '}
                <A href="https://screenshake.co">
                  Saransh Sinha
                </A> & <A href="https://nitinrgupta.com">
                  Nitin Gupta
                </A>
                
              </p>
            </div>
            <div className="mb-4">
              <H4>
                What does fully on-chain mean?
              </H4>
              <p className="mt-1">
                Most recently popularized by the loot project, on-chain implies that the ingredients that make up your NFT, 
                it’s metadata and the image iself are generated and stored on the Ethereum blockchain. Flowers are generated 
                and stored on-chain, and thus will exist as long as the Ethereum blockchain continues to.
              </p>
            </div>
            <div className="mb-4">
              <H4>How do I buy one?</H4>
              <p className="mt-1">
              You’ll need an Ethereum wallet. 🌈 Rainbow or Metamask works. Just connect your Ethereum wallet using the buttons 
              on the top, and then use this website to mint your flowers. You can mint at most 10 flowers per transaction, 
              until supplies last.
              </p>
            </div>
            <div className="mb-4">
              <H4>Where is the discord?</H4>
              <p className="mt-1">
                There isn’t one (at this time). But we do have a twitter account for announcements and will be looking into 
                discord if y’all want a place to hang and talk about flowers 🌸
              </p>
            </div>
          </div>
          <div className="w-full flex-auto text-sm leading-normal md:max-w-xs">
            <H4>What are the traits & rarity levels of these traits?</H4>
            <p className="mt-1">
              Before we talk about this – this is a strange question to ask about art. We believe that art can be enjoyed, 
              more often than not, for its own sake. That said – if you must know: 
            </p>
            <li>7 unique petal styles</li>
            <li>4 to 20 petals (slight variance in range, based on the petal style)</li>
            <li>Randomized core size</li>
            <li>38 possible colors</li>
            <li>Base and overlay colors for background</li>
            <p>
              And a 1 in 1000 chance for your flower to be... weird
            </p>
          </div>
        </div>
      </div>
      <div className="text-sm p-5 md:p-16">
        <A href="https://etherscan.io/address/0xc3f5e8a98b3d97f19938e4673fd97c7cfd155577">
          Contract
        </A>{" "}
        &bull;{" "}
        <A href="https://opensea.io/collection/cranes-for-special-wallets">
          OpenSea
        </A>{" "}
      </div>
    </main>
  );
}

const A = (props) => <a className="text-blue-500 underline" {...props} />;
const H4 = (props) => <h4 className="font-bold" {...props} />;
const Answer = (props) => <div className="font-light" {...props} />;

function ConnectButtons({ activate, setWorking }) {
  const cls =
    "btn bg-white dark:bg-white rounded-full inline-flex images-center space-x-2 shadow-md border w-full text-base font-normal";
  return (
    <>
      <h3>Connect your wallet</h3>
      <div className="flex flex-col md:flex-col items-start space-y-4">
        <button
          onClick={() => {
            setWorking(true);
            activate(injected);
          }}
          className={cn(cls, "text-yellow-600 border-yellow-600")}
        >
          <img src="/metamask-fox.svg" className="h-5 w-5" />
          <span>Metamask</span>
        </button>
        <button
          onClick={() => {
            setWorking(true);
            activate(wcConnector);
          }}
          className={cn(cls, "text-blue-500 border-blue-600")}
        >
          <img src="/walletconnect-logo.svg" className="h-5 w-5" />
          <span>WalletConnect</span>
        </button>
      </div>
    </>
  );
}

function MintButton({ className, ...props }) {
  return (
    <button
      className={cn(
        "btn bg-white dark:bg-white rounded-full shadow-md border w-full text-base text-center font-normal",
        className
      )}
      {...props}
    />
  );
}
