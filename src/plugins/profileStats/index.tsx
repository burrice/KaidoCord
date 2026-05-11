/*
 * Kaidocord, a modification for Discord's desktop app
 * Copyright (c) 2026 Team KAIDO and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { addProfileBadge, BadgePosition, removeProfileBadge } from "@api/Badges";
import { Devs } from "@utils/constants";
import definePlugin from "@utils/types";
import { React } from "@webpack/common";

function getAccountAge(userId: string): string {
    // Discord epoch: 2015-01-01T00:00:00.000Z = 1420070400000
    const DISCORD_EPOCH = 1420070400000n;
    const id = BigInt(userId);
    const ms = (id >> 22n) + DISCORD_EPOCH;
    const date = new Date(Number(ms));
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const years = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 365));
    const months = Math.floor((diffMs % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
    const dateStr = date.toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });
    return `${dateStr} (${years}a ${months}m)`;
}

const statsBadge = {
    id: "kaido-profile-stats",
    description: "Ver idade da conta",
    position: BadgePosition.END,
    shouldShow: ({ userId }: { userId: string; }) => !!userId,
    getBadges: ({ userId }: { userId: string; }) => [{
        id: "kaido-account-age",
        description: `Conta criada: ${getAccountAge(userId)}`,
        component: ({ userId: uid }: { userId: string; }) => (
            <span
                style={{
                    fontSize: "10px",
                    color: "var(--text-muted)",
                    background: "var(--background-secondary)",
                    borderRadius: "4px",
                    padding: "2px 6px",
                    fontFamily: "monospace",
                    whiteSpace: "nowrap"
                }}
                title={`Conta criada: ${getAccountAge(uid)}`}
            >
                🕐 {getAccountAge(uid)}
            </span>
        )
    }]
};

export default definePlugin({
    name: "ProfileStats",
    description: "Exibe a idade da conta e data de criação nos perfis",
    authors: [Devs.epy],
    dependencies: ["BadgeAPI"],

    start() {
        addProfileBadge(statsBadge as any);
    },

    stop() {
        removeProfileBadge(statsBadge as any);
    }
});
