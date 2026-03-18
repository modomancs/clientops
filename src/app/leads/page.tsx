import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/auth";
import { prisma } from "@/lib/prisma";
import CreateLeadForm from "@/components/create-lead-form";

type Lead = {
  id: string;
  firstName: string;
  lastName: string;
  email: string | null;
  phone: string | null;
  companyName: string | null;
  status: string;
  value: number | null;
};

export default async function LeadsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  const leads: Lead[] = await prisma.lead.findMany({
    where: {
      companyId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="text-sm text-slate-500">CRM</p>
          <h1 className="text-3xl font-semibold text-slate-900">Leads</h1>
          <p className="mt-2 text-sm text-slate-600">
            Manage and track your incoming leads.
          </p>
        </div>
        <CreateLeadForm />

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                  Company
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                  Value
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200 bg-white">
              {leads.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-10 text-center text-sm text-slate-500"
                  >
                    No leads yet.
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 text-sm text-slate-900">
                      {lead.firstName} {lead.lastName}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {lead.companyName || "-"}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {lead.email || "-"}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {lead.status}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {lead.value ? `€${lead.value}` : "-"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
