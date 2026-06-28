"use client";

import { ReactLenis } from "lenis/react";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // Matikan Lenis sepenuhnya jika berada di halaman admin
  if (pathname && pathname.startsWith("/admin")) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={{ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) }}>
      {children}
    </ReactLenis>
  );
}
