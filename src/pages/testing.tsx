import Head from "next/head";

export default function Testing() {
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

Testing.auth = {
  role: "admin",
  loading: <div>Loading...</div>,
  unauthorized: "/auth/signin", // redirect to this url
};
