import { NextResponse } from "next/server"

export async function POST() {
  // In a stateless JWT setup, the client is responsible for discarding the token
  // This endpoint is mainly for logging purposes or future extensions
  return NextResponse.json({ message: "Logged out successfully" })
}
