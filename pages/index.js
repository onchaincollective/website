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
        <title>OCC NFTs</title>
        <meta name="title" content="On chain collective"/>
        <meta name="description" content="Channeling our love for art and technology, and using completely on-chain tech to make beautiful NFTs for you to own or to share."/>

        <meta property="og:type" content="website"/>
        <meta property="og:url" content="https://www.occ.xyz/"/>
        <meta property="og:title" content="On chain collective"/>
        <meta property="og:description" content="On-chain NFTs for you to own or to share."/>
        <meta property="og:image" content="https://www.occ.xyz/occ/social_image.png"/>

        <meta property="twitter:card" content="summary_large_image"/>
        <meta property="twitter:url" content="https://www.occ.xyz/"/>
        <meta property="twitter:title" content="On chain collective"/>
        <meta property="twitter:description" content="On-chain NFTs for you to own or to share."/>
        <meta property="twitter:image" content="https://www.occ.xyz/occ/social_image.png"/>
        <link rel="icon" href="/occ/favicon.ico" sizes="any" />
        <link rel="icon" href="/occ/icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/occ/apple-touch-icon.png" />
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
      
      <div className="flex align-center flex-col max-w-2xl mx-auto text-center mb-10 p-4">
        <div className="mt-20">
          <header className="occ-logo oc-color text-5xl md:text-6xl">
            On chain collective
          </header>
          <p className="text-xl mt-8 font-normal">We channel our love for art and technology, and use completely on-chain tech to make beautiful NFTs for you to own or to share.</p>
          <p className="text-xl mt-4 font-normal">Every NFT is 100% on-chain, generated in the smart contract &amp; 
          stored on the ethereum blockchain forever.</p>
        </div>
        <div className="mt-20 opacity-50">
          ~
        </div>
        <div className="mt-16 text-center flex flex-col justify-center items-center">
          <img src="/occ/flowers.png" className="w-full" />
          <p className="text-sm mt-8">occ #1</p>
          <h1 className="text-3xl md:text-4xl ml-5 mt-1 oc-color font-snell">
            flowers
          </h1>
          <p className="text-xl mt-4 font-normal">
            Fully on-chain, programatically generated flowers.&nbsp;<br className="hidden md:block"/>
            For you, or a special someone in your life 🌼
          </p>
          <Link href="/flowers">
            <div className="button rounded-3xl bg-white px-8 py-3 cursor-pointer mt-12"><em>mint flowers</em></div>
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
