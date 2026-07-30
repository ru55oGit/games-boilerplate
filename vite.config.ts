import { defineConfig, transformWithEsbuild } from "vite";
import react from "@vitejs/plugin-react";

// Los archivos de src/assets/imaginaloPreview/*.js son componentes SVG
// copiados tal cual de imaginaloReact: tienen JSX pero extensión .js (no
// .jsx/.tsx), así que esbuild no los transforma por defecto. Mismo plugin
// que usa imaginaloReact para resolverlo.
const jsxInSvgJs = {
  name: "jsx-in-svg-js",
  enforce: "pre" as const,
  async transform(code: string, id: string) {
    if (!/src\/assets\/imaginaloPreview\/.*\.js$/.test(id)) {
      return null;
    }

    return transformWithEsbuild(code, id, {
      loader: "jsx",
      jsx: "automatic",
    });
  },
};

const svgJsPattern = /src\/assets\/imaginaloPreview\/.*\.js$/;

export default defineConfig({
  plugins: [jsxInSvgJs, react()],
  optimizeDeps: {
    esbuildOptions: {
      plugins: [
        {
          name: "jsx-in-svg-js-scan",
          setup(build) {
            build.onLoad({ filter: svgJsPattern }, async (args) => {
              const fs = await import("node:fs/promises");
              const contents = await fs.readFile(args.path, "utf8");
              return { contents, loader: "jsx" };
            });
          },
        },
      ],
    },
  },
});
