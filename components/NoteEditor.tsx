"use client";

import { useState } from "react";
import Image from "next/image";
import NotePreview from "@/components/NotePreview";
import { deleteNote, saveNote } from "@/app/actions";

export default function NoteEditor({
  id,
  title,
  content,
}: {
  id: string;
  title: string;
  content: string;
}) {
  const [pending] = useState(false);
  const [getTitle, setTitle] = useState(title);
  const [getContent, setContent] = useState(content);
  const isDraft = !id;

  return (
    <div className="w-full h-full p-16 flex">
      <form className="grow flex flex-col mr-4" autoComplete="false">
        <label className="" htmlFor="note-title-input">
          Enter a title for you note
        </label>
        <input
          id="note-title-input"
          className="border border-gray-400 min-h-12"
          type="text"
          value={getTitle}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <label htmlFor="note-content-input">Enter content for you note</label>
        <textarea
          id="note-content-input"
          className="grow border border-gray-400"
          value={getContent}
          onChange={(event) => {
            setContent(event.target.value);
          }}
        />
      </form>
      <div className="grow flex flex-col">
        <form className="flex flex-row justify-end" role="menubar">
          <input type="hidden" name="id" value={id} />
          <input type="hidden" name="title" value={getTitle} />
          <input type="hidden" name="content" value={getContent} />
          <button
            className="bg-blue-400 rounded-xl text-center flex justify-between items-center px-2 py-0.5 text-white mr-2"
            disabled={pending}
            type="submit"
            role="menuitem"
            formAction={saveNote}
          >
            <Image
              className="mr-1"
              src="/checkmark.svg"
              alt="Done"
              width="14"
              height="10"
              role="presentation"
            />
            Done
          </button>
          {!isDraft && (
            <button
              className="bg-white border border-red-600 rounded-xl text-center flex justify-between items-center px-2 py-0.5 text-red-500"
              disabled={pending}
              role="menuitem"
              formAction={deleteNote}
            >
              <Image
                className="mr-1"
                src="/cross.svg"
                alt="Delete"
                width="10"
                height="10"
                role="presentation"
              />
              Delete
            </button>
          )}
        </form>
        <div className="my-4">
          <label className="rounded-3xl bg-blue-300 px-2 py-2 font-bold">
            Preview
          </label>
        </div>
        <h1 className="text-2xl mb-4">{getTitle}</h1>
        <NotePreview>{getContent}</NotePreview>
      </div>
    </div>
  );
}
