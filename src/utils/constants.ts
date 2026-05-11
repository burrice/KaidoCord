/*
 * Kaidocord, a modification for Discord's desktop app
 * Copyright (c) 2026 Team KAIDO and contributors
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

export const REACT_GLOBAL = "Vencord.Webpack.Common.React";

// Team KAIDO Discord server — substitua pelo ID real quando criar o servidor
export const KAIDO_BOT_USER_ID = "0";
export const KAIDO_GUILD_ID = "0";
export const MEMBER_ROLE_ID = "0";
export const CONTRIB_ROLE_ID = "0";
export const SUPPORT_CHANNEL_ID = "0";

// Mantidos por compatibilidade com plugins upstream do Vencord
export const VENBOT_USER_ID = "1017176847865352332";
export const VENCORD_GUILD_ID = "1015060230222131221";
export const DONOR_ROLE_ID = "1042507929485586532";
export const REGULAR_ROLE_ID = "1026504932959977532";
export const SUPPORT_CATEGORY_ID = "1108135649699180705";
export const KNOWN_ISSUES_CHANNEL_ID = "1222936386626129920";

const platform = navigator.platform.toLowerCase();
export const IS_WINDOWS = platform.startsWith("win");
export const IS_MAC = platform.startsWith("mac");
export const IS_LINUX = platform.startsWith("linux");
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent#mobile_tablet_or_desktop
// "In summary, we recommend looking for the string Mobi anywhere in the User Agent to detect a mobile device."
export const IS_MOBILE = navigator.userAgent.includes("Mobi");

export interface Dev {
    name: string;
    id: bigint;
    badge?: boolean;
}

/**
 * Team KAIDO — membros do time.
 * Se quiser badge no perfil, adicione seu Discord ID.
 * Use 0n para manter anônimo.
 */
export const Devs = /* #__PURE__*/ Object.freeze({
    // === Team KAIDO ===
    epy: {
        name: "j6",
        id: 1098146574393163817n // Owner
    },
    null: {
        name: "null",
        id: 0n
    },
    cute: {
        name: "cute",
        id: 0n
    },
    machiori: {
        name: "machiori",
        id: 0n
    },
    arc: {
        name: "arc // Wired",
        id: 0n
    },

    // === Contribuidores originais do Vencord (mantidos por crédito GPL) ===
    Ven: {
        name: "Vendicated",
        id: 343383572805058560n,
        badge: false
    },
    Samu: {
        name: "Samu",
        id: 702973430449832038n,
        badge: false
    },
    Nuckyz: {
        name: "Nuckyz",
        id: 235834946571337729n,
        badge: false
    },
    D3SOX: {
        name: "D3SOX",
        id: 201052085641281538n,
        badge: false
    },
    Megu: {
        name: "Megumin",
        id: 545581357812678656n,
        badge: false
    },
    botato: {
        name: "botato",
        id: 440990343899643943n,
        badge: false
    },
    rushii: {
        name: "rushii",
        id: 295190422244950017n,
        badge: false
    },
    Glitch: {
        name: "Glitchy",
        id: 269567451199569920n,
        badge: false
    },
    Nyako: {
        name: "nyako",
        id: 118437263754395652n,
        badge: false
    },
    MaiKokain: {
        name: "Mai",
        id: 722647978577363026n,
        badge: false
    },
    amy: {
        name: "Amy",
        id: 603229858612510720n,
        badge: false
    },
    katlyn: {
        name: "katlyn",
        id: 250322741406859265n,
        badge: false
    },
    nea: {
        name: "nea",
        id: 310702108997320705n,
        badge: false
    },
    Nickyux: {
        name: "Nickyux",
        id: 427146305651998721n,
        badge: false
    },
    mantikafasi: {
        name: "mantikafasi",
        id: 287555395151593473n,
        badge: false
    },
    Xinto: {
        name: "Xinto",
        id: 423915768191647755n,
        badge: false
    },
    JacobTm: {
        name: "Jacob.Tm",
        id: 302872992097107991n,
        badge: false
    },
    BigDuck: {
        name: "BigDuck",
        id: 1024588272623681609n,
        badge: false
    },
    AverageReactEnjoyer: {
        name: "Average React Enjoyer",
        id: 1004904120056029256n,
        badge: false
    },
    adryd: {
        name: "adryd",
        id: 0n,
        badge: false
    },
    Tyman: {
        name: "Tyman",
        id: 487443883127472129n,
        badge: false
    },
    afn: {
        name: "afn",
        id: 420043923822608384n,
        badge: false
    },
    KraXen72: {
        name: "KraXen72",
        id: 379304073515499530n,
        badge: false
    },
    kemo: {
        name: "kemo",
        id: 715746190813298788n,
        badge: false
    },
    dzshn: {
        name: "dzshn",
        id: 310449948011528192n,
        badge: false
    },
    Ducko: {
        name: "Ducko",
        id: 506482395269169153n,
        badge: false
    },
    jewdev: {
        name: "jewdev",
        id: 222369866529636353n,
        badge: false
    },
    Luna: {
        name: "Luny",
        id: 821472922140803112n,
        badge: false
    },
    Vap: {
        name: "Vap0r1ze",
        id: 454072114492866560n,
        badge: false
    },
    KingFish: {
        name: "King Fish",
        id: 499400512559382538n,
        badge: false
    },
    Commandtechno: {
        name: "Commandtechno",
        id: 296776625432035328n,
        badge: false
    },
    TheSun: {
        name: "sunnie",
        id: 406028027768733696n,
        badge: false
    },
    rae: {
        name: "rae",
        id: 1398136199503282277n,
        badge: false
    },
    pointy: {
        name: "pointy",
        id: 99914384989519872n,
        badge: false
    },
    SammCheese: {
        name: "Samm-Cheese",
        id: 372148345894076416n,
        badge: false
    },
    zt: {
        name: "zt",
        id: 289556910426816513n,
        badge: false
    },
    captain: {
        name: "Captain",
        id: 347366054806159360n,
        badge: false
    },
    nick: {
        name: "nick",
        id: 347884694408265729n,
        badge: false
    },
    whqwert: {
        name: "whqwert",
        id: 586239091520176128n,
        badge: false
    },
    lewisakura: {
        name: "lewisakura",
        id: 96269247411400704n,
        badge: false
    },
    RuiNtD: {
        name: "RuiNtD",
        id: 157917665162297344n,
        badge: false
    },
    hunt: {
        name: "hunt-g",
        id: 222800179697287168n,
        badge: false
    },
    cloudburst: {
        name: "cloudburst",
        id: 892128204150685769n,
        badge: false
    },
    Aria: {
        name: "Syncxv",
        id: 549244932213309442n,
        badge: false
    },
    TheKodeToad: {
        name: "TheKodeToad",
        id: 706152404072267788n,
        badge: false
    },
    LordElias: {
        name: "LordElias",
        id: 319460781567639554n,
        badge: false
    },
    juby: {
        name: "Juby210",
        id: 324622488644616195n,
        badge: false
    },
    Alyxia: {
        name: "Alyxia Sother",
        id: 952185386350829688n,
        badge: false
    },
    Remty: {
        name: "Remty",
        id: 335055032204656642n,
        badge: false
    },
    skyevg: {
        name: "skyevg",
        id: 1090310844283363348n,
        badge: false
    },
    Dziurwa: {
        name: "Dziurwa",
        id: 1001086404203389018n,
        badge: false
    },
    arHSM: {
        name: "arHSM",
        id: 841509053422632990n,
        badge: false
    },
    AutumnVN: {
        name: "AutumnVN",
        id: 393694671383166998n,
        badge: false
    },
    pylix: {
        name: "pylix",
        id: 492949202121261067n,
        badge: false
    },
    Tyler: {
        name: "\\\\GGTyler\\\\",
        id: 143117463788191746n,
        badge: false
    },
    RyanCaoDev: {
        name: "RyanCaoDev",
        id: 952235800110694471n,
        badge: false
    },
    FieryFlames: {
        name: "Fiery",
        id: 890228870559698955n,
        badge: false
    },
    KannaDev: {
        name: "Kanna",
        id: 317728561106518019n,
        badge: false
    },
    carince: {
        name: "carince",
        id: 818323528755314698n,
        badge: false
    },
    PandaNinjas: {
        name: "PandaNinjas",
        id: 455128749071925248n,
        badge: false
    },
    CatNoir: {
        name: "CatNoir",
        id: 260371016348336128n,
        badge: false
    },
    outfoxxed: {
        name: "outfoxxed",
        id: 837425748435796060n,
        badge: false
    },
    UwUDev: {
        name: "UwU",
        id: 691413039156690994n,
        badge: false
    },
    amia: {
        name: "amia",
        id: 142007603549962240n,
        badge: false
    },
    phil: {
        name: "phil",
        id: 305288513941667851n,
        badge: false
    },
    ImLvna: {
        name: "lillith <3",
        id: 799319081723232267n,
        badge: false
    },
    rad: {
        name: "rad",
        id: 610945092504780823n,
        badge: false
    },
    AndrewDLO: {
        name: "Andrew-DLO",
        id: 434135504792059917n,
        badge: false
    },
    HypedDomi: {
        name: "HypedDomi",
        id: 354191516979429376n,
        badge: false
    },
    Rini: {
        name: "Rini",
        id: 1079479184478441643n,
        badge: false
    },
    castdrian: {
        name: "castdrian",
        id: 224617799434108928n,
        badge: false
    },
    Arrow: {
        name: "arrow",
        id: 958158495302176778n,
        badge: false
    },
    bb010g: {
        name: "bb010g",
        id: 72791153467990016n,
        badge: false
    },
    Dolfies: {
        name: "Dolfies",
        id: 852892297661906993n,
        badge: false
    },
    RuukuLada: {
        name: "RuukuLada",
        id: 119705748346241027n,
        badge: false
    },
    blahajZip: {
        name: "blahaj.zip",
        id: 683954422241427471n,
        badge: false
    },
    archeruwu: {
        name: "archer_uwu",
        id: 160068695383736320n,
        badge: false
    },
    ProffDea: {
        name: "ProffDea",
        id: 609329952180928513n,
        badge: false
    },
    UlyssesZhan: {
        name: "UlyssesZhan",
        id: 586808226058862623n,
        badge: false
    },
    ant0n: {
        name: "ant0n",
        id: 145224646868860928n,
        badge: false
    },
    Board: {
        name: "BoardTM",
        id: 285475344817848320n,
        badge: false
    },
    philipbry: {
        name: "philipbry",
        id: 554994003318276106n,
        badge: false
    },
    Korbo: {
        name: "Korbo",
        id: 455856406420258827n,
        badge: false
    },
    maisymoe: {
        name: "maisy",
        id: 257109471589957632n,
        badge: false
    },
    Lexi: {
        name: "Lexi",
        id: 506101469787717658n,
        badge: false
    },
    Mopi: {
        name: "Mopi",
        id: 1022189106614243350n,
        badge: false
    },
    Grzesiek11: {
        name: "Grzesiek11",
        id: 368475654662127616n,
        badge: false
    },
    Samwich: {
        name: "Samwich",
        id: 976176454511509554n,
        badge: false
    },
    coolelectronics: {
        name: "coolelectronics",
        id: 696392247205298207n,
        badge: false
    },
    Av32000: {
        name: "Av32000",
        id: 593436735380127770n,
        badge: false
    },
    Noxillio: {
        name: "Noxillio",
        id: 138616536502894592n,
        badge: false
    },
    Kyuuhachi: {
        name: "Kyuuhachi",
        id: 236588665420251137n,
        badge: false
    },
    nin0dev: {
        name: "nin0dev",
        id: 1395533040914141235n,
        badge: false
    },
    Elvyra: {
        name: "Elvyra",
        id: 708275751816003615n,
        badge: false
    },
    HappyEnderman: {
        name: "Happy enderman",
        id: 1083437693347827764n,
        badge: false
    },
    Vishnya: {
        name: "Vishnya",
        id: 282541644484575233n,
        badge: false
    },
    Inbestigator: {
        name: "Inbestigator",
        id: 761777382041714690n,
        badge: false
    },
    newwares: {
        name: "newwares",
        id: 421405303951851520n,
        badge: false
    },
    JohnyTheCarrot: {
        name: "JohnyTheCarrot",
        id: 132819036282159104n,
        badge: false
    },
    puv: {
        name: "puv",
        id: 469441552251355137n,
        badge: false
    },
    IcedMarina: {
        name: "icedmarina",
        id: 594406131670188042n,
        badge: false
    },
    nakoyasha: {
        name: "nakoyasha",
        id: 222069018507345921n,
        badge: false
    },
    Sqaaakoi: {
        name: "Sqaaakoi",
        id: 259558259491340288n,
        badge: false
    },
    iamme: {
        name: "i am me",
        id: 984392761929256980n,
        badge: false
    },
    Byeoon: {
        name: "byeoon",
        id: 1167275288036655133n,
        badge: false
    },
    Kaitlyn: {
        name: "kaitlyn",
        id: 306158896630988801n,
        badge: false
    },
    PolisanTheEasyNick: {
        name: "Oleh Polisan",
        id: 242305263313485825n,
        badge: false
    },
    HAHALOSAH: {
        name: "HAHALOSAH",
        id: 903418691268513883n,
        badge: false
    },
    GabiRP: {
        name: "GabiRP",
        id: 507955112027750401n,
        badge: false
    },
    ImBanana: {
        name: "Im_Banana",
        id: 635250116688871425n,
        badge: false
    },
    xocherry: {
        name: "xocherry",
        id: 221288171013406720n,
        badge: false
    },
    ScattrdBlade: {
        name: "ScattrdBlade",
        id: 678007540608532491n,
        badge: false
    },
    goodbee: {
        name: "goodbee",
        id: 658968552606400512n,
        badge: false
    },
    Moxxie: {
        name: "Moxxie",
        id: 712653921692155965n,
        badge: false
    },
    Ethan: {
        name: "Ethan",
        id: 721717126523781240n,
        badge: false
    },
    nyx: {
        name: "verticalsync.",
        id: 1207087393929171095n,
        badge: false
    },
    nekohaxx: {
        name: "nekohaxx",
        id: 1176270221628153886n,
        badge: false
    },
    Antti: {
        name: "Antti",
        id: 312974985876471810n,
        badge: false
    },
    Joona: {
        name: "Joona",
        id: 297410829589020673n,
        badge: false
    },
    sadan: {
        name: "sadan",
        id: 521819891141967883n,
        badge: false
    },
    Kylie: {
        name: "Cookie",
        id: 721853658941227088n,
        badge: false
    },
    AshtonMemer: {
        name: "AshtonMemer",
        id: 373657230530052099n,
        badge: false
    },
    surgedevs: {
        name: "Chloe",
        id: 1084592643784331324n,
        badge: false
    },
    Lumap: {
        name: "Lumap",
        id: 585278686291427338n,
        badge: false
    },
    Obsidian: {
        name: "Obsidian",
        id: 683171006717755446n,
        badge: false
    },
    SerStars: {
        name: "SerStars",
        id: 861631850681729045n,
        badge: false
    },
    niko: {
        name: "niko",
        id: 341377368075796483n,
        badge: false
    },
    relitrix: {
        name: "Relitrix",
        id: 423165393901715456n,
        badge: false
    },
    RamziAH: {
        name: "RamziAH",
        id: 1279957227612147747n,
        badge: false
    },
    SomeAspy: {
        name: "SomeAspy",
        id: 516750892372852754n,
        badge: false
    },
    jamesbt365: {
        name: "jamesbt365",
        id: 158567567487795200n,
        badge: false
    },
    Darxoon: {
        name: "Darxoon",
        id: 409745838898937866n,
        badge: false
    },
    samsam: {
        name: "samsam",
        id: 400482410279469056n,
        badge: false
    },
    Cootshk: {
        name: "Cootshk",
        id: 921605971577548820n,
        badge: false
    },
    koish1: {
        name: "koish1",
        id: 291089948709486593n,
        badge: false
    },
    thororen: {
        name: "thororen",
        id: 848339671629299742n,
        badge: false
    },
    alfred: {
        name: "alfred",
        id: 1038466644353232967n,
        badge: false
    },
    vv: {
        name: "VV",
        id: 254866377087778816n,
        badge: false
    },
    u32: {
        name: "u32",
        id: 1063237286818488351n,
        badge: false
    },
    prism: {
        name: "prism",
        id: 390884143749136386n,
        badge: false
    },
    Apexo: {
        name: "Apexo",
        id: 228548952687902720n,
        badge: false
    },
    Arjix: {
        name: "ArjixWasTaken",
        id: 674710789138939916n,
        badge: false
    },
    Cyn: {
        name: "Cynosphere",
        id: 150745989836308480n,
        badge: false
    },
    Trwy: {
        name: "trey",
        id: 354427199023218689n,
        badge: false
    },
    fawn: {
        name: "fawn",
        id: 336678828233588736n,
        badge: false
    },
    DustyAngel47: {
        name: "DustyAngel47",
        id: 714583473804935238n,
        badge: false
    },
    BanTheNons: {
        name: "BanTheNons",
        id: 460478012794863637n,
        badge: false
    },
} satisfies Record<string, Dev>);

// iife so #__PURE__ works correctly
export const DevsById = /* #__PURE__*/ (() =>
    Object.freeze(Object.fromEntries(
        Object.entries(Devs)
            .filter(d => d[1].id !== 0n)
            .map(([_, v]) => [v.id, v] as const)
    ))
)() as Record<string, Dev>;
