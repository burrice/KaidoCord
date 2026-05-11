/*
 * Kaidocord, a modification for Discord's desktop app
 * Copyright (c) 2026 Team KAIDO and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { Devs } from "@utils/constants";
import definePlugin from "@utils/types";

export default definePlugin({
    name: "TypingPrivacy",
    description: "Não mostra o indicador 'está digitando' para os outros",
    authors: [Devs.epy],

    patches: [{
        find: "startTyping",
        replacement: {
            match: /startTyping\((\i)\){/,
            replace: "startTyping($1){if(true)return;"
        },
        noWarn: true
    }]
});
