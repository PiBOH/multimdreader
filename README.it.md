<!-- immagine logo generata con gemini (google) -->
<div align="center">
  <a href="https://piboh.github.io/multimdreader">
     <img width="250" height="250" alt="icon" src="https://github.com/PiBOH/multimdreader/blob/main/icon.png" />

**Scarica l'ultima release [qui](https://github.com/PiBOH/multimdreader/releases/latest)**

</div>

**Versione 0.1.0_BETA** · Autore: [PiBOH](https://piboh.github.io/)

> 🔤 Un lettore di file Markdown multipiattaforma. Nessuna installazione richiesta — scarica ed esegui.

[![Build Web](https://github.com/PiBOH/multimdreader/actions/workflows/build.yml/badge.svg)](https://github.com/PiBOH/multimdreader/actions/workflows/build.yml) [![Release Windows](https://github.com/PiBOH/multimdreader/actions/workflows/release-windows.yml/badge.svg)](https://github.com/PiBOH/multimdreader/actions/workflows/release-windows.yml) [![Release macOS](https://github.com/PiBOH/multimdreader/actions/workflows/release-macos.yml/badge.svg)](https://github.com/PiBOH/multimdreader/actions/workflows/release-macos.yml) [![Release Linux](https://github.com/PiBOH/multimdreader/actions/workflows/release-linux.yml/badge.svg)](https://github.com/PiBOH/multimdreader/actions/workflows/release-linux.yml) [![Deploy Pages](https://github.com/PiBOH/multimdreader/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/PiBOH/multimdreader/actions/workflows/deploy-pages.yml)

🌐 Leggi in: 🇮🇹 Italiano · [🇬🇧 English (UK)](README.en-GB.md) · [🇺🇸 English (US)](README.md) · [🇪🇸 Español](README.es.md) · [🇩🇪 Deutsch](README.de.md) · [🇫🇷 Français](README.fr.md)

## ✨ Funzionalità

* 📖 **Leggi file Markdown** con rendering elegante in stile GitHub
* 🎨 **Evidenziazione della sintassi** per blocchi di codice (100+ linguaggi)
* 🌐 **6 lingue supportate**: 🇮🇹 Italiano, 🇬🇧 English (UK), 🇺🇸 English (US), 🇪🇸 Español, 🇩🇪 Deutsch, 🇫🇷 Français
  *(nota: le traduzioni diverse dall'italiano potrebbero non essere accurate al 100%)*
* 🌙 **Modalità scura / chiara** con rilevamento delle preferenze di sistema
* 📂 **Barra laterale file recenti** con cronologia persistente
* 🖱️ **Drag & drop** per l'apertura dei file
* 📋 **Supporto GFM**: Tabelle, liste di attività, barrato, collegamenti automatici
* 🖥️ **Multipiattaforma**: Windows, macOS, Linux (Debian, Arch e altri)
* ⚡ **Nessuna installazione richiesta**: Scarica ed esegui
* 📋 **Pulsante copia codice** sui blocchi di codice

## 📥 Download

Scarica l'ultima versione dalla [pagina delle Release](https://github.com/PiBOH/multimdreader/releases).

| Piattaforma                     | File                                      | Come eseguire                            |
| ------------------------------- | ----------------------------------------- | ---------------------------------------- |
| **Windows (64-bit)**            | `MultiMDReader_*_x64-setup.exe`           | Doppio clic per installare ed eseguire   |
| **Windows (32-bit x86)**        | `MultiMDReader_*_x86-setup.exe`           | Doppio clic per installare ed eseguire   |
| **Windows (Portatile x64)**     | `multimdreader_*_x64-portable-win.exe`    | Esegui direttamente il .exe              |
| **Windows (Portatile x86)**     | `multimdreader_*_x86-portable-win.exe`    | Esegui direttamente il .exe              |
| **macOS (Intel x64)**           | `MultiMDReader_*_x64.dmg`                 | Apri .dmg → trascina in Applicazioni     |
| **macOS (Apple Silicon arm64)** | `MultiMDReader_*_aarch64.dmg`             | Apri .dmg → trascina in Applicazioni     |
| **Linux (Debian/Ubuntu x64)**   | `MultiMDReader_*_amd64.deb`               | `sudo dpkg -i *.deb`                     |
| **Linux (Debian/Ubuntu x86)**   | `MultiMDReader_*_i386.deb`                | `sudo dpkg -i *.deb`                     |
| **Linux (Tutte le distro x64)** | `MultiMDReader_*_amd64.AppImage`          | `chmod +x && ./MultiMDReader_*.AppImage` |
| **Linux (Arch x64)**            | `multimdreader-bin-*-x86_64.pkg.tar.zst`  | `sudo pacman -U *.pkg.tar.zst`           |
| **Linux (Arch x86)**            | `multimdreader-bin-*-i686.pkg.tar.zst`    | `sudo pacman -U *.pkg.tar.zst`           |

> ⚠️ **Nota sui test**: L'autore ha testato esclusivamente le release per Windows (nello specifico su Windows 11). Le build per macOS e Linux sono fornite così come sono e potrebbero contenere problemi specifici della piattaforma. Se riscontri un problema su macOS o Linux, per favore [apri una issue](https://github.com/PiBOH/multimdreader/issues).

## 🌐 Prova Online

- **Dashboard**: [piboh.github.io/multimdreader](https://piboh.github.io/multimdreader/) — pagina del progetto
- **Demo live**: [piboh.github.io/multimdreader/demo](https://piboh.github.io/multimdreader/demo/) — prova il lettore nel browser

## 🚀 Compilazione dai Sorgenti

### Prerequisiti

* [Node.js](https://nodejs.org/) 22+
* [Rust](https://www.rust-lang.org/tools/install) (per le build desktop)
* [Tauri CLI](https://tauri.app/guides/getting-started/setup/) (per le build desktop)

### Build Web (Browser)

```bash
npm install
npm run build
# Output in dist/
```

### Build Desktop (Tauri)

```bash
# Installa Tauri CLI (incluso nelle devDependencies)
npm install

# Sviluppo
npm run tauri dev

# Build di produzione
npm run tauri build
# Output in src-tauri/target/release/bundle/
```

### Generazione Icone

```bash
npx tauri icon public/icon.png
```

## 🏗️ Workflow CI/CD

### Workflow Build (`.github/workflows/build.yml`)

Eseguito ad ogni push/PR su `main` — compila l'app web per verificare che si compili correttamente.

### Workflow Release (per SO)

Ogni workflow viene eseguito al push di un tag (`v*`) — compila le app desktop per la piattaforma specifica:

| Workflow | Piattaforma | Output |
|----------|-------------|--------|
| `release-windows.yml` | Windows | installer `.exe` + `.exe` portatile |
| `release-macos.yml` | macOS Intel + Apple Silicon | `.dmg` per entrambe le architetture |
| `release-linux.yml` | Linux | `.deb`, `.AppImage`, Arch `.pkg.tar.zst` |

### Workflow Deploy Pages (`.github/workflows/deploy-pages.yml`)

Eseguito ad ogni push su `main` — distribuisce dashboard e demo su GitHub Pages:
- `/` → Dashboard del progetto
- `/demo/` → Demo live dell'app web

## 🛠️ Stack Tecnologico

* **Frontend**: React 19, TypeScript, Tailwind CSS 4
* **Markdown**: react-markdown, remark-gfm, rehype-highlight
* **i18n**: i18next, react-i18next
* **Desktop**: Tauri v2 (Rust)
* **Build**: Vite, GitHub Actions

## 📄 Formati di File Supportati

`.md`, `.markdown`, `.mdown`, `.mkd`, `.mkdn`, `.mdwn`, `.mdtxt`, `.mdtext`, `.txt`

## ⌨️ Scorciatoie da Tastiera

| Scorciatoia | Azione                |
|-------------|-----------------------|
| `Ctrl+O`   | Apri file             |
| `Ctrl+B`   | Attiva/disattiva barra laterale |
| `Ctrl+D`   | Attiva/disattiva tema scuro/chiaro |
| `Escape`    | Chiudi finestra di dialogo |

## 📝 Licenza

AGPL-3.0 © [PiBOH](https://piboh.github.io/)

---

**Repository**: [github.com/PiBOH/multimdreader](https://github.com/PiBOH/multimdreader)  
**Autore**: [PiBOH](https://piboh.github.io/)  
**Versione**: 0.1.0_BETA
