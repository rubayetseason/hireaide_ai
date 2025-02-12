import { Toaster } from "react-hot-toast";
import "./css/style.css";

import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "HireAide.ai",
  description:
    "HireAide.ai is a transformative recruitment platform that simplifies, enhances, and accelerates the hiring process. Designed to support hiring teams, it combines AI-driven tools with comprehensive candidate validation, ensuring efficiency, fairness, and high-quality hiring decisions.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} bg-gray-50 font-inter tracking-tight text-gray-900 antialiased`}
      >
        <Toaster
          position="top-center"
          containerClassName="!z-[999999999]"
          reverseOrder={false}
        />
        <div className="flex min-h-screen flex-col overflow-hidden supports-[overflow:clip]:overflow-clip">
          {children}
        </div>
      </body>
    </html>
  );
}
