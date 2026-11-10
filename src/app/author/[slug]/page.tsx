import { notFound } from "next/navigation";
import type { Metadata } from "next";
import AuthorChannelView from "@/components/AuthorChannelView";
import { getAllAuthors, getAuthorBySlug } from "@/lib/authors";

interface AuthorPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const authors = getAllAuthors();
  return authors.map((author) => ({
    slug: author.slug,
  }));
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);

  if (!author) {
    return {
      title: "Author Not Found · Plugd Playbooks",
    };
  }

  return {
    title: `${author.name} (@${author.slug}) · Plugd Playbooks`,
    description: `${author.name}'s digital playbooks on Plugd. ${author.followersCount} · ${author.playbooksCount} playbooks. ${author.bio}`,
    openGraph: {
      title: `${author.name} · Plugd Playbooks`,
      description: `${author.name}'s verified playbooks on Plugd. ${author.followersCount}.`,
      type: "profile",
    },
    twitter: {
      card: "summary",
      title: `${author.name} · Plugd Playbooks`,
      description: `${author.name} on Plugd. ${author.followersCount} · ${author.playbooksCount} playbooks.`,
    },
  };
}

export default async function AuthorPageRoute({ params }: AuthorPageProps) {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);

  if (!author) {
    notFound();
  }

  return <AuthorChannelView author={author} />;
}
