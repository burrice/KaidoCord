/*
 * Kaidocord, a modification for Discord's desktop app
 * Copyright (c) 2026 Team KAIDO and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { addProfileBadge, BadgePosition, removeProfileBadge } from "@api/Badges";
import { Devs } from "@utils/constants";
import definePlugin from "@utils/types";
import { GuildMemberStore, React } from "@webpack/common";

// Servidor oficial do Team KAIDO — só membros deste servidor recebem o badge
const KAIDO_GUILD_ID = "1473938294768271364";

// IDs dos membros core com badge (owner + equipe)
const KAIDO_TEAM_IDS = new Set<bigint>([
    1098146574393163817n, // j6 (owner)
]);

function KaidoIcon() {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Hexágono estilizado — identidade visual Team KAIDO */}
            <polygon
                points="12,2 21,7 21,17 12,22 3,17 3,7"
                fill="#c41e3a"
                stroke="#ff4757"
                strokeWidth="1"
            />
            <text
                x="12"
                y="16"
                textAnchor="middle"
                fontSize="10"
                fontWeight="bold"
                fontFamily="monospace"
                fill="white"
            >
                K
            </text>
        </svg>
    );
}

function isKaidoMember(userId: string): boolean {
    // Verifica se o usuário é membro do servidor Team KAIDO
    const member = GuildMemberStore.getMember(KAIDO_GUILD_ID, userId);
    return member != null;
}

function isKaidoCore(userId: string): boolean {
    try {
        return KAIDO_TEAM_IDS.has(BigInt(userId));
    } catch {
        return false;
    }
}

const kaidoBadge = {
    id: "kaido-team",
    description: "Team KAIDO",
    position: BadgePosition.START,
    shouldShow: ({ userId }: { userId: string; }) => isKaidoMember(userId),
    getBadges: ({ userId }: { userId: string; }) => {
        const isCore = isKaidoCore(userId);
        return [{
            id: "kaido-member-badge",
            description: isCore ? "Team KAIDO — Core" : "Team KAIDO",
            component: () => (
                <div
                    title={isCore ? "Team KAIDO — Core" : "Team KAIDO"}
                    style={{ display: "inline-flex", alignItems: "center" }}
                >
                    <KaidoIcon />
                </div>
            )
        }];
    }
};

export default definePlugin({
    name: "KaidoBadges",
    description: "Exibe badge Team KAIDO para membros do servidor oficial",
    authors: [Devs.epy],
    dependencies: ["BadgeAPI"],

    start() {
        addProfileBadge(kaidoBadge as any);
    },

    stop() {
        removeProfileBadge(kaidoBadge as any);
    },
});
