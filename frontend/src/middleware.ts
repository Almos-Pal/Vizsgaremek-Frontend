// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { useSession } from "next-auth/react";

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;


    if (
        pathname.startsWith("/_next") ||
        pathname.startsWith("/static") ||
        pathname.includes(".") ||
        pathname.startsWith("/bejelentkezes") ||
        pathname.startsWith("/regisztracio")
    ) {
        return NextResponse.next();
    }

    

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
        const loginUrl = req.nextUrl.clone();
        loginUrl.pathname = "/bejelentkezes";
        loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
        return NextResponse.redirect(loginUrl);
    }


    if (pathname.startsWith("/admin") && !token.user.isAdmin) {
         return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        // Protect every route except the ones explicitly allowed
        '/((?!api|_next/static|_next/image|favicon.ico|bejelentkezes|regisztracio).*)',
    ],
};

