import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/auth";
import { prisma } from "@/lib/prisma";
import { LeadStatus } from "@/generated/prisma/enums";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const formData = await request.formData();
  const rawStatus = formData.get("status");

  if (
    !rawStatus ||
    !Object.values(LeadStatus).includes(rawStatus as LeadStatus)
  ) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  await prisma.lead.update({
    where: {
      id,
    },
    data: {
      status: rawStatus as LeadStatus,
    },
  });

  return NextResponse.redirect(new URL("/leads", request.url));
}
