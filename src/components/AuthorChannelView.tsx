"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import PlaybookFeedCard from "@/components/PlaybookFeedCard";
import type { AuthorDetails } from "@/lib/authors";
import { isFollowingAuthor as checkIsFollowing, followAuthor, unfollowAuthor } from "@/lib/following-store";
import { BookOpen, Check } from "lucide-react";

interface AuthorChannelViewProps {
  author: AuthorDetails;
}

export default function AuthorChannelView({ author }: AuthorChannelViewProps) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [showUnfollowModal, setShowUnfollowModal] = useState(false);

  useEffect(() => {
    setIsFollowing(checkIsFollowing(author.name));
    const handleFollowingChange = () => {
      setIsFollowing(checkIsFollowing(author.name));
    };
    window.addEventListener("plugd-following-change", handleFollowingChange);
    return () => {
      window.removeEventListener("plugd-following-change", handleFollowingChange);
    };
  }, [author.name]);

  const initial = author.name.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-[#e7e4dd] text-[#1c1917] font-sans antialiased flex flex-col justify-between selection:bg-[#2563eb] selection:text-white">
      <div>
        {/* Top Sticky Header */}
        <Header variant="platform" showSearch={false} />

        <main className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-10 pt-6 sm:pt-10 pb-20">
          {/* Creator Profile Banner / YouTube-Style Channel Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-7 pb-8 border-b border-[#dcd8d0]">
            {/* Avatar Circle */}
            <div
              className="h-24 w-24 sm:h-32 sm:w-32 rounded-full text-white flex items-center justify-center font-bold text-3xl sm:text-5xl shadow-md shrink-0 uppercase select-none ring-4 ring-white/60"
              style={{ backgroundColor: author.avatarBg }}
              aria-hidden="true"
            >
              {initial}
            </div>

            {/* Creator Information & Follow Action */}
            <div className="flex-1 space-y-2 min-w-0">
              {/* Creator Name + Verified Checkmark */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1c1917] flex items-center gap-2 sm:gap-2.5 tracking-tight">
                <span>{author.name}</span>
                <span
                  className="inline-flex items-center justify-center h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-stone-800 text-white text-[11px] sm:text-xs shrink-0 shadow-2xs"
                  title="Verified Creator"
                  aria-label="Verified Creator"
                >
                  ✓
                </span>
              </h1>

              {/* Handle & Audience Stats Line */}
              <p className="text-xs sm:text-[13.5px] font-medium text-[#78716c] flex items-center gap-2 flex-wrap">
                <span className="text-[#44403c] font-semibold">{author.handle}</span>
                <span>•</span>
                <span>{author.followersCount}</span>
                <span>•</span>
                <span>
                  {author.playbooksCount}{" "}
                  {author.playbooksCount === 1 ? "playbook" : "playbooks"}
                </span>
              </p>

              {/* Follow / Following Button (YouTube Subscribe Style) */}
              <div className="pt-2">
                {isFollowing ? (
                  <button
                    type="button"
                    onClick={() => setShowUnfollowModal(true)}
                    className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-xs sm:text-[13px] font-semibold bg-[#ded9d0] hover:bg-[#d4cebf] text-[#1c1917] border border-[#d6d3d1] transition-all cursor-pointer shadow-2xs"
                  >
                    <Check className="h-3.5 w-3.5 text-[#1c1917]" />
                    <span>Following</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      followAuthor({
                        name: author.name,
                        avatarBg: author.avatarBg,
                        slug: author.slug,
                      });
                      setIsFollowing(true);
                    }}
                    className="inline-flex items-center px-5 sm:px-6 py-2 rounded-full text-xs sm:text-[13px] font-semibold bg-[#1c1917] hover:bg-[#2563eb] text-white transition-all cursor-pointer shadow-xs"
                  >
                    Follow
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* YouTube-Style Navigation Tabs */}
          <div className="mt-4 sm:mt-6 border-b border-[#dcd8d0] flex items-center gap-6 text-sm">
            <button
              type="button"
              className="font-semibold text-[#1c1917] border-b-2 border-[#1c1917] pb-3 px-1 inline-flex items-center gap-2 cursor-pointer"
            >
              <BookOpen className="h-4 w-4" />
              <span>Playbooks</span>
            </button>
          </div>

          {/* Playbooks Section */}
          <section className="pt-6 sm:pt-8 space-y-4 sm:space-y-5" aria-label={`Playbooks by ${author.name}`}>
            <div className="flex items-center justify-between">
              <h2 className="text-base sm:text-lg font-bold text-[#1c1917]">
                Playbooks | {author.name}
              </h2>
              <span className="text-xs font-semibold text-[#78716c]">
                {author.playbooks.length}{" "}
                {author.playbooks.length === 1 ? "Playbook" : "Playbooks"}
              </span>
            </div>

            {/* Playbooks Grid (Matches Homepage Cards) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
              {author.playbooks.map((p) => (
                <PlaybookFeedCard key={p.id} playbook={p} />
              ))}
            </div>
          </section>
        </main>
      </div>

      {/* Unfollow Confirmation Modal */}
      {showUnfollowModal && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-2xs flex items-center justify-center p-4"
          onClick={() => setShowUnfollowModal(false)}
        >
          <div
            className="w-full max-w-sm rounded-2xl bg-white p-5 sm:p-6 border border-[#dcd8d0] shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="pt-1">
              <p className="text-sm sm:text-[15px] font-medium text-[#1c1917] leading-snug">
                Are you sure you want to unfollow {author.name}?
              </p>
            </div>
            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setShowUnfollowModal(false)}
                className="px-4 py-2 rounded-xl border border-[#d6d3d1] text-xs font-semibold text-[#57534e] hover:bg-black/5 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  unfollowAuthor(author.name);
                  setIsFollowing(false);
                  setShowUnfollowModal(false);
                }}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold transition-colors shadow-xs cursor-pointer"
              >
                Unfollow
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
