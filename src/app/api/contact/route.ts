import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(150),
  company: z.string().trim().max(100).optional().default(""),
  service: z.string().trim().max(60).optional().default(""),
  message: z.string().trim().min(10).max(3000),
  website: z.string().optional(), // honeypot
});

// Best-effort per-instance rate limit (serverless instances are short-lived, so this only slows basic abuse).
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_HITS;
}

export async function POST(request: Request) {
  const url = process.env.GOOGLE_SCRIPT_URL;
  const secret = process.env.GOOGLE_SCRIPT_SECRET;
  if (!url || !secret) {
    return NextResponse.json({ error: "Contact form is not configured yet. Please email us instead." }, { status: 503 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (limited(ip)) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Please check your name, email and message (min 10 characters)." }, { status: 400 });
  }

  const { website, ...data } = parsed.data;
  if (website) {
    // Bot: pretend success without storing anything.
    return NextResponse.json({ ok: true });
  }

  try {
    // text/plain avoids a CORS preflight, which Apps Script cannot answer.
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ ...data, secret }),
      redirect: "follow",
    });
    const result = await res.json().catch(() => null);
    if (!res.ok || !result?.ok) throw new Error("Sheet write failed");
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "We could not send your message. Please email us directly." }, { status: 502 });
  }
}
