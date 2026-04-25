import { NextRequest, NextResponse } from "next/server"
import { getAdminCredentials } from "@/lib/admin-auth"

function unauthorizedResponse() {
  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Youth Admin", charset="UTF-8"',
    },
  })
}

export function proxy(request: NextRequest) {
  let credentials: { username: string; password: string }
  try {
    credentials = getAdminCredentials()
  } catch {
    return new NextResponse("Admin auth is not configured.", { status: 500 })
  }

  const authHeader = request.headers.get("authorization")
  if (!authHeader?.startsWith("Basic ")) {
    return unauthorizedResponse()
  }

  try {
    const encoded = authHeader.replace("Basic ", "")
    const decoded = atob(encoded)
    const separatorIndex = decoded.indexOf(":")
    if (separatorIndex < 0) {
      return unauthorizedResponse()
    }

    const username = decoded.slice(0, separatorIndex)
    const password = decoded.slice(separatorIndex + 1)
    if (username !== credentials.username || password !== credentials.password) {
      return unauthorizedResponse()
    }
  } catch {
    return unauthorizedResponse()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
}
