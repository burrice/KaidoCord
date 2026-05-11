/*
 * Kaidocord, a modification for Discord's desktop app
 * Copyright (c) 2026 Team KAIDO and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { disableStyle, enableStyle } from "@api/Styles";
import { Devs } from "@utils/constants";
import definePlugin from "@utils/types";

import kaidoThemeCss from "../../../themes/TeamKaido.theme.css?managed";

export default definePlugin({
    name: "KaidoTheme",
    description: "Tema padrão do KaidoCord — estética Team KAIDO",
    authors: [Devs.epy],
    required: true,

    start() {
        enableStyle(kaidoThemeCss);
    },

    stop() {
        disableStyle(kaidoThemeCss);
    }
});
