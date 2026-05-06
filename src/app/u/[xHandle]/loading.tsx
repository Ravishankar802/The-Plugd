import { ChevronRight } from "lucide-react";

export default function Loading() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center">
      <div className="w-full max-w-5xl mx-auto px-4 md:px-8 pt-8">
        {/* Breadcrumb Skeleton */}
        <nav className="flex items-center gap-2 text-muted text-sm font-medium mb-8">
          <div className="w-12 h-4 bg-card animate-pulse rounded" />
          <ChevronRight className="w-4 h-4 opacity-20" />
          <div className="w-24 h-4 bg-card animate-pulse rounded" />
        </nav>

        {/* Main Profile Card Skeleton */}
        <div className="w-full bg-card border border-border rounded-2xl p-6 md:p-10 mb-6 relative overflow-hidden">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row justify-between items-start gap-6">
              <div className="flex items-center gap-6">
                {/* Avatar Skeleton */}
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-border animate-pulse shrink-0" />
                
                <div className="space-y-2">
                  <div className="w-48 h-8 bg-border animate-pulse rounded-lg" />
                  <div className="w-32 h-6 bg-border animate-pulse rounded-md opacity-60" />
                </div>
              </div>

              {/* Buttons Skeleton */}
              <div className="flex gap-3 w-full md:w-auto">
                <div className="h-10 w-24 bg-border animate-pulse rounded-lg" />
                <div className="h-10 w-32 bg-border animate-pulse rounded-lg" />
              </div>
            </div>

            {/* Bio Skeleton */}
            <div className="space-y-2 max-w-3xl">
              <div className="w-full h-4 bg-border animate-pulse rounded opacity-40" />
              <div className="w-5/6 h-4 bg-border animate-pulse rounded opacity-40" />
              <div className="w-4/6 h-4 bg-border animate-pulse rounded opacity-40" />
            </div>

            {/* Bottom Row Skeleton */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 pt-4">
              <div className="flex gap-2">
                <div className="w-20 h-8 bg-border animate-pulse rounded-full opacity-30" />
                <div className="w-24 h-8 bg-border animate-pulse rounded-full opacity-30" />
                <div className="w-16 h-8 bg-border animate-pulse rounded-full opacity-30" />
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-6 bg-border animate-pulse rounded opacity-40" />
                  <div className="h-6 w-[1px] bg-border mx-1" />
                  <div className="flex gap-2.5">
                    <div className="w-10 h-10 rounded-full bg-border animate-pulse opacity-20" />
                    <div className="w-10 h-10 rounded-full bg-border animate-pulse opacity-20" />
                    <div className="w-10 h-10 rounded-full bg-border animate-pulse opacity-20" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Claim Card Skeleton */}
        <div className="w-full bg-card border border-border rounded-2xl p-6 md:p-8 mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="w-32 h-6 bg-border animate-pulse rounded" />
            <div className="w-64 h-4 bg-border animate-pulse rounded opacity-40" />
          </div>
          <div className="w-44 h-12 bg-border animate-pulse rounded-xl" />
        </div>

        {/* Discover More Skeleton */}
        <section className="w-full mb-20">
          <div className="w-48 h-4 bg-card animate-pulse rounded mb-6 opacity-40" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-border animate-pulse" />
                  <div className="space-y-1">
                    <div className="w-24 h-4 bg-border animate-pulse rounded" />
                    <div className="w-16 h-3 bg-border animate-pulse rounded opacity-40" />
                  </div>
                </div>
                <div className="space-y-2 flex-1">
                  <div className="w-full h-3 bg-border animate-pulse rounded opacity-30" />
                  <div className="w-4/5 h-3 bg-border animate-pulse rounded opacity-30" />
                </div>
                <div className="pt-4 border-t border-border flex justify-center">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-border animate-pulse opacity-20" />
                    <div className="w-8 h-8 rounded-full bg-border animate-pulse opacity-20" />
                    <div className="w-8 h-8 rounded-full bg-border animate-pulse opacity-20" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
