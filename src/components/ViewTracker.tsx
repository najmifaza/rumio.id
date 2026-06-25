"use client";

import { useEffect, useRef } from "react";

export default function ViewTracker({ propertyId }: { propertyId: string }) {
  const tracked = useRef(false);

  useEffect(() => {
    if (!tracked.current) {
      tracked.current = true;
      fetch(`/api/properties/${propertyId}/view`, { method: "POST" })
        .catch(err => console.error("Failed to track view:", err));
    }
  }, [propertyId]);

  return null;
}
