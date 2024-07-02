import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import { useSelector } from "react-redux";

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       "/login": {
//         target: getProxyTarget(),
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/login/, "/login"),
//       },
//       "/home": {
//         // Add proxy for /home endpoint
//         target: getProxyTarget(),
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/home/, "/home"),
//       },
//       // Add more proxy entries for additional endpoints as needed
//     },
//   },
// });

// function getProxyTarget() {
//   const ipAddress = useSelector((state) => state.config.config);
//   return ipAddress ? `http://${ipAddress}:8888` : "http://localhost:8888";
// }
