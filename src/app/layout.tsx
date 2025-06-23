import type { Metadata } from "next";
import { Press_Start_2P, Orbitron } from "next/font/google";
import { NavBar } from '../components/NavBar';
import "./globals.css";
import { PageTransition } from "@/components/PageTransition";

const pressStart2P = Press_Start_2P({
  variable: "--font-press-start-2p",
  subsets: ["latin"],
  weight: "400",
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "AJUA",
  description: "game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${pressStart2P.variable} ${orbitron.variable} antialiased`}>
        <NavBar />
        <PageTransition>
    {children}
        </PageTransition>
      </body>
    </html>
  );
}
