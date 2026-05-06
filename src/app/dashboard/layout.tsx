import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  if (!session.isPaid) {
    redirect("/login?error=not_paid");
  }

  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  );
}
