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
        <link rel="icon" href="/flowers/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/flowers/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
      </Head>
      
      <div className="flex align-center flex-col max-w-2xl mx-auto text-center mb-10 p-4">
        <div className="mt-20">
          <header className="text-5xl md:text-6xl font-snell ml-8">
            flowers
          </header>
        </div>
        <div className="mt-16 text-center flex flex-col justify-center items-center">
        <svg width="420" height="420" fill="none" viewBox="0 0 500 500">
            <defs>
            <filter id="filter">
            <feTurbulence baseFrequency="0.08 0.08"></feTurbulence>
            <feColorMatrix values="0 0 0 9 -5 0 0 0 9 -5 0 0 0 9 -5 0 0 0 0 0.95"></feColorMatrix></filter>
            <filter id="c" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="8" dy="8" flood-color="#000000" stdDeviation="0"/>
            </filter>
            </defs>
            <rect x="-50%" y="-50%" width="200%" height="200%" fill="#B6CAC0" filter="url(#filter)"/>
            <rect width="500" height="500" fill="#FCA59B" opacity=".2" style="mix-blend-mode:overlay"/>
            <g filter="url(#c)" stroke="#000" stroke-width="4">
            <defs>
            <path id="a" d="m270.5 223.55-5.657 5.657v1e-3l-14.849 14.849-14.85-14.849c-8.201-8.201-8.201-21.498 0-29.699l5.657-5.656v-1e-3l14.849-14.849 14.713 14.714c0.046 0.045 0.091 0.09 0.137 0.135 8.201 8.201 8.201 21.497 0 29.698z"/>
            <mask id="b">
            <rect width="100%" height="100%" fill="#fff"/>
            <use transform="rotate(51.429 250 250)" fill="black" xlink:href="#a"/>
            </mask>
            </defs>
            <use transform="rotate(0 250 250)" fill="#FFD3C2" mask="url(#b)" xlink:href="#a"/>
            <use transform="rotate(51.429 250 250)" fill="#FFD3C2" mask="url(#b)" xlink:href="#a"/>
            <use transform="rotate(102.86 250 250)" fill="#FFD3C2" mask="url(#b)" xlink:href="#a"/>
            <use transform="rotate(154.29 250 250)" fill="#FFD3C2" mask="url(#b)" xlink:href="#a"/>
            <use transform="rotate(205.71 250 250)" fill="#FFD3C2" mask="url(#b)" xlink:href="#a"/>
            <use transform="rotate(257.14 250 250)" fill="#FFD3C2" mask="url(#b)" xlink:href="#a"/>
            <use transform="rotate(-51.429 250 250)" fill="#FFD3C2" mask="url(#b)" xlink:href="#a"/>
            <circle cx="250" cy="250" r="32" fill="#FEDCCC"/>
            </g>
        </svg>
        </div>
        <div className="text-md mt-40">
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
