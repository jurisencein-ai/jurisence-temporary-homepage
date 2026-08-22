import { NextResponse } from "next/server"
import { FieldValue } from "firebase-admin/firestore"
import { db } from "@/lib/firebase-admin"

export async function POST(request: Request) {
  try {
    const { email, source } = await request.json()

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      )
    }

    const normalizedEmail = email.trim().toLowerCase()

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(normalizedEmail)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      )
    }

    await db.collection("waitlist_signups").add({
      email: normalizedEmail,
      source: source || "homepage",
      createdAt: FieldValue.serverTimestamp(),
    })

    return NextResponse.json(
      {
        success: true,
        message: "Successfully joined waitlist",
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Waitlist error:", error)

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}