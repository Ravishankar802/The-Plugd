import { notFound, redirect } from "next/navigation";
import { Metadata } from "next";
import { cookies } from "next/headers";
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
  }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: LessonPageProps): Promise<Metadata> {
  const { courseSlug, lessonId } = await params;
  const course = COURSES[courseSlug as "men" | "women"] || COURSES.men;
  if (!course) return { title: "Lesson · The Dating Playbook" };

  const data = getLesson(courseSlug, lessonId);
  if (!data) return { title: `${course.title} · The Dating Playbook` };

  return {
    title: `${data.lesson.number} ${data.lesson.title} · ${course.title}`,
    description: data.lesson.summary,
  };
}

export default async function LessonPresentationPage({ params, searchParams }: LessonPageProps) {
  const { courseSlug, lessonId } = await params;
  const { format } = (await searchParams) || {};
  const validSlug = courseSlug as "men" | "women";

  const course = COURSES[validSlug] || COURSES.men;
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
    console.error("[LESSON_AUTH_CHECK_ERROR]", err);
  }

  if (!hasAccess) {
    redirect(`/?checkout=true&lesson=${lessonId}`);
  }

  const data = getLesson(validSlug, lessonId);
  if (!data) {
    notFound();
  }

  const nextLesson = getNextLesson(validSlug, data.lesson.id);
  const previousLesson = getPreviousLesson(validSlug, data.lesson.id);

  return (
    <SlideViewer
      course={data.course}
      module={data.module}
      lesson={data.lesson}
      nextLesson={nextLesson}
      previousLesson={previousLesson}
      initialFormat={format === "written" ? "written" : "presentation"}
    />
  );
}
