// /pages/api/auth/signin.js
import { NextResponse } from "next/server";

// Define the POST handler
export async function POST(req) {
  try {
    const body = await req.json(); // Parse the JSON body
    const { email, password } = body;

    // Basic authentication logic
    if (email === "sahilsinha2204@gmail.com" && password === "Sahil123#") {
      return NextResponse.json({ success: true }, { status: 200 });
    } else {
      return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
    }
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
