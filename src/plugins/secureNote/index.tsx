/*
 * Kaidocord, a modification for Discord's desktop app
 * Copyright (c) 2026 Team KAIDO and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { get, set } from "@api/DataStore";
import { Devs } from "@utils/constants";
import { openModal } from "@utils/modal";
import definePlugin from "@utils/types";
import { ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalRoot, ModalSize } from "@utils/modal";
import { Alerts, Forms, React, Text, TextInput, Toasts } from "@webpack/common";

const STORE_KEY = "KaidoSecureNotes";

async function deriveKey(password: string): Promise<CryptoKey> {
    const enc = new TextEncoder();
    const raw = await crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, ["deriveKey"]);
    return crypto.subtle.deriveKey(
        { name: "PBKDF2", salt: enc.encode("kaidocord-salt-v1"), iterations: 100000, hash: "SHA-256" },
        raw,
        { name: "AES-GCM", length: 256 },
        false,
        ["encrypt", "decrypt"]
    );
}

async function encrypt(text: string, password: string): Promise<string> {
    const key = await deriveKey(password);
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const enc = new TextEncoder();
    const ct = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, enc.encode(text));
    const combined = new Uint8Array(iv.length + ct.byteLength);
    combined.set(iv);
    combined.set(new Uint8Array(ct), iv.length);
    return btoa(String.fromCharCode(...combined));
}

async function decrypt(b64: string, password: string): Promise<string> {
    const key = await deriveKey(password);
    const combined = Uint8Array.from(atob(b64), c => c.charCodeAt(0));
    const iv = combined.slice(0, 12);
    const ct = combined.slice(12);
    const pt = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, ct);
    return new TextDecoder().decode(pt);
}

async function getNotes(): Promise<Record<string, string>> {
    return (await get(STORE_KEY)) ?? {};
}

function NoteModal({ modalProps }: { modalProps: any; }) {
    const [notes, setNotes] = React.useState<Record<string, string>>({});
    const [title, setTitle] = React.useState("");
    const [content, setContent] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [viewNote, setViewNote] = React.useState<string | null>(null);
    const [decrypted, setDecrypted] = React.useState<string | null>(null);

    React.useEffect(() => { getNotes().then(setNotes); }, []);

    const saveNote = async () => {
        if (!title || !content || !password) {
            Toasts.show({ message: "Preencha título, conteúdo e senha", type: Toasts.Type.FAILURE, id: Toasts.genId() });
            return;
        }
        const encrypted = await encrypt(content, password);
        const updated = { ...notes, [title]: encrypted };
        await set(STORE_KEY, updated);
        setNotes(updated);
        setTitle(""); setContent(""); setPassword("");
        Toasts.show({ message: "Nota salva com criptografia AES-256!", type: Toasts.Type.SUCCESS, id: Toasts.genId() });
    };

    const readNote = async (key: string) => {
        const pwd = prompt("Senha para descriptografar:");
        if (!pwd) return;
        try {
            const text = await decrypt(notes[key], pwd);
            setViewNote(key);
            setDecrypted(text);
        } catch {
            Toasts.show({ message: "Senha incorreta", type: Toasts.Type.FAILURE, id: Toasts.genId() });
        }
    };

    return (
        <ModalRoot {...modalProps} size={ModalSize.MEDIUM}>
            <ModalHeader>
                <Text variant="heading-lg/semibold">🔐 Notas Seguras (AES-256)</Text>
                <ModalCloseButton onClick={modalProps.onClose} />
            </ModalHeader>
            <ModalContent>
                <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
                    <Forms.FormTitle>Nova Nota</Forms.FormTitle>
                    <TextInput placeholder="Título" value={title} onChange={setTitle} />
                    <textarea
                        placeholder="Conteúdo da nota..."
                        value={content}
                        onChange={e => setContent(e.currentTarget.value)}
                        style={{ background: "var(--input-background)", border: "1px solid var(--input-border)", borderRadius: "4px", color: "var(--text-normal)", padding: "8px", resize: "vertical", minHeight: "80px", fontFamily: "inherit", fontSize: "14px" }}
                    />
                    <TextInput placeholder="Senha de criptografia" type="password" value={password} onChange={setPassword} />
                    <button onClick={saveNote} style={{ background: "#c41e3a", color: "white", border: "none", borderRadius: "4px", padding: "8px 16px", cursor: "pointer", fontWeight: 700 }}>
                        Salvar com AES-256
                    </button>

                    {Object.keys(notes).length > 0 && (
                        <>
                            <Forms.FormDivider />
                            <Forms.FormTitle>Notas Salvas</Forms.FormTitle>
                            {Object.keys(notes).map(key => (
                                <div key={key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px", background: "var(--background-secondary)", borderRadius: "4px" }}>
                                    <span style={{ fontWeight: 600 }}>🔒 {key}</span>
                                    <button onClick={() => readNote(key)} style={{ background: "transparent", border: "1px solid #555", borderRadius: "4px", color: "var(--text-normal)", padding: "4px 8px", cursor: "pointer" }}>
                                        Ler
                                    </button>
                                </div>
                            ))}
                            {viewNote && decrypted && (
                                <div style={{ background: "#111", border: "1px solid #c41e3a", borderRadius: "6px", padding: "12px", whiteSpace: "pre-wrap", fontFamily: "monospace", fontSize: "13px" }}>
                                    <strong style={{ color: "#ff4757" }}>{viewNote}</strong>
                                    <div style={{ marginTop: "8px", color: "#e0e0e0" }}>{decrypted}</div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </ModalContent>
        </ModalRoot>
    );
}

export default definePlugin({
    name: "SecureNote",
    description: "Notas criptografadas com AES-256-GCM armazenadas localmente no Discord",
    authors: [Devs.epy],

    commands: [{
        name: "notes",
        description: "Abrir gerenciador de notas seguras",
        execute: () => {
            openModal(props => <NoteModal modalProps={props} />);
            return { content: "" };
        }
    }]
});
