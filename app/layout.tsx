import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Dashboard | json-render",
  description: "AI-generated dashboard widgets with guardrails",
};

const themeInitScript = `(() => {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const apply = (isDark) => {
    document.documentElement.classList.toggle("dark", isDark);
  };
  apply(media.matches);
  if (typeof media.addEventListener === "function") {
    media.addEventListener("change", (event) => apply(event.matches));
  } else if (typeof media.addListener === "function") {
    media.addListener((event) => apply(event.matches));
  }
})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
        {children}
      </body>
    </html>
  );
}
