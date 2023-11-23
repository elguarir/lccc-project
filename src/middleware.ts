import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
  afterAuth(auth, req, evt) {
    // handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      const url = new URL("/sign-in", req.url);
      return NextResponse.redirect(url);
    }
    const url = new URL(req.url);
    if (
      auth.userId &&
      (url.pathname.startsWith("/sign-in") ||
        url.pathname.startsWith("/sign-up"))
    ) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  },
  publicRoutes: ["/api(.*)", "/", /^(?!\/dashboard).*/],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
