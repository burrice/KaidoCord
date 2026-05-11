/*
 * Kaidocord, a modification for Discord's desktop app
 * Copyright (c) 2026 Team KAIDO and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { Devs } from "@utils/constants";
import definePlugin from "@utils/types";

export default definePlugin({
    name: "AntiDetect",
    description: "Remove fingerprints que identificam client mods para maior privacidade",
    authors: [Devs.epy],

    patches: [
        // Remove Vencord/Kaidocord do Sentry e analytics
        {
            find: "\"vencord\"",
            replacement: {
                match: /"vencord"/g,
                replace: "\"discord\""
            },
            noWarn: true
        },
        // Bloqueia envio de analytics do Discord
        {
            find: "AnalyticsActionHandlers",
            replacement: {
                match: /\i\.default\.track\(/g,
                replace: "((/*blocked*/)=>({}))("
            },
            noWarn: true
        },
        // Remove source maps que expõem o mod
        {
            find: "//# sourceMappingURL",
            replacement: {
                match: /\/\/# sourceMappingURL=.+$/gm,
                replace: ""
            },
            noWarn: true
        }
    ],

    start() {
        // Patch do fetch para remover headers reveladores
        const originalFetch = window.fetch;
        window.fetch = function (input, init = {}) {
            if (init.headers) {
                const headers = new Headers(init.headers as HeadersInit);
                headers.delete("x-super-properties");
                init.headers = headers;
            }
            return originalFetch.call(this, input, init);
        };
    },

    stop() {
        // fetch não é restaurado intencionalmente — requer reload
    }
});
