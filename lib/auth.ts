import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { db } from "./db";
import { users } from "./db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

const JWT_SECRET = new TextEncoder().encode(
  process.env.AUTH_SECRET || "default-secret-key-change-in-production-123456789"
);

export interface UserSession {
  userId: number;
  username: string;
  name: string;
  role: string;
}

export async function encryptSession(payload: UserSession) {
  return await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(JWT_SECRET);
}

export async function decryptSession(sessionToken: string): Promise<UserSession | null> {
  try {
    const { payload } = await jwtVerify(sessionToken, JWT_SECRET, {
      algorithms: ["HS256"],
    });
    return payload as unknown as UserSession;
  } catch (error) {
    return null;
  }
}

export async function getSession(): Promise<UserSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;
  if (!token) return null;
  return await decryptSession(token);
}

export async function setSessionCookie(sessionToken: string) {
  const cookieStore = await cookies();
  cookieStore.set("admin_session", sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
  });
}

export async function deleteSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
}
