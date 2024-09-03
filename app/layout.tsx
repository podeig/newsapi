import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NewsAPI for Supra Steria",
  description: "NewsAPI for Supra Steria app",
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
        <Theme className="w-full lg:w-[1024px] bg-opacity-0">
          <div className="flex flex-col m-auto bg-main">
            <div className="flex w-full flex-col">{children}</div>
          </div>
        </Theme>
      </body>
    </html>
  );
}
