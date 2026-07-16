"use client";

import { ReactLenis } from "lenis/react";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const isAdmin = pathname?.startsWith("/admin") || pathname?.startsWith("/login");

  // Selalu render ReactLenis agar internal hooks-nya (useRef, useEffect) konsisten
  // setiap render cycle, sesuai Rules of Hooks.
  // Gunakan prop `options` untuk menonaktifkan smooth scroll di halaman admin.
  return (
    <ReactLenis
      root
      options={
        isAdmin
          ? { duration: 0, autoRaf: false }
          : { duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) }
      }
    >
      {children}
    </ReactLenis>
  );
}
