import { withAuth } from "next-auth/middleware";
import { useRouter } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

// middleware is applied to all routes, use conditionals to select

export default withAuth(
  function middleware(req: NextRequest) {
    console.log("middleware fired");
    if (req.nextUrl.pathname === "/")
      return NextResponse.redirect(new URL("/home", req.nextUrl.origin));
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        if (req.nextUrl.pathname.startsWith("/home") && token === null) {
          return false;
        }
        return true;
      },
    },
  }
);

export const config = { matcher: ["/", "/home"] };
