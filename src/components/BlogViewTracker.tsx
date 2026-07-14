"use client";

import { useEffect, useRef } from "react";

export default function BlogViewTracker({ slug }: { slug: string }) {
  const tracked = useRef(false);

  useEffect(() => {
    if (!tracked.current) {
      tracked.current = true;
      fetch(`/api/blogs/${slug}/view`, { method: "POST" })
        .catch(err => console.error("Failed to track blog view:", err));
    }
  }, [slug]);

  return null;
}
