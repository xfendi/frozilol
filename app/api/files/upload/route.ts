import { NextResponse, type NextRequest } from "next/server";
import { pinata } from "@/utils/piniata/config";
import { fileTypesMaxSizeInMB, fileTypesToExtensions } from "@/data/files";

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;

    const fileName = file?.name;
    const extension = fileName.split(".").pop()?.toLowerCase();

    const rawType = data.get("type");
    if (typeof rawType !== "string") {
      return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }
    const type = rawType as keyof typeof fileTypesToExtensions;

    if (!extension || !fileTypesToExtensions[type]?.includes(extension)) {
      return NextResponse.json(
        { error: "Unsupported file type" },
        { status: 400 }
      );
    }

    const maxSizeInBytes = fileTypesMaxSizeInMB[type] * 1024 * 1024;

    if (file.size > maxSizeInBytes) {
      return NextResponse.json(
        {
          error: `File is too large. Max allowed is ${fileTypesMaxSizeInMB[type]}MB.`,
        },
        { status: 400 }
      );
    }

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const { id, cid } = await pinata.upload.public.file(file);
    const url = await pinata.gateways.public.convert(cid);

    return NextResponse.json({ id, url, extension }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
