import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-7x1">
        <div className="mb-8">
          <p className="text-sm text-slate-500">Dashboard</p>
          <h1 className="text-3x1 font-semibold text-slate-900">
            Welcome{session?.user?.name ? `, ${session.user.name}` : ""}
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Your CRM workspace is now connected and ready for the next step.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2x1 border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Clients</p>
            <p className="mt-2 text-3x1 font-semibold text-slate-900">0</p>
          </div>
          <div className="rounded-2x1 border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Deals</p>
            <p className="mt-2 text-3x1 font-semibold text-slate-900">0</p>
          </div>
        </div>
      </div>
    </main>
  );
}
