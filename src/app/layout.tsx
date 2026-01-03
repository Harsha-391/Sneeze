import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "../components/SmoothScroll";
import Header from "../components/Header"; // IMPORT HEADER

const oswald = Oswald({ subsets: ["latin"], weight: ["400", "700"], variable: '--font-oswald' });
const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "600"], variable: '--font-inter' });

export const metadata: Metadata = {
    title: "SNEEZE",
    description: "Digital Warfare.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${oswald.variable} ${inter.variable}`} style={{ margin: 0, padding: 0, backgroundColor: '#050505' }}>

                {/* Header is placed OUTSIDE SmoothScroll to ensure it stays 
                   fixed correctly and doesn't get affected by scroll transforms 
                */}
                <Header />

                <SmoothScroll>
                    {children}
                </SmoothScroll>
            </body>
        </html>
    );
}