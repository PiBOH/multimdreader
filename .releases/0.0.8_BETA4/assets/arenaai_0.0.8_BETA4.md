# Arena.ai Developer Guide (`arenaai.md`)

This file serves as the comprehensive project guide and developer onboarding document for **MultiMDReader** (equivalent in structure and purpose to a `CLAUDE.md` file). It outlines the architecture, build instructions, code conventions, and core mechanics of the application.

---

## 📋 Project Overview

**MultiMDReader** is a lightweight, cross-platform Markdown file reader designed to run seamlessly both as a web application and as a fully featured desktop application (via Tauri v2). 

- **Version**: `0.0.8_BETA4`
- **Target Platforms**: Windows (`.exe`), macOS (`.dmg`), Linux (`.deb`, `.AppImage`, Arch `.pkg.tar.zst`), Web (GitHub Pages demo & dashboard).
- **Core Philosophy**: Zero setup required, clean GitHub-style Markdown rendering, syntax highlighting for 100+ languages, robust multilingual support, and native desktop capabilities (file associations and drag-and-drop).

---

## 🏗️ Architecture & Stack

### Frontend
- **Framework**: React 19 + TypeScript + Vite 7
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`, `@tailwindcss/typography`)
- **State Management**: React Hooks (`useState`, `useCallback`, `useEffect`, `useRef`) with LocalStorage persistence for themes and recent files history.
- **Markdown & Code Rendering**: `react-markdown`, `remark-gfm`, `rehype-highlight`, `highlight.js` (GitHub Dark theme).
- **Internationalization (i18n)**: `i18next`, `react-i18next`, `i18next-browser-languagedetector` (6 supported languages: Italian, English UK, English US, Spanish, German, French).

### Backend (Desktop)
- **Framework**: Tauri v2 (`@tauri-apps/cli`, `@tauri-apps/api`)
- **Language**: Rust (`src-tauri/src/lib.rs`, `src-tauri/src/main.rs`)
- **Capabilities**: Custom IPC Invoke Commands (`get_opened_files`, `read_file_data`), native OS event handling (`RunEvent::Opened`), and Tauri Webview Drag & Drop events.

---

## 🚀 Key Commands & Workflows

### Prerequisites
- **Node.js** (v20+ recommended)
- **Rust & Cargo** (for Tauri desktop builds)
- **Linux dependencies** (if developing on Linux): `webkit2gtk-4.1`, `gtk3`, `openssl`, `libappindicator-gtk3`

### Development Commands

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Vite frontend development server (web-only mode). |
| `npm run tauri dev` | Starts the full Tauri desktop application development environment. |
| `npm run build` | Builds the React frontend for production into `dist/`. |
| `npm run tauri build` | Builds the native desktop application bundle (`.exe`, `.dmg`, `.deb`/`.AppImage`). |
| `npx tsc --noEmit` | Runs strict TypeScript type-checking across the codebase. |

---

## 🏛️ Implementation Details: File Associations & Drag & Drop

In version `0.0.8_BETA4`, the interaction between the host Operating System and the Tauri desktop app was overhauled to provide true native desktop integration.

### 1. File Associations & Double-Click Opening
When a user associates `.md` or `.txt` files with MultiMDReader in their OS and double-clicks a file:
- **Windows & Linux**: The OS executes `multimdreader <file_path>`. The Rust backend parses `std::env::args()` via the custom `get_opened_files` Tauri command.
- **macOS / Mobile**: The OS sends an event captured by `tauri::RunEvent::Opened`. The Rust backend stores the incoming URLs in thread-safe managed state (`Mutex<Vec<String>>`) and broadcasts them to the React frontend via the `opened-files` event.
- **Linux Desktop Entry**: The `PKGBUILD` configures `Exec=multimdreader %f` so Linux file managers correctly pass the file path argument.
- **Tauri Bundle**: `tauri.conf.json` includes `fileAssociations` definitions so installers automatically register supported extensions (`.md`, `.markdown`, `.txt`, etc.).

### 2. Native OS Drag & Drop
- **Webview Integration**: Standard HTML5 drag & drop (`onDrop`, `e.dataTransfer.files`) works perfectly in web browsers but is often restricted in secure Webview2/WebKit environments.
- **Tauri Integration**: The desktop app hooks into `getCurrentWebview().onDragDropEvent(...)`. When a native OS drop occurs, Tauri retrieves the file path and passes it to `openTauriPath()`.

### 3. Direct Filesystem Reading (`read_file_data`)
Because webviews cannot use `new FileReader()` on raw desktop file paths (e.g., `C:\path\to\file.md`), the application defines a custom Rust command `read_file_data(path)`. This command securely reads the file contents and retrieves accurate metadata (size, last modified time) directly via Rust's `std::fs`, returning a structured JSON payload to the frontend.

---

## 🖥️ Legacy OS Compatibility (Windows 7 & XP)

To ensure MultiMDReader can run on older hardware and legacy operating systems without internet connectivity or modern TLS protocols:

### Windows 7 Support
- **Embedded Bootstrapper**: In `tauri.conf.json`, `webviewInstallMode` is configured to `embedBootstrapper`. This embeds the Microsoft WebView2 installer directly within the NSIS setup executable. This ensures that on clean Windows 7 installations (where TLS 1.2 is disabled by default and dynamic downloads fail), the runtime is successfully installed offline.
- **Cargo Compatibility**: In Tauri v2, core WebView2 compatibility with Windows 7 is achieved natively without legacy feature flags. (The legacy `windows7-compat` flag is only required if importing the standalone `tauri-plugin-notification` crate).
- **32-bit Architecture**: The repository maintains active x86 (`i686-pc-windows-msvc`) release workflows (`release-windows-x86.yml`) specifically targeting older 32-bit Windows 7 hardware.

### Windows XP Limitations
- **WebView2 / Chromium Requirement**: MultiMDReader (and Tauri v2 in general) **cannot** support Windows XP. Tauri relies on Microsoft WebView2, which is powered by Chromium. Chromium permanently dropped support for Windows XP in 2016 (starting with Chrome 50). 
- **Rust Toolchain**: Modern Rust toolchains and Windows API bindings require Windows 7 as the absolute minimum target baseline. For Windows XP, a completely different legacy tech stack (such as Win32 C++ or Electron v1.4) would be required.

---

## 🎨 Code Style & Conventions

1. **Strict TypeScript**: Never use `any`. Explicitly define interfaces (e.g., `RecentFile`, `FileData`). Ensure all React event handlers are correctly typed (`React.ChangeEvent<HTMLInputElement>`, `React.DragEvent`).
2. **Component Structure**: Keep UI components modular. Use functional components with hooks. Memoize functions passed to child components or dependency arrays with `useCallback`.
3. **i18n First**: All user-facing strings must use the `t()` hook from `useTranslation()`. Never hardcode English or Italian strings directly in the JSX. Add new translation keys symmetrically across all JSON files in `src/i18n/locales/`.
4. **Rust Error Handling**: Custom Tauri commands should return `Result<T, String>` rather than panicking (`unwrap()`). Map filesystem errors cleanly so the frontend can display helpful localized error notifications (`t('errors.fileReadError')`).
5. **Tailwind Styling**: Prefer utility classes directly on elements. Use `dark:` variants for all colors to maintain perfect parity between Light and Dark modes.
