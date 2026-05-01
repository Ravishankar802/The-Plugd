"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/dashboard/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.found) {
          localStorage.setItem("plugd_user_email", email.trim());
          router.push("/dashboard");
        }
      } else {
        const data = await res.json();
        setError(data.found === false ? "No account found with this email. Get listed first." : "Something went wrong.");
      }
    } catch (err) {
      setError("Failed to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#111111] border border-[#2a2a2a] rounded-2xl p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-white mb-2">Access Your Dashboard</h1>
          <p className="text-[#a1a1aa] text-sm">Enter the email you used when getting listed.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <input
              required
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#0f0f0f] border border-[#2a2a2a] rounded-xl px-5 py-4 text-white placeholder:text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-600 transition-all"
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            disabled={loading || !email}
            type="submit"
            className="w-full bg-white text-black font-bold py-4 rounded-xl transition-all hover:bg-gray-100 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Continue"}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-[#2a2a2a] text-center">
          <Link 
            href="/" 
            className="text-[#a1a1aa] hover:text-white transition-colors text-sm flex items-center justify-center gap-2"
          >
            Not listed yet? Add your account <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
