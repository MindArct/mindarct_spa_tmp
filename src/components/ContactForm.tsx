"use client";

import { useState, type FormEvent } from "react";
import { serviceOptions } from "@/data/site";

type Status = "idle" | "sending" | "success" | "error";

const field =
  "w-full rounded-xl border border-line bg-white/[0.03] px-4 py-3 text-sm outline-none transition placeholder:text-muted/60 focus:border-violet";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong. Please try again.");
      form.reset();
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="glass rounded-2xl p-10 text-center" role="status">
        <p className="gradient-text text-2xl font-bold">Thank you!</p>
        <p className="mt-2 text-muted">We received your message and will reply within one business day.</p>
        <button onClick={() => setStatus("idle")} className="mt-6 text-sm underline text-muted hover:text-foreground">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="glass grid gap-4 rounded-2xl p-6 sm:p-8" noValidate={false}>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5 text-sm">
          Name
          <input name="name" required maxLength={100} autoComplete="name" className={field} placeholder="Jane Doe" />
        </label>
        <label className="grid gap-1.5 text-sm">
          Email
          <input name="email" type="email" required maxLength={150} autoComplete="email" className={field} placeholder="jane@company.com" />
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5 text-sm">
          Company <span className="sr-only">(optional)</span>
          <input name="company" maxLength={100} autoComplete="organization" className={field} placeholder="Optional" />
        </label>
        <label className="grid gap-1.5 text-sm">
          I am interested in
          <select name="service" defaultValue={serviceOptions[0]} className={field}>
            {serviceOptions.map((s) => (
              <option key={s} value={s} className="bg-card">
                {s}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label className="grid gap-1.5 text-sm">
        Message
        <textarea name="message" required minLength={10} maxLength={3000} rows={5} className={field} placeholder="Tell us about your project..." />
      </label>

      {/* Honeypot: hidden from people, bots fill it in */}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      {status === "error" && (
        <p role="alert" className="text-sm text-red-400">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="gradient-bg rounded-full px-7 py-3 font-semibold text-black transition hover:opacity-90 disabled:opacity-60"
      >
        {status === "sending" ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}
