import { Metadata } from "next";
import CourseSalesPageClient from "@/components/CourseSalesPageClient";
import { COURSES } from "@/lib/playbooks-data";

export const metadata: Metadata = {
  title: "HOW TO GET THE MAN OF YOUR DREAMS · Plugd Playbook",
  description:
    "A practical playbook for attraction, standards, confidence, communication, and building relationships with the kind of man you actually want.",
};

export const dynamic = "force-dynamic";

export default function WomenCoursePage() {
  return <CourseSalesPageClient course={COURSES.women} />;
}
