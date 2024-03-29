"use client";

import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";

function Spinner({ active = true }) {
  return (
    <div
      className=""
      role="progressbar"
      aria-busy={active ? "true" : "false"}
    />
  );
}

export default function SidebarSearchField() {
  const { replace } = useRouter();
  const pathName = usePathname();
  const [isPending, startTransition] = useTransition();

  function handleSearch(term: string | null) {
    const params = new URLSearchParams(window.location.search);
    if (term) {
      params.set("q", term);
    } else {
      params.delete("q");
    }

    startTransition(() => {
      replace(`${pathName}?${params.toString()}`);
    });
  }

  return (
    <div className="" role="search">
      <label className="" htmlFor="siderbar-search-input">
        Search note by title
      </label>
      <input
        id="siderbar-search-input"
        placeholder="search"
        type="text"
        onChange={(event) => handleSearch(event.target.value)}
      />
      <Spinner active={isPending} />
    </div>
  );
}
