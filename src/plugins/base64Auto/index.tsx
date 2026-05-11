/*
 * Kaidocord, a modification for Discord's desktop app
 * Copyright (c) 2026 Team KAIDO and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { addMessageDecoration, removeMessageDecoration } from "@api/MessageDecorations";
import { Devs } from "@utils/constants";
import definePlugin from "@utils/types";
import { React, Toasts } from "@webpack/common";

const B64_RE = /\b([A-Za-z0-9+/]{20,}={0,2})\b/g;

function isLikelyBase64(s: string): boolean {
    if (s.length % 4 !== 0 && !s.endsWith("=")) return false;
    try {
        const dec = atob(s);
        // Deve ter pelo menos 50% de caracteres imprimíveis
        const printable = dec.split("").filter(c => c.charCodeAt(0) >= 32 && c.charCodeAt(0) < 127).length;
        return printable / dec.length > 0.5;
    } catch {
        return false;
    }
}

function detectBase64(content: string): string[] {
    const found: string[] = [];
    const seen = new Set<string>();
    for (const match of content.matchAll(B64_RE)) {
        const candidate = match[1];
        if (!seen.has(candidate) && isLikelyBase64(candidate)) {
            seen.add(candidate);
            found.push(candidate);
        }
    }
    return found.slice(0, 3); // max 3 por mensagem
}

function Base64Button({ encoded }: { encoded: string; }) {
    const [decoded, setDecoded] = React.useState<string | null>(null);

    const toggle = () => {
        if (decoded !== null) { setDecoded(null); return; }
        try { setDecoded(atob(encoded)); } catch { setDecoded("[erro ao decodificar]"); }
    };

    return (
        <span style={{ display: "inline-block", margin: "2px 0" }}>
            <button
                onClick={toggle}
                title={`Base64: ${encoded.slice(0, 40)}...`}
                style={{
                    background: "#1a1a1a",
                    border: "1px solid #444",
                    borderRadius: "4px",
                    color: "#aaa",
                    fontSize: "11px",
                    padding: "1px 6px",
                    cursor: "pointer",
                    fontFamily: "monospace",
                    marginLeft: "4px",
                }}
            >
                B64 {decoded !== null ? "▲" : "▼"}
            </button>
            {decoded !== null && (
                <span style={{
                    display: "block",
                    background: "#111",
                    border: "1px solid #333",
                    borderRadius: "4px",
                    padding: "4px 8px",
                    fontSize: "12px",
                    fontFamily: "monospace",
                    color: "#00e676",
                    marginTop: "2px",
                    wordBreak: "break-all",
                    maxWidth: "400px",
                }}>
                    {decoded}
                </span>
            )}
        </span>
    );
}

function Base64Decoration({ message }: { message: any; }) {
    const candidates = detectBase64(message.content ?? "");
    if (!candidates.length) return null;
    return (
        <span>
            {candidates.map(b64 => <Base64Button key={b64} encoded={b64} />)}
        </span>
    );
}

export default definePlugin({
    name: "Base64Auto",
    description: "Detecta strings Base64 em mensagens e adiciona botão para decodificar inline",
    authors: [Devs.epy],
    dependencies: ["MessageDecorationsAPI"],

    start() {
        addMessageDecoration("kaido-base64", props => <Base64Decoration message={props.message} />);
    },

    stop() {
        removeMessageDecoration("kaido-base64");
    }
});
