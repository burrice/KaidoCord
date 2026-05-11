/*
 * Kaidocord, a modification for Discord's desktop app
 * Copyright (c) 2026 Team KAIDO and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { addContextMenuPatch, NavContextMenuPatchCallback, removeContextMenuPatch } from "@api/ContextMenu";
import { Devs } from "@utils/constants";
import { openModal } from "@utils/modal";
import definePlugin from "@utils/types";
import { ModalCloseButton, ModalContent, ModalHeader, ModalRoot, ModalSize } from "@utils/modal";
import { Forms, Menu, React, Text, Toasts } from "@webpack/common";

const IP_RE = /\b(\d{1,3}\.){3}\d{1,3}\b/;

async function lookupIP(ip: string) {
    const res = await fetch(`http://ip-api.com/json/${ip}?fields=status,country,regionName,city,isp,org,as,query`);
    if (!res.ok) throw new Error("API offline");
    return res.json();
}

function IPModal({ ip, modalProps }: { ip: string; modalProps: any; }) {
    const [data, setData] = React.useState<any>(null);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        lookupIP(ip)
            .then(setData)
            .catch(e => setError(e.message));
    }, [ip]);

    const rows = data ? [
        ["IP", data.query],
        ["País", data.country],
        ["Região", data.regionName],
        ["Cidade", data.city],
        ["ISP", data.isp],
        ["Organização", data.org],
        ["ASN", data.as],
    ] : [];

    return (
        <ModalRoot {...modalProps} size={ModalSize.SMALL}>
            <ModalHeader>
                <Text variant="heading-lg/semibold">🌍 IP Lookup — {ip}</Text>
                <ModalCloseButton onClick={modalProps.onClose} />
            </ModalHeader>
            <ModalContent>
                <div style={{ padding: "16px" }}>
                    {error && <Forms.FormText style={{ color: "var(--text-danger)" }}>Erro: {error}</Forms.FormText>}
                    {!data && !error && <Forms.FormText>Consultando...</Forms.FormText>}
                    {rows.map(([label, value]) => (
                        <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid var(--background-modifier-accent)" }}>
                            <Forms.FormText style={{ color: "var(--text-muted)" }}>{label}</Forms.FormText>
                            <Forms.FormText style={{ fontWeight: 600 }}>{value || "—"}</Forms.FormText>
                        </div>
                    ))}
                </div>
            </ModalContent>
        </ModalRoot>
    );
}

const msgCtxPatch: NavContextMenuPatchCallback = (children, { message }) => {
    if (!message?.content) return;
    const match = message.content.match(IP_RE);
    if (!match) return;
    const ip = match[0];
    children.push(
        <Menu.MenuSeparator />,
        <Menu.MenuItem
            id="kaido-ipgeo"
            label={`🌍 Lookup IP: ${ip}`}
            action={() => openModal(props => <IPModal ip={ip} modalProps={props} />)}
        />
    );
};

export default definePlugin({
    name: "IPGeo",
    description: "Detecta IPs em mensagens e exibe geolocalização/ASN (clique direito na mensagem)",
    authors: [Devs.epy],
    dependencies: ["ContextMenuAPI"],

    start() {
        addContextMenuPatch("message", msgCtxPatch);
    },

    stop() {
        removeContextMenuPatch("message", msgCtxPatch);
    }
});
