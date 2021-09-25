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
      
    <div className="flex align-center flex-col max-w-2xl mx-auto text-center mb-10 p-4">
        <div className="mt-20">
          <header className="text-5xl md:text-6xl font-snell ml-8">
            flowers
          </header>
        </div>
    </div>
    <div className="mt-24 max-w-6xl lg:max-w-6xl mx-auto text-center flex flex-col md:flex-row justify-center items-center">
        <object data="/flowers/middleflower.svg" type="image/svg+xml" className="w-4/5 md:w-1/3 rounded-2xl flower"></object>
        <div className="p-4 flex">&nbsp;</div>
        <object data="/flowers/leftflower.svg" type="image/svg+xml" className="w-4/5 md:w-1/3 rounded-2xl flower"></object>
        <div className="p-4 flex">&nbsp;</div>
        <object data="/flowers/rightflower.svg" type="image/svg+xml" className="w-4/5 md:w-1/3 rounded-2xl flower"></object>
    </div>
    <div className="flex align-center flex-col max-w-2xl mx-auto text-center mt-10 p-4">
    <ul>
        <li><h3 className="quotes text-xl">“There are always flowers for those who want to see them” ~ Henri Matisse</h3></li>
        {/* <li><h3 className="quotes">“Every flower is a soul blossoming in nature” ~ Gerard De Nerwal</h3></li>
        <li><h3 className="quotes">“In joy and in sadness, flowers are our constant friends” ~ Unknown</h3></li> */}
    </ul>
    </div>
    <div className="flex align-center flex-col max-w-2xl mx-auto text-center mt-6 mb-10 p-4">
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
