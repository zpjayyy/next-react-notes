"use server";

import { addNotes, delNote, updateNote } from "@/lib/redis";
import { redirect } from "next/navigation";
import dayjs from "dayjs";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { join } from "path";
import process from "node:process";
import { mkdir, stat, writeFile } from "fs/promises";
import mime from "mime";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const schema = z.object({
  title: z.string(),
  content: z.string().min(1, "请填写内容").max(100, "字数最多100个"),
});

export async function saveNote(prevState: any, formData: FormData) {
  const id = formData.get("id");
  const data = {
    id: "",
    title: formData.get("title") as string,
    content: formData.get("content") as string,
    updateTime: dayjs(new Date()).format("YYYY-MM-DD hh:mm:ss"),
  };

  const validated = schema.safeParse(data);
  if (!validated.success) {
    return {
      errors: validated.error.issues,
      message: "",
    };
  }

  await sleep(2000);

  if (typeof id === "string" && id !== "") {
    await updateNote(id, data);
    revalidatePath("/", "layout");
    // redirect(`/note/${id}`);
  } else {
    const res = await addNotes(data);
    revalidatePath("/", "layout");
    // redirect(`/note/${res}`);
  }

  return {
    message: "Add success",
    errors: [],
  };
}

export async function deleteNote(prevState: any, formData: FormData) {
  const id = formData.get("id");
  if (typeof id === "string") {
    await delNote(id);
    revalidatePath("/", "layout");
    redirect("/");
  }
  return { message: "Delete success" };
}

export async function importNote(formData: FormData) {
  const file = formData.get("file");

  if (!file || typeof file === "string") {
    return { error: "file is required" };
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const relativeUploadDir = `/upload/${dayjs().format("YY-MM-DD")}`;
  const uploadDir = join(process.cwd(), "public", relativeUploadDir);

  try {
    await stat(uploadDir);
  } catch (e: any) {
    if (e.code === "ENOENT") {
      await mkdir(uploadDir, { recursive: true });
    } else {
      console.error(e);
      return { error: "something went wrong" };
    }
  }

  try {
    const uniqueSuffix = `${Math.random().toString(36).slice(-6)}`;
    const fileName = file.name.replace(/\.[^/.]+$/, "");
    const uniqueFileName = `${fileName}-${uniqueSuffix}.${mime.getExtension(file.type)}`;
    await writeFile(`${uploadDir}/${uniqueFileName}`, buffer);

    const note = JSON.parse(
      `{"title": "${uniqueFileName}", "content": "${buffer.toString("utf-8")}"}`,
    );
    const res = await addNotes(note);

    revalidatePath("/", "layout");

    return {
      fileUrl: `${relativeUploadDir}/${uniqueFileName}`,
      uid: res,
    };
  } catch (e) {
    console.error(e);
    return { error: "something went wrong" };
  }
}
