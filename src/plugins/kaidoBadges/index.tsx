/*
 * Kaidocord, a modification for Discord's desktop app
 * Copyright (c) 2026 Team KAIDO and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { addProfileBadge, BadgePosition, removeProfileBadge } from "@api/Badges";
import { Devs } from "@utils/constants";
import definePlugin from "@utils/types";

// IDs dos membros do Team KAIDO com badge ativo
const KAIDO_TEAM_IDS = new Set<bigint>([
    1098146574393163817n, // j6 (owner)
    // adicione mais IDs aqui conforme o time crescer
]);

const kaidoBadge = {
    id: "kaido-team",
    description: "Team KAIDO",
    position: BadgePosition.START,
    shouldShow: ({ userId }: { userId: string; }) => {
        return KAIDO_TEAM_IDS.has(BigInt(userId));
    },
    component: ({ userId }: { userId: string; }) => (
        <img
            src="https://raw.githubusercontent.com/teamkaido/kaidocord/main/assets/kaido-badge.png"
            alt="Team KAIDO"
            title="Team KAIDO"
            style={{
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                objectFit: "cover",
            }}
            onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                // fallback para emoji se imagem não carregar
                (e.target as HTMLImageElement).style.display = "none";
            }}
        />
    ),
};

export default definePlugin({
    name: "KaidoBadges",
    description: "Exibe o badge do Team KAIDO nos perfis dos membros",
    authors: [Devs.arc],
    dependencies: ["BadgeAPI"],

    start() {
        addProfileBadge(kaidoBadge);
    },

    stop() {
        removeProfileBadge(kaidoBadge);
    },
});
