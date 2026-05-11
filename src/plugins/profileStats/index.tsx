/*
 * Kaidocord, a modification for Discord's desktop app
 * Copyright (c) 2026 Team KAIDO and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { addProfileBadge, BadgePosition, removeProfileBadge } from "@api/Badges";
import { Devs } from "@utils/constants";
import definePlugin from "@utils/types";
import { React } from "@webpack/common";

function getAccountAge(userId: string) {
    const DISCORD_EPOCH = 1420070400000n;
    const id = BigInt(userId);
    const ms = (id >> 22n) + DISCORD_EPOCH;
    const date = new Date(Number(ms));
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const years = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 365));
    const months = Math.floor((diffMs % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
    const dateStr = date.toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });
    return { label: dateStr, years, months };
}

function CalendarIcon() {
    return (
        <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: "inline-block", verticalAlign: "middle", marginRight: "4px" }}
        >
            <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
            <line x1="3" y1="9" x2="21" y2="9" stroke="currentColor" strokeWidth="2" />
            <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <rect x="7" y="13" width="3" height="3" rx="0.5" fill="currentColor" />
            <rect x="13" y="13" width="3" height="3" rx="0.5" fill="currentColor" />
        </svg>
    );
}

const statsBadge = {
    id: "kaido-profile-stats",
    description: "Idade da conta",
    position: BadgePosition.END,
    shouldShow: ({ userId }: { userId: string; }) => !!userId,
    getBadges: ({ userId }: { userId: string; }) => {
        const { label, years, months } = getAccountAge(userId);
        const tooltip = `Conta criada em: ${label} (${years}a ${months}m)`;
        return [{
            id: "kaido-account-age",
            description: tooltip,
            component: () => (
                <div
                    title={tooltip}
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        background: "var(--background-secondary)",
                        borderRadius: "4px",
                        padding: "2px 7px",
                        fontSize: "11px",
                        fontFamily: "var(--font-code)",
                        color: "var(--text-muted)",
                        gap: "2px",
                        cursor: "default",
                        userSelect: "none",
                        whiteSpace: "nowrap",
                    }}
                >
                    <CalendarIcon />
                    {label}
                </div>
            )
        }];
    }
};

export default definePlugin({
    name: "ProfileStats",
    description: "Exibe a data de criação da conta nos perfis com ícone SVG",
    authors: [Devs.epy],
    dependencies: ["BadgeAPI"],

    start() {
        addProfileBadge(statsBadge as any);
    },

    stop() {
        removeProfileBadge(statsBadge as any);
    }
});
