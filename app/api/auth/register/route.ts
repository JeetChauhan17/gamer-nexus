import { NextResponse } from "next/server"

// Mock user database for demo purposes
const users = [
  {
    id: 1,
    username: "demo",
    email: "demo@example.com",
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
    const { username, email, password } = await request.json()

    // Check if user already exists
    const existingUser = users.find((u) => u.email === email)
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        {
          status: 409,
          headers: { "Content-Type": "application/json" },
        },
      )
    }

    // Create new user
    const newUser = {
      id: users.length + 1,
      username,
      email,
      password, // In a real app, this would be hashed
      role: "user",
    }

    users.push(newUser)

    return NextResponse.json(
      { message: "User registered successfully" },
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      },
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}
