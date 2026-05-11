/*
 * Kaidocord, a modification for Discord's desktop app
 * Copyright (c) 2026 Team KAIDO and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { definePluginSettings } from "@api/Settings";
import { Devs } from "@utils/constants";
import definePlugin, { OptionType } from "@utils/types";
import { findByProps } from "@webpack";
import { Toasts } from "@webpack/common";

const settings = definePluginSettings({
    enabled: {
        type: OptionType.BOOLEAN,
        description: "Aparecer como offline enquanto usa o Discord normalmente",
        default: false,
        onChange(val: boolean) {
            applyGhostMode(val);
        }
    }
});

function applyGhostMode(active: boolean) {
    try {
        const PresenceModule = findByProps("setLocalPresence", "updateAsync");
        if (!PresenceModule) return;

        if (active) {
            PresenceModule.setLocalPresence({ status: "invisible", since: 0, activities: [], afk: false });
            Toasts.show({ message: "Ghost Mode ativado — você está invisível", type: Toasts.Type.SUCCESS, id: Toasts.genId() });
        } else {
            PresenceModule.setLocalPresence({ status: "online", since: 0, activities: [], afk: false });
            Toasts.show({ message: "Ghost Mode desativado", type: Toasts.Type.MESSAGE, id: Toasts.genId() });
        }
    } catch (e) {
        console.error("[GhostMode]", e);
    }
}

export default definePlugin({
    name: "GhostMode",
    description: "Aparece como offline (invisível) enquanto usa Discord normalmente",
    authors: [Devs.epy],
    settings,

    start() {
        if (settings.store.enabled) applyGhostMode(true);
    },

    stop() {
        applyGhostMode(false);
    }
});
