import dts from "rollup-plugin-dts";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import alias from "@rollup/plugin-alias";
import esbuild from "rollup-plugin-esbuild";
import typescript from "rollup-plugin-typescript2";
import babel from "@rollup/plugin-babel";

const entries = ["src/index.ts"];

const plugins = [
  typescript({
    tsconfig: './tsconfig.json',
    inlineSources: true,
    inlineSourceMap: true,
  }),
  resolve({
    preferBuiltins: true,
    jsnext: true,
    main: true,
    browser: true,
    external: ['tslib'],
  }),
  commonjs({
    include: /node_modules/,
  }),
  babel({
    babelHelpers: "bundled",
    presets: [
      [
        "@babel/preset-env",
        {
          targets: {
            browsers: "last 2 versions",
          },
        },
      ],
      "@babel/preset-typescript",
    ],
  }),
  alias(),
  json(),
  esbuild(),
];

export default [
  ...entries.map(input => ({
    input,
    output: [
      {
        file: input.replace("src/", "dist/").replace(".ts", ".mjs"),
        format: "esm",
      },
      {
        file: input.replace("src/", "dist/").replace(".ts", ".cjs"),
        format: "cjs",
      },
    ],
    external: ['tslib'],
    plugins,
  })),
  ...entries.map(input => ({
    input,
    output: {
      file: input.replace("src/", "").replace(".ts", ".d.ts"),
      format: "esm",
      globals: {
        tslib: 'tslib',
      },
    },
    external: ['tslib'],
    plugins: [dts({ respectExternal: true })],
  })),
];
