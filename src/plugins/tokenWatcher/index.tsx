/*
 * Kaidocord, a modification for Discord's desktop app
 * Copyright (c) 2026 Team KAIDO and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { addMessagePreSendListener, removeMessagePreSendListener } from "@api/MessageEvents";
import { Devs } from "@utils/constants";
import definePlugin from "@utils/types";
import { Alerts, React } from "@webpack/common";

// Padrão de token Discord: header.payload.signature (base64url)
const TOKEN_RE = /[MN][A-Za-z\d_-]{23,25}\.[A-Za-z\d_-]{6}\.[A-Za-z\d_-]{27,40}/g;

function redactTokens(content: string): string {
    return content.replace(TOKEN_RE, match => {
        const parts = match.split(".");
        return `${parts[0]}.[REDACTED].[REDACTED]`;
    });
}

export default definePlugin({
    name: "TokenWatcher",
    description: "Detecta e redige tokens Discord colados acidentalmente antes do envio",
    authors: [Devs.epy],
    dependencies: ["MessageEventsAPI"],

    preSendListener: null as any,

    start() {
        this.preSendListener = (channelId: string, message: any) => {
            const content = message.content ?? "";
            const tokens = content.match(TOKEN_RE);
            if (!tokens?.length) return;

            return new Promise<{ cancel: boolean; }>(resolve => {
                Alerts.show({
                    title: "⚠️ Token Detectado!",
                    body: (
                        <div>
                            <p style={{ color: "#ff4757" }}>
                                Sua mensagem contém o que parece ser um <b>token Discord</b>.
                            </p>
                            <p>Enviar tokens expõe sua conta. Deseja redigir automaticamente?</p>
                        </div>
                    ) as any,
                    confirmText: "Redigir e enviar",
                    cancelText: "Cancelar envio",
                    secondaryConfirmText: "Enviar assim mesmo",
                    onConfirm: () => {
                        message.content = redactTokens(content);
                        resolve({ cancel: false });
                    },
                    onCancel: () => resolve({ cancel: true }),
                    onConfirmSecondary: () => resolve({ cancel: false }),
                });
            });
        };

        addMessagePreSendListener(this.preSendListener);
    },

    stop() {
        if (this.preSendListener) {
            removeMessagePreSendListener(this.preSendListener);
        }
    }
});
