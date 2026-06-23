# MultiMDReader

**Version 0.0.2** · Author: [PiBOH](https://piboh.github.io/)

> 🔤 A cross-platform Markdown file reader. No installation required — just download and run.

[![Build Web](https://github.com/PiBOH/multimdreader/actions/workflows/build.yml/badge.svg)](https://github.com/PiBOH/multimdreader/actions/workflows/build.yml)
[![Release](https://github.com/PiBOH/multimdreader/actions/workflows/release.yml/badge.svg)](https://github.com/PiBOH/multimdreader/actions/workflows/release.yml)

## ✨ Features

- 📖 **Read Markdown files** with beautiful, GitHub-style rendering
- 🎨 **Syntax highlighting** for code blocks (100+ languages)
- 🌐 **6 languages supported**: 🇮🇹 Italiano, 🇬🇧 English (UK), 🇺🇸 English (US), 🇪🇸 Español, 🇩🇪 Deutsch, 🇫🇷 Français
- 🌙 **Dark / Light mode** with system preference detection
- 📂 **Recent files sidebar** with persistent history
- 🖱️ **Drag & drop** support for opening files
- 📋 **GFM support**: Tables, task lists, strikethrough, autolinks
- 🖥️ **Cross-platform**: Windows, macOS, Linux (Debian, Arch, and more)
- ⚡ **No installation required**: Download and run

## 📥 Downloads

Download the latest release from the [Releases page](https://github.com/PiBOH/multimdreader/releases).

| Platform | File | How to run |
|----------|------|-----------|
| **Windows** | `MultiMDReader_*_x64-setup.exe` | Double-click to install & run |
| **Windows (Portable)** | `multimdreader.exe` | Just run the .exe — no install needed |
| **macOS (Intel)** | `MultiMDReader_*_x64.dmg` | Open .dmg → drag to Applications |
| **macOS (Apple Silicon)** | `MultiMDReader_*_aarch64.dmg` | Open .dmg → drag to Applications |
| **Linux (Debian/Ubuntu)** | `MultiMDReader_*_amd64.deb` | `sudo dpkg -i *.deb` |
| **Linux (All distros)** | `MultiMDReader_*_amd64.AppImage` | `chmod +x && ./MultiMDReader_*.AppImage` |
| **Linux (Arch)** | `multimdreader-*.pkg.tar.zst` | `sudo pacman -U *.pkg.tar.zst` |

## 🚀 Building from Source

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [Rust](https://www.rust-lang.org/tools/install) (for desktop builds)
- [Tauri CLI](https://tauri.app/guides/getting-started/setup/) (for desktop builds)

### Web Build (Browser)

```bash
npm install
npm run build
# Output in dist/
```

### Desktop Build (Tauri)

```bash
# Install Tauri CLI
npm install -g @tauri-apps/cli

# Development
npm run tauri dev

# Production build
npm run tauri build
# Output in src-tauri/target/release/bundle/
```

### Generating Icons

```bash
npx @tauri-apps/cli icon public/icon.png
```

## 🏗️ CI/CD Workflows

### Build Workflow (`.github/workflows/build.yml`)
Runs on every push/PR to `main` — builds the web app to verify it compiles.

### Release Workflow (`.github/workflows/release.yml`)
Runs on tag push (`v*`) — builds desktop apps for all platforms:
- **Windows**: `.exe` installer + portable `.exe`
- **macOS**: `.dmg` for Intel (x64) and Apple Silicon (aarch64)
- **Linux Debian**: `.deb` package
- **Linux AppImage**: Portable `.AppImage` (works on all distros)
- **Linux Arch**: `.pkg.tar.zst` package

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS 4
- **Markdown**: react-markdown, remark-gfm, rehype-highlight
- **i18n**: i18next, react-i18next
- **Desktop**: Tauri v2 (Rust)
- **Build**: Vite, GitHub Actions

## 📄 Supported File Formats

`.md`, `.markdown`, `.mdown`, `.mkd`, `.mkdn`, `.mdwn`, `.mdtxt`, `.mdtext`, `.txt`

## 📝 License

MIT © [PiBOH](https://piboh.github.io/)

---

**Repository**: [github.com/PiBOH/multimdreader](https://github.com/PiBOH/multimdreader)  
**Author**: [PiBOH](https://piboh.github.io/)  
**Version**: 0.0.2
