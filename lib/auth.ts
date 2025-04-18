// Authentication utility functions

interface User {
  id: number
  username: string
  email: string
  role: string
}

interface AuthToken {
  user_id: number
  username: string
  email: string
  role: string
  exp: number
}

export const login = async (email: string, password: string) => {
  try {
    console.log("Attempting login for:", email)
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })

    console.log("Login response status:", response.status)

    // Check if the response is ok (status in the range 200-299)
    if (!response.ok) {
      // For non-ok responses, try to get the error message
      let errorMessage = `Login failed with status: ${response.status}`

      // Only try to parse the body if the response has a content-type header indicating JSON
      const contentType = response.headers.get("content-type")
      if (contentType && contentType.includes("application/json")) {
        try {
          const errorData = await response.json()
          errorMessage = errorData.message || errorMessage
          if (errorData.details) {
            errorMessage += ` (${errorData.details})`
          }
        } catch (e) {
          // If JSON parsing fails, just use the status code message
          console.error("Error parsing error response:", e)
        }
      }

      throw new Error(errorMessage)
    }

    // If response is ok, parse the JSON
    const data = await response.json()
    console.log("Login successful, storing token")
    localStorage.setItem("authToken", data.token)

    return { success: true, user: data.user }
  } catch (error) {
    console.error("Login error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Login failed",
    }
  }
}

export const register = async (username: string, email: string, password: string) => {
  try {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    })

    if (!response.ok) {
      // Only try to parse the body if the response has a content-type header indicating JSON
      const contentType = response.headers.get("content-type")
      let errorMessage = `Registration failed with status: ${response.status}`

      if (contentType && contentType.includes("application/json")) {
        try {
          const errorData = await response.json()
          errorMessage = errorData.message || errorMessage
        } catch (e) {
          // If JSON parsing fails, just use the status code message
          console.error("Error parsing error response:", e)
        }
      }

      throw new Error(errorMessage)
    }

    return { success: true }
  } catch (error) {
    console.error("Registration error:", error)
    return { success: false, error: error instanceof Error ? error.message : "Registration failed" }
  }
}

export const logout = () => {
  localStorage.removeItem("authToken")
  // Optionally call the logout API endpoint
  fetch("/api/auth/logout", { method: "POST" }).catch(console.error)
}

export const getCurrentUser = (): User | null => {
  try {
    const token = localStorage.getItem("authToken")
    if (!token) return null

    // Decode the base64 token
    const decoded = JSON.parse(Buffer.from(token, "base64").toString()) as AuthToken

    // Check if token is expired
    if (decoded.exp < Date.now()) {
      localStorage.removeItem("authToken")
      return null
    }

    return {
      id: decoded.user_id,
      username: decoded.username,
      email: decoded.email,
      role: decoded.role,
    }
  } catch (error) {
    console.error("Error getting current user:", error)
    localStorage.removeItem("authToken")
    return null
  }
}

export const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null
}

export const getAuthToken = (): string | null => {
  return localStorage.getItem("authToken")
}
