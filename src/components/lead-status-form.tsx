type LeadStatusFormProps = {
  leadId: string;
  currentStatus: string;
};

export default function LeadStatusForm({
  leadId,
  currentStatus,
}: LeadStatusFormProps) {
  return (
    <form action={`/api/leads/${leadId}`} method="POST" className="mt-3 flex gap-2">
      <select
        name="status"
        defaultValue={currentStatus}
        className="w-full rounded-lg border border-slate-300 px-2 py-1 text-xs"
      >
        <option value="NEW">New</option>
        <option value="CONTACTED">Contacted</option>
        <option value="QUALIFIED">Qualified</option>
        <option value="PROPOSAL_SENT">Proposal Sent</option>
        <option value="WON">Won</option>
        <option value="LOST">Lost</option>
      </select>

      <button
        type="submit"
        className="rounded-lg bg-slate-900 px-2 py-1 text-xs text-white"
      >
        Save
      </button>
    </form>
  );
}