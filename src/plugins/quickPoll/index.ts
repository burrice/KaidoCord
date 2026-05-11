/*
 * Kaidocord, a modification for Discord's desktop app
 * Copyright (c) 2026 Team KAIDO and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { Devs } from "@utils/constants";
import definePlugin from "@utils/types";
import { Toasts } from "@webpack/common";

const REACTIONS = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"];

export default definePlugin({
    name: "QuickPoll",
    description: "Cria enquetes formatadas com /poll pergunta | op1 | op2 ...",
    authors: [Devs.epy],

    commands: [
        {
            name: "poll",
            description: "Criar uma enquete. Use '|' para separar a pergunta das opções",
            options: [{
                name: "conteudo",
                description: "Pergunta | Opção 1 | Opção 2 | ...",
                type: 3,
                required: true
            }],
            execute: (opts: any) => {
                const raw = opts[0].value as string;
                const parts = raw.split("|").map((s: string) => s.trim()).filter(Boolean);

                if (parts.length < 2) {
                    Toasts.show({ message: "Use: /poll Pergunta | Opção 1 | Opção 2", type: Toasts.Type.FAILURE, id: Toasts.genId() });
                    return { content: "" };
                }

                const question = parts[0];
                const options = parts.slice(1).slice(0, 10);

                const lines = [
                    `📊 **${question}**`,
                    "",
                    ...options.map((opt, i) => `${REACTIONS[i]} ${opt}`),
                    "",
                    `*Vote com as reações abaixo*`
                ];

                return { content: lines.join("\n") };
            }
        },
        {
            name: "yesno",
            description: "Criar enquete rápida de Sim/Não",
            options: [{
                name: "pergunta",
                description: "Pergunta da enquete",
                type: 3,
                required: true
            }],
            execute: (opts: any) => {
                const question = opts[0].value as string;
                return {
                    content: `📊 **${question}**\n\n✅ Sim\n❌ Não\n\n*Vote com as reações abaixo*`
                };
            }
        }
    ]
});
