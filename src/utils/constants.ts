/*
 * Kaidocord, a modification for Discord's desktop app
 * Copyright (c) 2026 Team KAIDO and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

export const REACT_GLOBAL = "Vencord.Webpack.Common.React";

// Servidor oficial do Team KAIDO
export const KAIDO_GUILD_ID = "1473938294768271364";
export const KAIDO_BOT_USER_ID = "0";
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
export const IS_MOBILE = navigator.userAgent.includes("Mobi");

export interface Dev {
    name: string;
    id: bigint;
    badge?: boolean;
}

export const Devs = /* #__PURE__*/ Object.freeze({
    // === Team KAIDO ===
    epy: {
        name: "j6",
        id: 1098146574393163817n
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

    // Mantidos apenas para compatibilidade de tipos com plugins upstream
    Ven: { name: "j6", id: 1098146574393163817n, badge: false },
    Megu: { name: "j6", id: 1098146574393163817n, badge: false },
    Samu: { name: "j6", id: 1098146574393163817n, badge: false },
    Nuckyz: { name: "j6", id: 1098146574393163817n, badge: false },
    D3SOX: { name: "j6", id: 1098146574393163817n, badge: false },
    botato: { name: "j6", id: 1098146574393163817n, badge: false },
    rushii: { name: "j6", id: 1098146574393163817n, badge: false },
    Glitch: { name: "j6", id: 1098146574393163817n, badge: false },
    Nyako: { name: "j6", id: 1098146574393163817n, badge: false },
    MaiKokain: { name: "j6", id: 1098146574393163817n, badge: false },
    amy: { name: "j6", id: 1098146574393163817n, badge: false },
    katlyn: { name: "j6", id: 1098146574393163817n, badge: false },
    nea: { name: "j6", id: 1098146574393163817n, badge: false },
    Nickyux: { name: "j6", id: 1098146574393163817n, badge: false },
    mantikafasi: { name: "j6", id: 1098146574393163817n, badge: false },
    Xinto: { name: "j6", id: 1098146574393163817n, badge: false },
    JacobTm: { name: "j6", id: 1098146574393163817n, badge: false },
    BigDuck: { name: "j6", id: 1098146574393163817n, badge: false },
    AverageReactEnjoyer: { name: "j6", id: 1098146574393163817n, badge: false },
    adryd: { name: "j6", id: 1098146574393163817n, badge: false },
    Tyman: { name: "j6", id: 1098146574393163817n, badge: false },
    afn: { name: "j6", id: 1098146574393163817n, badge: false },
    KraXen72: { name: "j6", id: 1098146574393163817n, badge: false },
    kemo: { name: "j6", id: 1098146574393163817n, badge: false },
    dzshn: { name: "j6", id: 1098146574393163817n, badge: false },
    Ducko: { name: "j6", id: 1098146574393163817n, badge: false },
    jewdev: { name: "j6", id: 1098146574393163817n, badge: false },
    Luna: { name: "j6", id: 1098146574393163817n, badge: false },
    Vap: { name: "j6", id: 1098146574393163817n, badge: false },
    KingFish: { name: "j6", id: 1098146574393163817n, badge: false },
    Commandtechno: { name: "j6", id: 1098146574393163817n, badge: false },
    TheSun: { name: "j6", id: 1098146574393163817n, badge: false },
    rae: { name: "j6", id: 1098146574393163817n, badge: false },
    pointy: { name: "j6", id: 1098146574393163817n, badge: false },
    SammCheese: { name: "j6", id: 1098146574393163817n, badge: false },
    zt: { name: "j6", id: 1098146574393163817n, badge: false },
    captain: { name: "j6", id: 1098146574393163817n, badge: false },
    nick: { name: "j6", id: 1098146574393163817n, badge: false },
    whqwert: { name: "j6", id: 1098146574393163817n, badge: false },
    lewisakura: { name: "j6", id: 1098146574393163817n, badge: false },
    RuiNtD: { name: "j6", id: 1098146574393163817n, badge: false },
    hunt: { name: "j6", id: 1098146574393163817n, badge: false },
    cloudburst: { name: "j6", id: 1098146574393163817n, badge: false },
    Aria: { name: "j6", id: 1098146574393163817n, badge: false },
    TheKodeToad: { name: "j6", id: 1098146574393163817n, badge: false },
    LordElias: { name: "j6", id: 1098146574393163817n, badge: false },
    juby: { name: "j6", id: 1098146574393163817n, badge: false },
    Alyxia: { name: "j6", id: 1098146574393163817n, badge: false },
    Remty: { name: "j6", id: 1098146574393163817n, badge: false },
    skyevg: { name: "j6", id: 1098146574393163817n, badge: false },
    Dziurwa: { name: "j6", id: 1098146574393163817n, badge: false },
    arHSM: { name: "j6", id: 1098146574393163817n, badge: false },
    AutumnVN: { name: "j6", id: 1098146574393163817n, badge: false },
    pylix: { name: "j6", id: 1098146574393163817n, badge: false },
    Tyler: { name: "j6", id: 1098146574393163817n, badge: false },
    RyanCaoDev: { name: "j6", id: 1098146574393163817n, badge: false },
    FieryFlames: { name: "j6", id: 1098146574393163817n, badge: false },
    KannaDev: { name: "j6", id: 1098146574393163817n, badge: false },
    carince: { name: "j6", id: 1098146574393163817n, badge: false },
    PandaNinjas: { name: "j6", id: 1098146574393163817n, badge: false },
    CatNoir: { name: "j6", id: 1098146574393163817n, badge: false },
    outfoxxed: { name: "j6", id: 1098146574393163817n, badge: false },
    UwUDev: { name: "j6", id: 1098146574393163817n, badge: false },
    amia: { name: "j6", id: 1098146574393163817n, badge: false },
    phil: { name: "j6", id: 1098146574393163817n, badge: false },
    ImLvna: { name: "j6", id: 1098146574393163817n, badge: false },
    rad: { name: "j6", id: 1098146574393163817n, badge: false },
    AndrewDLO: { name: "j6", id: 1098146574393163817n, badge: false },
    HypedDomi: { name: "j6", id: 1098146574393163817n, badge: false },
    Rini: { name: "j6", id: 1098146574393163817n, badge: false },
    castdrian: { name: "j6", id: 1098146574393163817n, badge: false },
    Arrow: { name: "j6", id: 1098146574393163817n, badge: false },
    bb010g: { name: "j6", id: 1098146574393163817n, badge: false },
    Dolfies: { name: "j6", id: 1098146574393163817n, badge: false },
    RuukuLada: { name: "j6", id: 1098146574393163817n, badge: false },
    blahajZip: { name: "j6", id: 1098146574393163817n, badge: false },
    archeruwu: { name: "j6", id: 1098146574393163817n, badge: false },
    ProffDea: { name: "j6", id: 1098146574393163817n, badge: false },
    UlyssesZhan: { name: "j6", id: 1098146574393163817n, badge: false },
    ant0n: { name: "j6", id: 1098146574393163817n, badge: false },
    Board: { name: "j6", id: 1098146574393163817n, badge: false },
    philipbry: { name: "j6", id: 1098146574393163817n, badge: false },
    Korbo: { name: "j6", id: 1098146574393163817n, badge: false },
    maisymoe: { name: "j6", id: 1098146574393163817n, badge: false },
    Lexi: { name: "j6", id: 1098146574393163817n, badge: false },
    Mopi: { name: "j6", id: 1098146574393163817n, badge: false },
    Grzesiek11: { name: "j6", id: 1098146574393163817n, badge: false },
    Samwich: { name: "j6", id: 1098146574393163817n, badge: false },
    coolelectronics: { name: "j6", id: 1098146574393163817n, badge: false },
    Av32000: { name: "j6", id: 1098146574393163817n, badge: false },
    Noxillio: { name: "j6", id: 1098146574393163817n, badge: false },
    Kyuuhachi: { name: "j6", id: 1098146574393163817n, badge: false },
    nin0dev: { name: "j6", id: 1098146574393163817n, badge: false },
    Elvyra: { name: "j6", id: 1098146574393163817n, badge: false },
    HappyEnderman: { name: "j6", id: 1098146574393163817n, badge: false },
    Vishnya: { name: "j6", id: 1098146574393163817n, badge: false },
    Inbestigator: { name: "j6", id: 1098146574393163817n, badge: false },
    newwares: { name: "j6", id: 1098146574393163817n, badge: false },
    JohnyTheCarrot: { name: "j6", id: 1098146574393163817n, badge: false },
    puv: { name: "j6", id: 1098146574393163817n, badge: false },
    IcedMarina: { name: "j6", id: 1098146574393163817n, badge: false },
    nakoyasha: { name: "j6", id: 1098146574393163817n, badge: false },
    Sqaaakoi: { name: "j6", id: 1098146574393163817n, badge: false },
    iamme: { name: "j6", id: 1098146574393163817n, badge: false },
    Byeoon: { name: "j6", id: 1098146574393163817n, badge: false },
    Kaitlyn: { name: "j6", id: 1098146574393163817n, badge: false },
    PolisanTheEasyNick: { name: "j6", id: 1098146574393163817n, badge: false },
    HAHALOSAH: { name: "j6", id: 1098146574393163817n, badge: false },
    GabiRP: { name: "j6", id: 1098146574393163817n, badge: false },
    ImBanana: { name: "j6", id: 1098146574393163817n, badge: false },
    xocherry: { name: "j6", id: 1098146574393163817n, badge: false },
    ScattrdBlade: { name: "j6", id: 1098146574393163817n, badge: false },
    goodbee: { name: "j6", id: 1098146574393163817n, badge: false },
    Moxxie: { name: "j6", id: 1098146574393163817n, badge: false },
    Ethan: { name: "j6", id: 1098146574393163817n, badge: false },
    nyx: { name: "j6", id: 1098146574393163817n, badge: false },
    nekohaxx: { name: "j6", id: 1098146574393163817n, badge: false },
    Antti: { name: "j6", id: 1098146574393163817n, badge: false },
    Joona: { name: "j6", id: 1098146574393163817n, badge: false },
    sadan: { name: "j6", id: 1098146574393163817n, badge: false },
    Kylie: { name: "j6", id: 1098146574393163817n, badge: false },
    AshtonMemer: { name: "j6", id: 1098146574393163817n, badge: false },
    surgedevs: { name: "j6", id: 1098146574393163817n, badge: false },
    Lumap: { name: "j6", id: 1098146574393163817n, badge: false },
    Obsidian: { name: "j6", id: 1098146574393163817n, badge: false },
    SerStars: { name: "j6", id: 1098146574393163817n, badge: false },
    niko: { name: "j6", id: 1098146574393163817n, badge: false },
    relitrix: { name: "j6", id: 1098146574393163817n, badge: false },
    RamziAH: { name: "j6", id: 1098146574393163817n, badge: false },
    SomeAspy: { name: "j6", id: 1098146574393163817n, badge: false },
    jamesbt365: { name: "j6", id: 1098146574393163817n, badge: false },
    Darxoon: { name: "j6", id: 1098146574393163817n, badge: false },
    samsam: { name: "j6", id: 1098146574393163817n, badge: false },
    Cootshk: { name: "j6", id: 1098146574393163817n, badge: false },
    koish1: { name: "j6", id: 1098146574393163817n, badge: false },
    thororen: { name: "j6", id: 1098146574393163817n, badge: false },
    alfred: { name: "j6", id: 1098146574393163817n, badge: false },
    vv: { name: "j6", id: 1098146574393163817n, badge: false },
    u32: { name: "j6", id: 1098146574393163817n, badge: false },
    prism: { name: "j6", id: 1098146574393163817n, badge: false },
    Apexo: { name: "j6", id: 1098146574393163817n, badge: false },
    Arjix: { name: "j6", id: 1098146574393163817n, badge: false },
    Cyn: { name: "j6", id: 1098146574393163817n, badge: false },
    Trwy: { name: "j6", id: 1098146574393163817n, badge: false },
    fawn: { name: "j6", id: 1098146574393163817n, badge: false },
    DustyAngel47: { name: "j6", id: 1098146574393163817n, badge: false },
    BanTheNons: { name: "j6", id: 1098146574393163817n, badge: false },
} satisfies Record<string, Dev>);

// iife so #__PURE__ works correctly
export const DevsById = /* #__PURE__*/ (() =>
    Object.freeze(Object.fromEntries(
        Object.entries(Devs)
            .filter(d => d[1].id !== 0n)
            .map(([_, v]) => [v.id, v] as const)
    ))
)() as Record<string, Dev>;
