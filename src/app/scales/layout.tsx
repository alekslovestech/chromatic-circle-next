import { scalesViewMetadata } from "@/lib/metadata";

export const metadata = scalesViewMetadata;

export default function ScalesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
