import Head from "next/head";
import { useEffect, useState } from "react";

export default function Home() {
    const [walletAddress, setWalletAddress] = useState("");
    const [resultText, setResultText] = useState("Whitelist #1 is closed");

    useEffect( () => { 
        document.querySelector("body").classList.remove("home"); 
        document.querySelector("body").classList.add("flowers");
    } );

    let addresses = ["0x8fb9afdcC074599d86327b731f47FFa5375823A9",
    "0xee7C6be1d0859eBF50cA73772cbBE85c774BbB88",
    "0x769A918E72b5f9b561CBdCd0A3B14c78383D52A0",
    "0xE464d012805F23705091eeE10CA3856d6E4bff3b",
    "Ekk8mpRH4kdirKo11zX52z8FkUgLFc3Z2LBk6SbSo7c",
    "0xE070dAF1ac10DDAB06DB23B9563B8415eFB7eE49",
    "0x856d1B7CDB66e29938CddDf11293904802CE451B",
    "0x84BE823A8cf733f44EC857AD7Ed36C1538FbB90D",
    "0x7052CB5c9dEdAF286af7E49F284C0C3A5d2dc61b",
    "0x49612Fd70fEc2406c77a10a2926F39923D234C5B",
    "0x85042EE3F6911A73126488448Aa9e81b3ee5514a",
    "0xeA3246957e3548fAdf56301Af6e020Fa288AF8BA",
    "0x106728b9ca0cFE5e1475cAAeDD61d2F5b2f102fA",
    "0x00C5d1690ce7eAcAF4912213db6e07b30cE1826e",
    "0xafcbc05B070fc9408842828Da1024211e445d523",
    "0x1E4aB43d5D283cb3bf809a46C4eed47C7283e6EC",
    "0x244FE02FBCf4dB4Ad96063B161F00e444FC54011",
    "0x6301Add4fb128de9778B8651a2a9278B86761423",
    "0xeF16B997AB3023d86549442Bbd92c0DE61878a05",
    "0x983e5094235b58bc861c1685082f54938eb67493",
    "0x9470317577A983a625895e58eD1295Ae78f9Fb38",
    "0x88Dd371C119CC8D10c48B2f4843a4D782c3200e1",
    "0xDAE6cA75bB2aFD213E5887513D8b1789122EaAea",
    "0x925053456b79e5180B3dbFa041CF1fB65Eb0a39F",
    "0xE8B8Fd186C026edA9E48f5F19732Dd2f86d568D9",
    "0x925053456b79e5180B3dbFa041CF1fB65Eb0a39F",
    "0x38f78Dd80c18afc7Ac5ae04846CE4607465aE77C",
    "0xC10d5C49365C8288B007721Ab0f5a0a9d294Ff59",
    "0xf930b0a0500d8f53b2e7efa4f7bcb5cc0c71067e",
    "0xE6e8A8cAE5f8d8f275bD1E4361086031eea50b6b",
    "0x244FE02FBCf4dB4Ad96063B161F00e444FC54011",
    "0x7E3A74AB669d4C5f411940e97d1c29db3D39e950",
    "0x0d7fA9022089E06B93b9BfD647B532D52365080d",
    "0x478bb542f7658d635ABBA67edB987806DFF5b83d",
    "0xE55c9840eb6Ba1c75160Ed611E3C72Bc438dCA54",
    "0xE1e0Da672B12F7d0d025F4b52512AB1678b2c7FD",
    "0x2BEa720a5fe5e7738d775e8BfD3a37Fa072Cd46c",
    "0xc3BDAFdE4E749Df19D12396a0F4d0a65dfFb57eC",
    "0xe1f3554a0a7d58cbc8c2Da2561A84210686362ac",
    "0x881a960440153CFF2e60aFEddFa05296239240a3",
    "0x702094a1AC85a4AE93940F92D672754910310238",
    "0xd6E8cdD9cD37bc0DF0E275b9C7512B31129DfC5E",
    "0xF2c519b1633241cDdfE21CeCaE1A5B0FA4C776b3",
    "0xb78196b3e667841047d1Bb1365AB8fB3d46aB1A8",
    "0x5b44a8aBf5b5280cD93fc7E481FbF1Fd46bEdB1A",
    "0x3310B2c201a40d4C26682C83d5fF5F62a42c0b76",
    "0x619271899c4Ea08040054d3E8adC41Df32983723",
    "0xf3BB97E22Ee247B5C38fE2Ee4367145D7F908fE6",
    "0xf9091Ba435A41F0D461d896cfea6F5E78fFB475e",
    "0xC64779958eC15AA3F8755c1a0ce581C0BB9b3124",
    "0xA00E00c64764b31006104766942D2f437326F0cA",
    "0x0c7dfC8ab30BDf9afc6C6f5B408ae0DDFE7aB5e4",
    "0x935002727A6EBBcaf01a0039DB0e6B1f9C175f0b",
    "0xf83E671Ea94b89BC178B68c257C14Ed6667547A7",
    "0x35eB5365961cA614bB9f6362b063d91Dc888e995",
    "0x2d17012de3B3Fc8D8444046f3B394abC8D20ff94",
    "0xcF0b9631230F826Bc87D528b2dDc7dd615DdDB8a",
    "0x8fF09d50c2f9403Fd063786e225bb64fBc8E191b",
    "0xdEAeA09000158B91019B739981c67a741Ec45d88",
    "0x6F3aC41265916DD06165b750D88AB93baF1a11F8",
    "0x2b2A1F8E15A127BAadDf2EcD3a63C3BB599f0F05",
    "0x05e3B10f3717f50f735fae1F359dbC5Cff632b40",
    "0xB191271baaC4f10Bec72FB89e62528B6dE68508d",
    "0x206629bAbc6345F9DC0Ee86CB681a0882bd08aD7",
    "0x6c4387e192b4A44F2F772D0d9238eB6A2c8381b7",
    "0x00741285Ce4d9e7b5cb99E68e181d7f344CFA70c",
    "0x61e3E08665BB9b65D8841F8dDbC73a354677C456",
    "0x1c6133F5d6Cd6cCf8028CeaeD98c7B00750eA957",
    "0xBDC4A5c0ff7275736cAd102C7408555FB5D6c495",
    "0x5cE8b1B4d483aAA27194000da02f5ec10bb21905",
    "0x727E8D628e9F3138B6153E252730F146e9af9386",
    "0xd36954DF517cFd9D533d4494B0E62B61c02Fc29a",
    "0xb5A2b414B3c4E0fBd905095E6A8CfeA736def914",
    "0xFd500c30EBD18ce43A6dAD03570F697de0dDaEC8",
    "0xb683A2056526162C4771d363204aF41ea8c1eC52",
    "0xb7Bd5cD91aAba1D521D208854C236818D1C71c88",
    "0xF5b101C23547b998d54124e5dD98e13D7bB26312",
    "0xaECf6412Cf1A51986185F5718FadD640bae5C7cB",
    "0x7D1c8E35fa16Ee32f11a882B3E634cCbaE07b790",
    "0x2296D34Ba519F331cC48F12FeCC00f626b61d98a",
    "0x335A848af9fC2B1a4c3C7d99EFd0Ae5C16437cc9",
    "0x02A82254DC04EFC9b0242c278322BC4acA464522",
    "0xb39bDD758d68f129934C3d8aD2D0CaFa55903abf",
    "0x947Caf5AdA865ACE0c8de0ffD55de0C02E5F6B54",
    "0x6d62f65faFaDbe99E87748445aF0aD87f05d3b2f",
    "0x0ccab1b6df6E319d1F53FF041c9fc797939F6929",
    "0x93d6227717F4B6c28A033c62675E4596CeF98987",
    "0x681dd11aA7aDF3b4261Ba3547d3F911765Dd5Fe5",
    "0xeFFF9f68c79088D1efeEA73b03c84Ee422F09af2",
    "0x624aE79b0BC9a151Dc95e7Bbe197e63f1514c0c6",
    "0x48C3932347586d9354553C3a4eE76858E34d0CAc",
    "0xA9041aB06C1e060700EE33e1849d7976F45954AF",
    "0x9cDEe932Dae0D8c3858B404a8669AB980Be1f008",
    "0x738CEC152fAfb9a4e0F371de3483aa6A2BF0A550",
    "0x0BbB59a521C625c9d1F9B745AD3C13Ef5b97A399",
    "0xC6068433585ED0141315122BF17a39b39AcAE511",
    "0x7545E91679A6cc1d744690F136fF5c705c2dDB67",
    "0xD5548a1FD1b9D5eD68fddD52346EC8d3f5aDd0bd",
    "0x7A43d40884280d67b8aDBBCA4DF10d5572E6090f",
    "0x83FD45d2367003cFf1b1F07B31139585EA5027A7",
    "0x07ABb8b686575d68F94E7fa39712191bd85C0c5f",
    "0x1DeD0c973AED73dc3d93f64500153f0c5a310492",
    "0x6d3c3CAaBbdd645FD071e3B7b085666264CBfC99",
    "0x1C018692175051716b07e07C85f88A810c82905B",
    "0x9D546E20CD75b62276787a1E4db2b9393633E2d6",
    "0x446bfBb5185D79dBBFDb77F9CA81c51409C0480b",
    "chr1s.eth",
    "0xf720DC9F28659bAd5B6D8176360a9312dcd08039",
    "0x4C76697B694923dF877159258C802c8d480C3890",
    "0xf3Bc40921DD96cDac4f027D6D429B4E014F11B69",
    "0x86F1BfB095249208aACB02a98796AAC5B70C2de8",
    "0x14BDd2e8C9C7d4C7dEcf19e0e9C1767f2Fc14c7a",
    "0xC369f3a5DA4F37AA02CaE17Bbea3D6dB56e9dc5e",
    "0x440aC721C768C41a30bA7cA6E2Ca178e151B4bB7",
    "0x9975f918ab9921726b2CF344482B4c9F53C27D47",
    "0xe42F6d5f46F8fc7F093ccCB2157796088D0dD940",
    "0x46Aed31562c365493536579135Bc2Cf57Dc1Bc85",
    "okla.eth",
    "0x6Ec410Cd9e9C5c073baC689c6d2e231eA26E9FE4",
    "0x3FF25B144950F9F0E2628F28d6e99859e67Cd9b9",
    "0xaB14023979A34b4Abb17ABD099A1De1dc452011a",
    "0xE918493BCe20ECeC0dF5a944EF4b2c9a3f8CCb15",
    "0x3A7b9C393Dd57D0Cfb22cBeaD0ECA9F7D66C633e",
    "0x40D0F1c7979CD5E91f52a0FE00a1c61b466BAa15",
    "0xdAB0A5d15ff6B75E69256c29609d2Fc3eBbFEb04",
    "0x3EdE152d4F31444c1A95bd01B987258f9Db33Fc2",
    "0x0338e561E152CC81e6A537D7E6C2650ECF59d2fE",
    "0x3383b5B049010330c06C45bD188D2Ee519c8eBD9"];

    let addressesLowerCase = addresses.map(function(v) {return v.toLowerCase();});


    function checkWalletAddress() {
        console.log(walletAddress);
        if (addressesLowerCase.includes(walletAddress.toLowerCase())) {
            setResultText("🌸 You're in!");
        } else if (!addresses.includes(walletAddress.toLowerCase())) {
            setResultText("Sorry, you didn't make it 🥀");
        }
    }
  
    return (
        <main className="occ-home">
            <Head>
                <title>Flowers • OCC #1</title>
                <meta name="title" content="Whitelist • OCC #1 Flowers"/>
                <meta name="description" content="On-chain flower NFTs for you to own or to share."/>

                <meta property="og:type" content="website"/>
                <meta property="og:url" content="https://www.occ.xyz/whitelist"/>
                <meta property="og:title" content="Whitelist • OCC #1 Flowers"/>
                <meta property="og:description" content="On-chain flower NFTs for you to own or to share."/>
                <meta property="og:image" content="https://www.occ.xyz/flowers/whitelist_social.png"/>

                <meta property="twitter:card" content="summary_large_image"/>
                <meta property="twitter:url" content="https://www.occ.xyz/whitelist"/>
                <meta property="twitter:title" content="Whitelist • OCC #1 Flowers"/>
                <meta property="twitter:description" content="On-chain flower NFTs for you to own or to share."/>
                <meta property="twitter:image" content="https://www.occ.xyz/flowers/whitelist_social.png"/>
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
                <header className="text-3xl font-snell ml-8">
                    flowers
                </header>
                <h3 className="mt-2 text-7xl whitelist-logo">the whitelist</h3>
            </div>
            
            <div className="flex items-center flex-col max-w-2xl justify-center mx-auto text-center p-4 mt-8">
                <img src="/flowers/whitelist.png" className="w-full" />
                <p className="text-2xl crimson mt-12">{resultText}</p>
                <input
                className="whitelist-input mt-12"
                name="walletAddress"
                type="text"
                placeholder="Paste your wallet address"
                onChange={(event) => {
                setWalletAddress(event.target.value);
                }}
                />
                <button className="p-2 justify-center disabled:opacity-50 flower-button text-xl bg-white w-72 text-black px-8 py-3 cursor-pointer mt-6"
                disabled={walletAddress ? false : true}
                onClick={checkWalletAddress}>
                    <em>Check if you're on the list</em>
                </button>
            </div>

            <div className="flex align-center flex-col max-w-2xl mx-auto text-center mt-16 mb-12 p-4">
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
