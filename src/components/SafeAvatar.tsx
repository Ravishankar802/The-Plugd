"use client";

import { useState } from "react";
import { User } from "lucide-react";

interface SafeAvatarProps {
  src: string | null;
  alt: string;
  className?: string;
  fallbackSize?: number;
}

export default function SafeAvatar({ src, alt, className = "", fallbackSize = 24 }: SafeAvatarProps) {
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <div className={`flex items-center justify-center bg-pill border border-border ${className}`}>
        <User size={fallbackSize} className="text-muted/40" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
    />
  );
}
