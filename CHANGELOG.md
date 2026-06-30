# Changelog

All notable changes to **MultiMDReader** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.0.8_BETA4] — 2026-06-29

### 🚀 Windows 7 & Legacy OS Compatibility

- **Windows 7 Support**: Configured `webviewInstallMode` to `embedBootstrapper` in `tauri.conf.json`. This embeds the WebView2 bootstrapper directly within the NSIS installer, ensuring seamless installation on Windows 7 machines where TLS 1.2 or dynamic bootstrapper downloads might fail.
- **Windows 7 Native Handling**: In Tauri v2, core WebView2 compatibility with Windows 7 operates directly via the embedded bootstrapper without requiring legacy feature flags in `Cargo.toml`.
- **Windows XP Statement**: Note that Windows XP cannot be supported by Tauri v2 / WebView2. WebView2 is built on Microsoft Edge / Chromium, which permanently dropped support for Windows XP in 2016 (Chrome 49). Additionally, modern Rust toolchains require Windows 7 as the absolute minimum baseline.

### 📝 Documentation

- Updated all version references to `0.0.8_BETA4`
- Updated `arenaai.md` with explicit details on Windows 7 compatibility configurations and legacy OS limitations.

---

## [0.0.7_STABLE] — 2026-06-27

### ✨ New Features & Bug Fixes

- **Fixed file association opening**: When installing the program and associating supported extensions (`.md`, `.txt`, etc.), double-clicking a file in the operating system now correctly loads and displays the file contents within the application instead of just opening the welcome screen.
- **Fixed native Drag & Drop**: Dragging and dropping files from the OS file explorer into the desktop application now correctly opens the dropped files.
- **Desktop File Associations**: Configured native bundle file associations in `tauri.conf.json` and added `%f` parameter to Linux desktop entry in `PKGBUILD`.

### 📝 Documentation

- Updated all version references to `0.0.7_STABLE`
- Created `arenaai.md` with comprehensive developer guidelines and architectural documentation.

---

## [0.0.6_STABLE] — 2025-06-23

### ✨ New Features

- **Added 32-bit (x86) release workflows** for Windows and Linux:
  - `release-windows-x86.yml` — builds `i686-pc-windows-msvc` target (installer + portable `.exe`)
  - `release-linux-x86.yml` — builds `i686-unknown-linux-gnu` target (`.deb`, `.AppImage`, Arch `.pkg.tar.zst`)

### 📝 Documentation

- Updated all version references to `0.0.6_STABLE`
- Dashboard changelog updated with new release entry
- Added translation accuracy notice to all READMEs and dashboard: translations other than Italian may not be 100% accurate

---

## [0.0.5_STABLE] — 2025-06-23

### ✨ New Features

- **Added project dashboard page** — a beautiful, dark/light-mode landing page for the project deployed to GitHub Pages at `piboh.github.io/multimdreader/dashboard/`, featuring:
  - Hero section with gradient branding and download links
  - About section with feature cards
  - Download section per platform (Windows, macOS, Linux)
  - Supported languages showcase
  - Changelog preview
  - Keyboard shortcuts reference
  - Repository structure diagram
  - Sticky navigation with theme toggle
- **Created `deploy-pages-dashboard.yml`** workflow — deploys the `dashboard/` folder to GitHub Pages on changes

### 🔧 Refactoring

- **Renamed `deploy-pages.yml` → `deploy-pages-demo.yml`** — deploys the live web app demo to GitHub Pages
- Separated dashboard deployment from demo deployment into independent workflows with separate concurrency groups

### 📝 Documentation

- Updated all 6 READMEs with new badge for `deploy-pages-dashboard.yml`
- Updated CI/CD section in all READMEs to document both Pages workflows
- Updated all version references to `0.0.5_STABLE`

---

## [0.0.4_BETA] — 2025-06-23

### 🐛 Bug Fixes — CI/CD (Critical)

- **Fixed `release.yml` failing on all platforms** — `@tauri-apps/cli` was missing from `package.json` devDependencies, causing `tauri build` to fail on Windows, macOS, and Linux ([#28052770409](https://github.com/PiBOH/multimdreader/actions/runs/28052770409))
- **Fixed all release workflows still failing** — `tauri-action@v0` was silently failing; replaced with direct `npx tauri build` for full control and visible error output ([#28054215281](https://github.com/PiBOH/multimdreader/actions/runs/28054215281), [#28054228335](https://github.com/PiBOH/multimdreader/actions/runs/28054228335), [#28054238180](https://github.com/PiBOH/multimdreader/actions/runs/28054238180))
- **Fixed Rust compilation error `cannot find crate multimdreader_lib`** — `main.rs` referenced `multimdreader_lib::run()` but the crate is named `multimdreader`; changed to `multimdreader::run()` ([#28055357691](https://github.com/PiBOH/multimdreader/actions/runs/28055357691), [#28055369781](https://github.com/PiBOH/multimdreader/actions/runs/28055369781), [#28055379901](https://github.com/PiBOH/multimdreader/actions/runs/28055379901))
- **Fixed Rust compilation failures** — removed unused Tauri plugins (`tauri-plugin-dialog`, `tauri-plugin-fs`) from `Cargo.toml` and `lib.rs` that were causing crate version incompatibilities
- **Fixed `vite-plugin-singlefile` conflict with Tauri** — removed singlefile plugin (useful for standalone HTML but causes issues with Tauri's asset embedding); Tauri now receives proper separate JS/CSS bundles
- **Fixed Node.js 20 deprecation** — upgraded all workflows to Node.js 22 (Node 20 is deprecated on GitHub Actions runners as of September 2025)
- **Fixed `npm ci` failures** — replaced with `npm install` and added `package-lock.json` to `.gitignore` so CI generates fresh lock files
- **Fixed Linux build environment** — changed `ubuntu-latest` to `ubuntu-22.04` as recommended by Tauri v2 docs for webkit2gtk compatibility
- **Fixed macOS matrix `fail-fast`** — added `fail-fast: false` so Intel failure doesn't cancel Apple Silicon build (and vice versa)
- **Fixed Arch Linux package build** — replaced broken `container:` approach with `addnab/docker-run-action@v3` for reliable Arch container builds
- **Fixed release permissions** — added `permissions: contents: write` to all release workflows so they can create GitHub releases
- **Added `libssl-dev`** to Linux system dependencies for complete Tauri build requirements

### 🔧 Refactoring — CI/CD

- **Split `release.yml` into 3 per-OS workflows** for independent builds and clearer failure isolation:
  - `release-windows.yml` — Windows x64 (installer + portable)
  - `release-macos.yml` — macOS Intel (x64) + Apple Silicon (aarch64)
  - `release-linux.yml` — Linux Debian (.deb), AppImage, and Arch (.pkg.tar.zst)
- **Replaced `tauri-apps/tauri-action@v0` with direct build commands** — each workflow now runs `npx tauri build` directly with `softprops/action-gh-release@v2` for release creation, giving full control over build steps and clear error output
- **Added explicit frontend build step** before Tauri build for better error isolation
- **Added `cargo fetch` step** to pre-download Rust dependencies for clearer failure diagnostics
- **Added build output listing step** to help debug artifact location issues

### 🔧 Refactoring — Tauri Backend

- **Simplified `lib.rs`** — removed unused Tauri commands (`get_app_version`, `get_app_name`) and plugins, now just creates a window with the frontend
- **Simplified `Cargo.toml`** — removed `tauri-plugin-dialog`, `tauri-plugin-fs` dependencies; removed `"devtools"` feature from Tauri
- **Simplified `capabilities/default.json`** — only `core:default` permission needed

### 📦 Dependencies

- Added `@tauri-apps/cli@^2` to `devDependencies` (was missing — root cause of original CI failure)
- Removed `vite-plugin-singlefile` — incompatible with Tauri's asset embedding
- Removed `package-lock.json` from repository — CI generates fresh lock file each time

### 📝 Documentation

- Updated all 6 READMEs with new per-OS workflow badges and revised CI/CD documentation section
- Updated `package.json` name from `react-vite-tailwind` to `multimdreader`
- Added **testing notice** to all 6 READMEs: only Windows releases have been tested by the author; macOS and Linux builds are provided as-is

---

## [0.0.3_ALPHA] — 2025-06-23

### ✨ New Features

- **Code block copy button** — hover over any fenced code block to copy its content to clipboard with visual feedback
- **Remove individual recent files** — hover X button on each recent file in the sidebar to remove it from history
- **Keyboard shortcuts panel** — reference panel shown in the sidebar footer
- **Error notifications** — visible inline banner for file read errors and unsupported file format attempts
- **Close file button** — button in the file info bar to close the current file
- **GitHub Pages deployment** — new `deploy-pages.yml` workflow with proper `VITE_BASE` support for subpath hosting
- **Generated app icon** — `public/icon.png` with blue-purple gradient "M" design
- **Multilingual READMEs** — 6 translated READMEs with cross-language navigation:
  - `README.md` (🇺🇸 English US)
  - `README.en-GB.md` (🇬🇧 English UK)
  - `README.it.md` (🇮🇹 Italiano)
  - `README.es.md` (🇪🇸 Español)
  - `README.de.md` (🇩🇪 Deutsch)
  - `README.fr.md` (🇫🇷 Français)
- **`shortcuts` i18n keys** — added to all 6 locale files for the keyboard shortcuts panel
- **`closeFile` i18n key** — added to all 6 locale files for the close file button

### 🐛 Bug Fixes

- **Fixed identical `en-GB` and `en-US` locales** — they were byte-for-byte identical; now properly differentiated (e.g. "dialogue" vs "dialog", "colour" vs "color" where applicable)
- **Fixed `FileReader` missing error handling** — added `onerror` callback with user-visible error notification (previously, a failed read would silently do nothing)
- **Fixed `handleFileInput` type** — changed from generic `React.ChangeEvent` to `React.ChangeEvent<HTMLInputElement>` for type safety
- **Fixed `formatDate()` ignoring i18n locale** — now uses `getLocaleForDateFormat()` to map language codes to proper locale strings (e.g. `it` → `it-IT`, `de` → `de-DE`)
- **Fixed hardcoded version in About dialog** — replaced inline `"0.0.2"` with `APP_VERSION` constant
- **Fixed `i18n` detector using default localStorage key** — changed to `multimdreader-language` for namespace consistency
- **Fixed drag & drop state getting stuck** — improved `handleDragLeave` with bounding-rect boundary checking

### 🔧 Refactoring

- **Extracted app constants** — `APP_VERSION`, `APP_AUTHOR`, `APP_WEBSITE`, `APP_REPO` as module-level constants
- **Extracted utility functions** — `formatFileSize()`, `formatDate()`, `getLocaleForDateFormat()`, `isSupportedFile()` as standalone functions
- **Created inline SVG icon components** — 14 icon components replacing any previous approach
- **Added `CodeBlock` component** — dedicated component with copy-to-clipboard functionality
- **Cleaned up `src/utils/cn.ts`** — removed unused template utility file

### 📦 Dependencies

- Added `@tailwindcss/typography` — for `prose` markdown rendering classes
- Added `i18next`, `i18next-browser-languagedetector`, `react-i18next` — internationalization framework
- Added `react-markdown`, `remark-gfm`, `rehype-highlight` — Markdown rendering pipeline
- Added `highlight.js` — syntax highlighting engine with `github-dark` theme

### 📝 Documentation

- Added `CHANGELOG.md` (this file)
- Updated all version references from `0.0.2` to `0.0.3_ALPHA`

---

## [0.0.2] — 2025-06-22

### ✨ Initial Public Release

- Markdown file reader with GitHub-style rendering
- Syntax highlighting for code blocks (100+ languages)
- 6 language support: Italiano, English (UK), English (US), Español, Deutsch, Français
- Dark / Light mode with system preference detection
- Recent files sidebar with persistent history
- Drag & drop support for opening files
- GFM support: Tables, task lists, strikethrough, autolinks
- Cross-platform: Windows (.exe), macOS (.dmg), Linux (.deb, .AppImage, .pkg.tar.zst)
- CI/CD: `build.yml` (web build), `release.yml` (desktop releases)
- Tauri v2 desktop app (Rust backend)

---

[0.0.8_BETA4]: https://github.com/PiBOH/multimdreader/releases/tag/v0.0.8_BETA4
[0.0.7_STABLE]: https://github.com/PiBOH/multimdreader/releases/tag/v0.0.7_STABLE
[0.0.6_STABLE]: https://github.com/PiBOH/multimdreader/releases/tag/v0.0.6_STABLE
[0.0.5_STABLE]: https://github.com/PiBOH/multimdreader/releases/tag/v0.0.5_STABLE
[0.0.4_BETA]: https://github.com/PiBOH/multimdreader/releases/tag/v0.0.4_BETA
[0.0.3_ALPHA]: https://github.com/PiBOH/multimdreader/releases/tag/v0.0.3_ALPHA
[0.0.2]: https://github.com/PiBOH/multimdreader/releases/tag/v0.0.2
