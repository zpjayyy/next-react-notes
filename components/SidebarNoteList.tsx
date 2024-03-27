import { Note } from "@/lib/redis";
import dayjs from "dayjs";
import SidebarNoteItem from "@/components/SidebarNoteItem";

export default async function NoteList({ notes }: { notes: Note[] }) {
  if (notes.length == 0) {
    return (
      <div className="flex justify-center items-center text-xl">
        {"No notes create yet!"}
      </div>
    );
  }
  return (
    <ul>
      {notes.map((note) => (
        <li key={note.id}>
          <SidebarNoteItem note={note} />
        </li>
      ))}
    </ul>
  );
}
