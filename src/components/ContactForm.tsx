"use client";

import { useState, useRef, useEffect } from "react";

const SERVICES = [
  "AI Receptionist (produs SaaS)",
  "Agent AI la comandă",
  "Consultanță & strategie",
  "Automatizare end-to-end",
  "Nu știu încă / Vreau să discut",
];

const BUDGETS = [
  "Sub 500 EUR",
  "500 – 2.000 EUR",
  "2.000 – 5.000 EUR",
  "Peste 5.000 EUR",
  "Prefer să discutăm",
];

type State = "idle" | "loading" | "success" | "error";

interface FormData {
  name: string;
  email: string;
  service: string;
  budget: string;
  message: string;
}

const EMPTY: FormData = { name: "", email: "", service: "", budget: "", message: "" };

/* ---------- sub-components ---------- */

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        className="font-mono text-[10px] tracking-[0.35em] uppercase"
        style={{ color: error ? "#e05c5c" : "var(--gold)", fontFamily: "var(--font-geist-mono, monospace)" }}
      >
        {label}
      </label>
      {children}
      {error && (
        <span
          className="font-mono text-[11px]"
          style={{ color: "#e05c5c", fontFamily: "var(--font-geist-mono, monospace)" }}
        >
          {error}
        </span>
      )}
    </div>
  );
}

const inputBase: React.CSSProperties = {
  background: "rgba(240,230,211,0.03)",
  border: "1px solid var(--border)",
  borderRadius: "2px",
  padding: "14px 18px",
  color: "var(--cream)",
  fontFamily: "var(--font-geist-mono, monospace)",
  fontSize: "13px",
  letterSpacing: "0.01em",
  outline: "none",
  transition: "border-color 0.2s, background 0.2s",
  width: "100%",
};

function Input({
  value,
  onChange,
  placeholder,
  type = "text",
  hasError,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  hasError?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        ...inputBase,
        borderColor: hasError
          ? "#e05c5c"
          : focused
          ? "var(--gold)"
          : "var(--border)",
        background: focused ? "rgba(201,169,110,0.04)" : "rgba(240,230,211,0.03)",
      }}
    />
  );
}

function Select({
  value,
  onChange,
  options,
  placeholder,
  hasError,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder: string;
  hasError?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        ...inputBase,
        borderColor: hasError ? "#e05c5c" : focused ? "var(--gold)" : "var(--border)",
        // Avoid shorthand `background` conflict — use explicit longhand properties only
        backgroundColor: focused ? "rgba(201,169,110,0.04)" : "rgba(240,230,211,0.03)",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23C9A96E' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 16px center",
        backgroundSize: "auto",
        cursor: "pointer",
        appearance: "none",
        WebkitAppearance: "none",
        paddingRight: "40px",
      }}
    >
      <option value="" disabled style={{ background: "#111", color: "rgba(240,230,211,0.4)" }}>
        {placeholder}
      </option>
      {options.map((o) => (
        <option key={o} value={o} style={{ background: "#111", color: "var(--cream)" }}>
          {o}
        </option>
      ))}
    </select>
  );
}

function Textarea({
  value,
  onChange,
  placeholder,
  hasError,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  hasError?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={5}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        ...inputBase,
        borderColor: hasError ? "#e05c5c" : focused ? "var(--gold)" : "var(--border)",
        background: focused ? "rgba(201,169,110,0.04)" : "rgba(240,230,211,0.03)",
        resize: "vertical",
        minHeight: "130px",
      }}
    />
  );
}

/* ---------- main form ---------- */

export default function ContactForm() {
  const [form, setForm] = useState<FormData>(EMPTY);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [state, setState] = useState<State>("idle");
  const [serverError, setServerError] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.08 }
    );
    ref.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  function set(key: keyof FormData) {
    return (v: string) => {
      setForm((f) => ({ ...f, [key]: v }));
      if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
    };
  }

  function clientValidate(): boolean {
    const e: Partial<FormData> = {};
    if (!form.name.trim()) e.name = "Câmp obligatoriu";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Email invalid";
    if (!form.service) e.service = "Selectează un serviciu";
    if (!form.message.trim() || form.message.trim().length < 20)
      e.message = "Minim 20 de caractere";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.MouseEvent) {
    e.preventDefault();
    if (!clientValidate()) return;

    setState("loading");
    setServerError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Eroare necunoscută");
      setState("success");
    } catch (err: unknown) {
      setState("error");
      setServerError(err instanceof Error ? err.message : "A apărut o eroare. Încearcă din nou.");
    }
  }

  /* Success state */
  if (state === "success") {
    return (
      <div
        style={{
          border: "1px solid rgba(111,207,142,0.3)",
          borderRadius: "4px",
          padding: "56px 48px",
          background: "rgba(111,207,142,0.04)",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "32px", marginBottom: "24px" }}>✓</div>
        <h3
          style={{
            fontSize: "28px",
            fontWeight: 300,
            fontFamily: "var(--font-cormorant, serif)",
            color: "var(--cream)",
            marginBottom: "16px",
          }}
        >
          Mesaj trimis cu succes
        </h3>
        <p
          className="font-mono text-[12px] leading-[1.8]"
          style={{ color: "var(--cream-dim)", fontFamily: "var(--font-geist-mono, monospace)" }}
        >
          Te contactăm în maxim 24 de ore în zilele lucrătoare.
        </p>
      </div>
    );
  }

  return (
    <div ref={ref} className="flex flex-col gap-6">
      {/* Row 1: Nume + Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 reveal">
        <Field label="Nume *" error={errors.name}>
          <Input value={form.name} onChange={set("name")} placeholder="Ion Popescu" hasError={!!errors.name} />
        </Field>
        <Field label="Email *" error={errors.email}>
          <Input value={form.email} onChange={set("email")} placeholder="ion@companie.ro" type="email" hasError={!!errors.email} />
        </Field>
      </div>

      {/* Row 2: Serviciu + Buget */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 reveal" style={{ transitionDelay: "0.08s" }}>
        <Field label="Serviciu dorit *" error={errors.service}>
          <Select
            value={form.service}
            onChange={set("service")}
            options={SERVICES}
            placeholder="Selectează..."
            hasError={!!errors.service}
          />
        </Field>
        <Field label="Buget estimativ">
          <Select
            value={form.budget}
            onChange={set("budget")}
            options={BUDGETS}
            placeholder="Selectează (opțional)..."
          />
        </Field>
      </div>

      {/* Row 3: Mesaj */}
      <div className="reveal" style={{ transitionDelay: "0.16s" }}>
        <Field label="Mesaj *" error={errors.message}>
          <Textarea
            value={form.message}
            onChange={set("message")}
            placeholder="Descrie pe scurt afacerea ta și ce vrei să automatizezi..."
            hasError={!!errors.message}
          />
        </Field>
      </div>

      {/* Error */}
      {serverError && (
        <p
          className="font-mono text-[12px]"
          style={{ color: "#e05c5c", fontFamily: "var(--font-geist-mono, monospace)" }}
        >
          {serverError}
        </p>
      )}

      {/* Submit */}
      <div className="reveal" style={{ transitionDelay: "0.24s" }}>
        <button
          onClick={handleSubmit}
          disabled={state === "loading"}
          className="font-mono text-[12px] tracking-[0.2em] uppercase hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
          style={{
            fontFamily: "var(--font-geist-mono, monospace)",
            background: "var(--gold)",
            color: "var(--bg)",
            padding: "16px 48px",
            border: "none",
            borderRadius: "2px",
            cursor: state === "loading" ? "not-allowed" : "pointer",
          }}
        >
          {state === "loading" ? "Se trimite..." : "Trimite mesajul →"}
        </button>
      </div>

      <style jsx>{`
        .reveal {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.7s cubic-bezier(0.23,1,0.32,1), transform 0.7s cubic-bezier(0.23,1,0.32,1);
        }
        .reveal.visible { opacity: 1; transform: translateY(0); }
      `}</style>
    </div>
  );
}
