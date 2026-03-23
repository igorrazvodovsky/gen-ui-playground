import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "json-render lab",
  description: "First renderer baseline for the human-agent-ui research workspace.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

