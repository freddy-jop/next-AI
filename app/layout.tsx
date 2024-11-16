import { getServerUrl } from "@/get-server-url";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./Providers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "OptiPix AI",
  description:
    "Transform your images effortlessly with OptiPix AI, the ultimate SaaS for AI-powered photo editing, background removal, image upscaling, colorization, and restoration. Elevate your creative projects with cutting-edge artificial intelligence tools designed for photographers, designers, and content creators.",
  metadataBase: new URL(getServerUrl()),
  icons: {
    icon: "/images/optipix_favicon.png",
  },
  applicationName: "OptiPix AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
