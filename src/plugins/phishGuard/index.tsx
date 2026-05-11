/*
 * Kaidocord, a modification for Discord's desktop app
 * Copyright (c) 2026 Team KAIDO and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { addMessageDecoration, removeMessageDecoration } from "@api/MessageDecorations";
import { Devs } from "@utils/constants";
import definePlugin from "@utils/types";
import { React, Toasts } from "@webpack/common";

// Domínios legítimos conhecidos — typosquatting detectado por similaridade
const LEGIT_DOMAINS = [
    "discord.com", "discord.gg", "discordapp.com",
    "steam.com", "steampowered.com", "steamcommunity.com",
    "paypal.com", "paypal.me",
    "nitro.gift", "discordnitro.com",
];

// Padrões suspeitos comuns em phishing Discord
const SUSPICIOUS_PATTERNS = [
    /discord[^.]*nitro/i,
    /free[_-]?nitro/i,
    /discord[_-]?gift/i,
    /steam[_-]?trade/i,
    /steamcommunit[yi]/i,
    /paypai\./i,
    /discordapp\.(?!com)/i,
    /discord\.(?!com|gg|media|co)/i,
];

const URL_RE = /https?:\/\/([a-z0-9.-]+)/gi;

function isPhishing(url: string): boolean {
    const match = url.match(/https?:\/\/([a-z0-9.-]+)/i);
    if (!match) return false;
    const domain = match[1].toLowerCase();

    // Verifica padrões suspeitos
    for (const pat of SUSPICIOUS_PATTERNS) {
        if (pat.test(domain)) return true;
    }

    // Verifica typosquatting simples (edit distance 1-2 de domínios legítimos)
    for (const legit of LEGIT_DOMAINS) {
        if (domain !== legit && domain.includes(legit.replace(".", "")) && domain.length <= legit.length + 3) {
            return true;
        }
    }

    return false;
}

function detectPhishing(content: string): string[] {
    const urls: string[] = [];
    for (const match of content.matchAll(URL_RE)) {
        if (isPhishing(match[0])) urls.push(match[0]);
    }
    return [...new Set(urls)];
}

function PhishWarning({ urls }: { urls: string[]; }) {
    return (
        <div style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "6px",
            background: "rgba(196,30,58,0.12)",
            border: "1px solid #c41e3a",
            borderRadius: "6px",
            padding: "6px 10px",
            marginTop: "4px",
            fontSize: "12px",
        }}>
            <span style={{ fontSize: "16px", flexShrink: 0 }}>⚠️</span>
            <div>
                <strong style={{ color: "#ff4757" }}>Possível Phishing Detectado</strong>
                <div style={{ color: "var(--text-muted)", marginTop: "2px" }}>
                    {urls.map(u => (
                        <div key={u} style={{ fontFamily: "monospace", fontSize: "11px" }}>
                            {u.length > 60 ? u.slice(0, 60) + "…" : u}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function PhishDecoration({ message }: { message: any; }) {
    const phishUrls = detectPhishing(message.content ?? "");
    if (!phishUrls.length) return null;
    return <PhishWarning urls={phishUrls} />;
}

export default definePlugin({
    name: "PhishGuard",
    description: "Detecta links de phishing e typosquatting no chat e exibe aviso visual",
    authors: [Devs.epy],
    dependencies: ["MessageDecorationsAPI"],

    start() {
        addMessageDecoration("kaido-phishguard", props => <PhishDecoration message={props.message} />);
    },

    stop() {
        removeMessageDecoration("kaido-phishguard");
    }
});
