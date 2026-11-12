import { notFound, redirect } from "next/navigation";
import { Metadata } from "next";
import { cookies } from "next/headers";
import SlideViewer from "@/components/SlideViewer";
import { getLesson, getNextLesson, getPreviousLesson, COURSES } from "@/lib/playbooks-data";
import { checkPlaybookAccess } from "@/lib/playbooks";

interface LessonPageProps {
  params: Promise<{
    courseSlug: string;
    lessonId: string;
  }>;
  searchParams?: Promise<{
    format?: string;
    slide?: string;
  }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: LessonPageProps): Promise<Metadata> {
  const { courseSlug, lessonId } = await params;
  const course = COURSES[courseSlug] || COURSES.men;
  if (!course) return { title: "Lesson · Plugd" };

  let accessKey: string | undefined;
  try {
    const cookieStore = await cookies();
    accessKey = cookieStore.get("plugd_access_key")?.value;
  } catch (err) {
    console.error("[LESSON_METADATA_COOKIE_ERROR]", err);
  }

  const hasAccess = await checkPlaybookAccess(accessKey, course.slug);

  if (!hasAccess) {
    return {
      title: `${course.title} — Lesson`,
      description: `Sign in to access your copy of ${course.title}.`,
      openGraph: {
        title: `${course.title} — Lesson`,
        description: `Sign in to access your copy of ${course.title}.`,
      },
      twitter: {
        title: `${course.title} — Lesson`,
        description: `Sign in to access your copy of ${course.title}.`,
      },
    };
  }

  const data = getLesson(courseSlug, lessonId);
  if (!data) return { title: `${course.title} · Plugd` };

  return {
    title: `${data.lesson.number} ${data.lesson.title} · ${course.title}`,
    description: data.lesson.summary,
    openGraph: {
      title: `${data.lesson.number} ${data.lesson.title} · ${course.title}`,
      description: data.lesson.summary,
    },
    twitter: {
      title: `${data.lesson.number} ${data.lesson.title} · ${course.title}`,
      description: data.lesson.summary,
    },
  };
}

export default async function LessonPresentationPage({ params, searchParams }: LessonPageProps) {
  const { courseSlug, lessonId } = await params;
  const { format, slide } = (await searchParams) || {};

  const course = COURSES[courseSlug] || COURSES.men;
  if (!course) {
    notFound();
  }

  // Canonical redirect for legacy numbered slugs
  if (courseSlug === "ai-businesses-02" || courseSlug === "ai-businesses-01") {
    redirect(`/learn/${course.slug}/${lessonId}`);
  }

  // Server-side Authorization Check: strictly enforces ownership
  let accessKey: string | undefined;
  try {
    const cookieStore = await cookies();
    accessKey = cookieStore.get("plugd_access_key")?.value;
  } catch (err) {
    console.error("[LESSON_PAGE_COOKIE_ERROR]", err);
  }

  const hasAccess = await checkPlaybookAccess(accessKey, course.slug);

  if (!hasAccess) {
    const redirectBase =
      course.slug === "men" || course.slug === "women" ? "dating-playbook" : course.slug;
    redirect(`/${redirectBase}?checkout=true&lesson=${lessonId}`);
  }

  const data = getLesson(courseSlug, lessonId);
  if (!data) {
    notFound();
  }

  const nextLesson = getNextLesson(courseSlug, data.lesson.id);
  const previousLesson = getPreviousLesson(courseSlug, data.lesson.id);

  const totalSlides = data.lesson.slides?.length || 1;
  let initialSlideIndex = 0;
  if (slide === "last" || slide === "final") {
    initialSlideIndex = Math.max(0, totalSlides - 1);
  } else if (slide !== undefined && !isNaN(parseInt(slide, 10))) {
    initialSlideIndex = Math.min(Math.max(0, parseInt(slide, 10)), totalSlides - 1);
  }

  return (
    <SlideViewer
      key={`${data.lesson.id}-${initialSlideIndex}`}
      course={data.course}
      module={data.module}
      lesson={data.lesson}
      nextLesson={nextLesson}
      previousLesson={previousLesson}
      initialSlideIndex={initialSlideIndex}
      initialFormat={format === "written" ? "written" : "presentation"}
    />
  );
}
