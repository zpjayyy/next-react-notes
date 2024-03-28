import { Note } from "@/lib/redis";
import dayjs from "dayjs";
import EditButton from "@/components/EditButton";
import NotePreview from "@/components/NotePreview";

export default function Note({ note }: { note: Note }) {
  const { id, title, updateTime, content } = note;
  return (
    <div className="w-full h-full p-16">
      <div>
        <div className="flex items-center" role="menubar">
          <small className="text-xl flex-1">
            Last update on {dayjs(updateTime).format("YYYY-MM-DD hh:mm:ss")}
          </small>
          <EditButton noteId={id}>Edit</EditButton>
        </div>
        <h1 className="text-6xl font-bold my-4">{title}</h1>
      </div>
      <NotePreview>{content}</NotePreview>
    </div>
  );
}
