import Link from "next/link";

interface CategoryBreadcrumbProps {
  categoryName: string;
}

export default function CategoryBreadcrumb({ categoryName }: CategoryBreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-5 sm:mb-6">
      <ol className="flex items-center gap-1.5 text-xs sm:text-[13px] font-mono text-[#78716c]">
        <li>
          <Link
            href="/"
            className="font-semibold text-[#1c1917] hover:text-[#2563eb] transition-colors duration-150"
          >
            Plugd
          </Link>
        </li>
        <li aria-hidden="true" className="text-[#a8a29e] select-none">
          &gt;
        </li>
        <li aria-current="page">
          <span className="font-semibold text-[#2563eb]">
            {categoryName}
          </span>
        </li>
      </ol>
    </nav>
  );
}
