/*
 * Kaidocord, a modification for Discord's desktop app
 * Copyright (c) 2026 Team KAIDO and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { get, set } from "@api/DataStore";
import { definePluginSettings } from "@api/Settings";
import { Devs } from "@utils/constants";
import definePlugin, { OptionType } from "@utils/types";
import { findByProps } from "@webpack";
import { React, Toasts } from "@webpack/common";

const STORE_KEY = "KaidoTemplates";

async function getTemplates(): Promise<Record<string, string>> {
    return (await get(STORE_KEY)) ?? {};
}

async function saveTemplate(name: string, content: string) {
    const templates = await getTemplates();
    templates[name.toLowerCase()] = content;
    await set(STORE_KEY, templates);
}

async function deleteTemplate(name: string) {
    const templates = await getTemplates();
    delete templates[name.toLowerCase()];
    await set(STORE_KEY, templates);
}

async function useTemplate(name: string): Promise<string | null> {
    const templates = await getTemplates();
    return templates[name.toLowerCase()] ?? null;
}

export default definePlugin({
    name: "MessageTemplates",
    description: "Salva e reutiliza templates de mensagem com /t <nome>",
    authors: [Devs.epy],

    commands: [
        {
            name: "t",
            description: "Usar um template de mensagem",
            options: [{
                name: "nome",
                description: "Nome do template",
                type: 3, // STRING
                required: true
            }],
            execute: async (opts: any) => {
                const name = opts[0].value as string;
                const content = await useTemplate(name);
                if (!content) {
                    Toasts.show({ message: `Template "${name}" não encontrado`, type: Toasts.Type.FAILURE, id: Toasts.genId() });
                    return { content: "" };
                }
                return { content };
            }
        },
        {
            name: "tsave",
            description: "Salvar template de mensagem",
            options: [
                { name: "nome", description: "Nome do template", type: 3, required: true },
                { name: "conteudo", description: "Conteúdo do template", type: 3, required: true }
            ],
            execute: async (opts: any) => {
                const name = opts[0].value as string;
                const content = opts[1].value as string;
                await saveTemplate(name, content);
                Toasts.show({ message: `Template "${name}" salvo!`, type: Toasts.Type.SUCCESS, id: Toasts.genId() });
                return { content: "" };
            }
        },
        {
            name: "tlist",
            description: "Listar todos os templates salvos",
            execute: async () => {
                const templates = await getTemplates();
                const names = Object.keys(templates);
                if (!names.length) return { content: "Nenhum template salvo. Use `/tsave nome conteudo`." };
                return { content: `**Templates salvos:**\n${names.map(n => `\`/t ${n}\``).join(", ")}` };
            }
        },
        {
            name: "tdel",
            description: "Deletar um template",
            options: [{ name: "nome", description: "Nome do template", type: 3, required: true }],
            execute: async (opts: any) => {
                const name = opts[0].value as string;
                await deleteTemplate(name);
                Toasts.show({ message: `Template "${name}" removido`, type: Toasts.Type.MESSAGE, id: Toasts.genId() });
                return { content: "" };
            }
        }
    ]
});
