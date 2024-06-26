import Link from "next/link";
import Image from "next/image";
import SidebarNoteList from "./SidebarNoteList";
import EditButton from "@/components/EditButton";
import { Suspense } from "react";
import NoteListSkeleton from "@/components/NoteListSkeleton";
import SidebarSearchField from "@/components/SidebarSearchField";
import { useTranslations } from "next-intl";
import SidebarImport from "@/components/SidebarImport";

export default function Sidebar() {
  const t = useTranslations("basic");
  return (
    <>
      <section className="h-full bg-white shadow-2xl overflow-y-scroll z-40 flex-shrink-0 max-w-80 w-1/3">
        <Link href={"/"}>
          <section className="flex justify-center m-6 text-2xl text-blue-500">
            <Image
              src="/logo.svg"
              width="22"
              height="22"
              role="presentation"
              alt="react note"
            />
            <strong>React Note</strong>
          </section>
        </Link>
        <section role="menubar" className="p-6 flex justify-between">
          <SidebarSearchField />
          <EditButton noteId="">{t("new")}</EditButton>
        </section>
        <nav>
          <Suspense fallback={<NoteListSkeleton />}>
            <SidebarNoteList />
          </Suspense>
        </nav>
        <SidebarImport />
      </section>
    </>
  );
}
