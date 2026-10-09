import { notFound } from "next/navigation";
import { Metadata } from "next";
import SlideViewer from "@/components/SlideViewer";
import { getLesson, getNextLesson, getPreviousLesson, COURSES } from "@/lib/playbooks-data";

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
  const course = COURSES[courseSlug as "men" | "women"];
  if (!course) return { title: "Lesson · Plugd" };

  const data = getLesson(courseSlug as "men" | "women", lessonId);
  if (!data) return { title: `${course.title} · Plugd` };

  return {
    title: `${data.lesson.number} ${data.lesson.title} · ${course.shortTitle} · Plugd`,
    description: data.lesson.summary,
  };
}

export default async function LessonPresentationPage({ params, searchParams }: LessonPageProps) {
  const { courseSlug, lessonId } = await params;
  const { format } = (await searchParams) || {};
  const validSlug = courseSlug as "men" | "women";

  if (!COURSES[validSlug]) {
    notFound();
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
