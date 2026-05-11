/*
 * Kaidocord, a modification for Discord's desktop app
 * Copyright (c) 2026 Team KAIDO and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { Devs } from "@utils/constants";
import { openModal } from "@utils/modal";
import definePlugin from "@utils/types";
import { findByProps } from "@webpack";
import { ModalCloseButton, ModalContent, ModalHeader, ModalRoot, ModalSize } from "@utils/modal";
import { Forms, React, Text } from "@webpack/common";

interface WSEvent {
    ts: number;
    op: number;
    t?: string;
    d?: any;
}

const events: WSEvent[] = [];
const MAX_EVENTS = 200;
let patchedWS = false;

function patchWebSocket() {
    if (patchedWS) return;
    patchedWS = true;

    const OriginalWS = window.WebSocket;
    // @ts-ignore
    window.WebSocket = class PatchedWS extends OriginalWS {
        constructor(url: string, protocols?: string | string[]) {
            super(url, protocols);
            if (!url.includes("gateway")) return;

            this.addEventListener("message", (e: MessageEvent) => {
                try {
                    const data = JSON.parse(e.data);
                    if (data.op !== undefined) {
                        events.unshift({ ts: Date.now(), op: data.op, t: data.t, d: data.d });
                        if (events.length > MAX_EVENTS) events.pop();
                    }
                } catch { }
            });
        }
    };
}

const OP_NAMES: Record<number, string> = {
    0: "DISPATCH", 1: "HEARTBEAT", 2: "IDENTIFY", 3: "PRESENCE_UPDATE",
    4: "VOICE_STATE", 6: "RESUME", 7: "RECONNECT", 8: "REQUEST_MEMBERS",
    9: "INVALID_SESSION", 10: "HELLO", 11: "HEARTBEAT_ACK"
};

function EventRow({ event }: { event: WSEvent; }) {
    const time = new Date(event.ts).toLocaleTimeString("pt-BR");
    const opName = OP_NAMES[event.op] ?? `OP${event.op}`;
    const isDispatch = event.op === 0;

    return (
        <div style={{
            display: "flex",
            gap: "8px",
            padding: "4px 0",
            borderBottom: "1px solid var(--background-modifier-accent)",
            fontSize: "12px",
            fontFamily: "monospace",
            alignItems: "flex-start",
        }}>
            <span style={{ color: "var(--text-muted)", minWidth: "70px" }}>{time}</span>
            <span style={{
                minWidth: "120px",
                color: isDispatch ? "#00e676" : "#ff9800",
                fontWeight: 700
            }}>
                {opName}
            </span>
            <span style={{ color: "var(--text-muted)" }}>
                {event.t ?? ""}
            </span>
        </div>
    );
}

function MonitorModal({ modalProps }: { modalProps: any; }) {
    const [, forceUpdate] = React.useReducer(x => x + 1, 0);

    React.useEffect(() => {
        const interval = setInterval(forceUpdate, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <ModalRoot {...modalProps} size={ModalSize.LARGE}>
            <ModalHeader>
                <Text variant="heading-lg/semibold">📡 Network Monitor — WebSocket Gateway</Text>
                <ModalCloseButton onClick={modalProps.onClose} />
            </ModalHeader>
            <ModalContent>
                <div style={{ padding: "12px 16px" }}>
                    <Forms.FormText style={{ marginBottom: "8px", color: "var(--text-muted)" }}>
                        Últimos {events.length} eventos · Atualiza a cada 1s
                    </Forms.FormText>
                    <div style={{ maxHeight: "500px", overflowY: "auto" }}>
                        {events.length === 0
                            ? <Forms.FormText>Aguardando eventos WebSocket...</Forms.FormText>
                            : events.map((e, i) => <EventRow key={i} event={e} />)
                        }
                    </div>
                </div>
            </ModalContent>
        </ModalRoot>
    );
}

export default definePlugin({
    name: "NetworkMonitor",
    description: "Monitora eventos WebSocket do gateway Discord em tempo real",
    authors: [Devs.epy],

    start() {
        patchWebSocket();
    },

    stop() {
        events.length = 0;
    },

    commands: [{
        name: "netmon",
        description: "Abrir monitor de WebSocket do Discord",
        execute: () => {
            openModal(props => <MonitorModal modalProps={props} />);
            return { content: "" };
        }
    }]
});
