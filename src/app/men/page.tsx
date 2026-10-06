import { Metadata } from "next";
import CourseSalesPageClient from "@/components/CourseSalesPageClient";
import { COURSES } from "@/lib/playbooks-data";

export const metadata: Metadata = {
  title: "HOW TO DATE THE HOTTEST WOMEN · Plugd Playbook",
  description:
    "A practical playbook for men who want to become more attractive, confident, socially capable, and genuinely better at dating.",
};

export const dynamic = "force-dynamic";

export default function MenCoursePage() {
  return <CourseSalesPageClient course={COURSES.men} />;
}
