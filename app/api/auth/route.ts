import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();

  const adminUsername = process.env.ADMIN_USERNAME || "admin";
  const adminPassword = process.env.ADMIN_PASSWORD || "olympic2024";

  if (username === adminUsername && password === adminPassword) {
    return Response.json({ success: true, token: "olympic-admin-session" });
  }

  return Response.json({ success: false, error: "Invalid credentials" }, { status: 401 });
}
