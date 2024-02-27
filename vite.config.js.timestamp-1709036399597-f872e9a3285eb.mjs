// vite.config.js
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///C:/wamp64/www/g6/admin/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/wamp64/www/g6/admin/node_modules/@vitejs/plugin-vue/dist/index.mjs";
var __vite_injected_original_import_meta_url = "file:///C:/wamp64/www/g6/admin/vite.config.js";
var vite_config_default = defineConfig({
  base: process.env.NODE_ENV === "production" ? "/chd104/g6/admin/" : "/",
  build: {
    outDir: "admin"
  },
  plugins: [
    vue()
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "./src/assets/scss/main.scss";
          `
      }
    }
  }
  // server:{
  // }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFx3YW1wNjRcXFxcd3d3XFxcXGc2XFxcXGFkbWluXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFx3YW1wNjRcXFxcd3d3XFxcXGc2XFxcXGFkbWluXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi93YW1wNjQvd3d3L2c2L2FkbWluL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXHJcblxyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgYmFzZTogcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJ1xyXG4gID8gJy9jaGQxMDQvZzYvYWRtaW4vJ1xyXG4gIDogJy8nLFxyXG4gIGJ1aWxkOiB7XHJcbiAgICBvdXREaXI6ICdhZG1pbidcclxuICB9LFxyXG4gIHBsdWdpbnM6IFtcclxuICAgIHZ1ZSgpLFxyXG4gIF0sXHJcbiAgcmVzb2x2ZToge1xyXG4gICAgYWxpYXM6IHtcclxuICAgICAgJ0AnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjJywgaW1wb3J0Lm1ldGEudXJsKSlcclxuICAgIH1cclxuICB9LFxyXG4gIGNzczoge1xyXG4gICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xyXG4gICAgICBzY3NzOiB7XHJcbiAgICAgICAgYWRkaXRpb25hbERhdGE6IGBcclxuICAgICAgICAgIEBpbXBvcnQgXCIuL3NyYy9hc3NldHMvc2Nzcy9tYWluLnNjc3NcIjtcclxuICAgICAgICAgIGAsXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgfSxcclxuICAvLyBzZXJ2ZXI6e1xyXG4gICAgXHJcbiAgLy8gfVxyXG59KTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE4UCxTQUFTLGVBQWUsV0FBVztBQUVqUyxTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFNBQVM7QUFINkksSUFBTSwyQ0FBMkM7QUFNOU0sSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsTUFBTSxRQUFRLElBQUksYUFBYSxlQUM3QixzQkFDQTtBQUFBLEVBQ0YsT0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBLEVBQ1Y7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLElBQUk7QUFBQSxFQUNOO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLGNBQWMsSUFBSSxJQUFJLFNBQVMsd0NBQWUsQ0FBQztBQUFBLElBQ3REO0FBQUEsRUFDRjtBQUFBLEVBQ0EsS0FBSztBQUFBLElBQ0gscUJBQXFCO0FBQUEsTUFDbkIsTUFBTTtBQUFBLFFBQ0osZ0JBQWdCO0FBQUE7QUFBQTtBQUFBLE1BR2xCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQTtBQUFBO0FBSUYsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
