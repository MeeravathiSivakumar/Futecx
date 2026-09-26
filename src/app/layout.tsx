import type { Metadata } from "next";
import { Outfit, DM_Sans } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Head from "next/head";
import AOSInit from "@/components/AOSInit";
import LoginPopup from "@/components/LoginPopup";
import BootstrapInit from "@/components/BootstrapInit";

const dmsans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-inter", /* Keeping variable name same so globals.css doesn't break */
  display: "swap"
});

const outfit = Outfit({
  weight: ["500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-jakarta", /* Keeping variable name same so globals.css doesn't break */
  display: "swap"
});

export const metadata: Metadata = {
  title: "Home - TN-FUTECX | Innovating Future Tech",
  description: "Join TN-FUTECX Core Team. We're recruiting builders across AI/ML, Full-Stack, DevOps, Design, and Community.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Existing Icons Preserved as per Rule 6 */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.css" />
      </head>
      <body className={`${dmsans.variable} ${outfit.variable}`}>
        <AuthProvider>
          <BootstrapInit />
          <AOSInit />
          <LoginPopup />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}


