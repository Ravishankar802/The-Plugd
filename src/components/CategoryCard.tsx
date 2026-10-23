import Link from "next/link";
import {
  Bot,
  ShoppingBag,
  Flame,
  Briefcase,
  Video,
  Package,
  Globe,
  Link2,
  Heart,
  ArrowRight,
} from "lucide-react";
import type { Category } from "@/lib/categories";

const ICON_MAP = {
  Bot,
  ShoppingBag,
  Flame,
  Briefcase,
  Video,
  Package,
  Globe,
  Link2,
  Heart,
};

interface CategoryCardProps {
  category: Category;
  playbookCount?: number;
}

export default function CategoryCard({ category, playbookCount = 0 }: CategoryCardProps) {
  const IconComponent = ICON_MAP[category.iconName] || Globe;

  return (
    <Link
      href={`/${category.slug}`}
      className="group relative flex flex-col justify-between rounded-2xl border border-[#dcd8d0] bg-white p-6 sm:p-7 shadow-[0_1px_3px_rgba(28,25,23,0.06),0_1px_2px_rgba(28,25,23,0.04)] hover:border-[#c7c4c0] hover:shadow-md transition-all duration-200"
    >
      <div>
        {/* Header row with Icon and Badge */}
        <div className="flex items-center justify-between gap-3 mb-5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#dcd8d0] bg-[#ded9d0] text-[#1c1917] group-hover:bg-[#1c1917] group-hover:text-white transition-colors duration-200">
            <IconComponent className="h-5 w-5" />
          </div>

          {playbookCount > 0 ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#bfdbfe] bg-[#eff6ff] px-2.5 py-1 text-[11px] font-mono font-semibold tracking-wide text-[#1d4ed8]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#2563eb]" />
              {playbookCount} {playbookCount === 1 ? "Playbook" : "Playbooks"}
            </span>
          ) : (
            <span className="inline-flex items-center rounded-full border border-[#dcd8d0] bg-[#e7e4dd] px-2.5 py-1 text-[11px] font-mono font-medium text-[#78716c]">
              Coming soon
            </span>
          )}
        </div>

        {/* Category Name */}
        <h3 className="text-[19px] font-bold tracking-tight text-[#1c1917] group-hover:text-[#2563eb] transition-colors duration-150">
          {category.name}
        </h3>

        {/* Short Distinct Description */}
        <p className="mt-2 text-[14.5px] leading-relaxed text-[#57534e]">
          {category.description}
        </p>
      </div>

      {/* Footer link cue */}
      <div className="mt-6 flex items-center gap-1.5 text-[13px] font-semibold text-[#1c1917] group-hover:text-[#2563eb] transition-colors">
        <span>Explore category</span>
        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
