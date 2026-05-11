/*
 * Kaidocord, a modification for Discord's desktop app
 * Copyright (c) 2026 Team KAIDO and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { addMessageDecoration, removeMessageDecoration } from "@api/MessageDecorations";
import { Devs } from "@utils/constants";
import definePlugin from "@utils/types";
import { React } from "@webpack/common";

const SHORTENERS = [
    "bit.ly", "t.co", "tinyurl.com", "goo.gl", "ow.ly",
    "buff.ly", "dlvr.it", "ift.tt", "rb.gy", "cutt.ly"
];

const URL_RE = /https?:\/\/([a-z0-9.-]+)\/\S+/gi;

function detectShortened(content: string): string[] {
    const found: string[] = [];
    for (const match of content.matchAll(URL_RE)) {
        const domain = match[1].toLowerCase();
        if (SHORTENERS.some(s => domain.endsWith(s))) {
            found.push(match[0]);
        }
    }
    return [...new Set(found)];
}

function ExpandButton({ url }: { url: string; }) {
    const [expanded, setExpanded] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState(false);

    const expand = async () => {
        if (expanded) { setExpanded(null); return; }
        setLoading(true);
        try {
            // Usa um proxy público para resolver o redirect sem CORS
            const res = await fetch(`https://unshorten.me/s/${encodeURIComponent(url)}`);
            const text = await res.text();
            setExpanded(text.trim() || url);
        } catch {
            setExpanded("(erro ao expandir)");
        }
        setLoading(false);
    };

    return (
        <span style={{ display: "inline-flex", flexDirection: "column", gap: "2px", marginLeft: "4px" }}>
            <button
                onClick={expand}
                disabled={loading}
                title={`Expandir: ${url}`}
                style={{
                    background: "#1a1a1a",
                    border: "1px solid #444",
                    borderRadius: "4px",
                    color: "#aaa",
                    fontSize: "11px",
                    padding: "1px 6px",
                    cursor: "pointer",
                    fontFamily: "monospace",
                }}
            >
                {loading ? "..." : expanded ? "▲ URL" : "🔗 Expandir"}
            </button>
            {expanded && (
                <a
                    href={expanded}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                        fontSize: "11px",
                        color: "#00e676",
                        fontFamily: "monospace",
                        wordBreak: "break-all",
                        maxWidth: "350px",
                        display: "block",
                    }}
                >
                    {expanded.length > 80 ? expanded.slice(0, 80) + "…" : expanded}
                </a>
            )}
        </span>
    );
}

function ExpandDecoration({ message }: { message: any; }) {
    const shortened = detectShortened(message.content ?? "");
    if (!shortened.length) return null;
    return (
        <span>
            {shortened.map(url => <ExpandButton key={url} url={url} />)}
        </span>
    );
}

export default definePlugin({
    name: "URLExpander",
    description: "Expande URLs encurtadas (bit.ly, t.co, etc.) antes de você clicar",
    authors: [Devs.epy],
    dependencies: ["MessageDecorationsAPI"],

    start() {
        addMessageDecoration("kaido-urlexpander", props => <ExpandDecoration message={props.message} />);
    },

    stop() {
        removeMessageDecoration("kaido-urlexpander");
    }
});
