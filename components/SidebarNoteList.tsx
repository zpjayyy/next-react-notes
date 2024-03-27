import { Note } from "@/lib/redis";
import dayjs from "dayjs";

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
      {notes.map((note, index) => (
        <li key={note.id}>
          <header className="flex flex-col text-xl px-8 py-2">
            <strong>{note.title}</strong>
            <small>{dayjs(note.updateTime).format('YYYY-MM-DD hh:mm:ss')}</small>
          </header>
        </li>
      ))}
    </ul>
  );
}
