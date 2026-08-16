/**
 * RenoEstimate SG about page.
 * Design note: warm editorial utility with direct, transparent explanatory content.
 */
import { Seo } from "@/components/Seo";
import { Calculator, MessageSquareText, ScanLine } from "lucide-react";

const principles = [
  { icon: Calculator, title: "Start with a working range", text: "Early planning is easier when a broad number becomes a visible range you can discuss and refine." },
  { icon: ScanLine, title: "Show the moving parts", text: "The calculator separates the larger cost categories so your assumptions are easier to recognise and adjust." },
  { icon: MessageSquareText, title: "Keep quotes in context", text: "A real quotation depends on details. This tool is designed to help you ask clearer questions, not replace contractor advice." },
];

export default function About() {
  return (
    <>
      <Seo title="About RenoEstimate SG | Renovation Budget Planning" description="Learn how RenoEstimate SG helps HDB and BTO homeowners form a practical early renovation budget in Singapore." path="/about" />
      <section className="border-b border-[#e8e1da] bg-[#f6f1ea]">
        <div className="container py-16 sm:py-24">
          <p className="eyebrow">About RenoEstimate SG</p>
          <h1 className="mt-4 max-w-3xl font-display text-5xl font-semibold leading-[0.97] tracking-[-0.055em] sm:text-6xl">Renovation planning should feel less opaque.</h1>
          <p className="mt-7 max-w-2xl text-base leading-7 text-[#625b55] sm:text-lg">RenoEstimate SG is a simple browser-based calculator for Singapore homeowners who want an early, practical view of their HDB or BTO renovation budget.</p>
        </div>
      </section>

      <section className="container py-14 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <p className="eyebrow">Why it exists</p>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-[-0.05em]">One clear first step.</h2>
          </div>
          <div className="space-y-5 text-base leading-7 text-[#625b55]">
            <p>A renovation quote only becomes meaningful after someone understands your layout, specifications, materials and site conditions. Before that point, homeowners often need a sensible range to shape their plans.</p>
            <p>This calculator translates broad choices—flat size, renovation level, carpentry, flooring and essential works—into an estimate that is simple enough to revisit. It does not collect your renovation details or require an account.</p>
          </div>
        </div>
      </section>

      <section className="border-y border-[#e8e1da] bg-white">
        <div className="container py-14 sm:py-20">
          <p className="eyebrow">The guiding principles</p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {principles.map(({ icon: Icon, title, text }, index) => (
              <article key={title} className="border-t border-[#d9cec5] pt-5">
                <div className="mb-9 flex items-center justify-between">
                  <Icon className="size-5 text-[#a9563d]" />
                  <span className="font-display text-2xl text-[#c9b9ae]">0{index + 1}</span>
                </div>
                <h3 className="font-display text-2xl font-semibold tracking-[-0.04em]">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#625b55]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container grid gap-8 py-14 sm:grid-cols-[1fr_0.9fr] sm:py-20">
        <div>
          <p className="eyebrow">A transparent note</p>
          <h2 className="mt-3 max-w-md font-display text-4xl font-semibold tracking-[-0.05em]">Indicative, never definitive.</h2>
        </div>
        <p className="rounded-2xl border border-[#e3d9d1] bg-[#f7f3ee] p-6 text-sm leading-7 text-[#625b55]">Every estimate is a planning guide only. It cannot account for a specific unit’s layout, material selections, site conditions, timing, permit needs or a contractor’s pricing. Always compare detailed written quotations before choosing a renovation provider.</p>
      </section>
    </>
  );
}

