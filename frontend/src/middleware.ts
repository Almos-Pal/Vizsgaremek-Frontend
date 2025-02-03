// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Allow public paths (login and registration) and Next.js internals (like static files)
    if (
        pathname.startsWith("/_next") ||
        pathname.startsWith("/static") ||
        pathname.includes(".") || // e.g. .css, .js, .png files
        pathname.startsWith("/bejelentkezes") ||
        pathname.startsWith("/regisztracio")
    ) {
        return NextResponse.next();
    }

    // Attempt to get a valid session token from the request
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
        // If there is no token, redirect to the login page with a callback URL
        const loginUrl = req.nextUrl.clone();
        loginUrl.pathname = "/bejelentkezes";
        loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        // Protect every route except the ones explicitly allowed
        '/((?!api|_next/static|_next/image|favicon.ico|bejelentkezes|regisztracio).*)',
    ],
};

/*
// middleware.ts
export const config = {
    matcher: [
        // ...
        ]
        };
*/

// or the logic inside export async function middleware(req)