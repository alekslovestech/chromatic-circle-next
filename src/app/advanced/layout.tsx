import { advancedMetadata } from "@/lib/metadata";

export const metadata = advancedMetadata;

export default function AdvancedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
