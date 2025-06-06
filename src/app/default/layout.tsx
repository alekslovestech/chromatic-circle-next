import { RootProvider } from "@/contexts/RootContext";
import { GlobalMode } from "@/contexts/GlobalContext";
import { defaultViewMetadata } from "@/lib/metadata";

export const metadata = defaultViewMetadata;

export default function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RootProvider globalMode={GlobalMode.Default}>{children}</RootProvider>
  );
}
