import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
// import VueJsx from "@vitejs/plugin-vue-jsx";
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";
import { VantResolver } from "unplugin-vue-components/resolvers";
import { resolve } from "path";
import { loadEnv } from "vite";
import { wrapperEnv } from "./build/util";
import { OUTPUT_DIR } from "./build/constant";

//获取文件真实路径
function pathResolve(dir: string) {
  return resolve(process.cwd(), ".", dir);
}

// vite配置 参考文档：https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const { VITE_DROP_CONSOLE } = wrapperEnv(env);
  return {
    resolve: {
      alias: [
        /* {
          find: /\/#\//,
          replacement: pathResolve("types") + "/",
        }, */
        {
          find: "@",
          replacement: pathResolve("src") + "/",
        },
      ],
      dedupe: ["vue"],
    },
    plugins: [
      Vue(),
      Components({
        dts: "src/components.d.ts",
        resolvers: [VantResolver()],
      }),
      AutoImport({
        imports: [
          "vue",
          "vue-router",
          // 'vue-i18n',
          "@vueuse/head",
          "@vueuse/core",
        ],
        eslintrc: {
          enabled: true, // Default `false`
          filepath: "./.eslintrc-auto-import.json", // Default `./.eslintrc-auto-import.json`
          globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        },
        dts: "src/auto-imports.d.ts",
        vueTemplate: true,
      }),
    ],
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
    optimizeDeps: {
      include: [],
      exclude: ["vue-demi"],
    },
    build: {
      target: "es2015",
      outDir: OUTPUT_DIR,
      terserOptions: {
        compress: {
          keep_infinity: true,
          drop_console: VITE_DROP_CONSOLE,
        },
      },
      brotliSize: false,
      chunkSizeWarningLimit: 2000,
    },
    server: {
      host: "0.0.0.0",
      port: 3000,
    },
  };
});
