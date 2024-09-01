import type { Metadata } from "next";
import Image from "next/image";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} m-auto flex justify-center bg-fixed bg-cover`}
        style={{ backgroundImage: "url(/images/bg-newspaper.jpg)" }}
      >
        <div
          className="w-[1200px] bg-opacity-80 flex flex-col"
          style={{ backgroundColor: "#f9f7f1" }}
        >
          <div className="p-10 flex w-full sticky top-0 bg-white bg-opacity-95 z-50">
            <Image
              src="/images/logo-newsapi.svg"
              alt="Logo NewsAPI"
              width={200}
              height={100}
              className="border-2 mx-auto rounded-lg borderRed"
            />
          </div>
          <div className="flex w-full flex-col">{children}</div>
          <div className="flex h-[100px] bg-white items-center justify-center bg-opacity-60">
            Developed by Denis Pokotylyuk
          </div>
        </div>
      </body>
    </html>
  );
}
