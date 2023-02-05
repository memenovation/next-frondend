import { withAuth } from "next-auth/middleware";

export const config = {
  matcher: ["/((?!auth|_next/static|_next/image|favicon.ico).*)"],
};

export default withAuth({});
