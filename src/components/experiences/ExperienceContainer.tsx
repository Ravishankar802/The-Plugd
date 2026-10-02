"use client";

import RomanticExperience from "./RomanticExperience";

interface ExperienceContainerProps {
  gift: {
    slug: string;
    target: string;
    mood?: string;
    recipientName: string | null;
    senderName: string | null;
    customNote: string | null;
    responseChoice?: string | null;
  };
}

export default function ExperienceContainer({ gift }: ExperienceContainerProps) {
  // In the future, we can add:
  // if (gift.mood === "chaotic") return <ChaoticExperience gift={gift} />;
  // if (gift.mood === "cute") return <CuteExperience gift={gift} />;
  // etc.
  // For now, RomanticExperience serves as the flagship, highly-polished experience foundation.
  return <RomanticExperience gift={gift} />;
}
