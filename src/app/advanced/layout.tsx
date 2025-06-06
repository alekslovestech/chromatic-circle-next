import { GlobalMode } from "@/contexts/GlobalContext";
import { RootProvider } from "@/contexts/RootContext";
import { advancedViewMetadata } from "@/lib/metadata";

export const metadata = advancedViewMetadata;

export default function AdvancedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RootProvider globalMode={GlobalMode.Advanced}>{children}</RootProvider>
  );
}
