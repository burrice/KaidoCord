/*
 * Kaidocord, a modification for Discord's desktop app
 * Copyright (c) 2026 Team KAIDO and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { Devs } from "@utils/constants";
import definePlugin from "@utils/types";
import { React } from "@webpack/common";

function getAccountInfo(userId: string) {
    const DISCORD_EPOCH = 1420070400000n;
    const id = BigInt(userId);
    const ms = (id >> 22n) + DISCORD_EPOCH;
    const date = new Date(Number(ms));
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const years = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 365));
    const months = Math.floor((diffMs % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
    const days = Math.floor((diffMs % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
    const dateStr = date.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
    return { dateStr, years, months, days };
}

function AccountAgeRow({ userId }: { userId: string; }) {
    const { dateStr, years, months } = getAccountInfo(userId);
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            padding: "8px 16px",
            borderTop: "1px solid var(--background-modifier-accent)",
            marginTop: "4px",
        }}>
            <span style={{
                fontSize: "10px",
                fontWeight: 700,
                color: "var(--text-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: "4px",
            }}>
                Conta criada em
            </span>
            <span style={{
                fontSize: "14px",
                color: "var(--text-normal)",
                display: "flex",
                alignItems: "center",
                gap: "6px",
            }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, opacity: 0.7 }}>
                    <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                    <line x1="3" y1="9" x2="21" y2="9" stroke="currentColor" strokeWidth="2" />
                    <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                {dateStr}
                <span style={{ color: "var(--text-muted)", fontSize: "12px" }}>
                    ({years > 0 ? `${years}a ` : ""}{months}m)
                </span>
            </span>
        </div>
    );
}

export default definePlugin({
    name: "ProfileStats",
    description: "Exibe a data de criação da conta no popout de perfil, abaixo de 'Member Since'",
    authors: [Devs.epy],

    patches: [
        {
            // Injeta após a seção "Member Since" no popout de perfil
            find: "#{intl::USER_PROFILE_MEMBER_SINCE}",
            replacement: {
                match: /(\i\.userId)(.{0,200}#{intl::USER_PROFILE_MEMBER_SINCE}.{0,400}?\}\))/,
                replace: "$1$2,$self.renderAccountAge($1)"
            },
            noWarn: true
        }
    ],

    renderAccountAge(userId: string) {
        if (!userId) return null;
        return <AccountAgeRow userId={userId} />;
    }
});
