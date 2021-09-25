import Head from "next/head";
import { useEffect } from "react";
import Link from 'next/link'

export default function Home() {
  useEffect( () => { 
    document.querySelector("body").classList.remove("home"); 
    document.querySelector("body").classList.add("flowers");
  } );
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
        </Head>
      
        <div className="flex align-center flex-col max-w-2xl mx-auto text-center p-4">
            <div className="mt-10">
                <Link href="/">
                    <p className="text-sm mt-8 opacity-50 cursor-pointer"><em>occ #1</em></p>
                </Link>
                <header className="text-5xl md:text-6xl font-snell ml-8">
                    flowers
                </header>
                <h3 className="mt-8 text-xl">Fully on-chain generative NFTs for you to own, or to share 🌼</h3>
            </div>
        </div>
        <div className="mt-10 max-w-6xl mx-auto text-center flex flex-col md:flex-row justify-center items-center flower-tease px-4">
            <div className="w-full rounded-2xl p-4">
                <object data="/flowers/middleflower.svg" type="image/svg+xml" className="w-full rounded-2xl"></object>
            </div>
            <div className="w-full rounded-2xl p-4">
                <object data="/flowers/leftflower.svg" type="image/svg+xml" className="w-full rounded-2xl"></object>
            </div>
            <div className="w-full rounded-2xl p-4">
                <object data="/flowers/rightflower.svg" type="image/svg+xml" className="w-full rounded-2xl"></object>
            </div>
        </div>
        <div className="flex align-center flex-col max-w-2xl mx-auto text-center mt-10 p-4">
            <ul>
                <li><h3 className="quotes text-xl">“There are always flowers for those who want to see them” ~ Henri Matisse</h3></li>
                {/* <li><h3 className="quotes">“Every flower is a soul blossoming in nature” ~ Gerard De Nerwal</h3></li>
                <li><h3 className="quotes">“In joy and in sadness, flowers are our constant friends” ~ Unknown</h3></li> */}
            </ul>
        </div>

        <div className="flex align-center flex-col max-w-4xl mx-auto text-xl text-left mt-10 md:p-4 p-8">
            <h1 className="text-xl crimson-pro">What is the On chain collective?</h1>
            <p className="mt-2 opacity-90">
                OCC is more than a run-of-the-mill NFT art project. Our goal is to channel our love for art and technology, 
                collaborate with other digital &amp; traditional artists, and use completely on-chain tech to make beautiful NFT collectibles that, 
                hopefully, make you happy <span className="opacity-100">🌻</span> <br/>
                Every NFT mint we do is 100% generated on-chain in the smart contract and lives on as an immutable ERC-721 token on the 
                Ethereum Blockchain forever.
            </p>
            <p className="mt-4 opacity-90">
                Our first mint (of season 1): flowers is a collection of beautiful flower NFTs that are programmatically generated 
                at the precise moment you mint it 🌼
            </p>

            <h1 className="text-xl mt-16 crimson-pro">Now let's talk Flowers <em>(our genesis mint ✨)</em></h1>
            <p className="mt-2 opacity-90">
                Why flowers you ask? Because flowers are pretty and why NOT? 
            </p>
            <p className="mt-4 opacity-90">
                But serious answer – Flowers come in all shapes, sizes &amp; colours. They are the perfect canvas for our generative art 
                tech to explore the boundaries of what one can do on-chain. Despite the fact that flowers are fully on-chain, they have 
                predictable amounts of trait rarities built into the contract from which they are created. Few are super rare, 
                some animated – Maybe some of them look familiar when you look outside your window.
            </p>

            <h1 className="text-xl mt-16 crimson-pro">The mint details</h1>
            <p className="mt-2 opacity-90">
                Our genesis mint collection will be 4096 unique flowers with a mint price of 0.025 eth. We want our collectors to appreciate 
                not just the art, but the underlying technology as well, and support the movement of on-chain NFTs. You'll be able to mint 
                a flower for yourself, or for someone else. More on the mint date and exact time will be announced very soon.
            </p>

            <em className="mt-8 text-lg opacity-90">
                PS: Flowers is the first project for OCC Season 1. 
                We'll share more details on Flowers, our team &amp; what's the deal with on-chain very soon. But first, we get back to work.
            </em>
        </div>
        <div className="flex align-center flex-col max-w-2xl mx-auto text-center mt-10 mb-12 p-4">
            <div className="text-md ">
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
