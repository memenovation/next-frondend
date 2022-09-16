import { useSession, getSession, signOut, signIn } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";

export const Header = ({}) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  console.log("session", session);
  console.log("status", status);

  const handleAuthChange = async () => {
    console.log("auth changing");
    if (session) {
      console.log("signing out");
      return signOut({ redirect: false });
    }
    return await signIn("credentials", {
      redirect: false,
      password: "password",
    });
  };

  //redirect to homepage if signed in
  useEffect(() => {
    if (session && status === "authenticated") {
      router.push("/");
      return;
    } else {
      router.push("/auth/signin");
      return;
    }
  }, [session]);

  return (
    <div className="h-12 w-full shadow-md border-bottom fixed border-red-100 bg-zinc-900">
      <button onClick={handleAuthChange}>
        {status === "authenticated" ? "Sign out" : "Sign In"}
      </button>
    </div>
  );
};
