import { Header } from "./header";
import { useEffect, useLayoutEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export const Layout = ({ children }) => {
  const router = useRouter();
  const { data: session, status } = useSession();

  console.log("session", session);
  console.log("status", status);

  useEffect(() => {
    //handle redirect to signin when logged out
    if (status === "unauthenticated" && router.pathname != "/auth/signin") {
      console.log("redirectin");
      router.push("/auth/signin");
      return;
    }
    //handle redirect after signin
    if (
      router.pathname == "/auth/signin" &&
      session &&
      status === "authenticated"
    ) {
      const callbackUrl = router?.query?.callbackUrl || "/";

      router.push(callbackUrl.toString());
      return;
    }
  }, [session]);

  return (
    <div className="flex flex-col items-center  min-h-screen w-full">
      <Header />
      <main className="flex flex-col items-center pt-16">{children}</main>
    </div>
  );
};
