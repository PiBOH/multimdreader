# Maintainer: PiBOH
# This PKGBUILD builds MultiMDReader from source for Arch Linux
pkgname=multimdreader
pkgver=0.0.5
pkgrel=1
pkgdesc="A cross-platform Markdown file reader - no installation required"
arch=('x86_64')
url="https://github.com/PiBOH/multimdreader"
license=('MIT')
depends=('webkit2gtk-4.1' 'gtk3' 'openssl' 'libappindicator-gtk3')
makedepends=('rust' 'nodejs' 'npm' 'cargo')
source=("${pkgname}-${pkgver}.tar.gz::https://github.com/PiBOH/multimdreader/archive/refs/tags/v${pkgver}.tar.gz")
sha256sums=('SKIP')

build() {
    cd "${pkgname}-${pkgver}"
    # Install frontend dependencies
    npm ci
    # Build Tauri application
    cargo build --release --manifest-path src-tauri/Cargo.toml
}

package() {
    cd "${pkgname}-${pkgver}"
    # Install binary
    install -Dm755 "src-tauri/target/release/multimdreader" "${pkgdir}/usr/bin/multimdreader"
    # Install desktop entry
    install -Dm644 /dev/stdin "${pkgdir}/usr/share/applications/multimdreader.desktop" << EOF
[Desktop Entry]
Name=MultiMDReader
Comment=Cross-Platform Markdown Reader
Exec=multimdreader
Icon=multimdreader
Terminal=false
Type=Application
Categories=Office;TextEditor;Viewer;
MimeType=text/markdown;text/x-markdown;
EOF
}
