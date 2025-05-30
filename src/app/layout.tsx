import { geistSans, geistMono } from "@/lib/fonts";
import { baseMetadata, viewport } from "@/lib/metadata";
import "./globals.css";
import { GlobalMode, GlobalProvider } from "@/contexts/GlobalContext";

export { viewport };
export const metadata = baseMetadata;

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
        <GlobalProvider globalMode={GlobalMode.Default}>
          {children}
        </GlobalProvider>
      </body>
    </html>
  );
}
