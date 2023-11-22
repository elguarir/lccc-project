import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
  afterAuth(auth, req, evt) {
    // handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      const url = new URL("/sign-in", req.url);
      return NextResponse.redirect(url);
    }
  },
  publicRoutes: ["/api(.*)", "/", /^(?!\/dashboard).*/],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
