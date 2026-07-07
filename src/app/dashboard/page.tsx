import { getServerSession } from "next-auth";
import type { Lead } from "@/generated/prisma/models/Lead";
import { redirect } from "next/navigation";

import { authOptions } from "@/auth";
import { prisma } from "@/lib/prisma";


export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

const leads: Lead[] = await prisma.lead.findMany({
  where: {
    companyId: session.user.companyId,
  },
});

const totalLeads = leads.length;

const contactedLeads = leads.filter(
  (lead) => lead.status === "CONTACTED"
).length;

const wonLeads = leads.filter((lead) => lead.status === "WON").length;

const pipelineValue = leads.reduce(
  (sum, lead) => sum + (lead.value ?? 0),
  0
);
  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="text-sm text-slate-500">Dashboard</p>
          <h1 className="text-3xl font-semibold text-slate-900">
            Welcome, {session.user.name}
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Track your CRM performance and lead pipeline.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Total Leads</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">
              {totalLeads}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Contacted</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">
              {contactedLeads}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Won Leads</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">
              {wonLeads}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Pipeline Value</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">
              €{pipelineValue.toLocaleString("de-DE")}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}