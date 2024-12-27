import { defineConfig } from "rollup";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import externals from "rollup-plugin-node-externals";
import json from "@rollup/plugin-json";
import terser from "@rollup/plugin-terser";
import typescript from "rollup-plugin-typescript2";

export default defineConfig([
  {
    input: {
      index: "./src/index.ts", // 打包文件
    },
    output: {
      dir: "dist", // 输出目录
      format: "cjs",
    },
    plugins: [
      nodeResolve(),
      commonjs(),
      externals({
        devDeps: false, // 识别devDependencies的依赖，当作外部处理
      }),
      json(),
      terser(),
      typescript(),
    ],
  },
]);
