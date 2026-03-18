"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateLeadForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    companyName: "",
  });

  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    setLoading(true);

    await fetch("/api/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    setLoading(false);

    setForm({
      firstName: "",
      lastName: "",
      email: "",
      companyName: "",
    });

    router.refresh();
  }

  return (
    <form
      onSubmit={(event) => {
        void handleSubmit(event.nativeEvent as SubmitEvent);
      }}
      className="mb-6 rounded-2xl border bg-white p-6 shadow-sm"
    >
      <h2 className="mb-4 text-lg font-semibold">Create Lead</h2>

      <div className="grid gap-4 md:grid-cols-2">
        <input
          placeholder="First Name"
          value={form.firstName}
          onChange={(event) =>
            setForm({ ...form, firstName: event.target.value })
          }
          className="rounded-xl border px-4 py-2"
          required
        />

        <input
          placeholder="Last Name"
          value={form.lastName}
          onChange={(event) =>
            setForm({ ...form, lastName: event.target.value })
          }
          className="rounded-xl border px-4 py-2"
          required
        />

        <input
          placeholder="Email"
          value={form.email}
          onChange={(event) => setForm({ ...form, email: event.target.value })}
          className="rounded-xl border px-4 py-2"
        />

        <input
          placeholder="Company"
          value={form.companyName}
          onChange={(event) =>
            setForm({ ...form, companyName: event.target.value })
          }
          className="rounded-xl border px-4 py-2"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-4 rounded-xl bg-slate-900 px-4 py-2 text-white"
      >
        {loading ? "Creating..." : "Create Lead"}
      </button>
    </form>
  );
}
