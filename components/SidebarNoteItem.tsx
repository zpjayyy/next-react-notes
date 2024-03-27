import { Note } from "@/lib/redis";
import SidebarNoteContent from "@/components/SidebarNoteContent";
import dayjs from "dayjs";

export default function SidebarNoteItem({ note }: { note: Note }) {
  return (
    <SidebarNoteContent
      id={note.id}
      title={note.title}
      expandedChildren={
        <p className="text-xl">
          {note.content.substring(0, 20) || <i>(No content)</i>}
        </p>
      }
    >
      <header className="flex flex-col text-2xl flex-1">
        <strong>{note.title}</strong>
        <small>{dayjs(note.updateTime).format("YYYY-MM-DD hh:mm:ss")}</small>
      </header>
    </SidebarNoteContent>
  );
}
