import dayjs from "dayjs";

export default function SidebarNoteItemHeader({
  title,
  updateTime,
}: {
  title: string;
  updateTime: string;
}) {
  return (
    <header className="flex flex-col text-2xl flex-1">
      <strong>{title}</strong>
      <small>{dayjs(updateTime).format("YYYY-MM-DD hh:mm:ss")}</small>
    </header>
  );
}
