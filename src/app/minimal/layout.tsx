import { harmonyViewMetadata } from "@/lib/metadata";

export const metadata = harmonyViewMetadata;

export default function MinimalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
