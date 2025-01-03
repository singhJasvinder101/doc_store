import type { Metadata } from "next";
import {  Inter } from "next/font/google";
import "./globals.css";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ConvexClientProvider } from "../providers/convexProvider";
import "@liveblocks/react-ui/styles.css";
import "@liveblocks/react-tiptap/styles.css";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "Doc Store",
  description: "Online Collaborative Document Store",
  icons: {
    icon: '/logo.svg' 
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={inter.className}
      >
        <NuqsAdapter>
          <ConvexClientProvider>
            <Toaster position="top-right" />
            {children}
          </ConvexClientProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
