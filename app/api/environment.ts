// Environment variables for client-side use
// These are public keys that can be exposed to the client

export const clientEnv = {
  NEXT_PUBLIC_RAWG_API_KEY: process.env.NEXT_PUBLIC_RAWG_API_KEY || "",
  NEXT_PUBLIC_TWITCH_CLIENT_ID: process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID || "",
}

// Function to get client environment variables
export function getClientEnv() {
  return {
    RAWG_API_KEY: process.env.NEXT_PUBLIC_RAWG_API_KEY || "",
    TWITCH_CLIENT_ID: process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID || "",
  }
}
