import { NextRequest } from "next/server";
import NextAuth from "next-auth";

import routes from "@/config/routes";

const { auth } = NextAuth({ session: { strategy: "jwt" }, providers: [] });

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const session = await auth();
  const isAuthenticated = !!session?.user;
  const shouldRedirectToLogin =
    !isAuthenticated &&
    routes.JUST_AUTHENTICATED_USER_ROUTES.find((route) =>
      nextUrl.pathname.startsWith(route),
    );
  const shouldRedirectToRoot =
    isAuthenticated &&
    routes.JUST_NOT_AUTHENTICATED_USER_ROUTES.find((route) =>
      nextUrl.pathname.startsWith(route),
    );

  if (shouldRedirectToLogin)
    return Response.redirect(new URL(routes.AUTH.LOG_IN, nextUrl));
  else if (shouldRedirectToRoot)
    return Response.redirect(new URL("/", nextUrl));
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
