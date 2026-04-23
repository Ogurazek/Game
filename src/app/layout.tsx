import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { Gamepad2 } from "lucide-react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PuerroXGame",
  description: "Juego de fútbol: adiviná el partido a partir de las pistas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Link href="/" className="fixed top-4 left-4 z-50 flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group">
          <Gamepad2 size={14} className="text-white/50 group-hover:text-white/80 transition-colors" />
          <span className="text-xs font-black text-white/60 group-hover:text-white/90 tracking-tight transition-colors">PuerroXGame</span>
        </Link>
        {children}
        <footer className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center gap-3 py-2 text-[11px] text-white/20 pointer-events-none">
          <span>Autor - Ogurazek</span>
          <span>·</span>
          <span>Dedicado a DavoXeneize 💙💛</span>
        </footer>
      </body>
    </html>
  );
}
