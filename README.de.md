<!-- immagine logo generata con gemini (google) -->
<div align="center">
  <a href="https://piboh.github.io/multimdreader">
     <img width="250" height="250" alt="icon" src="https://github.com/PiBOH/multimdreader/blob/main/icon.png" />

**Laden Sie die neueste Version [hier herunter](https://github.com/PiBOH/multimdreader/releases/latest)**

</div>

**Version 0.0.5_STABLE** · Autor: [PiBOH](https://piboh.github.io/)

> 🔤 Ein plattformübergreifender Markdown-Dateireader. Keine Installation erforderlich — einfach herunterladen und starten.

[![Build Web](https://github.com/PiBOH/multimdreader/actions/workflows/build.yml/badge.svg)](https://github.com/PiBOH/multimdreader/actions/workflows/build.yml) [![Release Windows](https://github.com/PiBOH/multimdreader/actions/workflows/release-windows.yml/badge.svg)](https://github.com/PiBOH/multimdreader/actions/workflows/release-windows.yml) [![Release macOS](https://github.com/PiBOH/multimdreader/actions/workflows/release-macos.yml/badge.svg)](https://github.com/PiBOH/multimdreader/actions/workflows/release-macos.yml) [![Release Linux](https://github.com/PiBOH/multimdreader/actions/workflows/release-linux.yml/badge.svg)](https://github.com/PiBOH/multimdreader/actions/workflows/release-linux.yml) [![Deploy Pages](https://github.com/PiBOH/multimdreader/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/PiBOH/multimdreader/actions/workflows/deploy-pages.yml)

🌐 Lies dies auf: [🇮🇹 Italiano](README.it.md) · [🇬🇧 English (UK)](README.en-GB.md) · [🇺🇸 English (US)](README.md) · [🇪🇸 Español](README.es.md) · 🇩🇪 Deutsch · [🇫🇷 Français](README.fr.md)

## ✨ Funktionen

* 📖 **Markdown-Dateien lesen** mit schönem, GitHub-artigem Rendering
* 🎨 **Syntax-Hervorhebung** für Code-Blöcke (100+ Sprachen)
* 🌐 **6 Sprachen unterstützt**: 🇮🇹 Italiano, 🇬🇧 English (UK), 🇺🇸 English (US), 🇪🇸 Español, 🇩🇪 Deutsch, 🇫🇷 Français
* 🌙 **Dunkel-/Hell-Modus** mit Erkennung der Systemeinstellungen
* 📂 **Seitenleiste für letzte Dateien** mit persistentem Verlauf
* 🖱️ **Drag & Drop** zum Öffnen von Dateien
* 📋 **GFM-Unterstützung**: Tabellen, Aufgabenlisten, Durchstreichung, automatische Links
* 🖥️ **Plattformübergreifend**: Windows, macOS, Linux (Debian, Arch und mehr)
* ⚡ **Keine Installation erforderlich**: Herunterladen und starten
* 📋 **Code kopieren**-Schaltfläche in Code-Blöcken

## 📥 Downloads

Laden Sie die neueste Version von der [Releases-Seite](https://github.com/PiBOH/multimdreader/releases) herunter.

| Plattform                | Datei                             | Ausführung                               |
| ------------------------ | --------------------------------- | ---------------------------------------- |
| **Windows**              | MultiMDReader_\*_x64-setup.exe    | Doppelklick zum Installieren & Starten   |
| **Windows (Portabel)**   | multimdreader.exe                 | .exe direkt ausführen                    |
| **macOS (Intel)**        | MultiMDReader_\*_x64.dmg          | .dmg öffnen → in Programme ziehen       |
| **macOS (Apple Silicon)**| MultiMDReader_\*_aarch64.dmg      | .dmg öffnen → in Programme ziehen       |
| **Linux (Debian/Ubuntu)**| MultiMDReader_\*_amd64.deb        | `sudo dpkg -i *.deb`                     |
| **Linux (Alle Distros)** | MultiMDReader_\*_amd64.AppImage   | `chmod +x && ./MultiMDReader_*.AppImage` |
| **Linux (Arch)**         | multimdreader-\*.pkg.tar.zst      | `sudo pacman -U *.pkg.tar.zst`           |

> ⚠️ **Testhinweis**: Der Autor hat nur die Windows-Versionen getestet. macOS- und Linux-Builds werden wie besehen bereitgestellt und können plattformspezifische Probleme enthalten. Wenn Sie ein Problem auf macOS oder Linux feststellen, bitte [eröffnen Sie ein Issue](https://github.com/PiBOH/multimdreader/issues).

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

### Build-Workflow (`.github/workflows/build.yml`)

Wird bei jedem Push/PR auf `main` ausgeführt — kompiliert die Web-App, um sicherzustellen, dass sie kompiliert.

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
| `Strg+B`  | Seitenleiste umschalten           |
| `Strg+D`  | Dunkles/helles Design umschalten  |
| `Escape`   | Dialog schließen                  |

## 📝 Lizenz

MIT © [PiBOH](https://piboh.github.io/)

---

**Repository**: [github.com/PiBOH/multimdreader](https://github.com/PiBOH/multimdreader)  
**Autor**: [PiBOH](https://piboh.github.io/)  
**Version**: 0.0.5_STABLE
