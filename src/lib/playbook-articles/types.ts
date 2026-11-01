export interface ArticleCallout {
  type: "prompt" | "checklist" | "quote" | "info";
  title?: string;
  code?: string;
  items?: string[];
  content?: string;
}

export interface ArticleChapter {
  id: string;
  number: number;
  title: string;
  paragraphs: string[];
  callout?: ArticleCallout;
}

export interface PlaybookArticle {
  slug: string;
  title: string;
  readingTime: string; // e.g. "25 min read"
  categoryName: string;
  categorySlug: string;
  thumbnail: string;
  publishedDate?: string;
  authorName: string;
  authorTitle?: string;
  introParagraphs: string[];
  chapters: ArticleChapter[];
  closingParagraphs?: string[];
}
