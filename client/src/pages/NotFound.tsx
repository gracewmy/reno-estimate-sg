/**
 * RenoEstimate SG 404 page.
 * Design note: quiet editorial utility with an immediate route back to the calculator.
 */
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <>
      <Seo title="Page Not Found | RenoEstimate SG" description="The requested page could not be found." path="/404" />
      <section className="container flex min-h-[65vh] items-center py-16">
        <div>
          <p className="eyebrow">404 — Page not found</p>
          <h1 className="mt-4 max-w-2xl font-display text-5xl font-semibold tracking-[-0.055em] sm:text-6xl">That plan does not seem to be on this page.</h1>
          <p className="mt-6 max-w-md text-base leading-7 text-[#625b55]">Return to the calculator to build an indicative renovation budget for your home.</p>
          <Button asChild className="mt-8 h-12 bg-[#b95e40] px-5 text-white hover:bg-[#9e492f]">
            <Link href="/"><ArrowLeft className="mr-2 size-4" /> Back to calculator</Link>
          </Button>
        </div>
      </section>
    </>
  );
}

