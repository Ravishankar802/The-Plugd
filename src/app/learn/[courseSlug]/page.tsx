import { notFound, redirect } from "next/navigation";
import PlaybookArticleReader from "@/components/PlaybookArticleReader";
import { getPlaybookArticle } from "@/lib/playbook-articles";
import { ALL_PLAYBOOK_SUMMARIES } from "@/lib/playbooks-catalog";
import { COURSES, Course } from "@/lib/playbooks-data";

interface LearnPageProps {
  params: Promise<{
    courseSlug: string;
  }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: LearnPageProps) {
  const { courseSlug } = await params;
  const course = COURSES[courseSlug];
  if (!course) return { title: "Playbook · Plugd" };
  return {
    title: `${course.title} · Playbook Guide · Plugd`,
    description: course.description,
  };
}

export default async function LearnCoursePage({ params }: LearnPageProps) {
  const { courseSlug } = await params;
  const course: Course = COURSES[courseSlug];

  if (!course) {
    notFound();
  }

  // Canonical redirect for legacy numbered slugs
  if (courseSlug === "ai-businesses-02" || courseSlug === "ai-businesses-01") {
    redirect(`/learn/${course.slug}`);
  }

  // Playbook Article Reader (Medium-style full article experience)
  const article = getPlaybookArticle(course.slug || courseSlug);
  const catalogEntry = ALL_PLAYBOOK_SUMMARIES.find(
    (p) => p.slug === course.slug || p.slug === courseSlug
  );
  const thumbnail =
    article?.thumbnail ||
    catalogEntry?.thumbnail ||
    (course as any).thumbnail ||
    "https://res.cloudinary.com/cy3gfawr/image/upload/v1793015288/How_to_Build_10K_Websites_in_Minutes_Claude_AI.png";

  return (
    <PlaybookArticleReader
      slug={course.slug}
      title={course.title}
      thumbnail={thumbnail}
      categoryName={course.categoryName || catalogEntry?.categoryName || "AI Businesses"}
      readingTime={article?.readingTime || "25 min read"}
      article={article}
    />
  );
}
