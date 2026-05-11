/*
 * Kaidocord, a modification for Discord's desktop app
 * Copyright (c) 2026 Team KAIDO and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { Devs } from "@utils/constants";
import { sendMessage } from "@utils/discord";
import definePlugin from "@utils/types";
import { SelectedChannelStore, Toasts } from "@webpack/common";

const scheduled: Array<{ id: number; timeout: ReturnType<typeof setTimeout>; channelId: string; content: string; when: Date; }> = [];
let nextId = 1;

function scheduleMessage(channelId: string, content: string, delayMs: number, when: Date) {
    const id = nextId++;
    const timeout = setTimeout(async () => {
        await sendMessage(channelId, { content });
        const idx = scheduled.findIndex(s => s.id === id);
        if (idx !== -1) scheduled.splice(idx, 1);
        Toasts.show({ message: `Mensagem agendada enviada!`, type: Toasts.Type.SUCCESS, id: Toasts.genId() });
    }, delayMs);
    scheduled.push({ id, timeout, channelId, content, when });
    return id;
}

function parseDelay(spec: string): number | null {
    const m = spec.match(/^(\d+)(s|m|h)$/);
    if (!m) return null;
    const n = parseInt(m[1]);
    const unit = m[2];
    return n * (unit === "s" ? 1000 : unit === "m" ? 60000 : 3600000);
}

export default definePlugin({
    name: "MessageScheduler",
    description: "Agenda mensagens para envio futuro com /schedule",
    authors: [Devs.epy],

    commands: [
        {
            name: "schedule",
            description: "Agendar mensagem. Ex: /schedule 30m Boa noite!",
            options: [
                { name: "quando", description: "Delay: 30s, 5m, 2h", type: 3, required: true },
                { name: "mensagem", description: "Texto a enviar", type: 3, required: true }
            ],
            execute: (opts: any, ctx: any) => {
                const spec = opts[0].value as string;
                const content = opts[1].value as string;
                const channelId = ctx.channel.id;

                const delay = parseDelay(spec);
                if (!delay) {
                    Toasts.show({ message: "Formato inválido. Use: 30s, 5m, 2h", type: Toasts.Type.FAILURE, id: Toasts.genId() });
                    return { content: "" };
                }

                const when = new Date(Date.now() + delay);
                const id = scheduleMessage(channelId, content, delay, when);

                Toasts.show({
                    message: `Mensagem agendada para ${when.toLocaleTimeString("pt-BR")}`,
                    type: Toasts.Type.SUCCESS,
                    id: Toasts.genId()
                });

                return { content: "" };
            }
        },
        {
            name: "scheduled",
            description: "Listar mensagens agendadas",
            execute: () => {
                if (!scheduled.length) return { content: "Nenhuma mensagem agendada." };
                const list = scheduled.map(s =>
                    `**#${s.id}** — ${s.when.toLocaleTimeString("pt-BR")}: "${s.content.slice(0, 40)}..."`
                ).join("\n");
                return { content: `**Mensagens agendadas:**\n${list}` };
            }
        },
        {
            name: "unschedule",
            description: "Cancelar mensagem agendada pelo ID",
            options: [{ name: "id", description: "ID da mensagem", type: 4, required: true }],
            execute: (opts: any) => {
                const id = opts[0].value as number;
                const idx = scheduled.findIndex(s => s.id === id);
                if (idx === -1) {
                    Toasts.show({ message: `ID ${id} não encontrado`, type: Toasts.Type.FAILURE, id: Toasts.genId() });
                    return { content: "" };
                }
                clearTimeout(scheduled[idx].timeout);
                scheduled.splice(idx, 1);
                Toasts.show({ message: `Mensagem #${id} cancelada`, type: Toasts.Type.MESSAGE, id: Toasts.genId() });
                return { content: "" };
            }
        }
    ],

    stop() {
        for (const s of scheduled) clearTimeout(s.timeout);
        scheduled.length = 0;
    }
});
