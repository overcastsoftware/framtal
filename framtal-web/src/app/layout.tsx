import type { Metadata } from "next";
import { ibmPlexSans } from "@/lib/fonts";
import "./globals.css";
import { ApolloProvider } from "@/lib/ApolloProvider";
import Header from "./components/Header";

export const metadata: Metadata = {
  title: "Framtalsskil",
  description: "Skatturinn - Framtalsskil",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${ibmPlexSans.className} antialiased`}
      >
        <ApolloProvider>
          {children}
        </ApolloProvider>
      </body>
    </html>
  );
}
