"use server";

import { addNotes, delNote, updateNote } from "@/lib/redis";
import { redirect } from "next/navigation";
import dayjs from "dayjs";
import { revalidatePath } from "next/cache";
import { z } from "zod";

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
