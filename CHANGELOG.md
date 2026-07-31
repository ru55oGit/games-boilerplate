# Changelog

Todos los cambios notables de este proyecto se documentan en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/).

## [Unreleased]
### Changed
- Repropósito completo del proyecto: de boilerplate de un juego ("encontrá el emoji diferente") a página contenedora ("Mis Juegos") que linkea a los 7 juegos ya publicados (Ensopalo, Tuttifrutalo, Imaginalo, Emojionado, Enganchalo, Enroscado, Letris), reutilizando el mismo look and feel (gradiente rojo, fuente Lobster, lluvia de emojis de fondo)
  - Esto reemplaza el cambio anterior de emoji de saludo (☀️/🌤️/🌙): esa pantalla de un solo juego ya no existe
### Removed
- Placeholder del juego "encontrá el emoji diferente" (game.tsx, levels.tsx, EmojiCarousel, VirtualKeyboard, usePhysicalKeyboard, levelsData, textNormalization) y las traducciones que le correspondían, todo sin uso tras el repropósito
### Added
- Cada tarjeta de juego pasa a ser una grilla de 2 columnas con: nombre, preview real del juego (versión chica y estática del bloque que ese juego muestra arriba de su propio botón JUGAR) y una descripción corta de la mecánica
  - Imaginalo (que tiene muchas categorías) usa un carrousel automático que rota cada 2.2s entre la primera imagen de cada categoría (banderas, funkos, escudos, sombras, logos, películas, emojis, jugadores, adivinanzas, wuzzles), copiadas de imaginaloReact
  - El resto de los juegos usan un preview estático hardcodeado (sin importar datos en vivo de otros repos): grilla de sopa de letras, cadena de palabras, rosco circular, grilla de Letris, grilla de emojis, chip de letra de Tuttifrutalo
  - Agregado un plugin de Vite (+ esbuild plugin para el scan de dependencias) para poder compilar los .js con JSX copiados de Imaginalo, igual que hace ese proyecto
### Fixed
- Preview de Enroscado: círculo agrandado de 84px a 125px, con los puntitos reacomodados (radio y tamaño) para que se vean bien a ese tamaño
- Preview de Enroscado: 16 puntos en vez de 26, para que se note el espacio entre cada uno y se distinga que es un rosco (antes se pegaban entre sí y parecía una mancha)
- Preview de Enroscado: agregar la letra (A a P) dentro de cada punto
- Preview de Enroscado: centrar la letra dentro de cada punto (el `<Typography>` anidado quedaba corrido; ahora el texto va directo en el mismo Box con flex-centering)

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
