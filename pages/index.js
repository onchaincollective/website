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
      <div className="flex align-center flex-col max-w-2xl mx-auto text-center mb-20 p-4">
        <div className="mt-24">
          <header className="occ-logo oc-color text-5xl md:text-6xl">
            On chain collective
          </header>
          <p className="text-xl mt-4">Our goal is to channel our shared love for art and technology, and use completely 
            on-chain tech to make beautiful things for you to own or to share. </p>
        </div>
        <div className="mt-24 opacity-50">
          ~
        </div>
        <div className="mt-24 text-center flex flex-col justify-center items-center">
          <img src="/occ/flowers.svg" className="w-4/5" />
          <p className="text-sm opacity-50 mt-8">1/n</p>
          <h1 className="text-3xl mt-4 oc-color font-bold">
            Flowers
          </h1>
          <p className="text-xl mt-4">
            Fully on-chain, programatically generated completely on-chain unique flowers. For you, or a special someone in your life 🌼
          </p>
          <Link href="/flowers">
            <em className="cursor-pointer mt-8 hover:underline">mint now</em>
          </Link>
        </div>
        <div className="mt-24 opacity-50">
          ~
        </div>
        <div className="mt-24 text-center flex flex-col justify-center items-center">
          <img src="/occ/damascus.png" className="w-1/2" />
          <p className="text-sm opacity-50 mt-8">2/n</p>
          <h1 className="text-4xl mt-4 text-center">
            <svg width="101" height="23" viewBox="0 0 101 23" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.284258 22H4.57426C8.50426 22 10.4843 19.15 10.4843 13.75V8.59C10.4843 3.31 8.56426 0.699999 4.57426 0.699999H0.284258V22ZM2.35426 20.26V2.41H4.30426C7.12426 2.41 8.29426 4.39 8.29426 8.59V14.05C8.29426 18.13 7.12426 20.26 4.36426 20.26H2.35426ZM21.355 22H23.455L19.105 0.699999H16.495L12.145 22H14.275L15.475 15.79H20.155L21.355 22ZM15.805 14.05L17.305 6.22C17.515 5.11 17.635 4.06 17.755 2.92H17.845C17.995 4.06 18.115 5.11 18.325 6.22L19.825 14.05H15.805ZM25.8897 22H27.8397V7.81C27.8397 6.55 27.8097 3.85 27.7797 2.59H27.8997C27.9597 2.86 28.1397 4.3 28.4097 6.16L31.4697 22H33.8097L36.8697 6.16C37.1697 4.3 37.2597 3.73 37.3797 2.59H37.5297C37.4697 3.85 37.4697 6.55 37.4697 7.81V22H39.4197V0.699999H36.0897L33.0897 16.75C32.9097 17.8 32.7297 18.64 32.6997 19.6H32.6097C32.5497 18.64 32.3697 17.8 32.1897 16.75L29.1897 0.699999H25.8897V22ZM50.9156 22H53.0156L48.6656 0.699999H46.0556L41.7056 22H43.8356L45.0356 15.79H49.7156L50.9156 22ZM45.3656 14.05L46.8656 6.22C47.0756 5.11 47.1956 4.06 47.3156 2.92H47.4056C47.5556 4.06 47.6756 5.11 47.8856 6.22L49.3856 14.05H45.3656ZM59.1103 22.51C62.2603 22.51 63.8803 20.77 63.8803 17.44V16.6C63.8803 14.26 63.3103 12.55 60.8803 10.87L58.7203 9.37C57.2203 8.32 56.7103 7.33 56.7103 5.71V4.69C56.7103 3.04 57.5503 1.99 59.1403 1.99C60.8203 1.99 61.6603 3.1 61.6603 5.56V7.33L63.7303 6.91V5.2C63.7303 1.69 62.2003 0.189998 59.1103 0.189998C56.1403 0.189998 54.5203 2.08 54.5203 4.87V5.89C54.5203 7.96 55.2403 9.58 57.3103 10.99L59.4103 12.43C61.3603 13.81 61.6903 14.83 61.6903 16.81V17.59C61.6903 19.57 60.7903 20.71 59.1403 20.71C57.3103 20.71 56.4103 19.39 56.4103 16.72V14.74L54.2503 15.1V16.99C54.2503 20.65 55.9603 22.51 59.1103 22.51ZM71.0531 22.48C74.1431 22.48 75.9731 20.62 75.9731 17.08V14.86L73.7831 14.35V17.08C73.7831 19.39 72.8531 20.65 71.1131 20.65C69.1631 20.65 68.0831 19.12 68.0831 16.33V5.98C68.0831 3.19 69.1331 2.02 71.0231 2.02C72.8531 2.02 73.7831 3.25 73.7831 5.8V7.9L75.9731 7.45V5.68C75.9731 1.87 74.2331 0.22 71.0831 0.22C67.7531 0.22 65.9231 2.29 65.9231 6.28V16C65.9231 20.29 67.7831 22.48 71.0531 22.48ZM78.9414 0.699999V17.47C78.9414 20.5 80.7114 22.51 83.8914 22.51C87.0114 22.51 88.7814 20.5 88.7814 17.47V0.699999H86.7114V17.32C86.7114 19.48 85.6614 20.68 83.8914 20.68C82.0914 20.68 81.0114 19.48 81.0114 17.32V0.699999H78.9414ZM96.0829 22.51C99.2329 22.51 100.853 20.77 100.853 17.44V16.6C100.853 14.26 100.283 12.55 97.8529 10.87L95.6929 9.37C94.1929 8.32 93.6829 7.33 93.6829 5.71V4.69C93.6829 3.04 94.5229 1.99 96.1129 1.99C97.7929 1.99 98.6329 3.1 98.6329 5.56V7.33L100.703 6.91V5.2C100.703 1.69 99.1729 0.189998 96.0829 0.189998C93.1129 0.189998 91.4929 2.08 91.4929 4.87V5.89C91.4929 7.96 92.2129 9.58 94.2829 10.99L96.3829 12.43C98.3329 13.81 98.6629 14.83 98.6629 16.81V17.59C98.6629 19.57 97.7629 20.71 96.1129 20.71C94.2829 20.71 93.3829 19.39 93.3829 16.72V14.74L91.2229 15.1V16.99C91.2229 20.65 92.9329 22.51 96.0829 22.51Z" fill="#0C0C0C"/>
            </svg>
          </h1>
          <em className="mt-8 opacity-50">up next</em>
        </div>
        <div className="text-md mt-40">
          <a href="https://twitter.com/OnChainCo" className="hover:underline">
            twitter
          </a>{" "}
          &bull;{" "}
          <a href="" className="hover:underline">
            discord
          </a>{" "}
        </div>
      </div>
    </main>
  );
}
