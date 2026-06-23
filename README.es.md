<!-- immagine logo generata con gemini (google) -->
<div align="center">
  <a href="https://piboh.github.io/multimdreader">
     <img width="250" height="250" alt="icon" src="https://github.com/PiBOH/multimdreader/blob/main/icon.png" />

**Descarga la última versión [aquí](https://github.com/PiBOH/multimdreader/releases/latest)**

</div>

**Versión 0.0.5_STABLE** · Autor: [PiBOH](https://piboh.github.io/)

> 🔤 Un lector de archivos Markdown multiplataforma. No requiere instalación — solo descarga y ejecuta.

[![Build Web](https://github.com/PiBOH/multimdreader/actions/workflows/build.yml/badge.svg)](https://github.com/PiBOH/multimdreader/actions/workflows/build.yml) [![Release Windows](https://github.com/PiBOH/multimdreader/actions/workflows/release-windows.yml/badge.svg)](https://github.com/PiBOH/multimdreader/actions/workflows/release-windows.yml) [![Release macOS](https://github.com/PiBOH/multimdreader/actions/workflows/release-macos.yml/badge.svg)](https://github.com/PiBOH/multimdreader/actions/workflows/release-macos.yml) [![Release Linux](https://github.com/PiBOH/multimdreader/actions/workflows/release-linux.yml/badge.svg)](https://github.com/PiBOH/multimdreader/actions/workflows/release-linux.yml) [![Deploy Pages](https://github.com/PiBOH/multimdreader/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/PiBOH/multimdreader/actions/workflows/deploy-pages.yml)

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

> ⚠️ **Aviso sobre pruebas**: El autor solo ha probado las versiones para Windows. Las compilaciones para macOS y Linux se proporcionan tal cual y pueden contener problemas específicos de la plataforma. Si encuentras un problema en macOS o Linux, por favor [abre un issue](https://github.com/PiBOH/multimdreader/issues).

## 🌐 Pruébalo Online

- **Dashboard**: [piboh.github.io/multimdreader](https://piboh.github.io/multimdreader/) — página del proyecto
- **Demo en vivo**: [piboh.github.io/multimdreader/demo](https://piboh.github.io/multimdreader/demo/) — prueba el lector en tu navegador

## 🚀 Compilación desde el Código Fuente

### Requisitos previos

* [Node.js](https://nodejs.org/) 22+
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
# Instalar Tauri CLI (incluido en devDependencies)
npm install

# Desarrollo
npm run tauri dev

# Compilación de producción
npm run tauri build
# Resultado en src-tauri/target/release/bundle/
```

### Generación de Iconos

```bash
npx tauri icon public/icon.png
```

## 🏗️ Flujos de Trabajo CI/CD

### Flujo de Build (`.github/workflows/build.yml`)

Se ejecuta en cada push/PR a `main` — compila la app web para verificar que se compile correctamente.

### Flujos de Release (por SO)

Cada flujo se ejecuta al subir un tag (`v*`) — compila las apps de escritorio para la plataforma específica:

| Workflow | Plataforma | Salida |
|----------|------------|--------|
| `release-windows.yml` | Windows | instalador `.exe` + `.exe` portátil |
| `release-macos.yml` | macOS Intel + Apple Silicon | `.dmg` para ambas arquitecturas |
| `release-linux.yml` | Linux | `.deb`, `.AppImage`, Arch `.pkg.tar.zst` |

### Flujo de Deploy Pages (`.github/workflows/deploy-pages.yml`)

Se ejecuta en cada push a `main` — despliega dashboard y demo en GitHub Pages:
- `/` → Dashboard del proyecto
- `/demo/` → Demo en vivo de la app web

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
**Versión**: 0.0.5_STABLE
