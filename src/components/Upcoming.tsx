import { upcoming } from "@/data/projects";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Upcoming() {
  return (
    <section id="upcoming" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-24">
      <SectionHeading
        eyebrow="On the roadmap"
        title="What we are building next"
        text="Products from our own lab. Get in touch if you want early access."
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {upcoming.map((u, i) => (
          <Reveal key={u.title} delay={i * 0.06}>
            <div className="relative h-full overflow-hidden rounded-2xl border border-dashed border-violet/40 bg-violet/5 p-6">
              <span className="mb-4 inline-block rounded-full border border-cyan/40 px-3 py-0.5 text-xs font-medium text-cyan">
                Coming soon
              </span>
              <h3 className="text-lg font-semibold">{u.title}</h3>
              <p className="mb-3 text-xs uppercase tracking-wider text-muted">{u.tag}</p>
              <p className="text-sm leading-relaxed text-muted">{u.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
