import { NextResponse } from "next/server";
import { checkUserHasProduct } from "@/lib/other/checkUserHasProduct";

export async function POST(req: Request) {
  const { userId, productId } = await req.json();

  const hasProduct = await checkUserHasProduct(productId, userId);

  return NextResponse.json({ hasProduct });
}
