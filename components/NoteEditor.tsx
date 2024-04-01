"use client";

import { useEffect, useState } from "react";
import NotePreview from "@/components/NotePreview";
import { deleteNote, saveNote } from "@/app/[lng]/actions";
import { useFormState } from "react-dom";
import SaveButton from "@/components/SaveButton";
import DeleteButton from "@/components/DeleteButton";

const initialState = {
  message: "",
  errors: [],
};

export default function NoteEditor({
  id,
  title,
  content,
}: {
  id: string;
  title: string;
  content: string;
}) {
  const [saveState, saveFormAction] = useFormState(saveNote, initialState);
  const [delState, delFormAction] = useFormState(deleteNote, initialState);

  const [getTitle, setTitle] = useState(title);
  const [getContent, setContent] = useState(content);
  const isDraft = !id;

  useEffect(() => {
    if (saveState.errors) {
      console.log(saveState.errors);
    }
  }, [saveState]);

  return (
    <div className="w-full h-full p-16 flex">
      <form className="grow flex flex-col mr-4" autoComplete="false">
        <div>
          {saveState?.message}
          {saveState?.errors && saveState?.errors[0]?.message}
        </div>
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

          <SaveButton formAction={saveFormAction} />
          <DeleteButton isDraft={isDraft} formAction={delFormAction} />
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
