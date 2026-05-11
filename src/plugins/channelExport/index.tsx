/*
 * Kaidocord, a modification for Discord's desktop app
 * Copyright (c) 2026 Team KAIDO and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { addContextMenuPatch, NavContextMenuPatchCallback, removeContextMenuPatch } from "@api/ContextMenu";
import { Devs } from "@utils/constants";
import definePlugin from "@utils/types";
import { Alerts, Menu, React, RestAPI, Toasts } from "@webpack/common";

async function exportChannel(channelId: string, limit: number, format: "json" | "csv") {
    const messages: any[] = [];
    let lastId: string | undefined;
    Toasts.show({ message: `Exportando ${limit} mensagens...`, type: Toasts.Type.MESSAGE, id: "export-start" });

    while (messages.length < limit) {
        const params: Record<string, string> = { limit: "100" };
        if (lastId) params.before = lastId;

        const res = await RestAPI.get({ url: `/channels/${channelId}/messages`, query: params });
        const batch: any[] = res.body;
        if (!batch.length) break;

        messages.push(...batch);
        lastId = batch[batch.length - 1].id;
        if (batch.length < 100) break;
        await new Promise(r => setTimeout(r, 300));
    }

    const toExport = messages.slice(0, limit).reverse();

    let content: string;
    let filename: string;
    let mime: string;

    if (format === "json") {
        content = JSON.stringify(toExport.map(m => ({
            id: m.id,
            author: m.author.username,
            content: m.content,
            timestamp: m.timestamp,
            attachments: m.attachments?.map((a: any) => a.url) ?? []
        })), null, 2);
        filename = `channel-${channelId}-${Date.now()}.json`;
        mime = "application/json";
    } else {
        const rows = [["id", "author", "timestamp", "content"]];
        for (const m of toExport) {
            rows.push([m.id, m.author.username, m.timestamp, `"${(m.content ?? "").replace(/"/g, '""')}"`]);
        }
        content = rows.map(r => r.join(",")).join("\n");
        filename = `channel-${channelId}-${Date.now()}.csv`;
        mime = "text/csv";
    }

    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);

    Toasts.show({ message: `${toExport.length} mensagens exportadas!`, type: Toasts.Type.SUCCESS, id: Toasts.genId() });
}

const channelCtxPatch: NavContextMenuPatchCallback = (children, { channel }) => {
    if (!channel) return;
    children.push(
        <Menu.MenuSeparator />,
        <Menu.MenuItem id="kaido-export" label="📤 Exportar Canal">
            <Menu.MenuItem id="kaido-export-json-100" label="JSON — 100 msgs" action={() => exportChannel(channel.id, 100, "json")} />
            <Menu.MenuItem id="kaido-export-json-500" label="JSON — 500 msgs" action={() => exportChannel(channel.id, 500, "json")} />
            <Menu.MenuItem id="kaido-export-csv-100" label="CSV — 100 msgs" action={() => exportChannel(channel.id, 100, "csv")} />
            <Menu.MenuItem id="kaido-export-csv-500" label="CSV — 500 msgs" action={() => exportChannel(channel.id, 500, "csv")} />
        </Menu.MenuItem>
    );
};

export default definePlugin({
    name: "ChannelExport",
    description: "Exporta histórico de canal para JSON ou CSV (clique direito no canal)",
    authors: [Devs.epy],
    dependencies: ["ContextMenuAPI"],

    start() {
        addContextMenuPatch("channel-context", channelCtxPatch);
    },

    stop() {
        removeContextMenuPatch("channel-context", channelCtxPatch);
    }
});
