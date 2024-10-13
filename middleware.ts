import { authMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default authMiddleware({
  publicRoutes: ["/", "/sign-in(.*)", "/sign-up(.*)"],

  async afterAuth(auth, req) {
    const url = req.nextUrl;

    // Redirect unauthenticated users to the sign-in page
    if (!auth.userId && !auth.isPublicRoute) {
      return NextResponse.redirect(new URL("/", req.url));  // Redirect to "/"
    }

    // If signed in and accessing the home page, redirect to /home
    if (auth.userId && url.pathname === "/") {
      return NextResponse.redirect(new URL("/search", req.url));  // Redirect to /search
    }
  },
});

export const config = {
  matcher: [
    '/((?!.*\\..*|_next).*)',  // Match all routes except static files
    '/',  // Match the home page
    '/(api|trpc)(.*)'  // Match API routes
  ],
};
