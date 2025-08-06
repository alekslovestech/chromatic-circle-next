import { defaultViewMetadata } from "@/lib/metadata";

export const metadata = defaultViewMetadata;

export default function DemoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
