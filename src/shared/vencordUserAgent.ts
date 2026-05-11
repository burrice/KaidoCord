/*
 * Kaidocord, a Discord client mod
 * Copyright (c) 2026 Team KAIDO and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import gitHash from "~git-hash";
import gitRemote from "~git-remote";

export { gitHash, gitRemote };

export const VENCORD_USER_AGENT = `Kaidocord/${gitHash}${gitRemote ? ` (https://github.com/${gitRemote})` : ""}`;
