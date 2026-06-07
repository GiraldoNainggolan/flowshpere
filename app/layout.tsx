import type { Metadata } from "next";
import { Instrument_Sans, DM_Sans } from "next/font/google";
import "./globals.css";

// Menggunakan Instrument Sans untuk Heading/Display
const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

// Menggunakan DM Sans untuk Body/UI Text
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FlowSphere | Real-time Project Management",
  description: "Ship projects faster, together. Premium Kanban workspace.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${instrumentSans.variable} ${dmSans.variable}`}>
      <body className="antialiased bg-surface text-text-primary min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}