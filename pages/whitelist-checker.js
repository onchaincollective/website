import Head from "next/head";
import { useEffect, useState } from "react";
import Link from 'next/link'

export default function Home() {
    const [walletAddress, setWalletAddress] = useState("");
    const [resultText, setResultText] = useState("Whitelist #1 & #2 are closed");

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
    "0x3383b5B049010330c06C45bD188D2Ee519c8eBD9",
    "0x5fA60264f86003024943acec0d59C9cBaEfCf91d",
    "0x25Fc8577D6116C752A1eb2d3276dBB8A15d8431f",
    "0x31F8E497a2394454fbE1889419f884d9cd68E943",
    "0x1D1524817EA4447b1365dF79bA96D1C279c9e36E",
    "0xD27dC45e60c36a316105b9a4502FB74E766BE5Ec",
    "0x08Fa92B8754f13b9c3983EaAC86F945bCeb8491f",
    "0x3E804f241553752359eF4B336D73Cc4d9B417bb7",
    "0x01D7295199645AbD26C1263a94f4d8Dca4867cb0",
    "0x99ed527BE6DF7a8196cECfE568ca03BC08863Ea5",
    "0x87042da39c06b0f85b435e5ec8ce2b15ec7bd700",
    "0x18DBb38F7359B8675E734c68d60496cAf416D593",
    "0xACd0ceA3607626A6198BBb50718EB84Ee7E5799D",
    "0xb980A6bE882Bb9222D75A02e5c5668362eAA6f3e",
    "0x05461d6A4F40342EA19Bc3646FDE4e96f26893FB",
    "0x37Df8004c50d90D3a37DAD4269227dD5CD4AF9AA",
    "0xAaFC1a45BF2168bEE119072F8aB50c749cD52fe3",
    "0xefe94f1F54C3D4cEF243732d7bf0F17a03a84003",
    "0xFC02B667501C16Ac5e7C367CF8663D95dCf23d47",
    "0xE1e4e24742534e76bB2c8cD939679645e28B4B7F",
    "0x437d1fe3A267B401C513BC6Ab6B7613E127FEcD0",
    "0xBe1a2a86C38EA26D3cB7514EE28E90271421c91b",
    "0x31D24CF68031336517526dfe4a662f9c04A65296",
    "0x236BC95dd51B2C658701bf195699C8f30142CD42",
    "0xac25D2C2df382839AB6a2a0cCb43e81FEC989152",
    "0x8476b44cDBB7A8F4585FB1A3b8d4d399A3A0b845",
    "0x81A0308562b59F248BFA47DE36e3ffB33Ec65A17",
    "0x8F7AB1f43b1bfF61CdFA470F397080Da0bBeE5D5",
    "0x5a02b647309A67a8b2DB3715913a974BDaf1c407",
    "0x6E88dC3708AFC2b0032EeFF625df78Dcde1e741A",
    "0xCac29d3938e3a8330E973e62cf0Af6BCdb0B0009",
    "0x500c579764fA743c49392293086D53632817bC25",
    "0x436DE23309A51c58096e8E097494d79C317398c3",
    "0xE7fe672AAC0AC7f452e8cFfB2774e1BBeF7cc97d",
    "0xA7a17e4f4423695D11b332E28bed380D327e3a93",
    "0x8cD8C6Cd62c77A448907647fD35396092c8f594c",
    "0xf81202034920F8a595D89fF0E54E185183569539",
    "0xE7fe672AAC0AC7f452e8cFfB2774e1BBeF7cc97d",
    "0x2c6691e697be111D959389F7217F55f9c4d18fa2",
    "0xd0e370d498B98A2c19FbF22053CE1d93752fAd46",
    "0x853C6b9A02BB87fad5625485d6835692a8230773",
    "0xE7fe672AAC0AC7f452e8cFfB2774e1BBeF7cc97d",
    "0xac119B019F2b9628D555426c316624B58020BBe3",
    "0xac119B019F2b9628D555426c316624B58020BBe3",
    "kushgrandma.eth",
    "0x9798aC85850Fe198Fb3733b088735dCaC5fD6ce8",
    "0x2cDAAF054a63C2eaeA23A7A071E39bE872f2f808",
    "0x9d6792683001Aa0de6E42266AB755ed95c1189ec",
    "0xC320e4eF78095F9ed0a44F457B2c47f57c2b8BdA",
    "0x1D1524817EA4447b1365dF79bA96D1C279c9e36E",
    "0x77c07454a6A3Bd4ADD110EB19902022A37e5D4C8",
    "0x3132A99e0082D7Bb4e443c3fFb7E83263Be87F51",
    "0x8D38423F346C4695a3482f3a286d0D31893BdF24",
    "0x32A95239BB27E0B31B7242950eDd7c5Ae7Ea021C",
    "0x2F65B176B48c85C7A89ED509955817EE468fBFF2",
    "0xf7b7DD2cC91CDC39799E8AA9Bada6bb6C99BBE5F",
    "0x9d77D96D395ad15aCeA58659F1Fd2404a5D063f2",
    "0x1795011eA0D47f3Dbd757B77fDAa3F0366208237",
    "0x2402Db592601Bf5F26d53c07c89F48Ce618b21a8",
    "0x5FD4fC7CBDE1413af8F889D6dDc2b412897132a0",
    "0x8B075Da4F5e2f9FFa27303A7B1752DF619fcaA5B",
    "0x1D5522626729349812A71d812D14AF8AF1F7AA26",
    "0x0EEfA7e7877aEb0ce0ffcED291f492458AAE19Eb",
    "0xB97167440C95fD6df9053B813855d5bDCa557409",
    "0xc3856a3a70832ffc6cd678dd0a674b680ba8ce44",
    "0xFDde23f401A53dE4E0B3E5E25Ea2125555F49CA0",
    "0xac25D2C2df382839AB6a2a0cCb43e81FEC989152",
    "0x42B046Ab4E2f58Df183C14614cce97794a7e5f8a",
    "0x52D08C2b8e4f557dae794E7135016525168cD8d1",
    "0x770b35F11435e4CE4956d71C50fa7e0643342Fc8",
    "0x9d2A9c0f149147096BAc7923165f72c5DA3A65B0",
    "0x630CEe48cEbe813954b4E1b74cdDc8d0af9F96A9",
    "0x9798aC85850Fe198Fb3733b088735dCaC5fD6ce8",
    "0xB08AC2F9fc2D19336444d9Cc247878FD7C2716e1",
    "0x3e75D6b18A8959ca2D55eDF62a810b0709254FF1",
    "0x5A693bAF57D48fF92aDcDC1568b400607BCc0791",
    "0x8Da15F7e6bf20Eae393D0210d0F69eA98fC8Ea5e",
    "0x472fE6Ff89EE8EaF6b9d329F698919dF8658c323",
    "0xEA2a6705aAe03970EaC05a09bABC076BD1f94256",
    "0xb6A1E4458De10E484C2cea3A6A5015970A2861FC",
    "0x29F6E49a615FcB9A113769879a9efDD9797a2f19",
    "0x325c08A558ff02F244F31Ba1e87Bf3c1b1C08f45",
    "0x71A7619f96a2F2d2a0b53f0A88B2923C62Bb0ECC",
    "0x06Ef623E6C10e397A0F2dFfa8c982125328e398c",
    "0xeb4681EaC1985750d6d3A0dE31cc0ab6208251F2",
    "0x9c73E566EC59e11D485b78c90546bebC6c133b98",
    "0xA99b5bDE644813680c240e78F1faD5072d887A7D",
    "0xDAd6c364209c821b459C3bD337Bcb8A542F561ba",
    "0xC4422B4d9ccf2f1734087831F49Ee3C03b603A70",
    "0x63C03b9553fB9Df69e79A9E1C1D75a8024Dd48Ac",
    "0xBf7d45a93F7bD4B0D89d047c73BC1Baae1516855",
    "0x8a3fb9E2bA147BAd2BDD8fd8BD3a699E27cd2eB6",
    "0xd0bbE282074F6225D8449a6f1B4e150a1Cf5280F",
    "0x7cc4E967242E1CaD92152d47AE0bB9169e97d553",
    "0x8E80d9330ACaE130c77B97A0b1A25cB1a21cfd67",
    "0xc082bdB52B9F341d8ab5D8aE9dA708d13c230cca",
    "0x9a25e2e6035495601CA34DF3620b0bc9E64E3a1d",
    "0x29F6E49a615FcB9A113769879a9efDD9797a2f19",
    "0x0AeD57C35B340b401384742d6746BF1D11232C6C",
    "0x531e969596E436486d8fBfC436Ab19C73587619f",
    "0x2cedD6e8ADdDF7f29628732923838438c552A63d",
    "0x2f59586c003674Dd4C6d745AeF7ccA4B5e50c13F",
    "0xac25D2C2df382839AB6a2a0cCb43e81FEC989152",
    "0xF4A512F95E50ecc0926986C62E505ee7DAb50678",
    "0x6adEd35C29C0cC7c0F47E812Da93edB24663CCED",
    "0xe74a12e1bEFb0d65a399db1A6e231abD8Cf4E746",
    "0xbd2e33bCDcAe0DA829C818eaaF6292E7f2130489",
    "0xeC6770C4367Aa1D722892F4d768F150f51246732",
    "0xCd0D3a986F8Fc00ad521e2319f2260c9A5AA6C44",
    "0xea45bc8E9a949e8C43bfb97F8553228a79be164e",
    "0x62706c4a97eCc8DbaEC92Ea8345a9542EafFBf85",
    "0xAfC786F195F4a1C47Eb364f94066e49EcA738998",
    "0x2A1Ca52f11A7F0aA923A6739d49c69004C7246e1",
    "0xe46bfC3ac7743E2D693D60ebAd719525634e23E4",
    "0x3e75D6b18A8959ca2D55eDF62a810b0709254FF1",
    "0x8DBaf666aB3E53cf48412b61B829b5B8317D6f23",
    "0x2402Db592601Bf5F26d53c07c89F48Ce618b21a8",
    "0x02ACA9872DA2e7eb9a0B06f80E41460B78bE83E8",
    "0x088736aD00bC1B067422140f1c9877b011987834",
    "0xde778DC1253962a07F9c134bbEC213E01f3a4Dc8",
    "0x25E4b241D4ca338b49D429178d55E6118090aFcc",
    "0x4b2AaD37a7D72dAf30Bb012033Bb4dDCB6779Daa",
    "0x35B278C78b0A2810A8cCe55B9beCC45E9C44af68",
    "0xFAE4B4D6F2e0C1a5a0ce88A4a7c25e5410C8d1dC",
    "0x992984C607644B42d4A491f51A0191b0B59F4569",
    "0xCDc722CC2f47d95f9621F1cFbe867A09688d61a5",
    "0x69432E7f7CC99aaa93609B87EC4e986B2FF5Fe4d",
    "0x2dDDe30552089Dc7F0645Ac703F7D5eDeb25FFa0",
    "0xEc8E08dA68e0d9f1769a45896c4fCB2bBf5B8756",
    "0x380E5b655d459A0cFa6fa2DFBbE586bf40DcFd7F",
    "mintface.eth",
    "veekay.eth",
    "0x3bCB6f563D24cCAeF05798cB43d8103b84028B97",
    "mal1.eth",
    "0x790D9Bb483Ae50773BF339757b9BFeB02C684ea6",
    "0x22A676B52392591bC6c7caf51c14b38f5e0F3716",
    "seamb.eth",
    "0x114C0b8A64b440ffaE0641210D759B9319A45D17",
    "mihir.eth",
    "0x10Bd2Ffe850cE960CCc5A114a4e5AD65aeAc0917",
    "0x434DeD09939b64CD76BAA81f9A394283D4C71F05",
    "dheerajshah.eth"];

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
                <Link href="/flowers">
                    <header className="text-3xl font-snell ml-8 cursor-pointer">
                        flowers
                    </header>
                </Link>
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
