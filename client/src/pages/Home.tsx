/**
 * RenoEstimate SG calculator homepage.
 * Design note: warm editorial utility; inputs read like a simple renovation worksheet and results like a budget ledger.
 */
import { RENOVATION_PLANNER_URL } from "@/const";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, ChevronDown, CircleAlert, Download, House, Sparkles } from "lucide-react";
import { FormEvent, useState } from "react";

type FlatType = "2-room" | "3-room" | "4-room" | "5-room";
type Level = "basic" | "standard" | "premium";
type Kitchen = "yes" | "no";
type Wardrobe = "none" | "one" | "two" | "three";
type Flooring = "existing" | "vinyl" | "tiles";
type Bathrooms = "one" | "two";
type Electrical = "basic" | "extensive";

type FormData = {
  flatType: FlatType;
  level: Level;
  kitchen: Kitchen;
  wardrobes: Wardrobe;
  flooring: Flooring;
  bathrooms: Bathrooms;
  electrical: Electrical;
};

type CostResult = {
  minimum: number;
  maximum: number;
  total: number;
  breakdown: Record<"carpentry" | "flooring" | "electrical" | "bathrooms" | "painting" | "other", number>;
};

const defaultForm: FormData = {
  flatType: "4-room",
  level: "standard",
  kitchen: "yes",
  wardrobes: "one",
  flooring: "vinyl",
  bathrooms: "one",
  electrical: "basic",
};

const selectOptions: { name: keyof FormData; label: string; number: string; options: { value: string; label: string }[] }[] = [
  { name: "flatType", label: "Flat type", number: "01", options: [
    { value: "2-room", label: "2-room" }, { value: "3-room", label: "3-room" }, { value: "4-room", label: "4-room" }, { value: "5-room", label: "5-room" },
  ] },
  { name: "level", label: "Renovation level", number: "02", options: [
    { value: "basic", label: "Basic" }, { value: "standard", label: "Standard" }, { value: "premium", label: "Premium" },
  ] },
  { name: "kitchen", label: "Kitchen renovation", number: "03", options: [
    { value: "yes", label: "Yes" }, { value: "no", label: "No" },
  ] },
  { name: "wardrobes", label: "Built-in wardrobes", number: "04", options: [
    { value: "none", label: "None" }, { value: "one", label: "One bedroom" }, { value: "two", label: "Two bedrooms" }, { value: "three", label: "Three bedrooms" },
  ] },
  { name: "flooring", label: "Flooring", number: "05", options: [
    { value: "existing", label: "Keep existing" }, { value: "vinyl", label: "Vinyl" }, { value: "tiles", label: "Tiles" },
  ] },
  { name: "bathrooms", label: "Bathrooms", number: "06", options: [
    { value: "one", label: "One bathroom" }, { value: "two", label: "Two bathrooms" },
  ] },
  { name: "electrical", label: "Electrical works", number: "07", options: [
    { value: "basic", label: "Basic" }, { value: "extensive", label: "Extensive" },
  ] },
];

const dollars = new Intl.NumberFormat("en-SG", {
  style: "currency",
  currency: "SGD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

function roundToNearest500(amount: number) {
  return Math.round(amount / 500) * 500;
}

function calculateEstimate(form: FormData): CostResult {
  // All figures below are deliberately simple planning assumptions in Singapore dollars.
  // Beginners can adjust these tables as they learn their own contractor pricing benchmarks.
  const sizeFactor: Record<FlatType, number> = { "2-room": 0.75, "3-room": 0.9, "4-room": 1, "5-room": 1.2 };
  const qualityFactor: Record<Level, number> = { basic: 0.82, standard: 1, premium: 1.38 };
  const baseCarpentry: Record<FlatType, number> = { "2-room": 6500, "3-room": 7600, "4-room": 9000, "5-room": 11200 };
  const kitchenCost: Record<Level, number> = { basic: 8000, standard: 12500, premium: 19000 };
  const wardrobeCost: Record<Wardrobe, number> = { none: 0, one: 4000, two: 7200, three: 10200 };
  const flooringPerFlat: Record<FlatType, number> = { "2-room": 2200, "3-room": 3200, "4-room": 4600, "5-room": 5700 };
  const tileFlooringPerFlat: Record<FlatType, number> = { "2-room": 4000, "3-room": 5600, "4-room": 8000, "5-room": 9900 };
  const basicElectrical: Record<FlatType, number> = { "2-room": 2800, "3-room": 3500, "4-room": 4500, "5-room": 5700 };
  const extensiveElectrical: Record<FlatType, number> = { "2-room": 5700, "3-room": 7100, "4-room": 9000, "5-room": 11300 };
  const bathroomPerUnit: Record<Level, number> = { basic: 6500, standard: 9000, premium: 13500 };
  const painting: Record<FlatType, number> = { "2-room": 1700, "3-room": 2100, "4-room": 2500, "5-room": 3100 };
  const other: Record<FlatType, number> = { "2-room": 5500, "3-room": 7000, "4-room": 8500, "5-room": 10500 };

  const factor = qualityFactor[form.level];
  const carpentry = baseCarpentry[form.flatType] * factor +
    (form.kitchen === "yes" ? kitchenCost[form.level] : 0) +
    wardrobeCost[form.wardrobes] * factor;
  const flooringBase = form.flooring === "vinyl" ? flooringPerFlat[form.flatType] : form.flooring === "tiles" ? tileFlooringPerFlat[form.flatType] : 0;
  const flooring = flooringBase * (form.level === "premium" ? 1.13 : form.level === "basic" ? 0.9 : 1);
  const electricalBase = form.electrical === "extensive" ? extensiveElectrical[form.flatType] : basicElectrical[form.flatType];
  const electrical = electricalBase * (form.level === "premium" ? 1.15 : form.level === "basic" ? 0.9 : 1);
  const bathroomCount = form.bathrooms === "two" ? 2 : 1;
  const bathroomWork = bathroomPerUnit[form.level] * bathroomCount;
  const paintWork = painting[form.flatType] * (form.level === "premium" ? 1.15 : 1);
  const otherWork = other[form.flatType] * factor;
  const total = roundToNearest500(carpentry + flooring + electrical + bathroomWork + paintWork + otherWork);

  return {
    total,
    minimum: roundToNearest500(total * 0.88),
    maximum: roundToNearest500(total * 1.12),
    breakdown: {
      carpentry: roundToNearest500(carpentry),
      flooring: roundToNearest500(flooring),
      electrical: roundToNearest500(electrical),
      bathrooms: roundToNearest500(bathroomWork),
      painting: roundToNearest500(paintWork),
      other: roundToNearest500(otherWork),
    },
  };
}

function SelectField({
  name,
  label,
  number,
  options,
  value,
  onChange,
}: {
  name: keyof FormData;
  label: string;
  number: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (name: keyof FormData, value: string) => void;
}) {
  return (
    <label className="group block">
      <span className="mb-2 flex items-center justify-between text-[0.69rem] font-bold uppercase tracking-[0.13em] text-[#716860]">
        {label}<span className="font-mono text-[0.62rem] tracking-normal text-[#b4a69c]">{number}</span>
      </span>
      <span className="relative block">
        <select
          value={value}
          onChange={(event) => onChange(name, event.target.value)}
          className="w-full appearance-none rounded-xl border border-[#ded5cd] bg-white px-4 py-3.5 pr-10 text-sm font-medium text-[#302c28] outline-none transition focus:border-[#b95e40] focus:ring-4 focus:ring-[#b95e40]/10"
        >
          {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-[#8b817a]" />
      </span>
    </label>
  );
}

export default function Home() {
  const [form, setForm] = useState<FormData>(defaultForm);
  const [result, setResult] = useState<CostResult | null>(null);

  const handleChange = (name: keyof FormData, value: string) => {
    setForm((current) => ({ ...current, [name]: value } as FormData));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setResult(calculateEstimate(form));
  };

  const breakdownRows = result ? [
    { label: "Estimated carpentry cost", value: result.breakdown.carpentry },
    { label: "Flooring", value: result.breakdown.flooring },
    { label: "Electrical", value: result.breakdown.electrical },
    { label: "Bathrooms", value: result.breakdown.bathrooms },
    { label: "Painting", value: result.breakdown.painting },
    { label: "Other / miscellaneous", value: result.breakdown.other },
  ] : [];

  return (
    <>
      <Seo
        title="RenoEstimate SG | HDB & BTO Renovation Cost Calculator"
        description="Estimate an indicative HDB or BTO renovation budget in Singapore. Adjust your flat type, scope, finishes and key works to see a practical cost range."
      />

      <section className="hero-grain overflow-hidden border-b border-[#e8e1da] bg-[#f6f1ea]">
        <div className="container grid min-h-[470px] items-stretch gap-8 py-10 lg:grid-cols-[1.02fr_0.98fr] lg:py-14">
          <div className="flex max-w-xl flex-col justify-center py-6 lg:py-10">
            <div className="mb-6 flex items-center gap-2 text-[#9b4c34]">
              <span className="size-2 rounded-full bg-[#8ca393]" />
              <span className="text-[0.7rem] font-bold uppercase tracking-[0.17em]">Singapore home planning tool</span>
            </div>
            <h1 className="font-display text-5xl font-semibold leading-[0.95] tracking-[-0.055em] text-[#282522] sm:text-6xl lg:text-7xl">
              Get a clearer starting budget for your flat.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-[#625b55] sm:text-lg">
              Build an approximate renovation budget for your HDB or BTO home, before you begin collecting contractor quotes.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-[#514a44]">
              <span className="flex items-center gap-2"><Check size={16} className="text-[#8ca393]" /> No account required</span>
              <span className="flex items-center gap-2"><Check size={16} className="text-[#8ca393]" /> Results in seconds</span>
            </div>
          </div>

          <div className="relative min-h-[280px] overflow-hidden rounded-[26px] border border-white/70 bg-[#e6ddd3] shadow-[0_24px_60px_-32px_rgba(63,46,34,0.45)] lg:min-h-0">
            <img
              src="/manus-storage/renoestimate-hero_db24eb00.jpg"
              alt="Renovation planning materials laid out in a sunlit home"
              className="absolute inset-0 size-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#33261f]/75 via-[#33261f]/10 to-transparent p-6 pt-20 text-white sm:p-8">
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-white/75">Planning set / 01</p>
              <p className="mt-2 max-w-sm font-display text-2xl font-medium leading-tight tracking-[-0.03em]">Materials, measurements, and a budget you can discuss.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-14 sm:py-20" id="calculator">
        <div className="mb-9 flex flex-col justify-between gap-5 border-b border-[#e4ddd6] pb-7 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">Your renovation worksheet</p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">Estimate your cost range</h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-[#716860]">Choose the scope that best resembles your plans. You can revisit any option before calculating.</p>
        </div>

        <div className="grid gap-7 xl:grid-cols-[minmax(0,1fr)_430px] xl:gap-10">
          <form onSubmit={handleSubmit} className="worksheet-card rounded-[24px] border border-[#e3d9d1] bg-white p-5 shadow-[0_16px_40px_-35px_rgba(45,32,21,0.55)] sm:p-8">
            <div className="mb-6 flex items-center justify-between border-b border-[#eee8e3] pb-4">
              <span className="text-[0.66rem] font-bold uppercase tracking-[0.15em] text-[#a9563d]">Estimate worksheet</span>
              <span className="font-mono text-[0.66rem] text-[#a79a91]">01–07 / SCOPE</span>
            </div>
            <div className="grid gap-x-5 gap-y-6 sm:grid-cols-2">
              {selectOptions.map((field) => (
                <SelectField
                  key={field.name}
                  {...field}
                  value={form[field.name]}
                  onChange={handleChange}
                />
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-4 border-t border-[#eee8e3] pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-md text-xs leading-5 text-[#7a7069]">Your selections stay in this browser. No account or personal details are needed.</p>
              <Button type="submit" className="h-12 bg-[#b95e40] px-6 text-sm font-semibold text-white shadow-none hover:bg-[#9e492f] active:scale-[0.97]">
                Calculate my renovation range <ArrowRight className="ml-2 size-4" />
              </Button>
            </div>
          </form>

          <aside className="ledger-panel relative overflow-hidden rounded-[24px] border border-[#e0d6ce] bg-[#f7f3ee] p-6 sm:p-8" aria-live="polite">
            <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-[100px] bg-[#ead7cd]" />
            {!result ? (
              <div className="relative flex min-h-[380px] flex-col justify-between">
                <div>
                  <div className="mb-6 grid size-11 place-items-center rounded-2xl bg-[#efe1d8] text-[#9b4c34]"><House size={21} /></div>
                  <p className="eyebrow">Your estimate appears here</p>
                  <h3 className="mt-3 font-display text-3xl font-semibold tracking-[-0.045em]">A budget you can begin with.</h3>
                  <p className="mt-4 max-w-sm text-sm leading-6 text-[#716860]">Complete the worksheet on the left and we will show an indicative range and simple category breakdown.</p>
                </div>
                <div className="mt-10 rounded-xl border border-[#e6ddd6] bg-white/70 p-4 text-xs leading-5 text-[#716860]">
                  <span className="font-bold text-[#544b45]">What is included?</span> Carpentry, flooring, electrical work, bathrooms, painting and a practical miscellaneous allowance.
                </div>
              </div>
            ) : (
              <div className="result-reveal relative">
                <div className="flex items-center justify-between">
                  <p className="eyebrow">Indicative planning estimate</p>
                  <span className="font-mono text-[0.64rem] tracking-wide text-[#9a8c83]">EST / 001</span>
                </div>
                <h3 className="mt-3 font-display text-[2rem] font-semibold leading-none tracking-[-0.055em] text-[#282522]">Estimated total<br />renovation cost range</h3>
                <p className="mt-5 font-display text-4xl font-semibold tracking-[-0.055em] text-[#9b4c34] sm:text-[2.75rem]">
                  {dollars.format(result.minimum)}–{dollars.format(result.maximum)}
                </p>
                <p className="mt-2 text-xs text-[#716860]">Central estimate: {dollars.format(result.total)}</p>

                <div className="my-7 h-px bg-[#dfd5ce]" />
                <div className="space-y-3.5">
                  {breakdownRows.map((row, index) => (
                    <div key={row.label} className="flex items-baseline justify-between gap-5 text-sm">
                      <span className="flex items-baseline gap-2.5 text-[#625b55]"><span className="font-mono text-[0.62rem] text-[#b0a198]">{String(index + 1).padStart(2, "0")}</span>{row.label}</span>
                      <span className="shrink-0 font-semibold tabular-nums text-[#302c28]">{dollars.format(row.value)}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-7 flex gap-2 rounded-xl bg-[#eee3da] p-3.5 text-xs leading-5 text-[#6c554b]">
                  <CircleAlert className="mt-0.5 size-4 shrink-0 text-[#a85a40]" />
                  <p>These are indicative planning estimates only. Actual contractor quotations will vary with layout, material choices, site conditions and scope.</p>
                </div>
              </div>
            )}
          </aside>
        </div>
      </section>

      <section className="border-y border-[#e6ded7] bg-[#fffdfa]">
        <div className="container grid items-center gap-7 py-12 lg:grid-cols-[0.85fr_1.15fr] lg:py-16">
          <figure className="relative order-2 aspect-[4/3] overflow-hidden rounded-[22px] shadow-[0_18px_38px_-28px_rgba(65,45,29,0.45)] lg:order-1">
            <img
              src="/manus-storage/renoestimate-materials_88d5e81d.jpg"
              alt="Curated renovation material samples in warm neutral colours"
              className="size-full object-cover"
              loading="lazy"
            />
            <figcaption className="absolute bottom-4 left-4 rounded-lg border border-white/60 bg-[#fffdf9]/90 px-3 py-2 font-mono text-[0.62rem] font-medium uppercase tracking-[0.1em] text-[#765c50] backdrop-blur-sm">Finish board / compare before committing</figcaption>
          </figure>
          <div className="lg:pl-12">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#eef1eb] px-3 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#536a5d]"><Sparkles size={14} /> Beyond a first estimate</div>
            <h2 className="max-w-xl font-display text-4xl font-semibold leading-[1.02] tracking-[-0.05em] sm:text-5xl">Planning your renovation?</h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-[#625b55]">Download our complete renovation budget spreadsheet and turn early ideas into a more detailed budget conversation.</p>
            <Button asChild variant="outline" className="mt-7 h-12 border-[#caa391] bg-transparent px-5 text-sm font-semibold text-[#8d442f] hover:bg-[#f7ebe5] hover:text-[#783925] active:scale-[0.97]">
              <a href={RENOVATION_PLANNER_URL} target="_blank" rel="noreferrer">
                <Download className="mr-2 size-4" /> Get the S$2 Renovation Planner
              </a>
            </Button>
            <p className="mt-3 text-xs text-[#7a7069]">A practical companion for your next round of quote conversations.</p>
          </div>
        </div>
      </section>

      <section className="container grid gap-8 py-14 sm:grid-cols-[1fr_0.95fr] sm:py-20">
        <div>
          <p className="eyebrow">A simple approach</p>
          <h2 className="mt-3 max-w-md font-display text-4xl font-semibold tracking-[-0.05em]">A helpful guide, not a quotation.</h2>
        </div>
        <div className="space-y-5 text-sm leading-7 text-[#625b55]">
          <p>RenoEstimate SG turns a few high-level choices into an approximate cost range, so you can begin planning before speaking to an interior designer or contractor.</p>
          <p>Use it to set your expectations, compare possible scopes, and prepare better questions for your quote discussions. Always obtain detailed quotations before making a renovation commitment.</p>
        </div>
      </section>
    </>
  );
}
