import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "ravx003@gmail.com";
  
  if (session.email.toLowerCase() !== adminEmail.toLowerCase()) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1400px] mx-auto p-6 md:p-12">
        {children}
      </div>
    </div>
  );
}
