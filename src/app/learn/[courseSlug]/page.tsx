import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { cookies } from "next/headers";
import { BookOpen, ChevronRight, Layers, ArrowRight, Bookmark, Sparkles, CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import PendingPurchaseView from "@/components/PendingPurchaseView";
import WebBookReader from "@/components/WebBookReader";
import { getBookPages, ALL_BOOK_SLUGS } from "@/lib/book-content";
import { COURSES, Course } from "@/lib/playbooks-data";
import {
  getCustomerByAccessKey,
  hasUserAccessToCourse,
  getOrCreateCustomer,
  recordCoursePurchase,
} from "@/lib/playbooks";
import { dodoClient, isDodoConfigured, getDodoCourseProductId } from "@/lib/dodopayments";
import { IS_REVIEW_PHASE_FREE_ACCESS } from "@/lib/config";
import { getPlaybookPageCount, getChapterPageRange } from "@/lib/book-utils";

interface LearnPageProps {
  params: Promise<{
    courseSlug: string;
  }>;
  searchParams?: Promise<{
    session_id?: string;
    purchased?: string;
  }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: LearnPageProps) {
  const { courseSlug } = await params;
  const course = COURSES[courseSlug];
  if (!course) return { title: "Playbook · Plugd" };
  return {
    title: `${course.title} · Digital Book Edition · Plugd`,
    description: course.description,
  };
}

export default async function LearnCoursePage({ params, searchParams }: LearnPageProps) {
  const { courseSlug } = await params;
  const { session_id, purchased } = (await searchParams) || {};
  const course: Course = COURSES[courseSlug];

  if (!course) {
    notFound();
  }

  // Canonical redirect for legacy numbered slugs
  if (courseSlug === "ai-businesses-02" || courseSlug === "ai-businesses-01") {
    redirect(`/learn/${course.slug}`);
  }

  // Web Book Reader for complete online book reading experience
  if (ALL_BOOK_SLUGS.has(course.slug) || ALL_BOOK_SLUGS.has(courseSlug)) {
    const pages = await getBookPages(course.slug || courseSlug);
    return <WebBookReader courseSlug={course.slug} courseTitle={course.title} pages={pages} />;
  }

  // Server-side Authorization Check
  let hasAccess =
    Boolean(IS_REVIEW_PHASE_FREE_ACCESS) ||
    ALL_BOOK_SLUGS.has(course.slug) ||
    ALL_BOOK_SLUGS.has(courseSlug);
  let customer = null;
  try {
    const cookieStore = await cookies();
    const accessKey = cookieStore.get("plugd_access_key")?.value;
    if (accessKey) {
      customer = await getCustomerByAccessKey(accessKey);
      if (customer) {
        hasAccess =
          (await hasUserAccessToCourse(customer.id, course.slug, customer.email)) ||
          (await hasUserAccessToCourse(customer.id, courseSlug, customer.email));
      }
    }
  } catch (err) {
    console.error("[LEARN_AUTH_CHECK_ERROR]", err);
  }

  // Authoritative server-side verification for returning checkout session
  if (!hasAccess && session_id && typeof session_id === "string" && isDodoConfigured()) {
    try {
      const session = await dodoClient.checkoutSessions.retrieve(session_id);
      if (session?.payment_status === "succeeded" && session?.payment_id) {
        const payment = await dodoClient.payments.retrieve(session.payment_id);
        const expectedProductId = getDodoCourseProductId();
        const hasProduct = Array.isArray(payment.product_cart) && payment.product_cart.some(
          (item: any) => item?.product_id === expectedProductId
        );
        const isCorrectAmount = payment.total_amount === 300;
        const isCorrectCurrency = payment.currency?.toUpperCase() === "USD";
        const sessionMetadata = ((session as any)?.metadata || {}) as Record<string, string>;
        const paymentMetadata = (payment.metadata || {}) as Record<string, string>;
        const courseSlugMetadata = paymentMetadata.courseSlug || sessionMetadata.courseSlug;
        const isCorrectCourse =
          courseSlugMetadata === "men" ||
          courseSlugMetadata === course.slug ||
          courseSlugMetadata === courseSlug;

        if (hasProduct && isCorrectAmount && isCorrectCurrency && isCorrectCourse) {
          const sessionCustomerId = paymentMetadata.customerId || sessionMetadata.customerId;
          const sessionCustomerEmail = (paymentMetadata.customerEmail || sessionMetadata.customerEmail)?.trim().toLowerCase();
          const paymentCustomerEmail = (payment.customer?.email || session.customer_email || "").trim().toLowerCase();

          const hasValidCustomerMatch = Boolean(
            customer &&
            (
              (sessionCustomerId && customer.id === sessionCustomerId) ||
              (sessionCustomerEmail && customer.email.toLowerCase() === sessionCustomerEmail)
            ) &&
            (!paymentCustomerEmail || customer.email.toLowerCase() === paymentCustomerEmail)
          );

          if (hasValidCustomerMatch && customer) {
            const targetEmail = paymentCustomerEmail || customer.email || sessionCustomerEmail;
            if (targetEmail) {
              const targetCustomer = await getOrCreateCustomer(targetEmail);
              await recordCoursePurchase({
                customerId: targetCustomer.id,
                courseSlug: courseSlugMetadata || course.slug || "men",
                amount: 3.0,
                paymentId: payment.payment_id,
              });
              hasAccess = true;
            }
          }
        }
      }
    } catch (verifyErr: any) {
      console.warn("[CHECKOUT_RETURN_VERIFY_PENDING]", verifyErr?.message || verifyErr);
    }
  }

  if (!hasAccess) {
    if (session_id || purchased === "men" || purchased === course.slug || purchased === courseSlug) {
      return (
        <PendingPurchaseView
          courseSlug={course.slug}
          courseTitle={course.title}
        />
      );
    }

    const redirectTarget =
      course.slug === "men" || course.slug === "women"
        ? "/?checkout=true"
        : `/${course.slug}?checkout=true`;
    redirect(redirectTarget);
  }

  const firstLessonId = course.modules[0]?.lessons[0]?.id || "01-1";
  const totalPages = getPlaybookPageCount(course.price, course.slug);

  // Flattened chapters
  const allChapters: { id: string; title: string; moduleTitle: string; partNum: number; chapterNum: number }[] = [];
  let chNum = 0;
  course.modules?.forEach((m, mIdx) => {
    m.lessons?.forEach((l) => {
      allChapters.push({
        id: l.id,
        title: l.title,
        moduleTitle: m.title,
        partNum: mIdx + 1,
        chapterNum: ++chNum,
      });
    });
  });

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1c1917] font-sans antialiased">
      <Header activeCourse={course.slug} />

      <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        
        {/* Book Cover & Overview Card */}
        <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-10 shadow-xs mb-10">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
            
            {/* Book Spine / Cover Preview */}
            <div className="relative w-36 sm:w-44 aspect-[4/5] rounded-lg overflow-hidden shadow-xl border border-stone-200/90 bg-stone-900 shrink-0">
              <div className="w-full h-full p-4 flex flex-col justify-between text-white text-center bg-gradient-to-br from-stone-900 via-stone-800 to-stone-950">
                <span className="text-[9px] uppercase tracking-widest text-stone-400 font-mono">
                  PLUGD EDITION
                </span>
                <span className="font-sans text-xs font-bold leading-tight line-clamp-3">
                  {course.title}
                </span>
                <span className="text-[9px] text-stone-400 font-sans">
                  {totalPages} Pages
                </span>
              </div>
              <div className="absolute inset-y-0 left-0 w-2.5 bg-gradient-to-r from-black/30 to-transparent pointer-events-none" />
            </div>

            {/* Overview Details */}
            <div className="flex-1 space-y-3 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs text-stone-500">
                <span className="px-2.5 py-0.5 rounded-full bg-stone-100 border border-stone-200 font-mono text-[11px] font-semibold text-stone-800">
                  DIGITAL BOOK EDITION
                </span>
                <span>•</span>
                <span>{totalPages} Pages</span>
                <span>•</span>
                <span>{allChapters.length} Chapters</span>
              </div>

              <h1 className="font-sans text-2xl sm:text-4xl font-bold tracking-tight text-[#1c1917] leading-tight">
                {course.title}
              </h1>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans max-w-xl">
                {course.description}
              </p>

              <div className="pt-3">
                <Link
                  href={`/learn/${course.slug}/${firstLessonId}`}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#1c1917] hover:bg-stone-800 px-6 py-3 text-xs sm:text-sm font-semibold text-white shadow-xs transition-colors"
                >
                  <BookOpen className="h-4 w-4" />
                  <span>Start Reading Chapter 1</span>
                </Link>
              </div>
            </div>

          </div>
        </div>

        {/* Table of Contents / Index */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <h2 className="font-sans text-xl sm:text-2xl font-bold text-[#1c1917]">
              Table of Contents
            </h2>
            <span className="text-xs font-mono text-stone-500">
              Complete Manuscript · First Edition
            </span>
          </div>

          {/* Front Matter */}
          <div className="bg-white rounded-xl border border-stone-200 p-4 flex items-center justify-between text-xs text-stone-700 shadow-2xs">
            <div className="flex items-center gap-3">
              <Bookmark className="h-4 w-4 text-stone-400" />
              <div>
                <span className="font-bold text-stone-900 block font-sans">Front Matter</span>
                <span className="text-stone-500 text-[11px]">Cover, Title Page, Preface & Strategic Thesis</span>
              </div>
            </div>
            <span className="font-mono text-stone-400 text-[11px]">pp. 1 – 8</span>
          </div>

          {/* Parts and Chapters */}
          <div className="space-y-4">
            {course.modules.map((mod, mIdx) => (
              <div
                key={mod.id}
                className="rounded-xl border border-stone-200 bg-white overflow-hidden shadow-2xs"
              >
                {/* Part Header */}
                <div className="p-4 sm:p-5 bg-stone-50/70 border-b border-stone-100 flex items-baseline justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 font-mono block">
                      Part {mIdx + 1}
                    </span>
                    <h3 className="font-sans text-base sm:text-lg font-bold text-[#1c1917]">
                      {mod.title}
                    </h3>
                  </div>
                  <span className="text-xs text-stone-400 font-mono shrink-0">
                    {mod.lessons.length} Chapters
                  </span>
                </div>

                {/* Chapters list */}
                <div className="divide-y divide-stone-100">
                  {mod.lessons.map((lesson) => {
                    const chIdx = allChapters.findIndex((c) => c.id === lesson.id);
                    const range = getChapterPageRange(chIdx, allChapters.length, totalPages);

                    return (
                      <Link
                        key={lesson.id}
                        href={`/learn/${course.slug}/${lesson.id}`}
                        className="group p-3.5 sm:p-4 flex items-center justify-between gap-4 hover:bg-[#FAF8F5] transition-colors"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="font-mono text-xs text-stone-400 group-hover:text-stone-900 w-8 shrink-0">
                            {lesson.number}
                          </span>
                          <span className="font-sans text-xs sm:text-sm font-medium text-stone-800 group-hover:text-stone-950 truncate">
                            {lesson.title}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <span className="text-[11px] font-mono text-stone-400">
                            pp. {range.startPage} – {range.endPage}
                          </span>
                          <ChevronRight className="h-4 w-4 text-stone-300 group-hover:text-stone-600 transition-colors" />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

        </div>

      </main>
    </div>
  );
}
