import { NextResponse } from "next/server"
import { getUserData } from "@/lib/database"

export async function GET() {
  try {
    const userData = await getUserData(1) // Default user ID
    return NextResponse.json(userData)
  } catch (error) {
    console.error("Failed to fetch user data:", error)
    return NextResponse.json({ error: "Failed to fetch user data" }, { status: 500 })
  }
}
