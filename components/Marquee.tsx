"use client";

export default function Marquee({ text, direction = "left" }: { text: string; direction?: "left" | "right" }) {
  const repeated = `${text} — `.repeat(10);

  return (
    <div className="overflow-hidden py-6 border-y border-white/5 bg-[#030303]">
      <div
        className="whitespace-nowrap animate-marquee"
        style={{ animationDirection: direction === "right" ? "reverse" : "normal" }}
      >
        <span className="font-heading text-5xl md:text-7xl text-white/[0.03] tracking-wider">
          {repeated}
        </span>
      </div>
    </div>
  );
}
