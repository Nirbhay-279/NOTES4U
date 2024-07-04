import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Provider from "@/components/Provider";
import { ThemeProvider } from "@/components/themeprovider"
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Notes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <Provider>
          <body className={inter.className}>
            <ThemeProvider
              attribute="data-theme"
              defaultTheme="cyberpunk"
              enableSystem={false}
              storageKey="notes-theme"
            >
              {children}
            </ThemeProvider>
          </body>
        </Provider>
      </html>
    </ClerkProvider>
  );
}
