# Kaidocord

<!-- AUTO-MANAGED: project-description -->
Discord client modification by Team KAIDO, forked from Vencord. GPL-3.0-or-later.
- Repo: github.com/burrice/KaidoCord
- Team: epy (CEO), null, cute, machiori, arc // Wired
- Upstream Vencord plugins are retained for compatibility; KAIDO-specific plugins live in `src/plugins/`
<!-- END AUTO-MANAGED -->

<!-- AUTO-MANAGED: build-commands -->
## Build Commands

- `pnpm build` — build desktop Electron app (cjs, node target via esbuild)
- `pnpm buildStandalone` — standalone build (no platform-specific optimizations)
- `pnpm buildWeb` — build browser/web extension variant
- `pnpm buildWebStandalone` — standalone web build
- `pnpm buildReporter` — reporter build (web standalone, skip extension)
- `pnpm buildReporterDesktop` — reporter build (desktop)
- `pnpm watch` / `pnpm dev` — incremental watch build
- `pnpm watchWeb` — incremental web watch build
- `pnpm inject` — inject Kaidocord into Discord installation
- `pnpm uninject` — remove injection
- `pnpm generatePluginJson` — regenerate plugin list JSON
- `pnpm generateTypes` — emit declaration files to `packages/vencord-types`
- `pnpm lint` — ESLint; `pnpm lint:fix` — auto-fix
- `pnpm lint-styles` — Stylelint for `src/**/*.css`
- `pnpm test` — full check: buildStandalone + testTsc + lint + lint-styles + generatePluginJson
- `pnpm testWeb` — lint + buildWeb + testTsc
- `pnpm testTsc` — type-check only (no emit)
- Package manager: pnpm@10.4.1 — Node >= 18 required
<!-- END AUTO-MANAGED -->

<!-- AUTO-MANAGED: architecture -->
## Architecture

```
src/
  Vencord.ts                  # Main entry point (init, plugin manager, update checker); syncSettings() cloud pull notification body is EN (not yet rebranded)
  utils/constants.ts          # Global IDs, Devs registry, platform flags (IS_WINDOWS/IS_MAC/IS_LINUX/IS_MOBILE)
  shared/vencordUserAgent.ts  # VENCORD_USER_AGENT string using ~git-hash / ~git-remote virtuals
  api/SettingsSync/
    offline.ts                # importSettings / exportSettings / downloadSettingsBackup / uploadSettingsBackup; isSafeObject() blocks __proto__/constructor/prototype injection
  plugins/
    _core/                    # Core plugins (settings, supportHelper, etc.) — upstream Vencord
    antiDetect/               # KAIDO plugin: removes client-mod fingerprints (Sentry, analytics, fetch headers)
    bulkDelete/               # KAIDO plugin: mass-delete own messages via channel-context and user-context menus
    crashHandler/             # Upstream plugin; KAIDO rebrand: maybePromptToUpdate string is PT-BR only
    customStatusPlus/         # KAIDO plugin: rotating custom status with emoji support and configurable interval
    gameActivityToggle/       # Upstream plugin; partial rebrand: location option label "Kaidocord Toolbox"
    kaidoBadges/              # KAIDO plugin: BadgePosition.START badge for guild members (shouldShow) + core team (getBadges); KAIDO_GUILD_ID "1473938294768271364" hardcoded locally; inline SVG KaidoIcon
    profileStats/             # KAIDO plugin: account-age badge (BadgePosition.END) via getBadges() array shape; inline SVG CalendarIcon
    serverSpy/                # KAIDO plugin: guild stats modal via guild context menu; menu item label "🔍 Server Stats" (EN, not yet rebranded)
    tokenInfo/                # KAIDO plugin: account info panel in settings via settingsAboutComponent; click-to-copy fields
  components/settings/tabs/vencord/  # Settings UI tab — main component: KaidocordSettings
scripts/build/
  common.mjs                  # Shared build config: VERSION, gitHash, IS_DEV, IS_STANDALONE flags; jsxFactory=VencordCreateElement, jsxFragment=VencordFragment
  build.mjs                   # Desktop build entry; defines compile-time constants per build config
themes/
  TeamKaido.theme.css         # Hacker/red-team dark theme; --kaido-red #c41e3a accent; monospace font stack; hides Nitro/boost ads
```

**Compile-time constants** (injected by esbuild via `defines` in `build.mjs`):
- Shared via `stringifyValues`: `IS_STANDALONE`, `IS_DEV`, `IS_REPORTER`, `IS_ANTI_CRASH_TEST`, `IS_UPDATER_DISABLED`, `IS_WEB`, `IS_EXTENSION`, `IS_USERSCRIPT`, `VERSION`, `BUILD_TIMESTAMP`
- Per-build-config (NOT via `stringifyValues`): `IS_DISCORD_DESKTOP`, `IS_VESKTOP` — set directly in each build config block
- `gitHash` overridable via `VENCORD_HASH` env var; falls back to `git rev-parse --short HEAD`
- `gitRemote` overridable via `VENCORD_REMOTE` env var; falls back to `git remote get-url origin`

**Virtual modules**: `~plugins`, `~pluginNatives`, `~git-hash`, `~git-remote`
- `~pluginNatives` — auto-glob `native.ts` / `native/index.ts` from `src/plugins/` and `src/userplugins/` only (NOT `_api`/`_core`)
- `globPlugins` scans dirs in order: `plugins/_api`, `plugins/_core`, `plugins`, `userplugins`; files/dirs starting with `_` or `.` are skipped

**Build outputs** (`dist/`):
- Discord Desktop: `patcher.js` (sourceURL: `KaidocordPatcher`), `renderer.js` (sourceURL: `KaidocordRenderer`), `preload.js` (sourceURL: `KaidocordPreload`)
- Vesktop: `vencordDesktopMain.js` (sourceURL: `KaidocordDesktopMain`), `vencordDesktopRenderer.js` (sourceURL: `VencordDesktopRenderer` — not yet rebranded), `vencordDesktopPreload.js` (sourceURL: `KaidocordPreload`)

**Pending rebrands** in upstream-derived files (do not accidentally fix without full audit):
- `settings.tsx`: sidebar section header `"Vencord Settings"`, Updater `panelTitle: "Vencord Updater"`, plugin option descriptions `"Where to put the Vencord settings section"` and `"Also copy Vencord info (Vencord, Electron, Chromium)"`
- `supportHelper.tsx`: `renderContributorDmWarningCard` and `CHANNEL_SELECT` alert bodies reference "Vencord plugin developers", Vencord guild/channel URLs, and "externally updated Vencord" / "custom build of Vencord"; `renderMessageAccessory` detects `"/vencord-debug"` and `"/vencord-plugins"` message strings and renders `"Run /vencord-debug"` / `"Run /vencord-plugins"` button labels; `CHANNEL_SELECT` checks `VENCORD_GUILD_ID` for role trust; only the debug info object key `"Kaidocord"` and slash command names are rebranded
- `offline.ts`: `downloadSettingsBackup` output filename still uses `vencord-settings-backup-` prefix (only the file-picker filter label "Kaidocord Settings Backup" is rebranded)
- `Vencord.ts`: `syncSettings()` opens `"vencord_cloud_panel"` via `SettingsRouter.openUserSettings` — upstream key not yet rebranded; cloud auth check notification body is PT-BR (rebranded); cloud pull success notification body is EN (`"Your settings have been updated! Click here to restart to fully apply changes!"`) — not yet PT-BR
- `components/settings/tabs/vencord/index.tsx`: `DONOR_BACKGROUND_IMAGE` and `CONTRIB_BACKGROUND_IMAGE` still point to Vencord Discord CDN URLs; `DEFAULT_DONATE_IMAGE`, `SHIGGY_DONATE_IMAGE`, `VENNIE_DONATOR_IMAGE` are defined but not used in the rendered contributor card (active `cardImage` is `COZY_CONTRIB_IMAGE`, a Discord emoji CDN URL)
- `gameActivityToggle/index.tsx`: location option values `"PANEL"` / `"TOOLBOX"`; TOOLBOX label is already "Kaidocord Toolbox" (rebranded); `toolboxActions` `Menu.MenuCheckboxItem` label "Enable Game Activity" remains upstream EN
- `serverSpy/index.tsx`: guild context menu item label `"🔍 Server Stats"` is EN — not yet PT-BR
<!-- END AUTO-MANAGED -->

<!-- AUTO-MANAGED: conventions -->
## Conventions

- All new KAIDO-specific plugins go in `src/plugins/<pluginName>/index.tsx` using `definePlugin()`
- Plugin authors reference `Devs.<key>` from `src/utils/constants.ts`
- Team KAIDO member IDs: `Devs.epy` (j6) has real ID `1098146574393163817n`; null/cute/machiori/arc remain `0n` until set — update `Devs` object and `KAIDO_BOT_USER_ID`, `MEMBER_ROLE_ID`, `CONTRIB_ROLE_ID`, `SUPPORT_CHANNEL_ID` in `constants.ts`; `KAIDO_GUILD_ID` in `constants.ts` is still `"0"` — the real server ID `"1473938294768271364"` is hardcoded directly in `kaidoBadges/index.tsx`
- `DevsById` automatically excludes entries with `id === 0n`
- `Dev.badge` is an optional boolean; Vencord upstream contributors have `badge: false` explicitly to suppress KAIDO badge display
- UI strings facing users in PT-BR (e.g., update notifications, settings tab labels); code and docs in EN — exceptions: cloud pull success notification body in `Vencord.ts` and `serverSpy` context menu item label are still upstream EN (pending rebrand); cloud auth check notification in `Vencord.ts` is already PT-BR
- Copyright header: `Copyright (c) 2026 Team KAIDO and contributors`; upstream files retain original Vencord header
- Path aliases: `@utils/`, `@api/`, `@components/`, `@shared/`, `@webpack/`, `@plugins/`
- Imports sorted by `eslint-plugin-simple-import-sort`
- SupportHelper slash commands are named `kaidocord-debug` and `kaidocord-plugins`; only available in support channels or for plugin devs
- `renderContributorDmWarningCard`, `CHANNEL_SELECT` alerts, and `renderMessageAccessory` message-detection strings in `supportHelper.tsx` retain upstream Vencord strings — do not partially patch; a full rebrand requires updating alert bodies, channel/guild URL references, and message-content detection strings together
- Settings tab main component is `KaidocordSettings`, exported via `wrapTab(KaidocordSettings, "Kaidocord")`
- `KaidocordSettings` renders a PT-BR `SpecialCard` (title "Team KAIDO", subtitle "Obrigado por contribuir!", description "Você é membro do Team KAIDO e tem um badge exclusivo no seu perfil!", `cardImage={COZY_CONTRIB_IMAGE}`, `backgroundImage={CONTRIB_BACKGROUND_IMAGE}`, `backgroundColor="#1a1a2e"`, button "Ver suas contribuições") for users where `isPluginDev()` returns true
- Quick Actions labels (all PT-BR): "Ações Rápidas" (section title), "Log de Notificações", "Editar QuickCSS", "Reiniciar Discord" (non-web only), "Abrir Pasta de Configurações" (non-web only), "Código Fonte"; settings section header "Configurações"; settings hint text "Dica: Você pode alterar a posição desta seção nas configurações do plugin Settings!" (links to `openPluginModal(SettingsPlugin)`)
<!-- END AUTO-MANAGED -->

<!-- AUTO-MANAGED: patterns -->
## Patterns

- `definePlugin({ name, description, authors, dependencies, start(), stop() })` — standard plugin shape
- Badge plugins use `addProfileBadge` / `removeProfileBadge` from `@api/Badges` in `start()` / `stop()`
- Upstream Vencord constants (`VENCORD_GUILD_ID`, `VENBOT_USER_ID`, etc.) kept in `constants.ts` alongside KAIDO ones for plugin compatibility
- Build banner format: `// Kaidocord <gitHash>\n// Standalone: ...\n// Platform: ...\n// Updater Disabled: ...`
- `VENCORD_USER_AGENT` format: `Kaidocord/<gitHash> (https://github.com/<gitRemote>)` — exported from `@shared/vencordUserAgent`; omits remote URL if `gitRemote` is empty
- `fileUrlPlugin` URL params: `?base64` (base64-encode output), `?minify` (`.html` → html-minifier-terser, `.svg` → svgo with `multipass`+`floatPrecision:2`, `.js/.ts/etc` → esbuild minify), `?trim=false` (keep trailing whitespace); combine e.g. `file://path.svg?minify&base64`
- esbuild JSX transform: `jsxFactory=VencordCreateElement`, `jsxFragment=VencordFragment` (set in `commonOpts`; do NOT use `React.createElement` directly)
- `sourceMapFooter` pattern: `//# sourceMappingURL=vencord://<name>.js.map` (only in non-watch builds)
- Renderer code must NOT directly import `react`, `electron`, `ts-pattern`, or Node builtins — use `@webpack/common` or a `native.ts` file instead
- KaidoBadges uses dual `shouldShow` + `getBadges` shape: `shouldShow` gates on `GuildMemberStore.getMember(KAIDO_GUILD_ID, userId) != null` (guild membership — requires client to have fetched members); `getBadges` returns one badge object with inline SVG `KaidoIcon` (hexagon fill `#c41e3a`, stroke `#ff4757`, letter "K"); `isKaidoCore()` checks `KAIDO_TEAM_IDS` Set and sets description to `"Team KAIDO — Core"` vs `"Team KAIDO"`; `KAIDO_GUILD_ID` is `"1473938294768271364"` hardcoded in the file (not from `constants.ts`); `KAIDO_TEAM_IDS` currently contains `1098146574393163817n` (j6/epy)
- `monaco-editor` is a runtime dependency (used for the QuickCSS editor in settings)
- `isSafeObject()` in `offline.ts` recursively blocks keys `__proto__`, `constructor`, `prototype` before applying imported settings — call it before any `Object.assign` on settings data
- Settings backup import error message: `"Invalid Settings. Is this even a Kaidocord Settings file?"` (used when neither `settings` nor `quickCss` keys are present in parsed JSON)
- AntiDetect patch pattern: use `noWarn: true` on patches that target volatile webpack strings (e.g., `"vencord"`, `AnalyticsActionHandlers`, sourcemap comments); patches replace globally with `g` flag; `window.fetch` override in `start()` is intentionally not restored in `stop()` — requires Discord reload
- BulkDelete rate-limit pattern: 350ms delay between individual deletes (`RestAPI.del`), 1500ms backoff on error; fetches messages in batches of 100, filters by `me.id`, stops when `deleted >= limit` or messages exhausted; patches both `"channel-context"` and `"user-context"` menus; `deleteDelay` settings option (SLIDER, default 350, markers [200,350,500,750,1000]); Alert offers "Deletar 100" / "Deletar 500" options
- Snowflake age pattern (used in ProfileStats, ServerSpy, TokenInfo): `const ms = (BigInt(id) >> 22n) + 1420070400000n; new Date(Number(ms))` — Discord epoch is `1420070400000n`; ProfileStats/TokenInfo use `month: "short"` (`toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" })`); ServerSpy `getGuildAge` uses `month: "long"` — inconsistency, do not normalize without intent
- CustomStatus+ parse pattern: `parseStatusList()` splits on `\n`, trims, filters blank lines, matches emoji prefix with `/^(\p{Emoji_Presentation}|\p{Emoji}️?)\s+(.+)$/u`; calls `findByProps("setCustomStatus", "clearCustomStatus")` at runtime inside `setStatus()` (not at module load); default `statusList` is `"💻 Kaidocord\n🎮 Gaming\n☕ AFK"`; `intervalSeconds` SLIDER default 60 with markers [30,60,120,300,600]; `randomOrder` BOOLEAN default false (shuffles randomly instead of sequential); `settingsAboutComponent` renders inline ▶ Iniciar rotação / ■ Parar buttons calling `startRotation()` / `stopRotation()` directly
- `KAIDO_TEAM_IDS` in `kaidoBadges/index.tsx` is a `Set<bigint>` — currently contains `1098146574393163817n` (j6/epy); add real bigint IDs for other members as they join
- CrashHandler rebrand: only `maybePromptToUpdate` call string is PT-BR (`"Uh oh, Discord crashed... mas há uma atualização do Kaidocord disponível que pode resolver! Deseja atualizar agora?"`); crash recovery notification bodies remain upstream EN
- ProfileStats badge uses `getBadges()` array shape (extended BadgeAPI) rather than `shouldShow` + `component` directly — requires `as any` cast on `addProfileBadge(statsBadge as any)`; `getAccountAge()` returns `"DD mmm. YYYY (Xa Xm)"` format; badge renders inline SVG `CalendarIcon` (no external image); `shouldShow: ({ userId }) => !!userId` (shows for all users)
- TokenInfo clipboard pattern: each row in `TokenInfoPanel` is clickable — `onClick` calls `navigator.clipboard.writeText(value)` then `Toasts.show({ type: Toasts.Type.SUCCESS, message: "${label} copiado!" })`; `createdAt` uses `toLocaleString("pt-BR")` (datetime) vs ProfileStats/ServerSpy which use `toLocaleDateString("pt-BR")`; `getAccountFlags()` decodes `user.publicFlags` bitmask across 11 known flags (Discord Employee, Partnered Server Owner, HypeSquad Events/Bravery/Brilliance/Balance, Bug Hunter L1/L2, Early Nitro Supporter, Verified Bot Developer, Active Developer)
- ServerSpy online count pattern: `PresenceStore.getState().guilds[guildId]` — filters values that are not `"offline"`; may return `"?"` if presence state is unavailable for the guild
- TeamKaido theme CSS variables: defined on `:root` — `--kaido-red: #c41e3a`, `--kaido-red-glow: #ff2a45`, `--kaido-red-dim: #7a1225`, `--kaido-green: #00e676`, `--kaido-bg: #0a0a0a`, `--kaido-surface: #111111`, `--kaido-card: #161616`, `--kaido-border: #222222`, `--kaido-text: #e0e0e0`, `--kaido-muted: #555555`, `--kaido-font: "JetBrains Mono", "Fira Code", "Cascadia Code", monospace`; Nitro/boost ads hidden via `display: none !important` on `.premiumPromo-1nzyc6`, `.upsellContainer-Wc9gQ1`, `[class*="premiumTab"]`, `[class*="guildBoost"]`
<!-- END AUTO-MANAGED -->
