import { notFound, redirect } from "next/navigation";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { cache } from "react";
import SlideViewer from "@/components/SlideViewer";
import { getLesson, getNextLesson, getPreviousLesson, COURSES } from "@/lib/playbooks-data";
import { getCustomerByAccessKey, hasUserAccessToCourse } from "@/lib/playbooks";

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

const checkLessonAccess = cache(async (accessKey?: string): Promise<boolean> => {
  if (!accessKey) return false;
  try {
    const customer = await getCustomerByAccessKey(accessKey);
    if (customer) {
      return await hasUserAccessToCourse(customer.id, "men", customer.email);
    }
  } catch (err) {
    console.error("[LESSON_AUTH_CHECK_ERROR]", err);
  }
  return false;
});

export async function generateMetadata({ params }: LessonPageProps): Promise<Metadata> {
  const { courseSlug, lessonId } = await params;
  const course = COURSES[courseSlug as "men" | "women"] || COURSES.men;
  if (!course) return { title: "Lesson · The Dating Playbook" };

  let accessKey: string | undefined;
  try {
    const cookieStore = await cookies();
    accessKey = cookieStore.get("plugd_access_key")?.value;
  } catch (err) {
    console.error("[LESSON_METADATA_COOKIE_ERROR]", err);
  }

  const hasAccess = await checkLessonAccess(accessKey);

  if (!hasAccess) {
    return {
      title: "The Dating Playbook — Lesson",
      description: "Sign in to access your copy of The Dating Playbook.",
      openGraph: {
        title: "The Dating Playbook — Lesson",
        description: "Sign in to access your copy of The Dating Playbook.",
      },
      twitter: {
        title: "The Dating Playbook — Lesson",
        description: "Sign in to access your copy of The Dating Playbook.",
      },
    };
  }

  const data = getLesson(courseSlug, lessonId);
  if (!data) return { title: `${course.title} · The Dating Playbook` };

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
  const validSlug = courseSlug as "men" | "women";

  const course = COURSES[validSlug] || COURSES.men;
  if (!course) {
    notFound();
  }

  // Server-side Authorization Check
  let accessKey: string | undefined;
  try {
    const cookieStore = await cookies();
    accessKey = cookieStore.get("plugd_access_key")?.value;
  } catch (err) {
    console.error("[LESSON_PAGE_COOKIE_ERROR]", err);
  }

  const hasAccess = await checkLessonAccess(accessKey);

  if (!hasAccess) {
    redirect(`/?checkout=true&lesson=${lessonId}`);
  }

  const data = getLesson(validSlug, lessonId);
  if (!data) {
    notFound();
  }

  const nextLesson = getNextLesson(validSlug, data.lesson.id);
  const previousLesson = getPreviousLesson(validSlug, data.lesson.id);

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
