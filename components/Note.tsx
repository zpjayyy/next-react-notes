import { Note } from "@/lib/redis";
import dayjs from "dayjs";
import EditButton from "@/components/EditButton";
import NotePreview from "@/components/NotePreview";

export default function Note({ note }: { note: Note }) {
  const { id, title, updateTime, content } = note;
  return (
    <div>
      <div>
        <h1>{title}</h1>
        <div role="menubar">
          <small>
            Last update on {dayjs(updateTime).format("YYYY-MM-DD hh:mm:ss")}
          </small>
          <EditButton noteId={id}>Edit</EditButton>
        </div>
      </div>
      <NotePreview>{content}</NotePreview>
    </div>
  );
}
