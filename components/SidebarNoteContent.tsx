"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState, useTransition } from "react";
import Image from "next/image";

export default function SidebarNoteContent({
  id,
  title,
  children,
  expandedChildren,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
  expandedChildren: React.ReactNode;
}) {
  const router = useRouter();
  const pathName = usePathname();
  const selectedId = pathName?.split("/")[1] || null;

  const [isPending] = useTransition();
  const [isExpanded, setIsExpanded] = useState(false);
  const isActive = id === selectedId;

  const itemRef = useRef<HTMLDivElement>(null);
  const prevTitleRef = useRef(title);

  useEffect(() => {
    if (title !== prevTitleRef.current) {
      prevTitleRef.current = title;
      itemRef.current?.classList.add("flash");
    }
  }, [title]);

  return (
    <div
      ref={itemRef}
      onAnimationEnd={() => itemRef.current?.classList.remove("flash")}
      className="flex flex-col mx-8 my-2 bg-gray-200"
    >
      <div className="flex" onClick={event => router.push(`/note/${id}`)}>
        {children}
        {/*<button*/}
        {/*  className={`absolute top-0 left-0 right-0 bottom-0 w-5 h-5 rounded-md bg-orange-500*/}
        {/*  ${isPending ? "bg-gray-800" : ""} ${isActive ? "bg-blue-600 border-2 border-blue-500" : "border-2 border-transparent"}`}*/}
        {/*  onClick={() => {*/}
        {/*    // const sidebarToggle = document.getElementById("sidebar-toggle");*/}
        {/*    // if (sidebarToggle) {*/}
        {/*    // }*/}
        {/*    router.push(`/note/${id}`);*/}
        {/*  }}*/}
        {/*>*/}
        {/*  Open note for preview*/}
        {/*</button>*/}
        <button
          className="z-10 rounded-full border border-gray-50 w-6 h-6 justify-end relative"
          onClick={(event) => {
            event.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
        >
          {isExpanded ? (
            <Image
              src="/chevron-down.svg"
              alt="collapse"
              width="10"
              height="10"
              className="m-auto"
            />
          ) : (
            <Image
              src="/chevron-up.svg"
              alt="expand"
              width="10"
              height="10"
              className="m-auto"
            />
          )}
        </button>
      </div>
      {isExpanded && expandedChildren}
    </div>
  );
}
