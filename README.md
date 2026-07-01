<!-- immagine logo generata con gemini (google) -->
<div align="center">
  <a href="https://piboh.github.io/multimdreader">
     <img width="250" height="250" alt="icon" src="https://github.com/PiBOH/multimdreader/blob/main/icon.png" />

**Download the latest release [here](https://github.com/PiBOH/multimdreader/releases/latest)**

**Version 0.1.1_STABLE5** · Author: [PiBOH](https://piboh.github.io/)

</div>


> 🔤 A cross-platform Markdown file reader and advanced editor. No installation required — just download and run.

[![Release Windows](https://github.com/PiBOH/multimdreader/actions/workflows/release-windows.yml/badge.svg)](https://github.com/PiBOH/multimdreader/actions/workflows/release-windows.yml) [![Release macOS](https://github.com/PiBOH/multimdreader/actions/workflows/release-macos.yml/badge.svg)](https://github.com/PiBOH/multimdreader/actions/workflows/release-macos.yml) [![Release Linux](https://github.com/PiBOH/multimdreader/actions/workflows/release-linux.yml/badge.svg)](https://github.com/PiBOH/multimdreader/actions/workflows/release-linux.yml) [![Deploy Pages](https://github.com/PiBOH/multimdreader/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/PiBOH/multimdreader/actions/workflows/deploy-pages.yml)

🌐 Read this in: [🇮🇹 Italiano](README.it.md) · [🇬🇧 English (UK)](README.en-GB.md) · 🇺🇸 English (US) · [🇪🇸 Español](README.es.md) · [🇩🇪 Deutsch](README.de.md) · [🇫🇷 Français](README.fr.md)

## ✨ Features

* ✏️ **Advanced Editor Mode**: Full side-by-side editing with live preview, interactive formatting toolbar, document search (`Ctrl+F`), real-time document statistics, Undo/Redo history stacks (`Ctrl+Z`/`Ctrl+Y`), and standalone HTML/PDF export.
* 📖 **Read Markdown files** with beautiful, GitHub-style rendering
* 🎨 **Syntax highlighting** for code blocks (100+ languages)
* 🌐 **6 languages supported**: 🇮🇹 Italiano, 🇬🇧 English (UK), 🇺🇸 English (US), 🇪🇸 Español, 🇩🇪 Deutsch, 🇫🇷 Français
  *(note: translations other than Italian may not be 100% accurate)*
* 🌙 **Dark / Light mode** with system preference detection
* 📂 **Recent files sidebar** with persistent history
* 🖱️ **Drag & drop** support for opening files
* 📋 **GFM support**: Tables, task lists, strikethrough, autolinks
* 🖥️ **Cross-platform**: Windows, macOS, Linux (Debian, Arch, and more)
* ⚡ **No installation required**: Download and run
* 📋 **Copy code** button on code blocks

## 📥 Downloads

Download the latest release from the [Releases page](https://github.com/PiBOH/multimdreader/releases).

| Platform                        | File                                      | How to run                               |
| ------------------------------- | ----------------------------------------- | ---------------------------------------- |
| **Windows (64-bit)**            | `MultiMDReader_*_x64-setup.exe`           | Double-click to install & run            |
| **Windows (32-bit x86)**        | `MultiMDReader_*_x86-setup.exe`           | Double-click to install & run            |
| **Windows (Portable x64)**      | `multimdreader_*_x64-portable-win.exe`    | Just run the .exe — no install needed    |
| **Windows (Portable x86)**      | `multimdreader_*_x86-portable-win.exe`    | Just run the .exe — no install needed    |
| **macOS (Intel x64)**           | `MultiMDReader_*_x64.dmg`                 | Open .dmg → drag to Applications         |
| **macOS (Apple Silicon arm64)** | `MultiMDReader_*_aarch64.dmg`             | Open .dmg → drag to Applications         |
| **Linux (Debian/Ubuntu x64)**   | `MultiMDReader_*_amd64.deb`               | `sudo dpkg -i *.deb`                     |
| **Linux (Debian/Ubuntu x86)**   | `MultiMDReader_*_i386.deb`                | `sudo dpkg -i *.deb`                     |
| **Linux (All distros x64)**     | `MultiMDReader_*_amd64.AppImage`          | `chmod +x && ./MultiMDReader_*.AppImage` |
| **Linux (Arch x64)**            | `multimdreader-bin-*-x86_64.pkg.tar.zst`  | `sudo pacman -U *.pkg.tar.zst`           |
| **Linux (Arch x86)**            | `multimdreader-bin-*-i686.pkg.tar.zst`    | `sudo pacman -U *.pkg.tar.zst`           |

> ⚠️ **Testing notice**: Only Windows releases have been tested by the author (specifically on Windows 11). macOS and Linux builds are provided as-is and may contain platform-specific issues. If you encounter a problem on macOS or Linux, please [open an issue](https://github.com/PiBOH/multimdreader/issues).

## 🌐 Try Online

- **Dashboard**: [piboh.github.io/multimdreader](https://piboh.github.io/multimdreader/) — project landing page
- **Live Demo**: [piboh.github.io/multimdreader/demo](https://piboh.github.io/multimdreader/demo/) — try the reader in your browser

## 🚀 Building from Source

### Prerequisites

* [Node.js](https://nodejs.org/) 22+
* [Rust](https://www.rust-lang.org/tools/install) (for desktop builds)
* [Tauri CLI](https://tauri.app/guides/getting-started/setup/) (for desktop builds)

### Web Build (Browser)

```bash
npm install
npm run build
# Output in dist/
```

### Desktop Build (Tauri)

```bash
# Install Tauri CLI (included in devDependencies)
npm install

# Development
npm run tauri dev

# Production build
npm run tauri build
# Output in src-tauri/target/release/bundle/
```

### Generating Icons

```bash
npx tauri icon public/icon.png
```

## 🏗️ CI/CD Workflows

### Release Workflows (per-OS)

Each workflow runs on tag push (`v*`) — builds desktop apps for the specific platform:

| Workflow | Platform | Output |
|----------|----------|--------|
| `release-windows.yml` | Windows | `.exe` installer + portable `.exe` |
| `release-macos.yml` | macOS Intel + Apple Silicon | `.dmg` for both architectures |
| `release-linux.yml` | Linux | `.deb`, `.AppImage`, Arch `.pkg.tar.zst` |

### Deploy Pages Workflow (`.github/workflows/deploy-pages.yml`)

Runs on every push to `main` — deploys both the dashboard and demo to GitHub Pages:
- `/` → Project dashboard/landing page
- `/demo/` → Live web app demo

## 🛠️ Tech Stack

* **Frontend**: React 19, TypeScript, Tailwind CSS 4
* **Markdown**: react-markdown, remark-gfm, rehype-highlight
* **i18n**: i18next, react-i18next
* **Desktop**: Tauri v2 (Rust)
* **Build**: Vite, GitHub Actions

## 📄 Supported File Formats

`.md`, `.markdown`, `.mdown`, `.mkd`, `.mkdn`, `.mdwn`, `.mdtxt`, `.mdtext`, `.txt`

## ⌨️ Keyboard Shortcuts

| Shortcut    | Action              |
|-------------|---------------------|
| `Ctrl+O`   | Open file           |
| `Ctrl+S`   | Save file           |
| `Ctrl+F`   | Find in document    |
| `Ctrl+B`   | Toggle sidebar      |
| `Ctrl+D`   | Toggle dark/light   |
| `Ctrl+Z`   | Undo                |
| `Ctrl+Y`   | Redo                |
| `Escape`    | Close dialog/search |

## 📝 License

AGPL-3.0 © [PiBOH](https://piboh.github.io/)

---

**Repository**: [github.com/PiBOH/multimdreader](https://github.com/PiBOH/multimdreader)  
**Author**: [PiBOH](https://piboh.github.io/)  
**Version**: 0.1.1_STABLE5
