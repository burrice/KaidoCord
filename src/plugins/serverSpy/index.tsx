/*
 * Kaidocord, a modification for Discord's desktop app
 * Copyright (c) 2026 Team KAIDO and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { addContextMenuPatch, NavContextMenuPatchCallback, removeContextMenuPatch } from "@api/ContextMenu";
import { Devs } from "@utils/constants";
import { ModalCloseButton, ModalContent, ModalHeader, ModalRoot, ModalSize, openModal } from "@utils/modal";
import definePlugin from "@utils/types";
import { Forms, GuildMemberStore, GuildStore, Menu, PresenceStore, React, Text } from "@webpack/common";

function getGuildAge(guildId: string): string {
    const DISCORD_EPOCH = 1420070400000n;
    const id = BigInt(guildId);
    const ms = (id >> 22n) + DISCORD_EPOCH;
    return new Date(Number(ms)).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
}

function ServerStatsModal({ guildId, modalProps }: { guildId: string; modalProps: any; }) {
    const guild = GuildStore.getGuild(guildId);
    if (!guild) return null;

    const memberCount = GuildMemberStore.getMemberCount(guildId);
    const onlineCount = PresenceStore.getState()?.guilds?.[guildId]
        ? Object.values(PresenceStore.getState().guilds[guildId]).filter((s: any) => s !== "offline").length
        : "?";

    const created = getGuildAge(guildId);
    const boostLevel = guild.premiumTier ?? 0;
    const boostCount = guild.premiumSubscriptionCount ?? 0;

    const rows = [
        ["ID do Servidor", guild.id],
        ["Criado em", created],
        ["Membros totais", memberCount?.toString() ?? "?"],
        ["Online agora", onlineCount.toString()],
        ["Boost Level", `Nível ${boostLevel} (${boostCount} boosts)`],
        ["Dono", guild.ownerId],
        ["Verificação", ["Nenhuma", "Baixa", "Média", "Alta", "Altíssima"][guild.verificationLevel] ?? "?"],
        ["Canais de texto", guild.channels ? Object.values(guild.channels).filter((c: any) => c.type === 0).length.toString() : "?"],
        ["Região", guild.preferredLocale ?? "?"],
    ];

    return (
        <ModalRoot {...modalProps} size={ModalSize.MEDIUM}>
            <ModalHeader>
                <Text variant="heading-lg/semibold">
                    🔍 {guild.name}
                </Text>
                <ModalCloseButton onClick={modalProps.onClose} />
            </ModalHeader>
            <ModalContent>
                <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
                    {rows.map(([label, value]) => (
                        <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid var(--background-modifier-accent)" }}>
                            <Forms.FormText style={{ color: "var(--text-muted)" }}>{label}</Forms.FormText>
                            <Forms.FormText style={{ fontWeight: 600 }}>{value}</Forms.FormText>
                        </div>
                    ))}
                </div>
            </ModalContent>
        </ModalRoot>
    );
}

const guildCtxPatch: NavContextMenuPatchCallback = (children, { guild }) => {
    if (!guild) return;
    children.push(
        <Menu.MenuSeparator />,
        <Menu.MenuItem
            id="kaido-server-spy"
            label="🔍 Server Stats"
            action={() => openModal(props => <ServerStatsModal guildId={guild.id} modalProps={props} />)}
        />
    );
};

export default definePlugin({
    name: "ServerSpy",
    description: "Exibe estatísticas detalhadas de qualquer servidor (clique direito no servidor)",
    authors: [Devs.epy],
    dependencies: ["ContextMenuAPI"],

    start() {
        addContextMenuPatch("guild-context", guildCtxPatch);
    },

    stop() {
        removeContextMenuPatch("guild-context", guildCtxPatch);
    }
});
