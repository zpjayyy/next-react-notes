import { auth, signIn, signOut } from "@/auth";
import Link from "next/link";

function SignIn({ provider, ...props }: { provider?: any }) {
  return (
    <form
      action={async () => {
        "use server";
        await signIn(provider);
      }}
    >
      <button {...props}>Sign in</button>
    </form>
  );
}

function SignOut(props: any) {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button {...props}>Sign out</button>
    </form>
  );
}

export default async function Header() {
  const session = await auth();
  return (
    <header className="flex justify-around">
      <Link href="/client">Client side components</Link>
      {session?.user ? (
        <span>
          {session?.user.name}
          <SignOut />
        </span>
      ) : (
        <SignIn />
      )}
    </header>
  );
}
