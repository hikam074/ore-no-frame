// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'
// import { createServerClient } from '@supabase/ssr'

// export async function proxy(req: NextRequest) {
//   const res = NextResponse.next()

//   const supabase = createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     {
//       cookies: {
//         getAll() {
//           return req.cookies.getAll()
//         },
//         setAll(cookies) {
//           cookies.forEach(({ name, value, options }) => {
//             res.cookies.set(name, value, options)
//           })
//         },
//       },
//     }
//   )

//   const {
//     data: { user },
//   } = await supabase.auth.getUser()

//   // belum login
//   if (!user && req.nextUrl.pathname.startsWith('/admin')) {
//     const loginUrl = new URL('/auth/login', req.url)
//     return NextResponse.redirect(loginUrl)
//   }

//   return res
// }
// export const config = {
//   matcher: ['/admin/:path*'],
// }

// src/proxy.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  // Biarkan request lanjut ke layout/page tanpa diapa-apakan
  return NextResponse.next();
}

// Matikan matcher agar tidak mendeteksi route apapun (atau biarkan default)
export const config = {
  matcher: [
    /* * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};