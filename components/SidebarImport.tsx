"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent } from "react";

export default function SidebarImport() {
  const router = useRouter();

  const onChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const fileInput = event.target;
    if (!fileInput.files || fileInput.files.length === 0) {
      console.warn("No files selected");
      return;
    }

    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        console.error("Could not find file");
        return;
      }

      const data = await response.json();
      router.push(`note/${data.uid}`);
    } catch (error) {
      console.error("Error parsing file", error);
    }

    event.target.type = "text";
    event.target.type = "file";
  };

  return (
    <form method="post" encType="multipart/form-data">
      <div className="text-center">
        <label form="file" className="cursor-pointer">
          Import .md file
        </label>
        <input
          type="file"
          id="file"
          multiple
          className="absolute clip"
          onChange={onChange}
        />
      </div>
    </form>
  );
}
