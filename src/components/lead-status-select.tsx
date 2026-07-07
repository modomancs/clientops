"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type LeadStatusSelectProps = {
  leadId: string;
  currentStatus: string;
};

export default function LeadStatusSelect({
  leadId,
  currentStatus,
}: LeadStatusSelectProps) {
  const router = useRouter();
  const [status, setStatus] = useState(currentStatus);
  const [isUpdating, setIsUpdating] = useState(false);

  async function handleChange(newStatus: string) {
    setStatus(newStatus);
    setIsUpdating(true);

    await fetch(`/api/leads/${leadId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    });

    setIsUpdating(false);
    router.refresh();
  }

  return (
    <select
      value={status}
      onChange={(event) => handleChange(event.target.value)}
      disabled={isUpdating}
      className="mt-3 w-full rounded-lg border border-slate-300 px-2 py-1 text-xs disabled:opacity-60"
    >
      <option value="NEW">New</option>
      <option value="CONTACTED">Contacted</option>
      <option value="QUALIFIED">Qualified</option>
      <option value="PROPOSAL_SENT">Proposal Sent</option>
      <option value="WON">Won</option>
      <option value="LOST">Lost</option>
    </select>
  );
}