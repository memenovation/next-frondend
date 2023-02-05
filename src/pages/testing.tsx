import Head from "next/head";
import { useSession, getSession, signOut, signIn } from "next-auth/react";

export default function Testing() {
  const { data: sessionData, status } = useSession();
  console.log("h session", sessionData);
  console.log("h status", status);

  return (
    <div className="mx-auto flex flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div>Page 2 for testing</div>
      </main>
    </div>
  );
}
