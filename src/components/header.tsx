import { useSession, getSession, signOut, signIn } from "next-auth/react";

import Link from "next/link";

export const Header = ({}) => {
  const { data: session, status } = useSession();

  const handleAuthChange = async () => {
    console.log("auth changing");
    if (session) {
      console.log("signing out");
      signOut({ redirect: false });
      return;
    }
  };

  return (
    <div className="h-12 w-full shadow-md fixed flex justify-between">
      {session && status === "authenticated" ? (
        <button onClick={handleAuthChange}>Sign Out</button>
      ) : (
        <div></div>
      )}

      <div className="flex justify-center items-center gap-x-4">
        <Link href={"/"}>Home</Link>
        <Link href={"/testing"}>Testing</Link>
      </div>
      <div></div>
    </div>
  );
};
