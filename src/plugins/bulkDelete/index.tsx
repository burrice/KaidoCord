/*
 * Kaidocord, a modification for Discord's desktop app
 * Copyright (c) 2026 Team KAIDO and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { addContextMenuPatch, NavContextMenuPatchCallback, removeContextMenuPatch } from "@api/ContextMenu";
import { definePluginSettings } from "@api/Settings";
import { Devs } from "@utils/constants";
import definePlugin, { OptionType } from "@utils/types";
import { Alerts, Menu, MessageStore, React, RestAPI, Toasts, UserStore } from "@webpack/common";

let running = false;

async function bulkDeleteMessages(channelId: string, limit: number) {
    if (running) {
        Toasts.show({ message: "Já está rodando!", type: Toasts.Type.FAILURE, id: Toasts.genId() });
        return;
    }

    const me = UserStore.getCurrentUser();
    if (!me) return;

    running = true;
    let deleted = 0;
    let lastId: string | undefined;

    Toasts.show({ message: `Deletando até ${limit} mensagens...`, type: Toasts.Type.MESSAGE, id: "bulk-delete-start" });

    try {
        while (deleted < limit) {
            const params: Record<string, string> = { limit: "100" };
            if (lastId) params.before = lastId;

            const res = await RestAPI.get({ url: `/channels/${channelId}/messages`, query: params });
            const messages: any[] = res.body;
            if (!messages.length) break;

            const myMessages = messages.filter(m => m.author.id === me.id);
            if (!myMessages.length) {
                if (messages.length < 100) break;
                lastId = messages[messages.length - 1].id;
                continue;
            }

            for (const msg of myMessages) {
                if (!running || deleted >= limit) break;
                try {
                    await RestAPI.del({ url: `/channels/${channelId}/messages/${msg.id}` });
                    deleted++;
                    await new Promise(r => setTimeout(r, 350)); // anti rate-limit
                } catch {
                    await new Promise(r => setTimeout(r, 1500));
                }
            }

            lastId = messages[messages.length - 1].id;
        }
    } finally {
        running = false;
        Toasts.show({ message: `${deleted} mensagens deletadas!`, type: Toasts.Type.SUCCESS, id: Toasts.genId() });
    }
}

const channelCtxPatch: NavContextMenuPatchCallback = (children, { channel }) => {
    if (!channel) return;
    children.push(
        <Menu.MenuSeparator />,
        <Menu.MenuItem
            id="kaido-bulk-delete"
            label="🗑️ Deletar minhas mensagens"
            color="danger"
            action={() => {
                Alerts.show({
                    title: "Bulk Delete",
                    body: <div>
                        <p>Quantas mensagens deletar neste canal?</p>
                        <p style={{ color: "var(--text-danger)", fontSize: "12px" }}>
                            ⚠️ Apenas suas mensagens serão deletadas. Ação irreversível.
                        </p>
                    </div>,
                    confirmText: "Deletar 100",
                    cancelText: "Cancelar",
                    onConfirm: () => bulkDeleteMessages(channel.id, 100),
                    secondaryConfirmText: "Deletar 500",
                    onConfirmSecondary: () => bulkDeleteMessages(channel.id, 500)
                });
            }}
        />
    );
};

const settings = definePluginSettings({
    deleteDelay: {
        type: OptionType.SLIDER,
        description: "Delay entre deleções (ms) — mais alto = menos risco de ban",
        default: 350,
        markers: [200, 350, 500, 750, 1000],
    }
});

export default definePlugin({
    name: "BulkDelete",
    description: "Deleta suas mensagens em massa em qualquer canal (clique direito no canal)",
    authors: [Devs.epy],
    dependencies: ["ContextMenuAPI"],
    settings,

    start() {
        addContextMenuPatch("channel-context", channelCtxPatch);
        addContextMenuPatch("user-context", channelCtxPatch);
    },

    stop() {
        running = false;
        removeContextMenuPatch("channel-context", channelCtxPatch);
        removeContextMenuPatch("user-context", channelCtxPatch);
    }
});
