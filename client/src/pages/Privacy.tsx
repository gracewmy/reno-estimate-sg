/**
 * RenoEstimate SG privacy page.
 * Design note: quiet editorial utility with simple, readable legal information.
 */
import { Seo } from "@/components/Seo";

export default function Privacy() {
  return (
    <>
      <Seo title="Privacy Policy | RenoEstimate SG" description="Read the RenoEstimate SG privacy policy, including how the browser-based calculator handles your renovation selections." path="/privacy" />
      <section className="border-b border-[#e8e1da] bg-[#f6f1ea]">
        <div className="container py-16 sm:py-24">
          <p className="eyebrow">Legal information</p>
          <h1 className="mt-4 font-display text-5xl font-semibold tracking-[-0.055em] sm:text-6xl">Privacy Policy</h1>
          <p className="mt-5 text-sm text-[#716860]">Last updated: 16 August 2026</p>
        </div>
      </section>
      <article className="container max-w-4xl py-14 sm:py-20">
        <div className="legal-copy space-y-10 text-sm leading-7 text-[#514a44]">
          <section>
            <h2>Our approach</h2>
            <p>RenoEstimate SG is designed as a simple planning tool. The calculator can be used without creating an account or supplying your name, telephone number, address or renovation details.</p>
          </section>
          <section>
            <h2>Calculator selections</h2>
            <p>Your flat type and renovation choices are used in your browser to calculate the estimate shown on screen. We do not ask you to submit those selections to us through the calculator.</p>
          </section>
          <section>
            <h2>Website analytics</h2>
            <p>This website may use basic, privacy-conscious analytics to understand general site usage, such as page visits and device type. This information is used to maintain and improve the website and is not used to identify you personally.</p>
          </section>
          <section>
            <h2>External links</h2>
            <p>The renovation planner button may link to an external payment or download platform. That platform has its own privacy practices, and you should review its policy before providing any information or completing a purchase.</p>
          </section>
          <section>
            <h2>Contact</h2>
            <p>If you contact us by email, your email provider and our email provider may process the information you include in your message. Please avoid sending sensitive personal information unless it is necessary for your enquiry.</p>
          </section>
          <section>
            <h2>Changes to this policy</h2>
            <p>We may update this policy if the way RenoEstimate SG operates changes. The latest version will be posted on this page with its revised update date.</p>
          </section>
        </div>
      </article>
    </>
  );
}

