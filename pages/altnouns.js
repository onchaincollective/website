import Head from "next/head";
import { useEffect, useState, useRef } from "react";
import Web3, { utils } from "web3";
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { Web3ReactProvider, useWeb3React } from "@web3-react/core";
import Accordion from "react-bootstrap/Accordion";
import cn from "classnames";
import Link from "next/link";
import Davatar from "@davatar/react";

const contractAddress = "0x971a6ff4f5792f3e0288f093340fb36a826aae96";
const nounsContractAddress = "0x9c8ff314c9bc7f6e59a9d9225fb22946427edc03";

const injected = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42] });
const wcConnector = new WalletConnectConnector({
  infuraId: "6041be06ca6b4e848a530e495d66e45d",
});

const ethNetwork =
  "https://eth-mainnet.alchemyapi.io/v2/cdfquuNpoZIJ9ctm_MH3qvbNuI3vt4Bk";

const defaultMintPrice = 0.15;

function getLibrary(provider) {
  //https://eth-mainnet.alchemyapi.io/v2/cdfquuNpoZIJ9ctm_MH3qvbNuI3vt4Bk
  //wss://eth-mainnet.alchemyapi.io/v2/cdfquuNpoZIJ9ctm_MH3qvbNuI3vt4Bk
  // console.log(Web3.providers.HttpProvider('https://eth-mainnet.alchemyapi.io/v2/cdfquuNpoZIJ9ctm_MH3qvbNuI3vt4Bk'));
  return new Web3(
    provider ||
      Web3.providers.HttpProvider(
        "https://eth-mainnet.alchemyapi.io/v2/cdfquuNpoZIJ9ctm_MH3qvbNuI3vt4Bk"
      )
  );
}

const web3 = new Web3(new Web3.providers.HttpProvider(ethNetwork));

const abi = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      { indexed: false, internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "allSalesPaused",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "dynamicPriceEnabled",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "getApproved",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCurrentPrice",
    outputs: [
      { internalType: "uint256", name: "dynamicPrice", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "operator", type: "address" },
    ],
    name: "isApprovedForAll",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "lockPriceChanges",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "lockReservedMints",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "maxPerAddress",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "nounHolderMint",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "nounsTokenContract",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "nounsTokenIndexOffset",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "numTokensMinted",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "ownerOf",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "priceChangesLocked",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "priceIncrement",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "publicMint",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "reservedMint",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "reservedMintsLocked",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "bytes", name: "_data", type: "bytes" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "operator", type: "address" },
      { internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "newOffset", type: "uint256" }],
    name: "setNounsTokenIndexOffset",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "newPrice", type: "uint256" }],
    name: "setPrice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "newPriceIncrement", type: "uint256" },
    ],
    name: "setPriceIncrement",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "toggleAllSalesPaused",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "toggleDynamicPrice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "index", type: "uint256" }],
    name: "tokenByIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "uint256", name: "index", type: "uint256" },
    ],
    name: "tokenOfOwnerByIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "tokenURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawAll",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];

const nounsAbi = [
  {
    inputs: [
      { internalType: "address", name: "_noundersDAO", type: "address" },
      { internalType: "address", name: "_minter", type: "address" },
      {
        internalType: "contract INounsDescriptor",
        name: "_descriptor",
        type: "address",
      },
      {
        internalType: "contract INounsSeeder",
        name: "_seeder",
        type: "address",
      },
      {
        internalType: "contract IProxyRegistry",
        name: "_proxyRegistry",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      { indexed: false, internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "delegator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "fromDelegate",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "toDelegate",
        type: "address",
      },
    ],
    name: "DelegateChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "delegate",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "previousBalance",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newBalance",
        type: "uint256",
      },
    ],
    name: "DelegateVotesChanged",
    type: "event",
  },
  { anonymous: false, inputs: [], name: "DescriptorLocked", type: "event" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "contract INounsDescriptor",
        name: "descriptor",
        type: "address",
      },
    ],
    name: "DescriptorUpdated",
    type: "event",
  },
  { anonymous: false, inputs: [], name: "MinterLocked", type: "event" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "minter",
        type: "address",
      },
    ],
    name: "MinterUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "NounBurned",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        components: [
          { internalType: "uint48", name: "background", type: "uint48" },
          { internalType: "uint48", name: "body", type: "uint48" },
          { internalType: "uint48", name: "accessory", type: "uint48" },
          { internalType: "uint48", name: "head", type: "uint48" },
          { internalType: "uint48", name: "glasses", type: "uint48" },
        ],
        indexed: false,
        internalType: "struct INounsSeeder.Seed",
        name: "seed",
        type: "tuple",
      },
    ],
    name: "NounCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "noundersDAO",
        type: "address",
      },
    ],
    name: "NoundersDAOUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  { anonymous: false, inputs: [], name: "SeederLocked", type: "event" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "contract INounsSeeder",
        name: "seeder",
        type: "address",
      },
    ],
    name: "SeederUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "DELEGATION_TYPEHASH",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "DOMAIN_TYPEHASH",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "nounId", type: "uint256" }],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "uint32", name: "", type: "uint32" },
    ],
    name: "checkpoints",
    outputs: [
      { internalType: "uint32", name: "fromBlock", type: "uint32" },
      { internalType: "uint96", name: "votes", type: "uint96" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "contractURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "dataURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "delegatee", type: "address" }],
    name: "delegate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "delegatee", type: "address" },
      { internalType: "uint256", name: "nonce", type: "uint256" },
      { internalType: "uint256", name: "expiry", type: "uint256" },
      { internalType: "uint8", name: "v", type: "uint8" },
      { internalType: "bytes32", name: "r", type: "bytes32" },
      { internalType: "bytes32", name: "s", type: "bytes32" },
    ],
    name: "delegateBySig",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "delegator", type: "address" }],
    name: "delegates",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "descriptor",
    outputs: [
      { internalType: "contract INounsDescriptor", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "getApproved",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "getCurrentVotes",
    outputs: [{ internalType: "uint96", name: "", type: "uint96" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
      { internalType: "uint256", name: "blockNumber", type: "uint256" },
    ],
    name: "getPriorVotes",
    outputs: [{ internalType: "uint96", name: "", type: "uint96" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "operator", type: "address" },
    ],
    name: "isApprovedForAll",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isDescriptorLocked",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isMinterLocked",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isSeederLocked",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "lockDescriptor",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "lockMinter",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "lockSeeder",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "mint",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "minter",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "nonces",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "noundersDAO",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "numCheckpoints",
    outputs: [{ internalType: "uint32", name: "", type: "uint32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "ownerOf",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "proxyRegistry",
    outputs: [
      { internalType: "contract IProxyRegistry", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "bytes", name: "_data", type: "bytes" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "seeder",
    outputs: [
      { internalType: "contract INounsSeeder", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "seeds",
    outputs: [
      { internalType: "uint48", name: "background", type: "uint48" },
      { internalType: "uint48", name: "body", type: "uint48" },
      { internalType: "uint48", name: "accessory", type: "uint48" },
      { internalType: "uint48", name: "head", type: "uint48" },
      { internalType: "uint48", name: "glasses", type: "uint48" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "operator", type: "address" },
      { internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "newContractURIHash", type: "string" },
    ],
    name: "setContractURIHash",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract INounsDescriptor",
        name: "_descriptor",
        type: "address",
      },
    ],
    name: "setDescriptor",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_minter", type: "address" }],
    name: "setMinter",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_noundersDAO", type: "address" },
    ],
    name: "setNoundersDAO",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract INounsSeeder",
        name: "_seeder",
        type: "address",
      },
    ],
    name: "setSeeder",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "index", type: "uint256" }],
    name: "tokenByIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "uint256", name: "index", type: "uint256" },
    ],
    name: "tokenOfOwnerByIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "tokenURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "delegator", type: "address" }],
    name: "votesToDelegate",
    outputs: [{ internalType: "uint96", name: "", type: "uint96" }],
    stateMutability: "view",
    type: "function",
  },
];

const altNounsContract = new web3.eth.Contract(abi, contractAddress);
const nounsContract = new web3.eth.Contract(nounsAbi, nounsContractAddress);

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
  const [isFetching, setIsFetching] = useState(false);
  const [transactionReceipt, setTransactionReceipt] = useState(false);
  const [mintPrice, setMintPrice] = useState(defaultMintPrice);
  const [maxPerAddress, setMaxPerAddress] = useState(0);
  const [mintButtonText, setMintButtonText] = useState("Mint Alt Noun");
  const [salesPaused, setSalesPaused] = useState(false);
  const [contract, setContract] = useState(null);
  const [error, setError] = useState(null);
  const [mintDisabled, setMintDisabled] = useState(null);
  const [totalSupply, setTotalSupply] = useState(0);
  const [nounsTotalSupply, setNounsTotalSupply] = useState(0);
  const [transactionHash, setTransactionHash] = useState(null);
  const [connectButtonVisible, setConnectButtonVisible] = useState(false);
  const [sampleNoun, setSampleNoun] = useState(null);
  const [currentNounIndex, setCurrentNounIndex] = useState(null);
  const [altNounExists, setAltNounExists] = useState(true);

  const [mintTransactionHash, setMintTransactionHash] = useState(null);
  const [permalink, setPermalink] = useState(null);
  const [winnerAddress, setWinnerAddress] = useState(null);

  useEffect(() => {
    document.querySelector("body").classList.remove("home");
    document.querySelector("body").classList.add("altnouns");
    nounsContract.methods
      .totalSupply()
      .call()
      .then((res) => {
        setCurrentNounIndex(parseInt(res) - 1);
        setNounsTotalSupply(parseInt(res) - 1);
      }, handleError);
  }, []);

  // checks if noun exists
  useEffect(() => {
    if (!currentNounIndex) return;

    setMintButtonText(
      "Mint Alt Noun #" + currentNounIndex + " (" + mintPrice + " eth)"
    );

    setError(null);

    const options = {
      method: "GET",
      headers: { Accept: "application/json" },
    };
    fetch(
      "https://api.opensea.io/api/v1/events?asset_contract_address=0x971a6ff4f5792f3e0288f093340fb36a826aae96&collection_slug=altnouns&token_id=" +
        currentNounIndex +
        "&account_address=0x0000000000000000000000000000000000000000&only_opensea=false&offset=0&limit=1",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        if (response.asset_events.length > 0) {
          console.log(response);
          setMintTransactionHash(
            response.asset_events[0].transaction.transaction_hash
          );
          setPermalink(response.asset_events[0].asset.permalink);
          setWinnerAddress(response.asset_events[0].to_account.address);
        }
      })
      .catch((err) => console.error(err));

    setIsFetching(true);
    setAltNounExists(false);

    async function fetchData() {
      let altNounExists = false;
      try {
        let response = await altNounsContract.methods
          .tokenURI(currentNounIndex)
          .call();
        altNounExists = true;
        let decodedURI = atob(response.substring(29));
        let decodedSVG = decodedURI.substring(
          decodedURI.lastIndexOf(","),
          decodedURI.length - 2
        );
        setSampleNoun("data:image/svg+xml;base64" + decodedSVG);
      } catch (err) {
        altNounExists = false;
      }

      if (!altNounExists) {
        try {
          let response = await nounsContract.methods
            .tokenURI(currentNounIndex)
            .call();
          let decodedURI = atob(response.substring(29));
          let decodedSVG = decodedURI.substring(
            decodedURI.lastIndexOf(","),
            decodedURI.length - 2
          );
          setSampleNoun("data:image/svg+xml;base64" + decodedSVG);
        } catch (err) {
          console.log("error", error);
          setError(err);
        }
      }

      setAltNounExists(altNounExists);
      setIsFetching(false);
    }

    fetchData();
  }, [currentNounIndex]);

  useEffect(() => {
    if (!library) return;
    console.log("Fetching details for account: ", account);
    const contract = new library.eth.Contract(abi, contractAddress);
    const nounsContract = new library.eth.Contract(abi, nounsContractAddress);

    setContract(contract);

    setMintButtonText("Mint Alt Noun");

    contract.methods
      .getCurrentPrice()
      .call()
      .then((res) => {
        setMintPrice(utils.fromWei(res, "ether"));
      }, handleError);

    contract.methods
      .totalSupply()
      .call()
      .then((res) => {
        setTotalSupply(parseInt(res));
        // setTotalSupply(4096)
      }, handleError);

    nounsContract.methods
      .totalSupply()
      .call()
      .then((res) => {
        setNounsTotalSupply(parseInt(res));
      }, handleError);

    contract.methods
      .allSalesPaused()
      .call()
      .then((res) => {
        setSalesPaused(res);
        // setSalesPaused(false);
      }, handleError);

    contract.methods
      .maxPerAddress()
      .call()
      .then((res) => {
        setMaxPerAddress(parseInt(res));
        // setMaxPerAddress(3)
      }, handleError);

    setWorking(false);
  }, [account, loading]);

  useEffect(() => {
    setMintButtonText(
      "Mint Alt Noun #" + currentNounIndex + " (" + mintPrice + " eth)"
    );

    if (salesPaused) {
      setMintButtonText("Minting is paused right now");
      setMintDisabled(salesPaused);
    } else {
      setMintDisabled(working);
    }
  }, [working, totalSupply, salesPaused]);

  function handleError(err) {
    console.log("===========");
    console.error(err);
    setWorking(false);
    setLoading(false);
    setIsFetching(false);
    setError(err);
  }

  function mintAltNoun() {
    setLoading(true);
    setWorking(true);
    setError(null);
    setTransactionHash(null);
    setTransactionReceipt(null);
    console.log("Token ID: " + currentNounIndex);
    console.log("Mint Price: " + mintPrice);
    console.log(utils.toWei(mintPrice.toString(), "ether"));
    let price = mintPrice;

    if (currentNounIndex % 10 == 0) {
      contract.methods
        .nounHolderMint(currentNounIndex)
        .send({ from: account, value: utils.toWei(price.toString(), "ether") })
        .on("transactionHash", (txHash) => {
          console.log(txHash);
          setTransactionHash(res.transactionHash);
          getTransactionReceiptMined(txHash, 1000);
        })
        .then((res) => {
          console.log(res);
          setWorking(false);
          setLoading(false);
          setTransactionHash(res.transactionHash);
        }, handleError);
    } else {
      contract.methods
        .publicMint(currentNounIndex)
        .send({ from: account, value: utils.toWei(price.toString(), "ether") })
        .on("transactionHash", (txHash) => {
          console.log(txHash);
          setTransactionHash(res.transactionHash);
          getTransactionReceiptMined(txHash, 1000);
        })
        .then((res) => {
          console.log(res);
          setWorking(false);
          setLoading(false);
          setTransactionHash(res.transactionHash);
        }, handleError);
    }
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
  }

  function truncatedAddress(str) {
    if (str) {
      return str.substr(0, 4) + "..." + str.substr(str.length - 4, str.length);
    }
  }

  function showConnectButtons() {
    setConnectButtonVisible(true);
  }

  return (
    <main className="occ-home occ-altnouns">
      <Head>
        <title>Alt Nouns • An OCC Experiment</title>
        <meta name="title" content="Alt Nouns • An OCC Experiment" />
        <meta
          name="description"
          content="Alt Nouns – an infinite derivative of Nouns."
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.occ.xyz/altnouns" />
        <meta property="og:title" content="Alt Nouns • An OCC Experiment" />
        <meta
          property="og:description"
          content="Alt Nouns – an infinite derivative of Nouns."
        />
        <meta
          property="og:image"
          content="https://www.occ.xyz/flowers/social_image.png"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.occ.xyz/altnouns" />
        <meta
          property="twitter:title"
          content="Alt Nouns • An OCC Experiment"
        />
        <meta
          property="twitter:description"
          content="Alt Nouns – an infinite derivative of Nouns."
        />
        <meta
          property="twitter:image"
          content="https://www.occ.xyz/altnouns/altnounstwitter.png"
        />
        <link rel="icon" href="/altnouns/favicon.ico" sizes="any" />
        <link rel="icon" href="/altnouns/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/altnouns/favicon.png" />
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

      <div className="bg-black text-white pb-20">
        <div className="flex align-center flex-col max-w-6xl mx-auto text-xl text-left p-4">
          {/* <Link href="/">
                    <p className="text-sm mt-4 opacity-50 cursor-pointer">occ experiments</p>
                </Link> */}
          <header className="flex pt-2 justify-end">
            <div className="flex-grow">
              <object
                data="/altnouns/altbyocc.svg"
                type="image/svg+xml"
              ></object>
            </div>
            <div className="flex md:flex-row items-center tracking-wide-xl text-base">
              <div className="pixel-font mx-4 flex-auto hidden md:flex">
                <a
                  href="https://opensea.io/collection/altnouns"
                  target="_blank"
                  className="pixel-font"
                >
                  OPENSEA
                </a>
              </div>
              <Link href="#wtf">
                <div className="pixel-font mx-4 flex-auto cursor-pointer hidden md:flex">
                  WTF?
                </div>
              </Link>
              {!active && !connectButtonVisible && (
                <button
                  className="pixel-font mx-4 flex-auto py-2 px-4 bg-noun-gray rounded-xl tracking-wide-xl -mt-0.5 mr-0"
                  onClick={showConnectButtons}
                >
                  CONNECT WALLET
                </button>
              )}
              {!active && connectButtonVisible && (
                <ConnectButtons setWorking={setWorking} activate={activate} />
              )}
              {active && (
                <div
                  className="pixel-font mx-4 flex-auto py-2 -mt-0.5 px-4 bg-noun-gray rounded-xl tracking-wide-xl"
                  onClick={showConnectButtons}
                >
                  <span className="text-green-500">●</span> CONNECTED
                </div>
              )}
            </div>
          </header>
        </div>

        <div className="my-20 max-w-7xl mx-auto flex flex-col md:flex-row justify-center space-x-0 sm:space-x-4 lg:space-x-32 px-4">
          <img
            src={!isFetching ? sampleNoun : "/altnouns/loading-skull-noun.gif"}
            className="alt-noun-hero"
          ></img>
          <div className="flex-grow mt-12 sm:mt-0">
            {/* <p className="mt-10">Date</p> */}
            <div className="text-5xl sm:max-w-md flex flex-row mt-10">
              <div className="flex-grow"> Alt Noun {currentNounIndex}</div>
              <div className="inline ml-8">
                <div
                  className="inline mx-1 cursor-pointer"
                  onClick={() => {
                    if (isFetching) return;
                    setCurrentNounIndex(
                      currentNounIndex > 0 ? currentNounIndex - 1 : 0
                    );
                  }}
                >
                  ←
                </div>
                <div
                  className={
                    currentNounIndex < nounsTotalSupply
                      ? "inline mx-1 cursor-pointer"
                      : "inline mx-1 cursor-not-allowed opacity-50"
                  }
                  onClick={() => {
                    if (isFetching) return;
                    setCurrentNounIndex(
                      currentNounIndex < nounsTotalSupply
                        ? currentNounIndex + 1
                        : nounsTotalSupply
                    );
                  }}
                >
                  →
                </div>
              </div>
            </div>
            {altNounExists && currentNounIndex && winnerAddress ? (
              <>
                <p className="mt-8">Winner</p>
                <h1 className="text-5xl flex items-center mt-2">
                  {!isFetching ? (
                    <>
                      <div className="mr-4">
                        <Davatar size={36} address={winnerAddress} />
                      </div>
                      {truncatedAddress(winnerAddress)}
                    </>
                  ) : (
                    "Loading..."
                  )}
                </h1>
                <p className="mt-8">Links</p>
                <a
                  href={"https://etherscan.io/tx/" + mintTransactionHash}
                  target="_blank"
                >
                  <div className="text-base py-2.5 px-4 bg-noun-gray rounded-lg flex sm:max-w-lg my-2 hover:opacity-80">
                    <div className="flex-grow flex flex-row items-center">
                      <div className="mr-2">
                        <Davatar size={24} address={winnerAddress} />
                      </div>
                      Winning Transaction
                    </div>
                    <img src="/altnouns/open.svg" className="ml-auto w-4"></img>
                  </div>
                </a>
                <a href={permalink} target="_blank" className="flex">
                  <div className="text-base py-2.5 px-4 bg-noun-gray rounded-lg flex sm:max-w-lg my-2 hover:opacity-80">
                    <div className="flex-grow flex flex-row items-center">
                      <div className="mr-2">
                        <img src="/altnouns/OS Logo.svg" />
                      </div>
                      OpenSea
                    </div>
                    <img
                      src="/altnouns/open.svg"
                      className="ml-auto w-4 flex"
                    ></img>
                  </div>
                </a>
                <a
                  href={"https://nouns.wtf/auction/" + currentNounIndex}
                  target="_blank"
                >
                  <div className="text-base py-2.5 px-4 bg-noun-gray rounded-lg flex sm:max-w-lg my-2 hover:opacity-80">
                    <div className="flex-grow flex flex-row items-center">
                      <div className="mr-2">
                        <img src="/altnouns/nouns logo.svg" />
                      </div>
                      Noun
                    </div>
                    <img src="/altnouns/open.svg" className="ml-auto w-4"></img>
                  </div>
                </a>
              </>
            ) : (
              <>
                {!isFetching ? (
                  <>
                    <p className="mt-8">
                      Now available
                      {currentNounIndex % 10 == 0 &&
                        " for members of the NounsDAO"}
                    </p>
                    <div className="flex flex-row w-full md:max-w-md text-xl text-left">
                      <div className="flex flex-row w-full">
                        {active ? (
                          <MintButton
                            disabled={working || mintDisabled || loading}
                            onClick={mintAltNoun}
                            className={
                              "mt-6 p-2 py-4 disabled:opacity-50 disabled:cursor-not-allowed mint-button text-xl bg-white w-full text-black cursor-pointer"
                            }
                          >
                            <span className="pixel-font uppercase">
                              {loading ? "Altering your Noun" : mintButtonText}
                            </span>
                          </MintButton>
                        ) : (
                          <>
                            <h1 className="text-5xl flex items-center mt-2">
                              Please connect wallet
                            </h1>
                          </>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="mt-8">Fetching</p>
                    <h1 className="text-5xl flex items-center mt-2">
                      Details...
                    </h1>
                  </>
                )}
                <div>
                  {!error && (transactionHash || transactionReceipt) && (
                    <div className="text-green-500 text-xl font-normal mt-4 text-center">
                      <span>
                        Your Alt Noun has been created &amp; sent to your wallet
                      </span>
                      <br />
                      <a
                        href={`https://etherscan.io/tx/${transactionHash}`}
                        target="_blank"
                        className="font-normal text-sm cursor-pointer underline"
                      >
                        View on Etherscan
                      </a>
                    </div>
                  )}
                  {error && (
                    <div className="mt-8">
                      <p className="text-white-500 text-lg font-normal mt-4">
                        {error.message}
                      </p>
                      <div className={transactionHash ? "flex" : "hidden"}>
                        Your transaction may still go through.
                        <a
                          href={
                            transactionHash
                              ? transactionHash
                              : error.message.transactionHash
                          }
                          target="_blank"
                          className="opacity-70 underline hover:cursor-pointer"
                        >
                          <em>View on Etherscan</em>
                        </a>
                      </div>
                    </div>
                  )}
                </div>
                {currentNounIndex % 10 == 0 && (
                  <div className="text-sm mt-8 py-2.5 px-4 bg-noun-gray rounded-lg flex sm:max-w-lg my-2">
                    Every 10th Alt Noun is reserved for members of the NounsDAO,
                    i.e. Noun Holders. We (On Chain Collective), did this as a
                    token of appreciation for Nounders, developers, artists and
                    the Nouns community that made Alt Nouns possible.
                  </div>
                )}
                <p className="mt-8">Links</p>
                <a
                  href={"https://nouns.wtf/auction/" + currentNounIndex}
                  target="_blank"
                >
                  <div className="text-base py-2.5 px-4 bg-noun-gray rounded-lg flex sm:max-w-lg my-2 hover:opacity-80">
                    <div className="flex-grow flex flex-row items-center">
                      <div className="mr-2">
                        <img src="/altnouns/nouns logo.svg" />
                      </div>
                      Noun
                    </div>
                    <img
                      src="/altnouns/open.svg"
                      className="ml-auto w-4 flex"
                    ></img>
                  </div>
                </a>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="w-full py-12 sm:py-32 text-gray-800">
        <div className="mt-10 max-w-6xl mx-auto flex flex-col md:flex-row justify-center items-center flower-tease px-4 mb-10">
          <div className="w-full rounded-2xl p-4">
            <h1 className="text-7xl noun-font uppercase">
              One Alt Noun, <br />{" "}
              <span className="text-7xl lg:text-8xl noun-font">
                every day, <br /> forever.
              </span>
            </h1>
          </div>
          <blockquote className="twitter-tweet">
            <p lang="en" dir="ltr">
              behold, an infinite (derivative) work of art
              <br />
              <br />
              Alt Nouns – A fully on-chain, infinite derivative of{" "}
              <a href="https://twitter.com/nounsdao?ref_src=twsrc%5Etfw">
                @nounsdao
              </a>{" "}
              <a href="https://t.co/2J2i9tOmOI">pic.twitter.com/2J2i9tOmOI</a>
            </p>
            &mdash; on chain collective (@onChainCo){" "}
            <a href="https://twitter.com/onChainCo/status/1454538053540843521?ref_src=twsrc%5Etfw">
              October 30, 2021
            </a>
          </blockquote>{" "}
          <script
            async
            src="https://platform.twitter.com/widgets.js"
            charSet="utf-8"
          ></script>
        </div>
      </div>

      <div className="">
        <div className="mx-auto text-center justify-center items-center flex flex-row pb-12 flower-tease">
          <div className="w-40 rounded-2xl p-4">
            <img src="/altnouns/hAlt1.png" className="w-full rounded-2xl"></img>
          </div>
          <div className="w-40 rounded-2xl p-4">
            <img src="/altnouns/hAlt2.png" className="w-full rounded-2xl"></img>
          </div>
          <div className="w-40 rounded-2xl p-4">
            <img src="/altnouns/hAlt3.png" className="w-full rounded-2xl"></img>
          </div>
          <div className="w-40 rounded-2xl p-4">
            <img src="/altnouns/hAlt4.png" className="w-full rounded-2xl"></img>
          </div>
          <div className="w-40 rounded-2xl p-4">
            <img src="/altnouns/hAlt5.png" className="w-full rounded-2xl"></img>
          </div>
          <div className="w-40 rounded-2xl p-4 hidden md:block">
            <img src="/altnouns/hAlt6.png" className="w-full rounded-2xl"></img>
          </div>
          <div className="w-40 rounded-2xl p-4 hidden md:block">
            <img src="/altnouns/hAlt7.png" className="w-full rounded-2xl"></img>
          </div>
          <div className="w-40 rounded-2xl p-4 hidden md:block">
            <img src="/altnouns/hAlt8.png" className="w-full rounded-2xl"></img>
          </div>
          <div className="w-40 rounded-2xl p-4 hidden md:block">
            <img src="/altnouns/hAlt9.png" className="w-full rounded-2xl"></img>
          </div>
        </div>
      </div>

      <div className="w-full py-12 sm:py-24 text-gray-800" id="wtf">
        <div className="flex align-center flex-col max-w-7xl mx-auto text-xl text-left p-6">
          <h1 className="text-5xl sm:text-9xl noun-font uppercase text-center">
            behold - an infinite derivative work of art
          </h1>
          <h1 className="text-4xl sm:text-8xl noun-font uppercase text-center mt-4 sm:mt-10 md:mt-24">
            Every day, at the very moment that a new noun is born – its alt noun
            becomes available to mint, forever.
          </h1>
          <h1 className="text-2xl sm:text-5xl noun-font uppercase text-center mt-4 sm:mt-10 md:mt-24 leading-tight">
            Each Alt Noun is created by communicating with the Nouns contract,
            asking it for a Noun and altering it, fully on-chain. Some alts are
            static, some animated. Some are pfps, and others are abstract art
            pieces. but Each one is unique – to the noun its based on, the
            person who mints it and blockchain’s hash at the time of minting.
          </h1>

          <div className="mt-24 mx-auto text-center flex flex-col md:flex-row justify-center items-center flower-tease">
            <div className="w-full rounded-2xl p-4">
              <img
                src="/altnouns/Alt Sample 1.png"
                className="w-full rounded-2xl"
              ></img>
            </div>
            <div className="w-full rounded-2xl p-4">
              <img
                src="/altnouns/Alt Sample 2.png"
                className="w-full rounded-2xl"
              ></img>
            </div>
            <div className="w-full rounded-2xl p-4">
              <img
                src="/altnouns/Alt Sample 3.png"
                className="w-full rounded-2xl"
              ></img>
            </div>
          </div>
        </div>
        <div className="flex align-center flex-col max-w-5xl mx-auto text-xl text-left p-6 mt-24">
          <h1 className="text-7xl noun-font">Ummm... WTF?</h1>
          <p className="mx-auto text-xl mt-12 ">
            Alt nouns is much more than just a derivative. It’s a grand
            experiment within a much grander experiment – in on-chain art,
            blockchain interoperation, public domain possibilities, derived
            value, sub-communities, noun proliferation, distribution mechanics
            and much more. It’s the first fully on-chain contract interoperative
            derivative of Nouns that directly interacts with the Nouns contract
            to create 1/1 art from this conversation. Every day, created &
            stored on-chain, forever.
            <br />
            <br />
            No ipfs/arweave, no rendering scripts. Just 2 smart contracts,
            forever talking to each other.
          </p>

          {/* <h1 className="text-5xl mt-32 noun-font">Seriously though, what?</h1>
            <p className="mx-auto text-xl mt-16">
            So.... We'll tell you! Alt Nouns is a derivative project of Nouns, that is hardcoded to be directly mapped to it. A derivative in the truest sense, conforming to OCC (& Nouns') on-chain purist ethos. The Alt Nouns contract literally interacts with the Noun contract, grabs a Noun, alters it and stores this resulting Alt Noun as an ERC721 token (i.e. NFT) directly on the blockchain. And all of this processing happens in the Alt Nouns smart contract, interacting with another smart contract, with no third party intervention or manual action. <br/><br/>
            The way it has been set up – for every Noun that exists right now, or will in the future – its Alt Noun counterpart will be available to mint.<br/><br/>
            As an example – lets say Noun 120 is the latest Noun to have come into existence today. As soon as it came into existence, its counterpart Alt Noun 120 will be available to mint. When Noun 121 comes into existence tomorrow, Alt Noun 121 will be as well. So on and so forth.<br/><br/>
            </p>

            <h1 className="text-5xl mt-32 noun-font">What's the big deal?</h1>
            <p className="mx-auto text-xl mt-16">
            This is an entirely new concept for derivatives and a novel implementation of smart contract interoperability. It is OCC's attempt to not just take a step forward in how on-chain NFTs work, but also demonstrate how smart contracts (can) act as an infinite API for an open and decentralised web. <br/><br/>
            
            This is enabled (& encouraged) by the public domain nature of the Nouns project, and their promotion of derivate works, including art derivates like Alt Nouns. Alt Nouns is not the first art derivative for Nouns, but practically speaking, it very well may be the first fully autonomous, never-ending derivative. As long as there are Nouns, there will be Alt Nouns.
            </p> */}

          <Accordion flush>
            <Accordion.Item eventKey="0" className="accordionItem">
              <Accordion.Header className="accordionHeader my-10">
                Summary
              </Accordion.Header>
              <Accordion.Body className="pb-8">
                <ul className="list-disc pl-8">
                  <li>1 noun = 1 alt noun</li>
                  <li>alt nouns are derivatives of nouns</li>
                  <li>first fully on-chain interoperative project</li>
                  <li>runs till the end of time</li>
                  <li>
                    when a noun is born, its alt can automatically be minted,
                    forever
                  </li>
                  <li>
                    no alt scarcity – 19 possible alterations, each equally
                    likely
                  </li>
                  <li>alt nouns are hard coded to the nouns contract</li>
                  <li>created &amp; stored on-chain (not IPFS)</li>
                  <li>
                    every 10th alt noun is reserved for Nouns DAO members, in
                    perpetuity
                  </li>
                  <li>
                    2 max per wallet, locked (to allow everyone a chance to get
                    one)
                  </li>
                  <li>no auctions, fixed price of 0.15ETH</li>
                  <li>
                    dynamic price <i>(details soon)</i>
                  </li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1" className="accordionItem">
              <Accordion.Header className="accordionHeader my-10">
                Nouns
              </Accordion.Header>
              <Accordion.Body className="pb-8">
                <p>
                  Nouns is, in our opinion, the grandest experiment in not just
                  NFTs, but also in DAOs – the impact of which will be felt for
                  years to come, possibly decades. Each day, a Noun is generated
                  based on a completely random set of possible parts, and is
                  auctioned off to the highest bidder with all proceeds going
                  into the NounsDAO – an action that happens trustlessly &amp;
                  automatically everyday.
                </p>

                <p className="mt-4">
                  Nouns' mission is to (attempt to) bootstrap identity,
                  community, governance and a treasury that can be used by the
                  community. 1 Noun = 1 vote in proposals for the use of this
                  treasury. And over the first ~3 months of its existence, the
                  Nouns auctions have raised over 14000 eth (roughly $60
                  million) through ~100 Noun auctions. And they've already been
                  using this for good, including grants for artists, charitable
                  donations etc. The founding team of 10 Nounders includes
                  CrypToadz artist Gremplin &amp; Loot Project's Dom.
                </p>

                <p className="mt-4">
                  Much smarter people than us worked on Nouns to make it what it
                  is. Alt Nouns are a bit simpler in their mission – we want to
                  use a historically significant project like Nouns, and make
                  weird historically significant on-chain art using these Nouns
                  – forever.
                </p>

                <div className="mt-4">
                  <a
                    href="https://nouns.wtf"
                    target="_blank"
                    className="text-blue-600 hover:underline"
                  >
                    learn more about nouns
                  </a>
                </div>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2" className="accordionItem">
              <Accordion.Header className="accordionHeader my-10">
                On-chain art derivative
              </Accordion.Header>
              <Accordion.Body className="pb-8">
                Alt Nouns are the first fully on-chain art derivative that is
                hardcoded to be directly mapped to Nouns. A derivative in the
                truest sense, conforming to our (&amp; Nouns') on-chain ethos.
                <br />
                <br />
                The Alt Nouns contract checks whether the supplied Nouns’
                tokenID exists, and if it does – the Noun’s tokenURI is fetched,
                decoded &amp; altered via creative and generative SVG
                manipulation and the resulting Alt Noun and its metadata is
                stored as an ERC721 token (i.e. NFT) directly on the blockchain.
                All of this processing happens in the Alt Nouns smart contract,
                interacting with another smart contract, with no third party
                intervention or manual action. <br /> <br />
                Since the Alt Nouns are permanently mapped to the Nouns
                contract, there can only be as many Alt Nouns as there are
                Nouns. And if for some reason, there are no longer new Nouns –
                Alt Nouns will also cease to exist.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3" className="accordionItem">
              <Accordion.Header className="accordionHeader my-10">
                Alt Noun traits
              </Accordion.Header>
              <Accordion.Body className="pb-8">
                <p>
                  Each Alt Noun can be born with 1 of 19 possible alterations,
                  decided at the time of minting. It is not truly random, and
                  can be predicted based on the blockhash. Alterations make use
                  of (frankly, underutilized) SVG filters in various
                  combinations, some of which have other sub-traits that add an
                  element of pseudo-randomness to these alterations of the Nouns
                  artwork. All this ensures is that no matter which Alt Noun you
                  get, they are all 1/1 unique pieces.
                </p>

                <p className="mt-4">
                  {" "}
                  All alterations are equal, but some are more equal than
                  others:
                </p>
                <ul className="pl-10 list-disc">
                  <li>Fractionalized</li>
                  <li>Collapsing</li>
                  <li>Spirit</li>
                  <li>& many more...</li>
                </ul>
                <p className="mt-4">
                  {" "}
                  There is no predefined rarity, since every alteration is
                  equally likely – but it’ll take months/years/decades for this
                  to be defined – One Alt Noun at a time. Since this is an
                  ongoing experiment, how each alteration is valued will develop
                  over this time period, so we'll all find out how much
                  something is 'worth', together.{" "}
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="4" className="accordionItem">
              <Accordion.Header className="accordionHeader my-10">
                How many Nouns &amp; Alt nouns can there be?
              </Accordion.Header>
              <Accordion.Body className="pb-8">
                <p>
                  Theoretically, infinite – or till the end of the blockchain.
                  However, each day, just 1 Noun trustlessly goes up for auction
                  &amp; each Noun can only ever have 1 Alt Noun. At the end of
                  one year – there’ll be only 365 Alt Nouns.
                </p>
                <p className="mt-4">
                  As a result of this distribution mechanic, which Alt Noun is
                  contractually obligated to adhere to – It’ll take a little
                  over 27 years for the 10,000th Alt Noun to be born :)
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="5" className="accordionItem">
              <Accordion.Header className="accordionHeader my-10">
                Reserved Alt Nouns
              </Accordion.Header>
              <Accordion.Body className="pb-8">
                <p>
                  As a parallel to every 10th Noun being reserved for Nounders
                  (i.e. group of ten builders that initiated Nouns), every 10th
                  Alt Noun is also reserved – but for people who are part of the
                  Nouns DAO (i.e. Noun Holders). Because every Alt Noun is
                  available on a first come first serve basis, these reserved
                  Alt Nouns are a token of appreciation for the community that
                  made, and continues to make, Nouns what they are.
                </p>

                <p className="mt-4">
                  Every 10th Alt Noun is reserved for any Noun holder, in
                  perpetuity.
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="5" className="accordionItem">
              <Accordion.Header className="accordionHeader my-10">
                Treaury
              </Accordion.Header>
              <Accordion.Body className="pb-8">
                <p>
                  A portion of the primary and secondary sales for Alt Nouns
                  will be going into the Alt Nouns treasury. The goals for this
                  treasury are being planned by the OCC community on our discord
                  right now – come join us! It'll be used for proliferation of
                  Nouns, of on-chain art and more.
                </p>

                <p className="mt-4">
                  <em>Details TBD</em>
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="6" className="accordionItem">
              <Accordion.Header className="accordionHeader my-10">
                OCC
              </Accordion.Header>
              <Accordion.Body className="pb-8">
                <p>
                  OCC is more than a run-of-the-mill NFT art project. Our goal
                  is to channel our love for art and technology, collaborate
                  with other digital &amp; traditional artists, and use
                  completely on-chain tech to make beautiful NFT collectibles
                  that, hopefully, make you happy 🌻 Every NFT mint we do is
                  100% generated on-chain in the smart contract and lives on as
                  an immutable ERC-721 token on the Ethereum Blockchain forever.
                </p>

                <p className="mt-4">
                  Alt Nouns is our first experiment in on-chain derivative art.
                  If you're interested, check out OCC#1 🌺 Flowers – our genesis
                  project. OCC#1 🌺 Flowers is a collection 4096 programatically
                  generated on-chain flowers, for you to own or to share. Each
                  flower is 100% generated on-chain, including it's metadata. No
                  ipfs/arweave, no external rendering script. Just SVGs created
                  by the contract.
                </p>

                <div className="mt-4">
                  <a
                    href="https://occ.xyz/"
                    className="text-blue-600 hover:underline"
                  >
                    learn more about occ
                  </a>
                </div>

                <div className="mt-4">
                  <a
                    href="https://occ.xyz/flowers"
                    className="text-blue-600 hover:underline"
                  >
                    learn more about OCC#1 🌺 Flowers
                  </a>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          <p className="mt-8 text-2xl">🌺👃🌺</p>
        </div>
      </div>
      <div className="flex align-center flex-col max-w-2xl mx-auto text-center mt-10 mb-12 p-4">
        <div className="text-md ">
          <a
            href="https://nouns.wtf"
            target="_blank"
            className="hover:underline"
          >
            nouns
          </a>{" "}
          &bull;{" "}
          <a
            href="https://etherscan.io/address/0x971a6ff4f5792f3e0288f093340fb36a826aae96"
            target="_blank"
            className="hover:underline"
          >
            contract
          </a>{" "}
          &bull;{" "}
          <a
            href="https://opensea.io/collection/altnouns"
            target="_blank"
            className="hover:underline"
          >
            opensea
          </a>{" "}
          &bull;{" "}
          <a
            href="https://twitter.com/OnChainCo"
            target="_blank"
            className="hover:underline"
          >
            twitter
          </a>{" "}
          &bull;{" "}
          <a
            href="https://discord.com/invite/BUCup66VKc"
            target="_blank"
            className="hover:underline"
          >
            discord
          </a>
        </div>
      </div>
    </main>
  );
}

function ConnectButtons({ activate, setWorking }) {
  const cls =
    "pixel-font mx-2 flex-auto py-2 px-4 bg-noun-gray rounded-xl tracking-wide-xl flex flex-row uppercase space-x-2";
  return (
    <>
      {/* <h3>Connect your wallet</h3> */}
      <div className="flex flex-col md:flex-row items-center justify-center -mt-0.5">
        <button
          onClick={() => {
            setWorking(true);
            activate(injected);
          }}
          className={cn(cls, "")}
        >
          <img src="/flowers/metamask-fox.svg" className="h-5 w-5" />
          <span className="pixel-font">Metamask</span>
        </button>
        <button
          onClick={() => {
            setWorking(true);
            activate(wcConnector);
          }}
          className={cn(cls, "")}
        >
          <img src="/flowers/walletconnect-logo.svg" className="h-5 w-5" />
          <span className="pixel-font">WalletConnect</span>
        </button>
      </div>
    </>
  );
}

function MintButton({ className, ...props }) {
  return <button className={cn(className)} {...props} />;
}
