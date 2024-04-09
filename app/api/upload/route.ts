import { NextRequest, NextResponse } from "next/server";
import dayjs from "dayjs";
import * as process from "node:process";
import { join } from "path";
import { mkdir, stat, writeFile } from "fs/promises";
import mime from "mime";
import { addNotes, Note } from "@/lib/redis";
import { revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
  const formDate = await request.formData();
  const file = formDate.get("file");

  if (!file || typeof file === "string") {
    return NextResponse.json(
      {
        error: "file is required",
      },
      { status: 400 },
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const relativeUploadDir = `/upload/${dayjs().format("YY-MM-DD")}`;
  const uploadDir = join(process.cwd(), "public", relativeUploadDir);

  try {
    await stat(uploadDir);
  } catch (e) {
    // if (e instanceof Error) {
    //   if (e.code === "ENOENT") {
    //     await mkdir(uploadDir, { recursive: true });
    //   } else {
    //
    //   }
    // }
    console.error(e);
    return NextResponse.json(
      {
        error: "something went wrong",
      },
      { status: 500 },
    );
  }

  try {
    const uniqueSuffix = `${Math.random().toString(36).slice(-6)}`;
    const fileName = file.name.replace(/\.[^/.]+$/, "");
    const uniqueFileName = `${fileName}-${uniqueSuffix}.${mime.getExtension(file.type)}`;
    await writeFile(`${uploadDir}/${uniqueFileName}`, buffer);

    const note = JSON.parse(
      `{title: ${fileName} content: ${buffer.toString("utf-8")}`,
    );
    const res = await addNotes(note);

    revalidatePath("/", "layout");

    return NextResponse.json({
      fileUrl: `${relativeUploadDir}/${uniqueFileName}`,
      uid: res,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "something went wrong" },
      { status: 500 },
    );
  }
}
