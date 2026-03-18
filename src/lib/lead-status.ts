export function getLeadStatusStyles(status: string) {
  switch (status) {
    case "NEW":
      return "bg-slate-100 text-slate-700";
    case "CONTACTED":
      return "bg-blue-100 text-blue-700";
    case "QUALIFIED":
      return "bg-amber-100 text-amber-700";
    case "PROPOSAL_SENT":
      return "bg-purple-100 text-purple-700";
    case "WON":
      return "bg-emerald-100 text-emerald-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}
export function formatLeadStatus(status: string) {
  switch (status) {
    case "NEW":
      return "New";
    case "CONTACTED":
      return "Contacted";
    case "QUALIFIED":
      return "Qualified";
    case "PROPOSAL_SENT":
      return "Proposal Sent";
    case "WON":
      return "Won";
    case "LOST":
      return "Lost";
    default:
      return status;
  }
}
