import { prisma } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { NextResponse } from "next/server";

export async function GET() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user === null || !user.id) {
    throw new Error("something went wrong when registring...");
  }

  const existedUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (!existedUser) {
    await prisma.user.create({
      data: {
        id: user.id,
        email: user.email as string,

        image: user.picture as string,
        name: ((user.family_name as string) + user.given_name) as string,
      },
    });
  }

  return NextResponse.redirect("/");
}
