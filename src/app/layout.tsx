import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import "./globals.css";

// Load professional fonts
const oswald = Oswald({ subsets: ["latin"], weight: ["400", "700"], variable: '--font-oswald' });
const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "600"], variable: '--font-inter' });

export const metadata: Metadata = {
    title: "SNEEZE. MEDIA | Future-Ready Agency",
    description: "High-end creative media house specializing in AI integration, branding, and digital dominance.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${oswald.variable} ${inter.variable}`} style={{ margin: 0, padding: 0, backgroundColor: '#050505' }}>
                {children}
            </body>
        </html>
    );
}