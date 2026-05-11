/*
 * Kaidocord, a modification for Discord's desktop app
 * Copyright (c) 2026 Team KAIDO and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { Devs } from "@utils/constants";
import definePlugin from "@utils/types";

export default definePlugin({
    name: "CVELinker",
    description: "Transforma CVE-XXXX-XXXXX em links clicáveis para o NVD/Mitre",
    authors: [Devs.epy],

    patches: [{
        find: "parseToAST",
        replacement: {
            match: /(\i)\.parseToAST\((.+?)\)/,
            replace: "$1.parseToAST($self.preprocessCVE($2))"
        },
        noWarn: true
    }],

    preprocessCVE(content: string): string {
        if (typeof content !== "string") return content;
        // Transforma CVE-XXXX-NNNN em markdown link
        return content.replace(
            /\b(CVE-\d{4}-\d{4,})\b/gi,
            (match, cve) => `[${cve}](https://nvd.nist.gov/vuln/detail/${cve})`
        );
    }
});
