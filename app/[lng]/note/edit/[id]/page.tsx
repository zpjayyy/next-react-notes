import { getNote } from "@/lib/redis";
import NoteEditor from "@/components/NoteEditor";

export default async function EditPage({ params }: { params: { id: string } }) {
  const note = await getNote(params.id);

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  await sleep(2000);

  if (note == null) {
    return (
      <div className="text-center">
        <span className="">Click a note on the left to view something! 🥺</span>
      </div>
    );
  }

  return <NoteEditor id={note.id} title={note.title} content={note.content} />;
}
