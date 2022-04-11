import type { NextRequest, NextFetchEvent } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest, event: NextFetchEvent) {
  if (req.ua?.isBot) {
    return new Response("봇은 안돼요. 사람만 되요.", { status: 403 });
  }
  // if (!req.url.includes("/api")) {
  //   if (!req.url.includes("/enter")) {
  //     if (!req.cookies.maxSession) {
  //       // return NextResponse.redirect(`${req.nextUrl.origin}/enter`);
  //       return NextResponse.redirect(new URL("/enter", req.url));
  //     }
  //   }
  // }
}
