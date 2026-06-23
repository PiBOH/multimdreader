**Versión 0.0.3_ALPHA** · Autor: [PiBOH](https://piboh.github.io/)

> 🔤 Un lector de archivos Markdown multiplataforma. No requiere instalación — solo descarga y ejecuta.

[![Build Web](https://github.com/PiBOH/multimdreader/actions/workflows/build.yml/badge.svg)](https://github.com/PiBOH/multimdreader/actions/workflows/build.yml) [![Release](https://github.com/PiBOH/multimdreader/actions/workflows/release.yml/badge.svg)](https://github.com/PiBOH/multimdreader/actions/workflows/release.yml) [![Deploy Pages](https://github.com/PiBOH/multimdreader/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/PiBOH/multimdreader/actions/workflows/deploy-pages.yml)

🌐 Lee esto en: [🇮🇹 Italiano](README.it.md) · [🇬🇧 English (UK)](README.en-GB.md) · [🇺🇸 English (US)](README.md) · 🇪🇸 Español · [🇩🇪 Deutsch](README.de.md) · [🇫🇷 Français](README.fr.md)

## ✨ Características

* 📖 **Lee archivos Markdown** con un renderizado elegante al estilo GitHub
* 🎨 **Resaltado de sintaxis** para bloques de código (100+ lenguajes)
* 🌐 **6 idiomas soportados**: 🇮🇹 Italiano, 🇬🇧 English (UK), 🇺🇸 English (US), 🇪🇸 Español, 🇩🇪 Deutsch, 🇫🇷 Français
* 🌙 **Modo oscuro / claro** con detección de preferencias del sistema
* 📂 **Barra lateral de archivos recientes** con historial persistente
* 🖱️ **Arrastrar y soltar** para abrir archivos
* 📋 **Soporte GFM**: Tablas, listas de tareas, tachado, enlaces automáticos
* 🖥️ **Multiplataforma**: Windows, macOS, Linux (Debian, Arch y más)
* ⚡ **No requiere instalación**: Descarga y ejecuta
* 📋 **Botón copiar código** en los bloques de código

## 📥 Descargas

Descarga la última versión desde la [página de Releases](https://github.com/PiBOH/multimdreader/releases).

| Plataforma               | File                              | Cómo ejecutar                            |
| ------------------------ | --------------------------------- | ---------------------------------------- |
| **Windows**              | MultiMDReader_\*_x64-setup.exe    | Doble clic para instalar y ejecutar      |
| **Windows (Portátil)**   | multimdreader.exe                 | Ejecuta directamente el .exe             |
| **macOS (Intel)**        | MultiMDReader_\*_x64.dmg          | Abre .dmg → arrastra a Aplicaciones      |
| **macOS (Apple Silicon)**| MultiMDReader_\*_aarch64.dmg      | Abre .dmg → arrastra a Aplicaciones      |
| **Linux (Debian/Ubuntu)**| MultiMDReader_\*_amd64.deb        | `sudo dpkg -i *.deb`                     |
| **Linux (Todas las distros)** | MultiMDReader_\*_amd64.AppImage | `chmod +x && ./MultiMDReader_*.AppImage` |
| **Linux (Arch)**         | multimdreader-\*.pkg.tar.zst      | `sudo pacman -U *.pkg.tar.zst`           |

## 🌐 Pruébalo Online

También puedes probar MultiMDReader directamente en tu navegador: [piboh.github.io/multimdreader](https://piboh.github.io/multimdreader/)

## 🚀 Compilación desde el Código Fuente

### Requisitos previos

* [Node.js](https://nodejs.org/) 18+
* [Rust](https://www.rust-lang.org/tools/install) (para compilaciones de escritorio)
* [Tauri CLI](https://tauri.app/guides/getting-started/setup/) (para compilaciones de escritorio)

### Compilación Web (Navegador)

```bash
npm install
npm run build
# Resultado en dist/
```

### Compilación de Escritorio (Tauri)

```bash
# Instalar Tauri CLI
npm install -g @tauri-apps/cli

# Desarrollo
npm run tauri dev

# Compilación de producción
npm run tauri build
# Resultado en src-tauri/target/release/bundle/
```

### Generación de Iconos

```bash
npx @tauri-apps/cli icon public/icon.png
```

## 🏗️ Flujos de Trabajo CI/CD

### Flujo de Build (`.github/workflows/build.yml`)

Se ejecuta en cada push/PR a `main` — compila la app web para verificar que se compile correctamente.

### Flujo de Release (`.github/workflows/release.yml`)

Se ejecuta al subir un tag (`v*`) — compila las apps de escritorio para todas las plataformas:

* **Windows**: instalador `.exe` + `.exe` portátil
* **macOS**: `.dmg` para Intel (x64) y Apple Silicon (aarch64)
* **Linux Debian**: paquete `.deb`
* **Linux AppImage**: `.AppImage` portátil (funciona en todas las distros)
* **Linux Arch**: paquete `.pkg.tar.zst`

### Flujo de Deploy Pages (`.github/workflows/deploy-pages.yml`)

Se ejecuta en cada push a `main` — despliega automáticamente la app web en GitHub Pages.

## 🛠️ Stack Tecnológico

* **Frontend**: React 19, TypeScript, Tailwind CSS 4
* **Markdown**: react-markdown, remark-gfm, rehype-highlight
* **i18n**: i18next, react-i18next
* **Escritorio**: Tauri v2 (Rust)
* **Build**: Vite, GitHub Actions

## 📄 Formatos de Archivo Soportados

`.md`, `.markdown`, `.mdown`, `.mkd`, `.mkdn`, `.mdwn`, `.mdtxt`, `.mdtext`, `.txt`

## ⌨️ Atajos de Teclado

| Atajo      | Acción                          |
|------------|---------------------------------|
| `Ctrl+O`  | Abrir archivo                   |
| `Ctrl+B`  | Alternar barra lateral          |
| `Ctrl+D`  | Alternar tema oscuro/claro      |
| `Escape`   | Cerrar diálogo                  |

## 📝 Licencia

MIT © [PiBOH](https://piboh.github.io/)

---

**Repositorio**: [github.com/PiBOH/multimdreader](https://github.com/PiBOH/multimdreader)  
**Autor**: [PiBOH](https://piboh.github.io/)  
**Versión**: 0.0.3_ALPHA
