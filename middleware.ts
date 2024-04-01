import { NextRequest, NextResponse } from "next/server";
import Negotiator from "negotiator";
import { match } from "@formatjs/intl-localematcher";
import { defaultLocale, locales } from "@/config";
import createMiddleware from "next-intl/middleware";

// const publicFile = /\.(.*)$/;
//
// const excludeFile = ["logo.svg"];
//
// function getLocale(request: NextRequest) {
//   const headers = {
//     "accept-language": request.headers.get("accept-language") || "",
//   };
//   const languages = new Negotiator({ headers }).languages();
//   return match(languages, locales, defaultLocale);
// }
//
// export function middleware(request: NextRequest) {
//   const pathname = request.nextUrl.pathname;
//   const pathnameHasLocale = locales.some(
//     (value: string) =>
//       pathname.startsWith(`/${value}/`) || pathname === `/${value}`,
//   );
//   if (pathnameHasLocale) {
//     return;
//   }
//
//   if (
//     publicFile.test(pathname) &&
//     excludeFile.indexOf(pathname.substring(1)) == -1
//   ) {
//     return;
//   }
//
//   const locale = getLocale(request);
//   request.nextUrl.pathname = `/${locale}/${pathname}`;
//
//   if (locale == defaultLocale) {
//     return NextResponse.rewrite(request.nextUrl);
//   }
//   return NextResponse.redirect(request.nextUrl);
// }

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "as-needed",
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
