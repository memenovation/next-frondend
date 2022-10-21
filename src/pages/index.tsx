import Head from "next/head";

export default function Home() {
  return (
    <div className="mx-auto flex flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
        Hello World
      </div>
    </div>
  );
}
