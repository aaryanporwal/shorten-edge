import { getUrl } from "../lib/redis";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const path = req.nextUrl.pathname.split("/")[1];
  if (["favicon.ico", "api", ""].includes(path)) {
    return;
  }

  const url = await getUrl(path); // path:url
  // if (!url.startsWith(`http://`)){

  // }
    if (url) {
      const res = NextResponse.redirect(url);
      return res;
    }
}
