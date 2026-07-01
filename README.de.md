<!-- immagine logo generata con gemini (google) -->
<div align="center">
  <a href="https://piboh.github.io/multimdreader">
     <img width="250" height="250" alt="icon" src="https://github.com/PiBOH/multimdreader/blob/main/icon.png" />

**Laden Sie die neueste Version [hier herunter](https://github.com/PiBOH/multimdreader/releases/latest)**

</div>

**Version 0.1.1_RC4** · Autor: [PiBOH](https://piboh.github.io/)

> 🔤 Ein plattformübergreifender Markdown-Dateireader. Keine Installation erforderlich — einfach herunterladen und starten.

[![Release Windows](https://github.com/PiBOH/multimdreader/actions/workflows/release-windows.yml/badge.svg)](https://github.com/PiBOH/multimdreader/actions/workflows/release-windows.yml) [![Release macOS](https://github.com/PiBOH/multimdreader/actions/workflows/release-macos.yml/badge.svg)](https://github.com/PiBOH/multimdreader/actions/workflows/release-macos.yml) [![Release Linux](https://github.com/PiBOH/multimdreader/actions/workflows/release-linux.yml/badge.svg)](https://github.com/PiBOH/multimdreader/actions/workflows/release-linux.yml) [![Deploy Pages](https://github.com/PiBOH/multimdreader/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/PiBOH/multimdreader/actions/workflows/deploy-pages.yml)

🌐 Lies dies auf: [🇮🇹 Italiano](README.it.md) · [🇬🇧 English (UK)](README.en-GB.md) · [🇺🇸 English (US)](README.md) · [🇪🇸 Español](README.es.md) · 🇩🇪 Deutsch · [🇫🇷 Français](README.fr.md)

## ✨ Funktionen

* 📖 **Markdown-Dateien lesen** mit schönem, GitHub-artigem Rendering
* 🎨 **Syntax-Hervorhebung** für Code-Blöcke (100+ Sprachen)
* 🌐 **6 Sprachen unterstützt**: 🇮🇹 Italiano, 🇬🇧 English (UK), 🇺🇸 English (US), 🇪🇸 Español, 🇩🇪 Deutsch, 🇫🇷 Français
  *(Hinweis: Übersetzungen außer Italienisch sind möglicherweise nicht zu 100 % genau)*
* 🌙 **Dunkel-/Hell-Modus** mit Erkennung der Systemeinstellungen
* 📂 **Seitenleiste für letzte Dateien** mit persistentem Verlauf
* 🖱️ **Drag & Drop** zum Öffnen von Dateien
* 📋 **GFM-Unterstützung**: Tabellen, Aufgabenlisten, Durchstreichung, automatische Links
* 🖥️ **Plattformübergreifend**: Windows, macOS, Linux (Debian, Arch und mehr)
* ⚡ **Keine Installation erforderlich**: Herunterladen und starten
* 📋 **Code kopieren**-Schaltfläche in Code-Blöcken

## 📥 Downloads

Laden Sie die neueste Version von der [Releases-Seite](https://github.com/PiBOH/multimdreader/releases) herunter.

| Plattform                       | Datei                                     | Ausführung                               |
| ------------------------------- | ----------------------------------------- | ---------------------------------------- |
| **Windows (64-bit)**            | `MultiMDReader_*_x64-setup.exe`           | Doppelklick zum Installieren & Starten   |
| **Windows (32-bit x86)**        | `MultiMDReader_*_x86-setup.exe`           | Doppelklick zum Installieren & Starten   |
| **Windows (Portabel x64)**      | `multimdreader_*_x64-portable-win.exe`    | .exe direkt ausführen                    |
| **Windows (Portabel x86)**      | `multimdreader_*_x86-portable-win.exe`    | .exe direkt ausführen                    |
| **macOS (Intel x64)**           | `MultiMDReader_*_x64.dmg`                 | .dmg öffnen → in Programme ziehen       |
| **macOS (Apple Silicon arm64)** | `MultiMDReader_*_aarch64.dmg`             | .dmg öffnen → in Programme ziehen       |
| **Linux (Debian/Ubuntu x64)**   | `MultiMDReader_*_amd64.deb`               | `sudo dpkg -i *.deb`                     |
| **Linux (Debian/Ubuntu x86)**   | `MultiMDReader_*_i386.deb`                | `sudo dpkg -i *.deb`                     |
| **Linux (Alle Distros x64)**    | `MultiMDReader_*_amd64.AppImage`          | `chmod +x && ./MultiMDReader_*.AppImage` |
| **Linux (Arch x64)**            | `multimdreader-bin-*-x86_64.pkg.tar.zst`  | `sudo pacman -U *.pkg.tar.zst`           |
| **Linux (Arch x86)**            | `multimdreader-bin-*-i686.pkg.tar.zst`    | `sudo pacman -U *.pkg.tar.zst`           |

> ⚠️ **Testhinweis**: Der Autor hat nur die Windows-Versionen getestet (speziell unter Windows 11). macOS- und Linux-Builds werden wie besehen bereitgestellt und können plattformspezifische Probleme enthalten. Wenn Sie ein Problem auf macOS oder Linux feststellen, bitte [eröffnen Sie ein Issue](https://github.com/PiBOH/multimdreader/issues).

## 🌐 Online testen

- **Dashboard**: [piboh.github.io/multimdreader](https://piboh.github.io/multimdreader/) — Projektseite
- **Live-Demo**: [piboh.github.io/multimdreader/demo](https://piboh.github.io/multimdreader/demo/) — Reader im Browser testen

## 🚀 Kompilierung aus dem Quellcode

### Voraussetzungen

* [Node.js](https://nodejs.org/) 22+
* [Rust](https://www.rust-lang.org/tools/install) (für Desktop-Builds)
* [Tauri CLI](https://tauri.app/guides/getting-started/setup/) (für Desktop-Builds)

### Web-Build (Browser)

```bash
npm install
npm run build
# Ausgabe in dist/
```

### Desktop-Build (Tauri)

```bash
# Tauri CLI installieren (in devDependencies enthalten)
npm install

# Entwicklung
npm run tauri dev

# Produktions-Build
npm run tauri build
# Ausgabe in src-tauri/target/release/bundle/
```

### Icons generieren

```bash
npx tauri icon public/icon.png
```

## 🏗️ CI/CD-Workflows

### Release-Workflows (pro OS)

Jeder Workflow wird bei Tag-Push (`v*`) ausgeführt — kompiliert Desktop-Apps für die jeweilige Plattform:

| Workflow | Plattform | Ausgabe |
|----------|-----------|---------|
| `release-windows.yml` | Windows | `.exe`-Installer + portable `.exe` |
| `release-macos.yml` | macOS Intel + Apple Silicon | `.dmg` für beide Architekturen |
| `release-linux.yml` | Linux | `.deb`, `.AppImage`, Arch `.pkg.tar.zst` |

### Deploy-Pages-Workflow (`.github/workflows/deploy-pages.yml`)

Wird bei jedem Push auf `main` ausgeführt — stellt Dashboard und Demo auf GitHub Pages bereit:
- `/` → Projekt-Dashboard
- `/demo/` → Live-Web-App-Demo

## 🛠️ Technologie-Stack

* **Frontend**: React 19, TypeScript, Tailwind CSS 4
* **Markdown**: react-markdown, remark-gfm, rehype-highlight
* **i18n**: i18next, react-i18next
* **Desktop**: Tauri v2 (Rust)
* **Build**: Vite, GitHub Actions

## 📄 Unterstützte Dateiformate

`.md`, `.markdown`, `.mdown`, `.mkd`, `.mkdn`, `.mdwn`, `.mdtxt`, `.mdtext`, `.txt`

## ⌨️ Tastaturkürzel

| Kürzel     | Aktion                            |
|------------|-----------------------------------|
| `Strg+O`  | Datei öffnen                      |
| `Strg+S`  | Datei speichern                   |
| `Strg+F`  | Im Dokument suchen                |
| `Strg+B`  | Seitenleiste umschalten           |
| `Strg+D`  | Dunkles/helles Design umschalten  |
| `Strg+Z`  | Rückgängig                        |
| `Strg+Y`  | Wiederholen                       |
| `Escape`   | Dialog/Suche schließen            |

## 📝 Lizenz

AGPL-3.0 © [PiBOH](https://piboh.github.io/)

---

**Repository**: [github.com/PiBOH/multimdreader](https://github.com/PiBOH/multimdreader)  
**Autor**: [PiBOH](https://piboh.github.io/)  
**Version**: 0.1.1_RC4
