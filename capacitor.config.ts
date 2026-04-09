import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.felipecarvalho.chat',
  appName: 'Chat',
  webDir: 'dist',
  // server: {
  //   url: 'http://192.168.1.2:3000',
  //   cleartext: true
  // },
  plugins: {
    Keyboard: {
      resizeOnFullScreen: false
    },
    StatusBar: {
      overlaysWebView: false,
      style: "DARK",
      backgroundColor: "#ffffffff"
    }
  }
};

export default config;
