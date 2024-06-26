import { getNote } from "@/lib/redis";
import Note from "@/components/Note";

export default async function Page({ params }: { params: { id: string } }) {
  const noteId = params.id;
  const data = await getNote(noteId);

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  await sleep(1000);

  if (data == null) {
    return (
      <div className="text-center">
        <span className="">Click a note on the left to view something! 🥺</span>
      </div>
    );
  }

  return <Note note={data} />;
}
