// app/layout.tsx

import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";

// ============================================
// 🎨 FONT CONFIGURATION
// ============================================

// Inter font for body text (modern, clean, readable)
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap", // Shows fallback font while loading
});

// Poppins font for headings (bold, modern, eye-catching)
const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"], // Different weights for variety
  subsets: ["latin"],
  display: "swap",
});

// ============================================
// 📄 METADATA (SEO & Browser Tab Info)
// ============================================

export const metadata: Metadata = {
  title: "ApplyFlow - Track Your Job Applications",
  description:
    "Keep track of your application flow! A modern job application tracker for freshers and experienced professionals.",
  keywords: ["job tracker", "application tracker", "job hunt", "career"],
  authors: [{ name: "Your Name" }],
  openGraph: {
    title: "ApplyFlow - Track Your Job Applications",
    description: "Keep track of your application flow!",
    type: "website",
  },
};

// ============================================
// 🏗️ ROOT LAYOUT COMPONENT
// ============================================

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>{children}</AuthProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
