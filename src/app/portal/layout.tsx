import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: { default: "Client Portal", template: "%s | SSLC Client Portal" },
  robots: { index: false, follow: false },
};

export default function PortalRootLayout({ children }: { children: ReactNode }) {
  return children;
}
