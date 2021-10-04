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
            <title> FAQs • Flowers</title>
            <meta name="title" content="FAQs • Flowers"/>
            <meta name="description" content="FAQs for the OCC#1 Flowers"/>

            <meta property="og:type" content="website"/>
            <meta property="og:url" content="https://www.occ.xyz/flowers"/>
            <meta property="og:title" content="FAQs • Flowers"/>
            <meta property="og:description" content="FAQs for the OCC#1 Flowers"/>
            <meta property="og:image" content="https://www.occ.xyz/flowers/faqs_social.png"/>

            <meta property="twitter:card" content="summary_large_image"/>
            <meta property="twitter:url" content="https://www.occ.xyz/flowers"/>
            <meta property="twitter:title" content="FAQs • Flowers"/>
            <meta property="twitter:description" content="FAQs for the OCC#1 Flowers"/>
            <meta property="twitter:image" content="https://www.occ.xyz/flowers/faqs_social.png"/>
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

        <div className="flex items-center flex-col max-w-2xl mx-auto text-center p-4 mt-8">
            <Link href="/flowers">
                <header className="text-3xl font-snell ml-8 cursor-pointer">
                    flowers
                </header>
            </Link>
            <div className="flex items-center flex-row justify-center max-w-4xl mx-auto text-xl text-left md:p-4 p-6">
                <img src="/flowers/faq2.png" className="w-20 mt-4 mr-8 hidden md:inline-flex" />
                <h3 className="text-7xl whitelist-logo">the faqs &nbsp;</h3>
                <img src="/flowers/faq1.png" className="w-16 mt-4 ml-6 hidden md:inline-flex" />
            </div>
        </div>
    
        {/* <div className="flex align-center flex-col max-w-2xl mx-auto text-center p-4">
            <div className="mt-10">
                <Link href="/">
                    <p className="text-sm mt-8 opacity-50 cursor-pointer">occ <span className="text-xs">#1</span></p>
                </Link>
                <header className="text-5xl md:text-6xl font-snell ml-8">
                    flowers
                </header>
            </div>
        </div> */}
        <div className="flex flex-col max-w-4xl mx-auto text-xl text-left mt-10 md:p-4 p-6">
            <h1 className="text-xl items-left crimson-pro">When is the mint?</h1>
            <p className="mt-2 opacity-90">
                Whitelist Presale : <b>4th of October at 15:00 UTC</b>
            </p>
            <p className="mt-2 opacity-90">
                Public Sale : <b>4th of October at 17:00 UTC</b>
            </p>

            <h1 className="text-xl mt-16 crimson-pro">Where can I mint?</h1>
            <p className="mt-2 opacity-90">
                You will be able to mint on our official website&nbsp; ➡️ &nbsp;<Link href="/flowers"><span className="inline-flex cursor-pointer hover:underline"><em>flowers</em></span></Link>
            </p>

            <h1 className="text-xl mt-16 crimson-pro">Am I eligible for the presale?</h1>
            <p className="mt-2 opacity-90">
                You can check here: &nbsp; ➡️ &nbsp;<Link href="/whitelist-checker"><span className="inline-flex cursor-pointer hover:underline"><em>whitelist-checker</em></span></Link>
            </p>

            <h1 className="text-xl mt-16 crimson-pro">Can I mint from the etherscan contract? Where can I see it?</h1>
            <p className="mt-2 opacity-90">
            After 50% of flowers have sold, occ#1 🌺 flowers' contract will be verified and published. You'll 
            be able to mint directly from the contract when that happens. <br/><br/>
            <span className="mt-4"><em>Note: Only do this if you have experience with minting from contracts. We unfortunately can't take 
            any responsibility for failed transactions or gas lost during such transactions from the contract.</em></span>
            </p>

            <h1 className="text-xl mt-16 crimson-pro">When will I be able to see the flowers?</h1>
            <p className="mt-2 opacity-90">
            There will be no reveals. All your flowers are listed (almost) immediately in Opensea after your transaction goes through
            &nbsp; ➡️ &nbsp;<a href="https://opensea.io/collection/flowersonchain" target="_blank"><span className="inline-flex cursor-pointer hover:underline"><em>Opensea link</em></span></a>
            </p>

            <h1 className="text-xl mt-16 crimson-pro">How does minting work?</h1>
            <p className="mt-2 opacity-90">
                If you've minted NFTs before, it works just like that. You select the quantity of flowers, and press the mint button on our website. 
                Approve the transaction on your Metamask/Rainbow wallet (or other supported wallets), and your flowers will be on their way to your metaverse garden 💐
            </p>

            <h1 className="text-xl mt-16 crimson-pro">But what about my friends?</h1>
            <p className="mt-2 opacity-90">
            Flowers are meant to be shared 🫂 All wallets (both during the presale, as well as the public sale) 
            will also be able to mint directly to a friends wallet address. The only additional step would be for you to enter your friends 
            wallet address, and select the mint for friend option. Your gifted flowers will safely reach your friend.
            </p>

            <p className="mt-2 italic opacity-90">
                Note: Minting for a friend count towards your own per wallet minting limits (but doesn't impact your friend's minting limits).
            </p>
            <p className="mt-2 italic opacity-90">
                A detailed guide for minting for friend will be updated soon 🔜 
            </p>
            <p className="mt-2 italic opacity-90">
                Drop by to our <Link href="/discord">discord</Link> if you have any queries
            </p>
           
            <p className="mt-8">🌺👃🌺</p>
        </div>
        <div className="flex align-center flex-col max-w-2xl mx-auto text-center mt-10 mb-12 p-4">
            <div className="text-md ">
                <p className="inline-flex">faqs</p>
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
