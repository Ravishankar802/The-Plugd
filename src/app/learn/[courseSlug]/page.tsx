import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { cookies } from "next/headers";
import { Play, BookOpen, Layers, Presentation } from "lucide-react";
import Header from "@/components/Header";
import { COURSES, Course } from "@/lib/playbooks-data";
import { getCustomerByAccessKey, hasUserAccessToCourse } from "@/lib/playbooks";

interface LearnPageProps {
  params: Promise<{
    courseSlug: string;
  }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: LearnPageProps) {
  const { courseSlug } = await params;
  const course = COURSES[courseSlug as "men" | "women"];
  if (!course) return { title: "Course · Plugd" };
  return {
    title: `${course.title} · Syllabus · Plugd`,
    description: course.description,
  };
}

export default async function LearnCoursePage({ params }: LearnPageProps) {
  const { courseSlug } = await params;
  const course: Course = COURSES[courseSlug as "men" | "women"];

  if (!course) {
    notFound();
  }

  // Server-side Authorization Check
  let hasAccess = false;
  try {
    const cookieStore = await cookies();
    const accessKey = cookieStore.get("plugd_access_key")?.value;
    if (accessKey) {
      const customer = await getCustomerByAccessKey(accessKey);
      if (customer) {
        hasAccess = await hasUserAccessToCourse(customer.id, "men", customer.email);
      }
    }
  } catch (err) {
    console.error("[LEARN_AUTH_CHECK_ERROR]", err);
  }

  if (!hasAccess) {
    redirect("/?checkout=true");
  }

  const firstLessonId = course.modules[0]?.lessons[0]?.id || "01-1";
  const totalLessons = course.modules.reduce(
    (sum, m) => sum + (m.lessons?.length || m.lessonsCount),
    0
  );

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#0E0E10] font-sans antialiased selection:bg-[#FF5500] selection:text-white">
      <div className="fixed inset-0 bg-subtle-grid opacity-70 pointer-events-none -z-10" />

      <Header activeCourse={course.slug} />

      <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* Course Banner Card */}
        <div className="rounded-3xl border border-[#E6E1D7] bg-white p-8 sm:p-12 shadow-sm mb-12">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
            <div>
              <span className="inline-block rounded-full bg-[#FAF8F5] border border-[#E6E1D7] px-3.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-[#FF5500] mb-4">
                {course.shortTitle} · OFFICIAL SYLLABUS
              </span>
              <h1 className="font-editorial-title text-3xl sm:text-5xl font-black tracking-tight text-[#0E0E10] mb-4 leading-tight">
                {course.title}
              </h1>
              <p className="text-base text-[#646059] max-w-2xl leading-relaxed">
                {course.description}
              </p>
            </div>

            <Link
              href={`/learn/${course.slug}/${firstLessonId}`}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#0E0E10] px-8 py-4 text-sm font-bold text-white shadow-md transition-all hover:bg-neutral-800 hover:scale-105 shrink-0 self-start"
            >
              <Play className="h-4 w-4 fill-white" />
              <span>Start Presentation</span>
            </Link>
          </div>

          {/* Stats Bar */}
          <div className="mt-8 flex flex-wrap items-center gap-8 border-t border-[#EFECE6] pt-6 text-xs font-mono text-[#646059]">
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-[#FF5500]" />
              <span>{course.modules.length} MODULES</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-[#FF5500]" />
              <span>{totalLessons} LESSONS</span>
            </div>
          </div>
        </div>

        {/* Modules & Lessons List */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold tracking-tight text-[#0E0E10] mb-6">
            Course Curriculum & Slide Decks
          </h2>

          {course.modules.map((mod) => (
            <div
              key={mod.id}
              className="rounded-3xl border border-[#E6E1D7] bg-white p-6 sm:p-8 shadow-xs"
            >
              {/* Module Header */}
              <div className="flex items-start justify-between gap-4 border-b border-[#EFECE6] pb-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs font-bold text-[#FF5500]">
                      MODULE {mod.number}
                    </span>
                    <span className="text-neutral-400">•</span>
                    <span className="text-xs font-mono text-[#8E8A82]">
                      {mod.duration}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[#0E0E10]">
                    {mod.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#646059] mt-1">
                    {mod.description}
                  </p>
                </div>
              </div>

              {/* Lessons inside Module */}
              <div className="space-y-2">
                {mod.lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 rounded-2xl border border-transparent p-3 sm:p-3.5 transition-all hover:border-[#E6E1D7] hover:bg-[#FAF8F5]"
                  >
                    <Link
                      href={`/learn/${course.slug}/${lesson.id}`}
                      className="flex items-center gap-3 flex-1 min-w-0"
                    >
                      <span className="font-mono text-xs font-semibold text-[#8E8A82] group-hover:text-[#0E0E10] w-12 shrink-0">
                        {lesson.number}
                      </span>
                      <span className="text-sm font-semibold text-[#0E0E10] group-hover:text-[#FF5500] transition-colors truncate">
                        {lesson.title}
                      </span>
                    </Link>

                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                      <span className="font-mono text-[11px] text-[#8E8A82] mr-1 hidden md:inline">
                        {lesson.duration}
                      </span>

                      {/* Presentation Link */}
                      <Link
                        href={`/learn/${course.slug}/${lesson.id}?format=presentation`}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-[#E6E1D7] bg-white text-xs font-medium text-[#646059] hover:text-[#0E0E10] hover:border-[#0E0E10] transition-colors shadow-xs"
                        title="View presentation slides"
                      >
                        <Presentation className="h-3.5 w-3.5 text-[#646059]" />
                        <span>Slides</span>
                      </Link>

                      {/* Written Lesson Link */}
                      <Link
                        href={`/learn/${course.slug}/${lesson.id}?format=written`}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-[#E6E1D7] bg-white text-xs font-medium text-[#646059] hover:text-[#FF5500] hover:border-[#FF5500] transition-colors shadow-xs"
                        title="Read written lesson"
                      >
                        <BookOpen className="h-3.5 w-3.5 text-[#FF5500]" />
                        <span>Written</span>
                      </Link>

                      {/* Play Action */}
                      <Link
                        href={`/learn/${course.slug}/${lesson.id}`}
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F2EFE9] group-hover:bg-[#0E0E10] group-hover:text-white transition-colors"
                        title="Start lesson"
                      >
                        <Play className="h-3 w-3 fill-current ml-0.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
