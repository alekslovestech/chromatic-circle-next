import { defaultViewMetadata } from "@/lib/metadata";

export const metadata = defaultViewMetadata;

export default function HarmonyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}

