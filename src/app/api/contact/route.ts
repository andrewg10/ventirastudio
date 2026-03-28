import { NextRequest, NextResponse } from "next/server";

interface ContactPayload {
  name: string;
  email: string;
  message: string;
  service: string;
  budget: string;
}

function validate(body: Partial<ContactPayload>): string | null {
  if (!body.name?.trim()) return "Numele este obligatoriu.";
  if (!body.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email))
    return "Adresa de email nu este validă.";
  if (!body.message?.trim() || body.message.trim().length < 20)
    return "Mesajul trebuie să aibă cel puțin 20 de caractere.";
  if (!body.service) return "Te rugăm să selectezi un serviciu.";
  return null;
}

export async function POST(req: NextRequest) {
  let body: Partial<ContactPayload>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Request invalid." }, { status: 400 });
  }

  const validationError = validate(body);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 422 });
  }

  // If no API key — return success in dev, warn in prod
  if (!process.env.RESEND_API_KEY) {
    console.warn("[contact] RESEND_API_KEY not set. Set it in Railway env vars.");
    return NextResponse.json({ success: true });
  }

  try {
    // Lazy import so Resend is only instantiated when the key exists
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "Ventira Studio <noreply@ventirastudio.ro>",
      to: [process.env.CONTACT_EMAIL ?? "contact@ventirastudio.ro"],
      replyTo: body.email,
      subject: `[Contact] ${body.name} — ${body.service}`,
      html: `
        <div style="font-family:monospace;max-width:600px;margin:0 auto;padding:32px;background:#080808;color:#F0E6D3;border:1px solid rgba(201,169,110,0.2);border-radius:8px;">
          <h2 style="color:#C9A96E;font-size:20px;margin-bottom:24px;font-weight:400;">Mesaj nou — Ventira Studio</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;color:rgba(240,230,211,0.5);width:130px;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;vertical-align:top;">Nume</td><td style="padding:8px 0;color:#F0E6D3;">${body.name}</td></tr>
            <tr><td style="padding:8px 0;color:rgba(240,230,211,0.5);font-size:11px;text-transform:uppercase;letter-spacing:0.1em;vertical-align:top;">Email</td><td style="padding:8px 0;"><a href="mailto:${body.email}" style="color:#C9A96E;">${body.email}</a></td></tr>
            <tr><td style="padding:8px 0;color:rgba(240,230,211,0.5);font-size:11px;text-transform:uppercase;letter-spacing:0.1em;vertical-align:top;">Serviciu</td><td style="padding:8px 0;color:#F0E6D3;">${body.service}</td></tr>
            <tr><td style="padding:8px 0;color:rgba(240,230,211,0.5);font-size:11px;text-transform:uppercase;letter-spacing:0.1em;vertical-align:top;">Buget</td><td style="padding:8px 0;color:#F0E6D3;">${body.budget || "Nespecificat"}</td></tr>
            <tr><td style="padding:8px 0;color:rgba(240,230,211,0.5);font-size:11px;text-transform:uppercase;letter-spacing:0.1em;vertical-align:top;">Mesaj</td><td style="padding:8px 0;color:#F0E6D3;white-space:pre-wrap;">${body.message}</td></tr>
          </table>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact] Send error:", err);
    return NextResponse.json({ error: "Eroare la trimiterea mesajului. Încearcă din nou." }, { status: 500 });
  }
}
