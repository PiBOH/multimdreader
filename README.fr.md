<!-- immagine logo generata con gemini (google) -->
<div align="center">
  <a href="https://piboh.github.io/multimdreader">
     <img width="250" height="250" alt="icon" src="https://github.com/PiBOH/multimdreader/blob/main/icon.png" />

**Téléchargez la dernière version [ici](https://github.com/PiBOH/multimdreader/releases/latest)**

</div>

**Version 0.1.0_BETA** · Auteur : [PiBOH](https://piboh.github.io/)

> 🔤 Un lecteur de fichiers Markdown multiplateforme. Aucune installation requise — téléchargez et lancez.

[![Build Web](https://github.com/PiBOH/multimdreader/actions/workflows/build.yml/badge.svg)](https://github.com/PiBOH/multimdreader/actions/workflows/build.yml) [![Release Windows](https://github.com/PiBOH/multimdreader/actions/workflows/release-windows.yml/badge.svg)](https://github.com/PiBOH/multimdreader/actions/workflows/release-windows.yml) [![Release macOS](https://github.com/PiBOH/multimdreader/actions/workflows/release-macos.yml/badge.svg)](https://github.com/PiBOH/multimdreader/actions/workflows/release-macos.yml) [![Release Linux](https://github.com/PiBOH/multimdreader/actions/workflows/release-linux.yml/badge.svg)](https://github.com/PiBOH/multimdreader/actions/workflows/release-linux.yml) [![Deploy Pages](https://github.com/PiBOH/multimdreader/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/PiBOH/multimdreader/actions/workflows/deploy-pages.yml)

🌐 Lire en : [🇮🇹 Italiano](README.it.md) · [🇬🇧 English (UK)](README.en-GB.md) · [🇺🇸 English (US)](README.md) · [🇪🇸 Español](README.es.md) · [🇩🇪 Deutsch](README.de.md) · 🇫🇷 Français

## ✨ Fonctionnalités

* 📖 **Lire des fichiers Markdown** avec un rendu élégant de style GitHub
* 🎨 **Coloration syntaxique** pour les blocs de code (100+ langages)
* 🌐 **6 langues prises en charge** : 🇮🇹 Italiano, 🇬🇧 English (UK), 🇺🇸 English (US), 🇪🇸 Español, 🇩🇪 Deutsch, 🇫🇷 Français
  *(note : les traductions autres que l'italien peuvent ne pas être exactes à 100 %)*
* 🌙 **Mode sombre / clair** avec détection des préférences système
* 📂 **Barre latérale des fichiers récents** avec historique persistant
* 🖱️ **Glisser-déposer** pour ouvrir des fichiers
* 📋 **Prise en charge GFM** : Tableaux, listes de tâches, barré, liens automatiques
* 🖥️ **Multiplateforme** : Windows, macOS, Linux (Debian, Arch et plus)
* ⚡ **Aucune installation requise** : Téléchargez et lancez
* 📋 **Bouton copier le code** sur les blocs de code

## 📥 Téléchargements

Téléchargez la dernière version depuis la [page des Releases](https://github.com/PiBOH/multimdreader/releases).

| Plateforme                      | Fichier                                   | Comment exécuter                         |
| ------------------------------- | ----------------------------------------- | ---------------------------------------- |
| **Windows (64-bit)**            | `MultiMDReader_*_x64-setup.exe`           | Double-clic pour installer et lancer     |
| **Windows (32-bit x86)**        | `MultiMDReader_*_x86-setup.exe`           | Double-clic pour installer et lancer     |
| **Windows (Portable x64)**      | `multimdreader_*_x64-portable-win.exe`    | Exécutez directement le .exe             |
| **Windows (Portable x86)**      | `multimdreader_*_x86-portable-win.exe`    | Exécutez directement le .exe             |
| **macOS (Intel x64)**           | `MultiMDReader_*_x64.dmg`                 | Ouvrir .dmg → glisser vers Applications  |
| **macOS (Apple Silicon arm64)** | `MultiMDReader_*_aarch64.dmg`             | Ouvrir .dmg → glisser vers Applications  |
| **Linux (Debian/Ubuntu x64)**   | `MultiMDReader_*_amd64.deb`               | `sudo dpkg -i *.deb`                     |
| **Linux (Debian/Ubuntu x86)**   | `MultiMDReader_*_i386.deb`                | `sudo dpkg -i *.deb`                     |
| **Linux (Toutes distros x64)**  | `MultiMDReader_*_amd64.AppImage`          | `chmod +x && ./MultiMDReader_*.AppImage` |
| **Linux (Arch x64)**            | `multimdreader-bin-*-x86_64.pkg.tar.zst`  | `sudo pacman -U *.pkg.tar.zst`           |
| **Linux (Arch x86)**            | `multimdreader-bin-*-i686.pkg.tar.zst`    | `sudo pacman -U *.pkg.tar.zst`           |

> ⚠️ **Avis sur les tests** : L'auteur n'a testé que les versions Windows (spécifiquement sur Windows 11). Les builds macOS et Linux sont fournis tels quels et peuvent contenir des problèmes spécifiques à la plateforme. Si vous rencontrez un problème sur macOS ou Linux, merci d'[ouvrir une issue](https://github.com/PiBOH/multimdreader/issues).

## 🌐 Essayer en Ligne

- **Tableau de bord** : [piboh.github.io/multimdreader](https://piboh.github.io/multimdreader/) — page du projet
- **Démo en direct** : [piboh.github.io/multimdreader/demo](https://piboh.github.io/multimdreader/demo/) — essayez le lecteur dans votre navigateur

## 🚀 Compilation depuis les Sources

### Prérequis

* [Node.js](https://nodejs.org/) 22+
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
# Installer Tauri CLI (inclus dans devDependencies)
npm install

# Développement
npm run tauri dev

# Build de production
npm run tauri build
# Résultat dans src-tauri/target/release/bundle/
```

### Génération des Icônes

```bash
npx tauri icon public/icon.png
```

## 🏗️ Workflows CI/CD

### Workflow de Build (`.github/workflows/build.yml`)

S'exécute à chaque push/PR sur `main` — compile l'application web pour vérifier qu'elle se compile correctement.

### Workflows de Release (par OS)

Chaque workflow s'exécute lors du push d'un tag (`v*`) — compile les applications bureau pour la plateforme spécifique :

| Workflow | Plateforme | Sortie |
|----------|------------|--------|
| `release-windows.yml` | Windows | installateur `.exe` + `.exe` portable |
| `release-macos.yml` | macOS Intel + Apple Silicon | `.dmg` pour les deux architectures |
| `release-linux.yml` | Linux | `.deb`, `.AppImage`, Arch `.pkg.tar.zst` |

### Workflow de Déploiement Pages (`.github/workflows/deploy-pages.yml`)

S'exécute à chaque push sur `main` — déploie le tableau de bord et la démo sur GitHub Pages :
- `/` → Tableau de bord du projet
- `/demo/` → Démo en direct de l'application web

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

AGPL-3.0 © [PiBOH](https://piboh.github.io/)

---

**Dépôt** : [github.com/PiBOH/multimdreader](https://github.com/PiBOH/multimdreader)  
**Auteur** : [PiBOH](https://piboh.github.io/)  
**Version** : 0.1.0_BETA
