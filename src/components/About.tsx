import { process } from "@/data/site";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-24">
      <SectionHeading
        eyebrow="How we work"
        title="Clear process, no surprises"
        text="MindArct is a small, senior team. You talk to the people who build your product."
      />
      <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {process.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.07}>
            <li className="glass h-full list-none rounded-2xl p-6">
              <span className="gradient-text text-3xl font-extrabold">0{i + 1}</span>
              <h3 className="mt-3 mb-1 font-semibold">{p.title}</h3>
              <p className="text-sm text-muted">{p.text}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
