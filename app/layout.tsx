

import type { Metadata } from "next";
import "./globals.css";
import ReactQueryProvider from "./QueryClientProvider";
import { AuthListener } from "./components/AuthListener";

export const metadata: Metadata = {
  title: "Chat",
  description: "Chat",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <AuthListener />
        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
