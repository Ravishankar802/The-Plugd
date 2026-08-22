"use client";

interface SupportSoonModalProps {
  open: boolean;
  onClose: () => void;
  creatorName: string;
  itemName: string;
}

export default function SupportSoonModal({
  open,
  onClose,
  creatorName,
  itemName,
}: SupportSoonModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close support modal"
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      <div className="relative z-10 w-full max-w-md rounded-[28px] border border-zinc-800 bg-zinc-950 p-6 text-zinc-100 shadow-2xl">
        <div className="mb-4 inline-flex rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-300">
          Support coming soon
        </div>
        <h3 className="text-2xl font-bold text-white">Support {creatorName}</h3>
        <p className="mt-3 text-sm leading-6 text-zinc-400">
          Payments for <span className="font-semibold text-zinc-200">{itemName}</span> will be available soon. For this phase, the wishlist is live and the support flow is intentionally still a placeholder.
        </p>
        <button
          type="button"
          onClick={onClose}
          className="mt-6 h-11 rounded-2xl bg-orange-500 px-5 text-sm font-bold text-black transition hover:bg-orange-400"
        >
          Close
        </button>
      </div>
    </div>
  );
}
