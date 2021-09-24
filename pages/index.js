import Head from "next/head";
import { useEffect } from "react";
import Link from 'next/link'

export default function Home() {
  useEffect( () => { 
    document.querySelector("body").classList.remove("flowers"); 
    document.querySelector("body").classList.add("home");
  } );
  return (
    <main className="occ-home">
      <Head>
        <title>On chain collective project</title>
        <link rel="icon" href="/occ/favicon.ico" sizes="any" />
        <link rel="icon" href="/occ/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/occ/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
      </Head>
      <div className="flex align-center flex-col max-w-2xl mx-auto text-center mb-10 p-4">
        <div className="mt-24">
          <header className="occ-logo oc-color text-5xl md:text-6xl">
            On chain collective
          </header>
          <p className="text-xl mt-8">Our goal is to channel our love for art and technology, 
          and use completely on-chain tech to make beautiful NFTs for you to own or to share.</p>
          <p className="text-xl mt-4">Every NFT is 100% on chain, generated in the smart contract &amp; 
            stored on the ethereum blockchain forever.</p>
        </div>
        <div className="mt-20 opacity-50">
          ~
        </div>
        <div className="mt-16 text-center flex flex-col justify-center items-center">
          <img src="/occ/flowers.png" className="w-4/5" />
          <p className="text-sm mt-8">occ #1</p>
          <h1 className="text-3xl mt-2 oc-color font-bold">
            Flowers
          </h1>
          <Link href="/flowers">
            <em className="mt-4 opacity-50">~available to mint soon~</em>
          </Link>
        </div>
        <div className="text-md mt-24">
          <a href="https://twitter.com/OnChainCo" target="_blank" className="hover:underline">
            twitter
          </a>{" "}
          &bull;{" "}
          <a href="https://discord.com/invite/BUCup66VKc" target="_blank" className="hover:underline">
            discord
          </a>{" "}
        </div>
      </div>
    </main>
  );
}
