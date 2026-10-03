import { notFound } from "next/navigation";
import { getTemplateById, TEMPLATES } from "@/lib/templates";
import TemplateDetailPageClient from "@/components/marketplace/TemplateDetailPageClient";

interface TemplatePageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: TemplatePageProps) {
  const { slug } = await params;
  const template = TEMPLATES.find((t) => t.slug === slug || t.id === slug);

  if (!template) {
    return { title: "Template · Plugd Marketplace" };
  }

  return {
    title: `${template.name} — Experience Template · Plugd`,
    description: template.tagline,
  };
}

export default async function TemplatePage({ params }: TemplatePageProps) {
  const { slug } = await params;
  const template = TEMPLATES.find((t) => t.slug === slug || t.id === slug);

  if (!template) {
    notFound();
  }

  return <TemplateDetailPageClient template={template} />;
}
