import { formatLeadStatus, getLeadStatusStyles } from "@/lib/lead-status";

type Lead = {
  id: string;
  firstName: string;
  lastName: string;
  email: string | null;
  companyName: string | null;
  status: string;
  value: number | null;
};

type LeadsKanbanBoardProps = {
  leads: Lead[];
};

const statuses = [
  "NEW",
  "CONTACTED",
  "QUALIFIED",
  "PROPOSAL_SENT",
  "WON",
  "LOST",
];

export default function LeadsKanbanBoard({
  leads,
}: LeadsKanbanBoardProps) {
  return (
    <div className="grid gap-4 xl:grid-cols-6">
      {statuses.map((status) => {
        const columnLeads = leads.filter((lead) => lead.status === status);

        return (
          <div
            key={status}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="mb-4 flex items-center justify-between">
              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getLeadStatusStyles(
                  status
                )}`}
              >
                {formatLeadStatus(status)}
              </span>

              <span className="text-sm text-slate-500">
                {columnLeads.length}
              </span>
            </div>

            <div className="space-y-3">
              {columnLeads.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-200 p-4 text-center text-sm text-slate-400">
                  No leads
                </div>
              ) : (
                columnLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className="rounded-xl border border-slate-200 bg-slate-50 p-3"
                  >
                    <p className="text-sm font-semibold text-slate-900">
                      {lead.firstName} {lead.lastName}
                    </p>

                    <p className="mt-1 text-sm text-slate-600">
                      {lead.companyName || "No company"}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {lead.email || "No email"}
                    </p>

                    <p className="mt-3 text-sm font-medium text-slate-700">
                      {lead.value ? `€${lead.value}` : "No value"}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}