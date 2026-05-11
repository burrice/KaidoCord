/*
 * Kaidocord, a modification for Discord's desktop app
 * Copyright (c) 2026 Team KAIDO and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { addMessageDecoration, removeMessageDecoration } from "@api/MessageDecorations";
import { Devs } from "@utils/constants";
import definePlugin from "@utils/types";
import { React, Toasts } from "@webpack/common";

const HASH_PATTERNS = [
    { name: "MD5",    regex: /\b([a-fA-F0-9]{32})\b/g },
    { name: "SHA1",   regex: /\b([a-fA-F0-9]{40})\b/g },
    { name: "SHA256", regex: /\b([a-fA-F0-9]{64})\b/g },
    { name: "SHA512", regex: /\b([a-fA-F0-9]{128})\b/g },
];

function detectHashes(content: string) {
    const found: Array<{ hash: string; type: string; }> = [];
    const seen = new Set<string>();
    for (const { name, regex } of HASH_PATTERNS) {
        for (const match of content.matchAll(regex)) {
            const hash = match[1];
            if (!seen.has(hash)) {
                seen.add(hash);
                found.push({ hash, type: name });
            }
        }
    }
    return found;
}

function HashBadge({ hash, type }: { hash: string; type: string; }) {
    return (
        <a
            href={`https://www.virustotal.com/gui/search/${hash}`}
            target="_blank"
            rel="noreferrer"
            title={`${type}: ${hash}\nAbrir no VirusTotal`}
            style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                background: "#1a1a1a",
                border: "1px solid #c41e3a",
                borderRadius: "4px",
                padding: "1px 6px",
                fontSize: "11px",
                color: "#ff4757",
                fontFamily: "monospace",
                marginLeft: "4px",
                textDecoration: "none",
                cursor: "pointer",
            }}
        >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
            </svg>
            {type} → VT
        </a>
    );
}

function HashDecoration({ message }: { message: any; }) {
    const hashes = detectHashes(message.content ?? "");
    if (!hashes.length) return null;
    return (
        <span style={{ display: "inline-flex", flexWrap: "wrap", gap: "2px", marginLeft: "4px" }}>
            {hashes.map(({ hash, type }) => (
                <HashBadge key={hash} hash={hash} type={type} />
            ))}
        </span>
    );
}

export default definePlugin({
    name: "HashScan",
    description: "Detecta hashes MD5/SHA em mensagens e cria link direto para VirusTotal",
    authors: [Devs.epy],
    dependencies: ["MessageDecorationsAPI"],

    start() {
        addMessageDecoration("kaido-hashscan", props => <HashDecoration message={props.message} />);
    },

    stop() {
        removeMessageDecoration("kaido-hashscan");
    }
});
