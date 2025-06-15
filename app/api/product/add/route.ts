import { addProductToUser } from "@/lib/other/addProductToUser";

export async function POST(req: Request) {
  const { userId, productId } = await req.json();

  await addProductToUser(productId, userId);
}
