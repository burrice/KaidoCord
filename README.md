<div align="center">

# KaidoCord

**O client mod do Discord mais avançado do Brasil.**  
Desenvolvido pelo **Team KAIDO** — privacidade, performance e plugins exclusivos.

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![GitHub Stars](https://img.shields.io/github/stars/burrice/KaidoCord?style=flat)](https://github.com/burrice/KaidoCord/stargazers)

</div>

---

## ✨ O que é o KaidoCord?

KaidoCord é um fork do [Vencord](https://github.com/Vendicated/Vencord) com foco em **privacidade**, **identidade Team KAIDO** e **plugins exclusivos**. Compatível com todos os plugins do Vencord + os nossos próprios.

---

## 📸 Screenshots

<div align="center">

### Painel Principal
![KaidoCord Settings](assets/screenshot-settings.png)

</div>

---

## 🔥 Plugins Exclusivos do Team KAIDO

| Plugin | Descrição |
|--------|-----------|
| **KaidoBadges** | Badge exclusivo nos perfis dos membros do Team KAIDO |
| **AntiDetect** | Remove fingerprints que identificam client mods |
| **ProfileStats** | Exibe idade da conta e data de criação nos perfis |
| **TokenInfo** | Informações detalhadas da sua conta no painel |
| **BulkDelete** | Deleta suas mensagens em massa em qualquer canal |
| **ServerSpy** | Estatísticas avançadas de qualquer servidor |
| **CustomStatus+** | Rotação automática de status com emojis e intervalos |

---

## 📦 Instalação

### Pré-requisitos
- [Node.js](https://nodejs.org/) >= 18
- [pnpm](https://pnpm.io/) >= 10
- Discord Desktop instalado

### Passo a passo

```bash
# 1. Clone o repositório
git clone https://github.com/burrice/KaidoCord.git
cd KaidoCord

# 2. Instale as dependências
pnpm install

# 3. Build
pnpm build

# 4. Injete no Discord
pnpm inject
```

> Para remover: `pnpm uninject`

### Desenvolvimento (hot reload)

```bash
pnpm watch
# Pressione Ctrl+R no Discord para recarregar
```

---

## 🛠️ Criar seu próprio plugin

```typescript
import { Devs } from "@utils/constants";
import definePlugin from "@utils/types";

export default definePlugin({
    name: "MeuPlugin",
    description: "Descrição do plugin",
    authors: [Devs.epy],
    start() { },
    stop() { }
});
```

---

## 👥 Team KAIDO

| Membro | Papel |
|--------|-------|
| **j6** | Owner |
| **null** | Core Dev |
| **cute** | Core Dev |
| **machiori** | Core Dev |
| **arc // Wired** | Red Team |

---

## 📄 Licença

KaidoCord é um fork do Vencord, licenciado sob [GPL-3.0](LICENSE).

<div align="center"><b>Feito pelo Team KAIDO</b></div>
