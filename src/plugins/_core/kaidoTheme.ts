/*
 * Kaidocord, a modification for Discord's desktop app
 * Copyright (c) 2026 Team KAIDO and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { disableStyle, enableStyle } from "@api/Styles";
import { definePluginSettings } from "@api/Settings";
import { Devs } from "@utils/constants";
import definePlugin, { OptionType } from "@utils/types";

import darkTheme from "../../../themes/TeamKaido.theme.css?managed";
import comfyTheme from "../../../themes/KaidoComfy.theme.css?managed";

const settings = definePluginSettings({
    theme: {
        type: OptionType.SELECT,
        description: "Escolha o tema visual do KaidoCord",
        default: "none",
        options: [
            { label: "Padrão Discord — sem tema customizado", value: "none" },
            { label: "Kaido Dark — vermelho, red team aesthetic", value: "dark" },
            { label: "Kaido Comfy — glassmorphism, sakura", value: "comfy" },
        ],
        onChange() {
            applyTheme();
        }
    }
});

function applyTheme() {
    disableStyle(darkTheme);
    disableStyle(comfyTheme);

    if (settings.store.theme === "dark") {
        enableStyle(darkTheme);
    } else if (settings.store.theme === "comfy") {
        enableStyle(comfyTheme);
    }
    // "none" = tema padrão do Discord, nenhum CSS injetado
}

export default definePlugin({
    name: "KaidoTheme",
    description: "Tema padrão do KaidoCord — escolha entre Dark e Comfy nas configurações",
    authors: [Devs.epy],
    required: true,
    settings,

    start() {
        applyTheme();
    },

    stop() {
        disableStyle(darkTheme);
        disableStyle(comfyTheme);
    }
});
