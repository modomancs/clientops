import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const leads = await prisma.lead.findMany({
    where: {
      companyId: session.user.companyId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(leads);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await request.json();

  if (!data.firstName || !data.lastName) {
    return NextResponse.json(
      { error: "First name and last name are required" },
      { status: 400 },
    );
  }

  const lead = await prisma.lead.create({
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email || null,
      phone: data.phone || null,
      companyName: data.companyName || null,
      status: data.status || "NEW",
      source: data.source || null,
      value: data.value ? Number(data.value) : null,
      notes: data.notes || null,
      company: {
        connect: {
          id: session.user.companyId,
        },
      },
    },
  });

  return NextResponse.json(lead, { status: 201 });
}
