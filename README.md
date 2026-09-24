# MQTT Workbench

Turkish product website for MQTT Workbench, a Windows and Linux MQTT developer desktop application.

Website: https://anilaras.com.tr/mqtt-workbench-website/

This repository contains only the static marketing website and its visual assets.
The desktop application's source code and development records are not included.

## Download for Windows

[Download MQTT Workbench 0.1.5 for Windows x64](https://github.com/anilaras/mqtt-workbench-website/releases/download/v0.1.5/MQTT-Workbench-0.1.5-win-x64-setup.exe)

Windows 10 / 11, x64. A separate .NET runtime is not required.
The installer is currently unsigned. Its SHA-256 checksum is available on the
[release page](https://github.com/anilaras/mqtt-workbench-website/releases/tag/v0.1.5).

## Download for Linux

Linux x64 packages for version 0.1.5:

- [Ubuntu / Debian: DEB](https://github.com/anilaras/mqtt-workbench-website/releases/download/v0.1.5/mqttworkbench_0.1.5_amd64.deb)
- [Fedora: RPM](https://github.com/anilaras/mqtt-workbench-website/releases/download/v0.1.5/mqttworkbench-0.1.5-1.x86_64.rpm)
- [Portable TAR.GZ](https://github.com/anilaras/mqtt-workbench-website/releases/download/v0.1.5/MQTT-Workbench-0.1.5-linux-x64.tar.gz)
- [Portable ZIP](https://github.com/anilaras/mqtt-workbench-website/releases/download/v0.1.5/MQTT-Workbench-0.1.5-linux-x64.zip)

See the release page for requirements and SHA-256 checksums.

## Preview

Open index.html in a browser, or run:

    python -m http.server 8080 --bind 127.0.0.1

## Update

Edit index.html, styles.css and app.js. Public HTTPS download and Microsoft Store
links can be configured in site-config.js when available. Empty values keep the
corresponding download button hidden.

GitHub Pages publishes main from the repository root. No framework, dependency
installation or build step is required. All assets use relative paths.

## Rights

All rights reserved. Public availability of this website repository does not
grant a license to the desktop application or its branding.
