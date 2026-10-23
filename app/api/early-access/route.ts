import { Resend } from "resend";

const recipient = "asrateqgadgets@yahoo.com";
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const audienceValues = new Set(["fleet", "individual"]);
const submissions = new Map<string, number>();
const windowMs = 60_000;

function limited(key: string) {
  const now = Date.now();
  const previous = submissions.get(key) ?? 0;
  if (now - previous < windowMs) return true;
  submissions.set(key, now);
  return false;
}

export async function POST(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const clientKey = forwardedFor?.split(",")[0]?.trim() || "unknown";

  if (limited(clientKey)) {
    return Response.json({ error: "Please wait before trying again." }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const firstName = typeof body.firstName === "string" ? body.firstName.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const audience = typeof body.audience === "string" ? body.audience : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const honeypot = typeof body.website === "string" ? body.website.trim() : "";

  if (honeypot) return Response.json({ ok: true });
  if (!firstName || firstName.length > 80 || !emailPattern.test(email) || email.length > 254) {
    return Response.json({ error: "Please provide a valid name and email." }, { status: 400 });
  }
  if (!audienceValues.has(audience) || message.length > 2_000) {
    return Response.json({ error: "Please provide valid form details." }, { status: 400 });
  }
  if (!process.env.RESEND_API_KEY || !process.env.RESEND_FROM_EMAIL) {
    return Response.json({ error: "Email service is not configured." }, { status: 503 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const { data, error } = await resend.emails.send(
    {
      from: process.env.RESEND_FROM_EMAIL,
      to: [recipient],
      replyTo: email,
      subject: `Astrateq early access interest: ${firstName}`,
      text: [
        `Name: ${firstName}`,
        `Email: ${email}`,
        `Audience: ${audience}`,
        `Message: ${message || "(none)"}`,
      ].join("\n"),
    },
    { idempotencyKey: `early-access/${email}/${audience}` },
  );

  if (error) {
    return Response.json({ error: "Unable to submit right now." }, { status: 502 });
  }

  return Response.json({ ok: true, id: data?.id });
}
