import { useFormStatus } from "react-dom";
import Image from "next/image";

export default function DeleteButton({
  isDraft,
  formAction,
}: {
  isDraft: boolean;
  formAction: any;
}) {
  const { pending } = useFormStatus();
  return (
    !isDraft && (
      <button
        className="bg-white border border-red-600 rounded-xl text-center flex justify-between items-center px-2 py-0.5 text-red-500"
        disabled={pending}
        role="menuitem"
        formAction={formAction}
      >
        <Image
          className="mr-1"
          src="/cross.svg"
          alt="Delete"
          width="10"
          height="10"
          role="presentation"
        />
        Delete
      </button>
    )
  );
}
