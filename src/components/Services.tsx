import { services } from "@/data/site";
import Icon from "./Icon";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Services() {
  return (
    <section id="services" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-24">
      <SectionHeading
        eyebrow="What we do"
        title="Everything from idea to production"
        text="One team for strategy, engineering and launch."
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.06}>
            <div className="glass h-full rounded-2xl p-6 transition hover:border-violet/50">
              <div className="gradient-bg mb-5 inline-flex rounded-xl p-3 text-black">
                <Icon name={s.icon} />
              </div>
              <h3 className="mb-2 text-lg font-semibold">{s.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{s.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
