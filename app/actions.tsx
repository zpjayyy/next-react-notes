"use server";

import { addNotes, delNote, Note, updateNote } from "@/lib/redis";
import { redirect } from "next/navigation";
import dayjs from "dayjs";
import { revalidatePath } from "next/cache";

export async function saveNote(formData: FormData) {
  const id = formData.get("id");
  const data = {
    id: "",
    title: formData.get("title") as string,
    content: formData.get("content") as string,
    updateTime: dayjs(new Date()).format("YYYY-MM-DD hh:mm:ss"),
  };

  if (typeof id === "string" && id !== "") {
    await updateNote(id, data);
    revalidatePath("/", "layout");
    redirect(`/note/${id}`);
  } else {
    const res = await addNotes(data);
    revalidatePath("/", "layout");
    redirect(`/note/${res}`);
  }
}

export async function deleteNote(formData: FormData) {
  const id = formData.get("id");
  if (typeof id === "string") {
    await delNote(id);
    revalidatePath("/", "layout");
    redirect("/");
  }
}
