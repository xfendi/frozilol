import { NextResponse, type NextRequest } from "next/server";
import { pinata } from "@/utils/piniata/config";

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const id: string = data.get("id") as unknown as string;

    console.log(id);
    await pinata.files.public.delete([id as string]);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
