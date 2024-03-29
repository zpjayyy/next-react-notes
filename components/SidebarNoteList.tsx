import { getAllNotes } from "@/lib/redis";
import SidebarNoteListFilter from "@/components/SidebarNoteListFilter";
import SidebarNoteItemHeader from "@/components/SidebarNoteItemHeader";

export default async function NoteList() {
  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  await sleep(500);
  const notes = await getAllNotes();
  if (notes.length == 0) {
    return (
      <div className="flex justify-center items-center text-xl">
        {"No notes create yet!"}
      </div>
    );
  }
  return (
    <SidebarNoteListFilter
      notes={notes.map((note) => {
        return {
          note,
          header: (
            <SidebarNoteItemHeader
              title={note.title}
              updateTime={note.updateTime}
            />
          ),
        };
      })}
    />
  );
}
