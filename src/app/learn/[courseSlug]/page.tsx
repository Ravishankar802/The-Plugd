import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Play, Clock, BookOpen, Layers, CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import { COURSES, Course } from "@/lib/playbooks-data";

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

  const firstLessonId = course.modules[0]?.lessons[0]?.id || "01";
  const totalLessons = course.modules.reduce(
    (sum, m) => sum + (m.lessons?.length || m.lessonsCount),
    0
  );

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#0E0E10] font-sans antialiased selection:bg-[#FF5500] selection:text-white">
      <div className="fixed inset-0 bg-subtle-grid opacity-70 pointer-events-none -z-10" />

      <Header activeCourse={course.slug} />

      <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        {/* Back Link */}
        <Link
          href="/my-playbooks"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#646059] hover:text-[#0E0E10] mb-8 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to My Playbooks</span>
        </Link>

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
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-[#FF5500]" />
              <span>{course.hoursOfMaterial} RUNTIME</span>
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
                  <Link
                    key={lesson.id}
                    href={`/learn/${course.slug}/${lesson.id}`}
                    className="group flex items-center justify-between gap-4 rounded-2xl border border-transparent p-3.5 transition-all hover:border-[#E6E1D7] hover:bg-[#FAF8F5]"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-semibold text-[#8E8A82] group-hover:text-[#0E0E10] w-12">
                        {lesson.number}
                      </span>
                      <span className="text-sm font-semibold text-[#0E0E10] group-hover:text-[#FF5500] transition-colors">
                        {lesson.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[11px] text-[#8E8A82]">
                        {lesson.duration}
                      </span>
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F2EFE9] group-hover:bg-[#0E0E10] group-hover:text-white transition-colors">
                        <Play className="h-3 w-3 fill-current ml-0.5" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
