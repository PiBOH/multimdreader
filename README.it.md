**Versione 0.0.3_ALPHA** · Autore: [PiBOH](https://piboh.github.io/)

> 🔤 Un lettore di file Markdown multipiattaforma. Nessuna installazione richiesta — scarica ed esegui.

[![Build Web](https://github.com/PiBOH/multimdreader/actions/workflows/build.yml/badge.svg)](https://github.com/PiBOH/multimdreader/actions/workflows/build.yml) [![Release](https://github.com/PiBOH/multimdreader/actions/workflows/release.yml/badge.svg)](https://github.com/PiBOH/multimdreader/actions/workflows/release.yml) [![Deploy Pages](https://github.com/PiBOH/multimdreader/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/PiBOH/multimdreader/actions/workflows/deploy-pages.yml)

🌐 Leggi in: 🇮🇹 Italiano · [🇬🇧 English (UK)](README.en-GB.md) · [🇺🇸 English (US)](README.md) · [🇪🇸 Español](README.es.md) · [🇩🇪 Deutsch](README.de.md) · [🇫🇷 Français](README.fr.md)

## ✨ Funzionalità

* 📖 **Leggi file Markdown** con rendering elegante in stile GitHub
* 🎨 **Evidenziazione della sintassi** per blocchi di codice (100+ linguaggi)
* 🌐 **6 lingue supportate**: 🇮🇹 Italiano, 🇬🇧 English (UK), 🇺🇸 English (US), 🇪🇸 Español, 🇩🇪 Deutsch, 🇫🇷 Français
* 🌙 **Modalità scura / chiara** con rilevamento delle preferenze di sistema
* 📂 **Barra laterale file recenti** con cronologia persistente
* 🖱️ **Drag & drop** per l'apertura dei file
* 📋 **Supporto GFM**: Tabelle, liste di attività, barrato, collegamenti automatici
* 🖥️ **Multipiattaforma**: Windows, macOS, Linux (Debian, Arch e altri)
* ⚡ **Nessuna installazione richiesta**: Scarica ed esegui
* 📋 **Pulsante copia codice** sui blocchi di codice

## 📥 Download

Scarica l'ultima versione dalla [pagina delle Release](https://github.com/PiBOH/multimdreader/releases).

| Piattaforma              | File                              | Come eseguire                            |
| ------------------------ | --------------------------------- | ---------------------------------------- |
| **Windows**              | MultiMDReader_\*_x64-setup.exe    | Doppio clic per installare ed eseguire   |
| **Windows (Portatile)**  | multimdreader.exe                 | Esegui direttamente il .exe              |
| **macOS (Intel)**        | MultiMDReader_\*_x64.dmg          | Apri .dmg → trascina in Applicazioni     |
| **macOS (Apple Silicon)**| MultiMDReader_\*_aarch64.dmg      | Apri .dmg → trascina in Applicazioni     |
| **Linux (Debian/Ubuntu)**| MultiMDReader_\*_amd64.deb        | `sudo dpkg -i *.deb`                     |
| **Linux (Tutte le distro)** | MultiMDReader_\*_amd64.AppImage | `chmod +x && ./MultiMDReader_*.AppImage` |
| **Linux (Arch)**         | multimdreader-\*.pkg.tar.zst      | `sudo pacman -U *.pkg.tar.zst`           |

## 🌐 Prova Online

Puoi provare MultiMDReader direttamente nel tuo browser: [piboh.github.io/multimdreader](https://piboh.github.io/multimdreader/)

## 🚀 Compilazione dai Sorgenti

### Prerequisiti

* [Node.js](https://nodejs.org/) 18+
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
# Installa Tauri CLI
npm install -g @tauri-apps/cli

# Sviluppo
npm run tauri dev

# Build di produzione
npm run tauri build
# Output in src-tauri/target/release/bundle/
```

### Generazione Icone

```bash
npx @tauri-apps/cli icon public/icon.png
```

## 🏗️ Workflow CI/CD

### Workflow Build (`.github/workflows/build.yml`)

Eseguito ad ogni push/PR su `main` — compila l'app web per verificare che si compili correttamente.

### Workflow Release (`.github/workflows/release.yml`)

Eseguito al push di un tag (`v*`) — compila le app desktop per tutte le piattaforme:

* **Windows**: installer `.exe` + `.exe` portatile
* **macOS**: `.dmg` per Intel (x64) e Apple Silicon (aarch64)
* **Linux Debian**: pacchetto `.deb`
* **Linux AppImage**: `.AppImage` portatile (funziona su tutte le distro)
* **Linux Arch**: pacchetto `.pkg.tar.zst`

### Workflow Deploy Pages (`.github/workflows/deploy-pages.yml`)

Eseguito ad ogni push su `main` — distribuisce automaticamente l'app web su GitHub Pages.

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

MIT © [PiBOH](https://piboh.github.io/)

---

**Repository**: [github.com/PiBOH/multimdreader](https://github.com/PiBOH/multimdreader)  
**Autore**: [PiBOH](https://piboh.github.io/)  
**Versione**: 0.0.3_ALPHA
