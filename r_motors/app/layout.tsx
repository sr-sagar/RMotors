import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/(common)/navbar";
import { ScreenSizeContextProvider } from "../components/context/ScreenSizeContext";
import { ChoiceBoxFilterProvider } from '../components/context/choiceBoxFilters';
import { StateContextProvider } from "@/components/context/useStateContext";
import { Toaster } from "react-hot-toast";
import { getCookies } from "@/utils/getCookies";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RMotors",
  description: "Place to buy and sell your car",
};

export default  function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  


  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main>

          <ScreenSizeContextProvider>
            <ChoiceBoxFilterProvider>
              <StateContextProvider>

                <header>
                  <Navbar />
                </header>
                <div>
                  {children}
                  <Toaster position="top-right" gutter={8} toastOptions={{duration: 1000, position: "top-center"}} reverseOrder={false} />
                </div>
              </StateContextProvider>
            </ChoiceBoxFilterProvider>
          </ScreenSizeContextProvider>
        </main>
      </body>
    </html>
  );
}
