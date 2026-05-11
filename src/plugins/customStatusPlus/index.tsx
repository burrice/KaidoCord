/*
 * Kaidocord, a modification for Discord's desktop app
 * Copyright (c) 2026 Team KAIDO and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { definePluginSettings } from "@api/Settings";
import { Devs } from "@utils/constants";
import definePlugin, { OptionType } from "@utils/types";
import { findByProps } from "@webpack";
import { React, Toasts } from "@webpack/common";

let rotationInterval: ReturnType<typeof setInterval> | null = null;
let currentIndex = 0;

function setStatus(text: string, emoji?: string) {
    const StatusModule = findByProps("setCustomStatus", "clearCustomStatus");
    if (!StatusModule) return;

    if (!text) {
        StatusModule.clearCustomStatus();
        return;
    }

    StatusModule.setCustomStatus({
        text,
        expiresAtMs: "0",
        emoji: emoji ? { name: emoji } : undefined
    });
}

function parseStatusList(raw: string): Array<{ text: string; emoji?: string; }> {
    return raw.split("\n")
        .map(line => line.trim())
        .filter(Boolean)
        .map(line => {
            // formato: "emoji texto" ou só "texto"
            const match = line.match(/^(\p{Emoji_Presentation}|\p{Emoji}️?)\s+(.+)$/u);
            if (match) return { emoji: match[1], text: match[2] };
            return { text: line };
        });
}

const settings = definePluginSettings({
    enabled: {
        type: OptionType.BOOLEAN,
        description: "Ativar rotação automática de status",
        default: false,
        onChange: (val: boolean) => {
            if (!val) stopRotation();
        }
    },
    statusList: {
        type: OptionType.STRING,
        description: "Lista de status (um por linha). Prefixe com emoji: '🔥 Estudando'",
        default: "💻 Kaidocord\n🎮 Gaming\n☕ AFK",
    },
    intervalSeconds: {
        type: OptionType.SLIDER,
        description: "Intervalo entre cada status (segundos)",
        default: 60,
        markers: [30, 60, 120, 300, 600],
    },
    randomOrder: {
        type: OptionType.BOOLEAN,
        description: "Ordem aleatória ao invés de sequencial",
        default: false,
    }
});

function startRotation() {
    stopRotation();
    const statuses = parseStatusList(settings.store.statusList);
    if (!statuses.length) return;

    currentIndex = 0;
    const tick = () => {
        if (!settings.store.enabled) { stopRotation(); return; }
        const list = parseStatusList(settings.store.statusList);
        if (!list.length) return;

        const idx = settings.store.randomOrder
            ? Math.floor(Math.random() * list.length)
            : currentIndex % list.length;

        const status = list[idx];
        setStatus(status.text, status.emoji);
        currentIndex = (currentIndex + 1) % list.length;
    };

    tick();
    rotationInterval = setInterval(tick, (settings.store.intervalSeconds || 60) * 1000);
    Toasts.show({ message: "Status rotativo ativado!", type: Toasts.Type.SUCCESS, id: Toasts.genId() });
}

function stopRotation() {
    if (rotationInterval) {
        clearInterval(rotationInterval);
        rotationInterval = null;
    }
}

export default definePlugin({
    name: "CustomStatus+",
    description: "Rotação automática de status customizados com emojis e intervalos configuráveis",
    authors: [Devs.epy],
    settings,

    start() {
        if (settings.store.enabled) startRotation();

        // Listener para ativar/desativar via settings
        settings.store;
    },

    stop() {
        stopRotation();
    },

    settingsAboutComponent: () => (
        <div style={{ marginTop: "8px" }}>
            <button
                onClick={startRotation}
                style={{
                    background: "var(--button-positive-background)",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    padding: "8px 16px",
                    cursor: "pointer",
                    marginRight: "8px"
                }}
            >
                ▶ Iniciar rotação
            </button>
            <button
                onClick={stopRotation}
                style={{
                    background: "var(--button-danger-background)",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    padding: "8px 16px",
                    cursor: "pointer"
                }}
            >
                ■ Parar
            </button>
        </div>
    )
});
