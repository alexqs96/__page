import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  const jwt = request.cookies.get("pageUser")
  const url = new URL(request.url)

  if (!jwt && (url.pathname === "/login" || url.pathname === "/register")){ 
    return NextResponse.next()
  } else if (!jwt){ 
    return NextResponse.redirect(new URL("/login", request.url))
  }

  try {
    await jwtVerify(
      jwt.value,
      new TextEncoder().encode(process.env.JWT_SECRET)
    )

    if (url.pathname === "/login" || url.pathname === "/register") {
      return NextResponse.redirect(new URL("/", request.url))
    } else {
      return NextResponse.next()
    }
  } catch (error) {
    return NextResponse.redirect(new URL("/login", request.url))
  }
}

export const config = {
  matcher: ["/profile", "/login", "/register"],
};
