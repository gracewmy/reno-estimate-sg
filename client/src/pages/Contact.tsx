/**
 * RenoEstimate SG contact page.
 * Design note: warm editorial utility with a low-friction, no-form contact path.
 */
import { CONTACT_EMAIL } from "@/const";
import { Seo } from "@/components/Seo";
import { ArrowUpRight, Mail } from "lucide-react";

export default function Contact() {
  return (
    <>
      <Seo title="Contact RenoEstimate SG | Renovation Planning Tool" description="Contact RenoEstimate SG with a question about the renovation budget calculator or the renovation planner." path="/contact" />
      <section className="container grid gap-10 py-16 sm:py-24 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div>
          <p className="eyebrow">Contact</p>
          <h1 className="mt-4 max-w-md font-display text-5xl font-semibold leading-[0.97] tracking-[-0.055em] sm:text-6xl">A question about the planner?</h1>
          <p className="mt-6 max-w-md text-base leading-7 text-[#625b55]">Send us a short note. We welcome practical feedback about the calculator and renovation budget spreadsheet.</p>
        </div>
        <div className="rounded-[24px] border border-[#e3d9d1] bg-[#f7f3ee] p-7 sm:p-10">
          <div className="grid size-12 place-items-center rounded-2xl bg-[#eadbd2] text-[#9b4c34]"><Mail size={23} /></div>
          <p className="mt-8 text-[0.69rem] font-bold uppercase tracking-[0.15em] text-[#7a7069]">Email is the simplest route</p>
          <a href={`mailto:${CONTACT_EMAIL}`} className="mt-3 inline-flex items-center gap-2 font-display text-3xl font-semibold tracking-[-0.045em] text-[#282522] underline decoration-[#d7a28f] decoration-2 underline-offset-8 transition hover:text-[#9b4c34] sm:text-4xl">
            {CONTACT_EMAIL} <ArrowUpRight className="size-5" />
          </a>
          <p className="mt-10 border-t border-[#ded3cb] pt-5 text-sm leading-6 text-[#716860]">Please do not share sensitive financial or personal information by email. RenoEstimate SG cannot provide contractor quotations, design services or legal advice.</p>
        </div>
      </section>
    </>
  );
}

