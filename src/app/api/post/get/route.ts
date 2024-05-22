import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const post = await db.post.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        tag: true,
      },
    });
    return NextResponse.json(post, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "não achei" }, { status: 500 });
  }
}
