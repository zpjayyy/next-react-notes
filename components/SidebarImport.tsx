"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, useRef } from "react";
import { importNote } from "@/actions";
import { useFormStatus } from "react-dom";

export default function SidebarImport() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const onChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const fileInput = event.target;
    if (!fileInput.files || fileInput.files.length === 0) {
      console.warn("No files selected");
      return;
    }

    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append("file", file);

    // try {
    //   const response = await fetch("/api/upload", {
    //     method: "POST",
    //     body: formData,
    //   });
    //
    //   if (!response.ok) {
    //     console.error("Could not find file");
    //     return;
    //   }
    //
    //   const data = await response.json();
    //   router.push(`${data.uid}`);
    //   router.refresh();
    // } catch (error) {
    //   console.error("Error parsing file", error);
    // }

    try {
      const data = await importNote(formData);
      router.push(`${data?.uid}`);
    } catch (error) {
      console.error("Error importing note", error);
    }

    event.target.type = "text";
    event.target.type = "file";
  };

  async function upload(formData: FormData) {
    const file = formData.get("file");
    if (!file) {
      console.warn("No files selected");
      return;
    }

    try {
      const data = await importNote(formData);
      router.push(`note/${data?.uid}`);
    } catch (error) {
      console.error("Error importing note", error);
    }

    formRef.current?.reset();
  }

  return (
    <form action={upload} ref={formRef}>
      <div className="text-center">
        <label htmlFor="file" className="cursor-pointer">
          Import .md file
        </label>
        <input type="file" id="file" name="file" accept=".md" />
        <div>
          <Submit />
        </div>
      </div>
    </form>
  );
}

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending}>{pending ? "submitting" : "submit"}</button>
  );
}
