import Head from "next/head";
import { useEffect, useState, useRef } from "react";
import Web3, { utils } from "web3";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { Web3ReactProvider, useWeb3React } from "@web3-react/core";
import cn from "classnames";
import debounce from "debounce";
import { func } from "prop-types";

const contractAddress =
  process.env.NODE_ENV === "production"
    ? "0x3b6c29425609c66474f7a7fa6b1d3630a6dbd7ed"
    : "0x3b6c29425609c66474f7a7fa6b1d3630a6dbd7ed";

const soldOut = false; // omg!

const mintPrice = 0.015;

const injected = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42] });
const wcConnector = new WalletConnectConnector({
  infuraId: "cddde80366fc42c2ac9202c6a0f9850b",
});

function getLibrary(provider) {
  return new Web3(provider);
}

const abi = [
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
  const [mintFriend, setMintFriend] = useState(false);
  const [contract, setContract] = useState(null);
  const [error, setError] = useState(null);
  const [totalSupply, setTotalSupply] = useState(0);
  const [friendAddress, setFriendAddress] = useState("");
  const [realFriendAddress, setRealFriendAddress] = useState("");
  const [mintNumber, setMintNumber] = useState("");
  const [transactionHash, setTransactionHash] = useState(null);
  const friendField = useRef();
  const mintNumberField = useRef();

  useEffect(() => {
    if (!library) return;

    const contract = new library.eth.Contract(abi, contractAddress);
    console.log(contract)
    setContract(contract);

    contract.methods
      .totalSupply()
      .call()
      .then((res) => {
        setTotalSupply(res);
      }, handleError);

    setWorking(false);
  }, [account]);


  useEffect(() => {
    if (!friendAddress) return;

    if (friendAddress.match(/0x[a-fA-F0-9]{40}/)) {
      setRealFriendAddress(friendAddress);
      return;
    }

    if (friendAddress.match(/\./)) {
      debouncedLookup();
    }
  }, [friendAddress]);

  function handleError(err) {
    console.error(err);
    setWorking(false);
    setError(err);
  }

  function mintForSelf() {
    setWorking(true);
    console.log("Mint number" + mintNumber);
    let price = mintNumber * mintPrice;
    contract.methods
      .mintForSelf(mintNumber)
      .send({ from: account, value: utils.toWei(price.toString(), "ether") })
      .then((res) => {
        console.log(res);
        setWorking(false);
        setTransactionHash(res.transactionHash);
      }, handleError);
  }

  function mintForFriend() {
    if (!realFriendAddress) {
      friendField.current.focus();
    }

    setWorking(true);
    let price = mintNumber * mintPrice;
    contract.methods
      .mintForFriend(realFriendAddress, mintNumber)
      .send({ from: account, value: utils.toWei(price.toString(), "ether") })
      .then((res) => {
        setWorking(false);
        setTransactionHash(res.transactionHash);
      }, handleError);
  }

  const debouncedLookup = debounce(async () => {
    setWorking(true);
    try {
      const address = await library.eth.ens.getAddress(friendAddress);
      setRealFriendAddress(address);
    } catch {}

    setWorking(false);
  }, 1000);

  return (
    <main className="flowers">
      <Head>
        <title>Flowers • For you, or a special someone in your life 🌼</title>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
      </Head>
      <div className="max-w-6xl mx-auto text-base md:text-2xl">
        <div className="p-5 md:px-16 pt-32">
          <header className="leading-normal">
            <img src="/logo.png" className="w-1/4" />
            <p className="text-md italic mt-4 opacity-50">On chain collective project #1</p>
          </header>

          <div className="h-8"></div>

          <div className="md:flex justify-between">
            <div className="w-full flex-auto leading-normal sm:max-w-lg">
              <p className="mb-4">
                Fully on-chain, randomly generated unique flowers. For you, or a special someone in your life 🌼
              </p>
            </div>

            <div className="h-2 md:hidden"></div>

            <div className="flex-0 w-full flex flex-col md:ml-6 space-y-4 md:max-w-xs">
              {!active && (
                <ConnectButtons setWorking={setWorking} activate={activate} />
              )}
            </div>
          </div>
        </div>
        {active && (
          <div className="flex md:pr-16 md:pl-16  w-full">
            <p>
            Each flower will cost you <em>0.015 eth + gas fees to mint</em>. You can mint one for yourself or 
            for a friend. The flowers generated will be unique for each wallet address
            </p>
          </div>
        )}
        <div className="flex md:pr-16 md:pl-16 md:max-w-md">
          {active && (
            <div className="w-full">
              <div className="h-4"></div>
                <div className="leading-normal roboto">
                  <div className="w-full mt-4">
                    <div className="flex gap-2 w-full"
                    onChange={(event) => {
                      setMintNumber(event.target.value);
                    }}>
                      <div className="radio w-full">
                        <input
                          ref={mintNumberField}
                          name="answer"
                          type="radio"
                          id="one"
                          hidden="hidden"
                          value="1"
                        />
                        <label
                          htmlFor="one"
                          className="px-2 py-1 rounded-lg flex justify-center items-center text-xl font-bold w-full cursor-pointer"
                        >
                          x1
                        </label>
                      </div>
                      <div className="radio w-full">
                        <input
                          ref={mintNumberField}
                          name="answer"
                          type="radio"
                          id="three"
                          hidden="hidden"
                          value="3"
                        />
                        <label
                          htmlFor="three"
                          className="px-2 py-1 rounded-lg flex justify-center items-center text-xl font-bold w-full cursor-pointer"
                        >
                          x3
                        </label>
                      </div>
                      <div className="radio w-full">
                        <input
                          ref={mintNumberField}
                          name="answer"
                          type="radio"
                          id="five"
                          hidden="hidden"
                          value="5"
                        />
                        <label
                          htmlFor="five"
                          className="px-2 py-1 rounded-lg flex justify-center items-center text-xl font-bold w-full cursor-pointer"
                        >
                          x10
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="h-4"></div>
                  {mintFriend && (
                    <div className="flex flex-row">
                      <input
                        ref={friendField}
                        className="input text-sm md:text-lg rounded-2xl"
                        value={friendAddress}
                        onChange={(event) => {
                          setFriendAddress(event.target.value);
                        }}
                        disabled={false}
                        placeholder={"0x… or ENS domain"}
                      />
                    </div>
                  )}
                <MintButton
                  disabled={working || soldOut}
                  onClick={mintFriend? mintForFriend : mintForSelf}
                  className="p-2 justify-center mt-2"
                >
                  Mint Now (Ξ{mintPrice*mintNumber})
                </MintButton>

                <p className="text-sm mt-4 underline cursor-pointer text-center"
                  onClick={() => {
                    setMintFriend(true);
                  }}
                  hidden={mintFriend}>
                  Mint for friend
                </p>
                {transactionHash && (
                  <div className="text-green-500 text-sm flex flex-col space-y-2 mt-4">
                    <span>Yay! Successfully minted your flower!</span>
                    <a
                      href={`https://etherscan.io/tx/${transactionHash}`}
                      className="font-normal underline"
                    >
                      View on Etherscan
                    </a>

                  </div>
                )}
                {error && (
                  <div className="text-red-500 text-xs mt-4">{error.message}</div>
                )}

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

        <div className="flex justify-center mt-16">
          <img src="/last-0.svg" className="w-full" />
        </div>
        <div className="p-5 md:p-16">
          <div className="flex">
            <div className="w-full flex-auto leading-normal md:max-w-s">
              <p className="mb-4">
                These bad bois are composed of unique petal designs and many colors – all of which come together to make each flower uniquely yours.
              </p>
              <p className="mb-4">
                Flowers will be the first of many projects created as part of the on-chain collective. 
                Our goal is to channel our shared love for art and technology, and use completely on-chain tech 
                to make beautiful things for you to hold on to and enjoy, or to share with a friend :)
              </p>
            </div>
          </div>
        </div>

        <div className="p-5 md:p-16 ">
        <h1 className="mb-4">FAQ</h1>
          <div className="md:flex justify-between flex-row faq">
            <div className="w-full flex-auto leading-normal md:max-w-md">
              <div className="mb-4">
                <H4>Why flowers?</H4>
                <p className="mt-1">Ask yourself – why not?</p>
              </div>
              <div className="mb-4">
                <H4>Who made this?</H4>
                <p className="mt-1">
                  Flowers, and the upcoming releases under by the <em>on-chain collective</em> are designed and coded 
                  by {' '}
                  <A href="https://twitter.com/screenshake" target="_blank">
                    Saransh Sinha
                  </A> & <A href="https://twitter.com/nitinrgupta" target="_blank">
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
            <div className="w-full flex-auto leading-normal md:max-w-md">
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
      </div>
    </main>
  );
}

const A = (props) => <a className="text-blue-500 underline" {...props} />;
const H4 = (props) => <h4 className="font-bold" {...props} />;
const Answer = (props) => <div className="font-light" {...props} />;

function ConnectButtons({ activate, setWorking }) {
  const cls =
    "btn rounded-full inline-flex images-center space-x-2 shadow-md border-2 w-60 text-base font-normal";
  return (
    <>
      {/* <h3>Connect your wallet</h3> */}
      <div className="flex flex-col md:flex-col items-start space-y-4 md:-mt-8">
        <button
          onClick={() => {
            setWorking(true);
            activate(injected);
          }}
          className={cn(cls, "text-yellow-600 border-yellow-600")}
        >
          <img src="/metamask-fox.svg" className="h-5 w-5" />
          <span className="roboto">Metamask</span>
        </button>
        <button
          onClick={() => {
            setWorking(true);
            activate(wcConnector);
          }}
          className={cn(cls, "text-blue-500 border-blue-600")}
        >
          <img src="/walletconnect-logo.svg" className="h-5 w-5" />
          <span className="roboto">WalletConnect</span>
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
