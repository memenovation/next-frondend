import "../../styles/global.css";
import { SessionProvider } from "next-auth/react";
import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";
//components
import { Layout } from "@components/Layout";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Layout>
        {Component.auth ? (
          <Auth>
            <Component {...pageProps} />
          </Auth>
        ) : (
          <Component {...pageProps} />
        )}
      </Layout>
    </SessionProvider>
  );
}

function Auth({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const isUser = !!session?.user;
  useEffect(() => {
    if (status === "loading") return; // Do nothing while loading
    if (!isUser) router.push("/auth/signin"); // If not authenticated, force log in
  }, [session, status]);

  if (isUser) {
    return children;
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <div>Loading...</div>;
}

export default MyApp;
