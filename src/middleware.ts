/* eslint-disable @typescript-eslint/no-unused-vars */
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        // Only require authentication for /admin routes (except /admin/login)
        if (
          req.nextUrl.pathname.startsWith("/admin") &&
          !req.nextUrl.pathname.startsWith("/admin/login")
        ) {
          return token !== null;
        }
        return true;
      },
    },
    pages: {
      signIn: "/admin/login",
    }
  }
);

export const config = {
  matcher: ["/admin/:path*"],
};
