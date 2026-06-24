import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  return (
    <div className={`flex items-center flex-wrap gap-2 text-sm text-slate-500 ${className}`}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        
        return (
          <div key={index} className="flex items-center gap-2">
            {item.href && !isLast ? (
              <Link href={item.href} className="hover:text-[#0B1528] transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-[#0B1528] font-semibold">{item.label}</span>
            )}
            
            {!isLast && <ChevronRight className="w-3.5 h-3.5" />}
          </div>
        );
      })}
    </div>
  );
}
