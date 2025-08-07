import { advancedViewMetadata } from "@/lib/metadata";

export const metadata = advancedViewMetadata;

export default function AdvancedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
