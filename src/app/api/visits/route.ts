import { registerVisit } from "@/server/routers/article";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  let res = await registerVisit();
  return NextResponse.json(res);
}
