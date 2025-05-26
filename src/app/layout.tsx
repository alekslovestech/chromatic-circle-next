import { geistSans, geistMono } from "@/lib/fonts";
import { defaultMetadata, viewport } from "@/lib/metadata";
import "./globals.css";

export { viewport };
export const metadata = defaultMetadata;

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
        {children}
      </body>
    </html>
  );
}
