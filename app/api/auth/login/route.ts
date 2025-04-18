import { NextResponse } from "next/server"

// Mock user database for demo purposes
const users = [
  {
    id: 1,
    username: "demo",
    email: "demo@example.com",
    // In a real app, this would be hashed
    password: "password123",
    role: "user",
  },
  {
    id: 2,
    username: "admin",
    email: "admin@example.com",
    password: "admin123",
    role: "admin",
  },
]

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // Find user by email
    const user = users.find((u) => u.email === email)

    if (!user || user.password !== password) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        },
      )
    }

    // Instead of using JWT, let's create a simple token for now
    // In a real app, you would use a proper JWT library
    const token = Buffer.from(
      JSON.stringify({
        user_id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours from now
      }),
    ).toString("base64")

    return NextResponse.json(
      {
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      },
      {
        headers: { "Content-Type": "application/json" },
      },
    )
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      { message: "Internal server error", details: error instanceof Error ? error.message : "Unknown error" },
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}
