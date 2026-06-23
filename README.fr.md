**Version 0.0.3_ALPHA** · Auteur : [PiBOH](https://piboh.github.io/)

> 🔤 Un lecteur de fichiers Markdown multiplateforme. Aucune installation requise — téléchargez et lancez.

[![Build Web](https://github.com/PiBOH/multimdreader/actions/workflows/build.yml/badge.svg)](https://github.com/PiBOH/multimdreader/actions/workflows/build.yml) [![Release](https://github.com/PiBOH/multimdreader/actions/workflows/release.yml/badge.svg)](https://github.com/PiBOH/multimdreader/actions/workflows/release.yml) [![Deploy Pages](https://github.com/PiBOH/multimdreader/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/PiBOH/multimdreader/actions/workflows/deploy-pages.yml)

🌐 Lire en : [🇮🇹 Italiano](README.it.md) · [🇬🇧 English (UK)](README.en-GB.md) · [🇺🇸 English (US)](README.md) · [🇪🇸 Español](README.es.md) · [🇩🇪 Deutsch](README.de.md) · 🇫🇷 Français

## ✨ Fonctionnalités

* 📖 **Lire des fichiers Markdown** avec un rendu élégant de style GitHub
* 🎨 **Coloration syntaxique** pour les blocs de code (100+ langages)
* 🌐 **6 langues prises en charge** : 🇮🇹 Italiano, 🇬🇧 English (UK), 🇺🇸 English (US), 🇪🇸 Español, 🇩🇪 Deutsch, 🇫🇷 Français
* 🌙 **Mode sombre / clair** avec détection des préférences système
* 📂 **Barre latérale des fichiers récents** avec historique persistant
* 🖱️ **Glisser-déposer** pour ouvrir des fichiers
* 📋 **Prise en charge GFM** : Tableaux, listes de tâches, barré, liens automatiques
* 🖥️ **Multiplateforme** : Windows, macOS, Linux (Debian, Arch et plus)
* ⚡ **Aucune installation requise** : Téléchargez et lancez
* 📋 **Bouton copier le code** sur les blocs de code

## 📥 Téléchargements

Téléchargez la dernière version depuis la [page des Releases](https://github.com/PiBOH/multimdreader/releases).

| Plateforme               | Fichier                           | Comment exécuter                         |
| ------------------------ | --------------------------------- | ---------------------------------------- |
| **Windows**              | MultiMDReader_\*_x64-setup.exe    | Double-clic pour installer et lancer     |
| **Windows (Portable)**   | multimdreader.exe                 | Exécutez directement le .exe             |
| **macOS (Intel)**        | MultiMDReader_\*_x64.dmg          | Ouvrir .dmg → glisser vers Applications  |
| **macOS (Apple Silicon)**| MultiMDReader_\*_aarch64.dmg      | Ouvrir .dmg → glisser vers Applications  |
| **Linux (Debian/Ubuntu)**| MultiMDReader_\*_amd64.deb        | `sudo dpkg -i *.deb`                     |
| **Linux (Toutes distros)** | MultiMDReader_\*_amd64.AppImage | `chmod +x && ./MultiMDReader_*.AppImage` |
| **Linux (Arch)**         | multimdreader-\*.pkg.tar.zst      | `sudo pacman -U *.pkg.tar.zst`           |

## 🌐 Essayer en Ligne

Vous pouvez également essayer MultiMDReader directement dans votre navigateur : [piboh.github.io/multimdreader](https://piboh.github.io/multimdreader/)

## 🚀 Compilation depuis les Sources

### Prérequis

* [Node.js](https://nodejs.org/) 18+
* [Rust](https://www.rust-lang.org/tools/install) (pour les builds bureau)
* [Tauri CLI](https://tauri.app/guides/getting-started/setup/) (pour les builds bureau)

### Build Web (Navigateur)

```bash
npm install
npm run build
# Résultat dans dist/
```

### Build Bureau (Tauri)

```bash
# Installer Tauri CLI
npm install -g @tauri-apps/cli

# Développement
npm run tauri dev

# Build de production
npm run tauri build
# Résultat dans src-tauri/target/release/bundle/
```

### Génération des Icônes

```bash
npx @tauri-apps/cli icon public/icon.png
```

## 🏗️ Workflows CI/CD

### Workflow de Build (`.github/workflows/build.yml`)

S'exécute à chaque push/PR sur `main` — compile l'application web pour vérifier qu'elle se compile correctement.

### Workflow de Release (`.github/workflows/release.yml`)

S'exécute lors du push d'un tag (`v*`) — compile les applications bureau pour toutes les plateformes :

* **Windows** : installateur `.exe` + `.exe` portable
* **macOS** : `.dmg` pour Intel (x64) et Apple Silicon (aarch64)
* **Linux Debian** : paquet `.deb`
* **Linux AppImage** : `.AppImage` portable (fonctionne sur toutes les distros)
* **Linux Arch** : paquet `.pkg.tar.zst`

### Workflow de Déploiement Pages (`.github/workflows/deploy-pages.yml`)

S'exécute à chaque push sur `main` — déploie automatiquement l'application web sur GitHub Pages.

## 🛠️ Stack Technologique

* **Frontend** : React 19, TypeScript, Tailwind CSS 4
* **Markdown** : react-markdown, remark-gfm, rehype-highlight
* **i18n** : i18next, react-i18next
* **Bureau** : Tauri v2 (Rust)
* **Build** : Vite, GitHub Actions

## 📄 Formats de Fichier Pris en Charge

`.md`, `.markdown`, `.mdown`, `.mkd`, `.mkdn`, `.mdwn`, `.mdtxt`, `.mdtext`, `.txt`

## ⌨️ Raccourcis Clavier

| Raccourci  | Action                           |
|------------|----------------------------------|
| `Ctrl+O`  | Ouvrir un fichier                |
| `Ctrl+B`  | Basculer la barre latérale       |
| `Ctrl+D`  | Basculer thème sombre/clair      |
| `Escape`   | Fermer la boîte de dialogue      |

## 📝 Licence

MIT © [PiBOH](https://piboh.github.io/)

---

**Dépôt** : [github.com/PiBOH/multimdreader](https://github.com/PiBOH/multimdreader)  
**Auteur** : [PiBOH](https://piboh.github.io/)  
**Version** : 0.0.3_ALPHA
