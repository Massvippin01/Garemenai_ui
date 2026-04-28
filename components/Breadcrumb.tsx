import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbProps {
  items: { label: string; href?: string }[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-2 py-4 px-6 max-w-[1240px] mx-auto">
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center gap-2">
          {idx > 0 && <ChevronRight size={14} className="text-black/40" />}
          {item.href ? (
            <Link
              href={item.href}
              className="text-sm text-black/60 hover:text-black transition-colors"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {item.label}
            </Link>
          ) : (
            <span
              className="text-sm text-black font-medium"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}
