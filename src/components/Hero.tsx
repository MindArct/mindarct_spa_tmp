import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="orb absolute -left-24 top-10 h-96 w-96 rounded-full bg-violet/30 blur-[110px]" />
        <div className="orb absolute -right-24 top-40 h-96 w-96 rounded-full bg-cyan/20 blur-[110px] [animation-delay:-7s]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-5 py-28 text-center sm:py-40">
        <p className="glass mx-auto mb-8 inline-block rounded-full px-4 py-1.5 text-xs font-medium text-muted">
          Software · AI · SaaS · Data migration
        </p>
        <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">
          We architect <span className="gradient-text">smart software</span> that moves your business forward.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">
          MindArct designs and builds custom software, AI automation and SaaS products, and moves your data between
          platforms without losing a single record.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/#contact"
            className="gradient-bg rounded-full px-7 py-3 font-semibold text-black transition hover:opacity-90"
          >
            Start a project
          </Link>
          <Link href="/projects" className="glass rounded-full px-7 py-3 font-semibold transition hover:bg-white/10">
            View our work
          </Link>
        </div>
      </div>
    </section>
  );
}
