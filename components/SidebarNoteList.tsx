import { getAllNotes, Note } from "@/lib/redis";
import SidebarNoteItem from "@/components/SidebarNoteItem";

export default async function NoteList() {
  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  await sleep(10000);
  const notes = await getAllNotes();
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
