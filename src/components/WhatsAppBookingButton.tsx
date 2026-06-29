"use client";

import { trackWhatsAppClick } from "@/app/actions/property";

export default function WhatsAppBookingButton({
  waLink,
  propertySlug,
  propertyTitle,
  priceFormatted,
}: {
  waLink: string;
  propertySlug: string;
  propertyTitle: string;
  priceFormatted: string;
}) {
  const handleClick = () => {
    // Fire and forget server action
    trackWhatsAppClick(propertySlug);
  };

  return (
    <a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="flex w-full h-14 text-base items-center justify-center font-bold bg-[#EAB308] hover:bg-[#CA8A04] text-white shadow-lg shadow-amber-500/20 rounded-xl transition-all"
    >
      Booking Sekarang
    </a>
  );
}
