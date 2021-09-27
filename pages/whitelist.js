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
            <meta name="title" content="Whitelist • OCC #1 Flowers"/>
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
            <div className="mt-10">
                <Link href="/">
                    <p className="text-sm mt-8 opacity-50 cursor-pointer">occ <span className="text-xs">#1</span></p>
                </Link>
                <header className="text-5xl md:text-6xl font-snell ml-8">
                    flowers
                </header>
                <h3 className="mt-8 text-xl">Fully on-chain generative NFTs for you to own, or to share 🌼</h3>
            </div>
        </div>
        
        <div className="flex align-center flex-col max-w-2xl mx-auto text-center p-4">
            <img src="/flowers/whitelist.png" className="w-full" />
            <h2 className="text-xl crimson-pro">Whitelist #1 is closed</h2>
            <p className="mt-8">We'll update this link for you to check wether you've made it very soon. <br/>Keep a look out for it on the discord.</p>
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
