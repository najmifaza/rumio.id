"use client";

import { ReactLenis } from "lenis/react";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const isAdmin = pathname?.startsWith("/admin") || pathname?.startsWith("/login");

  // Bypass Lenis completely for admin and login pages to ensure native scrolling works.
  // Conditional rendering of child components does NOT violate Rules of Hooks for the parent.
  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      }}
    >
      {children}
    </ReactLenis>
  );
}
