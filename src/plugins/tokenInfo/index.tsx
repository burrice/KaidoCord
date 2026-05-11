/*
 * Kaidocord, a modification for Discord's desktop app
 * Copyright (c) 2026 Team KAIDO and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { definePluginSettings } from "@api/Settings";
import { Flex } from "@components/Flex";
import { Devs } from "@utils/constants";
import definePlugin, { OptionType } from "@utils/types";
import { Alerts, Button, Forms, React, Toasts, UserStore } from "@webpack/common";

function copyToClipboard(text: string, label: string) {
    navigator.clipboard.writeText(text).then(() => {
        Toasts.show({
            message: `${label} copiado!`,
            type: Toasts.Type.SUCCESS,
            id: Toasts.genId()
        });
    });
}

function getAccountFlags(flags: number): string[] {
    const flagMap: Record<number, string> = {
        1: "Discord Employee",
        2: "Partnered Server Owner",
        4: "HypeSquad Events",
        8: "Bug Hunter Level 1",
        64: "HypeSquad Bravery",
        128: "HypeSquad Brilliance",
        256: "HypeSquad Balance",
        512: "Early Nitro Supporter",
        16384: "Bug Hunter Level 2",
        131072: "Verified Bot Developer",
        4194304: "Active Developer",
    };
    return Object.entries(flagMap)
        .filter(([bit]) => flags & Number(bit))
        .map(([, name]) => name);
}

function TokenInfoPanel() {
    const user = UserStore.getCurrentUser();
    if (!user) return null;

    const createdAt = (() => {
        const DISCORD_EPOCH = 1420070400000n;
        const id = BigInt(user.id);
        const ms = (id >> 22n) + DISCORD_EPOCH;
        return new Date(Number(ms)).toLocaleString("pt-BR");
    })();

    const activeFlags = getAccountFlags(user.publicFlags || 0);

    return (
        <div style={{ padding: "16px 0" }}>
            <Forms.FormTitle>Informações da Conta</Forms.FormTitle>
            <div style={{
                background: "var(--background-secondary)",
                borderRadius: "8px",
                padding: "12px",
                fontFamily: "monospace",
                fontSize: "13px",
                display: "flex",
                flexDirection: "column",
                gap: "8px"
            }}>
                {[
                    { label: "Username", value: user.username },
                    { label: "Display Name", value: user.globalName || user.username },
                    { label: "ID", value: user.id },
                    { label: "Conta criada em", value: createdAt },
                    { label: "Badges públicas", value: activeFlags.join(", ") || "Nenhuma" },
                ].map(({ label, value }) => (
                    <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px" }}>
                        <span style={{ color: "var(--text-muted)", minWidth: "140px" }}>{label}</span>
                        <span
                            style={{ color: "var(--text-normal)", cursor: "pointer", flex: 1 }}
                            onClick={() => copyToClipboard(value, label)}
                            title="Clique para copiar"
                        >
                            {value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

const settings = definePluginSettings({
    showInSettings: {
        type: OptionType.BOOLEAN,
        description: "Mostrar painel de informações no Kaidocord Settings",
        default: true,
        restartNeeded: false
    }
});

export default definePlugin({
    name: "TokenInfo",
    description: "Exibe informações detalhadas da sua conta no painel do Kaidocord",
    authors: [Devs.epy],
    settings,

    settingsAboutComponent: TokenInfoPanel
});
