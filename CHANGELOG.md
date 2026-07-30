# Changelog

Todos los cambios notables de este proyecto se documentan en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/).

## [Unreleased]
### Changed
- Repropósito completo del proyecto: de boilerplate de un juego ("encontrá el emoji diferente") a página contenedora ("Mis Juegos") que linkea a los 7 juegos ya publicados (Ensopalo, Tuttifrutalo, Imaginalo, Emojionado, Enganchalo, Enroscado, Letris), reutilizando el mismo look and feel (gradiente rojo, fuente Lobster, lluvia de emojis de fondo)
  - Esto reemplaza el cambio anterior de emoji de saludo (☀️/🌤️/🌙): esa pantalla de un solo juego ya no existe
### Removed
- Placeholder del juego "encontrá el emoji diferente" (game.tsx, levels.tsx, EmojiCarousel, VirtualKeyboard, usePhysicalKeyboard, levelsData, textNormalization) y las traducciones que le correspondían, todo sin uso tras el repropósito

## [2026-06-23]
### Changed
- Redesign Home to match project template pattern

## [2026-05-15]
### Fixed
- fix: alinear bloque Como Jugar y boton Jugar al fondo de la pantalla

## [2026-04-18]
### Changed
- Initial boilerplate
### Removed
- Remove .vite from tracking
