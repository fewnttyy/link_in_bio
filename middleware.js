import { NextResponse } from "next/server";


export function middleware(req) {
    const userRole = req.cookies.get("role")?.value;

    const url = req.nexturl.pathname;

    if (!userRole) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    if (url.startsWith("/user") && userRole !== "user") {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    if (url.startsWith("/super_admin") && userRole !== "super_admin") {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/user/:path*", "/super_admin/:path*"],
};