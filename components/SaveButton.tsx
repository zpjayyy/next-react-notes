import { useFormStatus } from "react-dom";
import Image from "next/image";

export default function SaveButton({ formAction }: { formAction: any }) {
  const { pending } = useFormStatus();
  return (
    <button
      className="bg-blue-400 rounded-xl text-center flex justify-between items-center px-2 py-0.5 text-white mr-2"
      disabled={pending}
      type="submit"
      role="menuitem"
      formAction={formAction}
    >
      <Image
        className="mr-1"
        src="/checkmark.svg"
        alt="Done"
        width="14"
        height="10"
        role="presentation"
      />
      {pending ? "Saving" : "Done"}
    </button>
  );
}
