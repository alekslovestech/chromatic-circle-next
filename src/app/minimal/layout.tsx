import { defaultViewMetadata } from "@/lib/metadata";

export const metadata = defaultViewMetadata;

export default function MinimalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
