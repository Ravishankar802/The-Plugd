"use client";

export default function AudienceFitSection() {
  const checklistItems = [
    {
      type: "yes",
      text: "You want to feel more confident around women and understand what creates genuine attraction.",
    },
    {
      type: "yes",
      text: "You want to approach, flirt, and start conversations without feeling like you're performing a character.",
    },
    {
      type: "yes",
      text: "You want to understand texting, dates, chemistry, and how to move things forward naturally.",
    },
    {
      type: "yes",
      text: "You want practical guidance for both casual dating and building a meaningful relationship.",
    },
    {
      type: "yes",
      text: "You're willing to learn, practise, communicate honestly, and accept that not every person will be interested.",
    },
    {
      type: "no",
      text: "Not for you if you're looking for magic lines, manipulation tactics, guaranteed results, or a way to make every woman want you.",
    },
  ];

  return (
    <section className="py-20 sm:py-28 border-b border-[#e7e5e4] bg-[#f6f6f4]">
      <div className="mx-auto max-w-[720px] px-6">
        {/* Section Heading */}
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1c1917]">
            Is The Dating Playbook right for you?
          </h2>
        </div>

        {/* Audience Fit Checklist Card */}
        <div className="rounded-2xl border border-[#e7e5e4] bg-white shadow-xs overflow-hidden">
          <ul className="divide-y divide-[#e7e5e4] list-none p-0 m-0">
            {checklistItems.map((item, idx) => {
              if (item.type === "yes") {
                return (
                  <li
                    key={idx}
                    className="py-4 px-5 sm:px-7 flex items-start gap-4 text-[15.5px] sm:text-[16px] text-[#1c1917] leading-relaxed"
                  >
                    <span
                      className="text-[#f97316] font-bold text-lg shrink-0 select-none pt-0.5"
                      aria-hidden="true"
                    >
                      ✓
                    </span>
                    <span>{item.text}</span>
                  </li>
                );
              }

              return (
                <li
                  key={idx}
                  className="py-4 px-5 sm:px-7 flex items-start gap-4 text-[14.5px] sm:text-[15px] text-[#78716c] leading-relaxed bg-[#fafaf9]"
                >
                  <span
                    className="text-[#a8a29e] font-bold text-base shrink-0 select-none pt-0.5"
                    aria-hidden="true"
                  >
                    ✕
                  </span>
                  <span>{item.text}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
