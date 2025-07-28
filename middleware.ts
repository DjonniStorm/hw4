import { API_URL, AVAILABLE_ENDPOINTS } from "@/shared/config";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const cookie = request.cookies.get("usersApi")?.value;
  if (!cookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const response = await fetch(`${API_URL}${AVAILABLE_ENDPOINTS.auth.me}`, {
    headers: { Cookie: `usersApi=${cookie}` },
    credentials: "include",
  });

  if (!response.ok) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/users/create", "/users/edit"],
};
