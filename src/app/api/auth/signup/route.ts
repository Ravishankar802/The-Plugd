import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/password";
import { createSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

const RESERVED_USERNAMES = new Set([
  "admin",
  "dashboard",
  "api",
  "login",
  "signup",
  "settings",
  "support",
  "help",
  "about",
  "pricing",
  "plugd",
  "index",
  "home",
  "payout",
  "payments",
  "auth",
  "verification",
  "verified",
  "register",
  "faq",
  "terms",
  "privacy",
  "static",
  "assets",
  "public",
  "upload",
  "uploads",
  "legal",
  "profile",
  "items",
  "catalog",
  "category",
]);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      username,
      email,
      password,
      displayName,
      bio,
      avatarUrl,
      paymentLink,
      paymentQr,
    } = body;

    // 1. Validate Username
    const cleanUsername = username?.toLowerCase().trim().replace(/^@+/, "");
    if (!cleanUsername) {
      return NextResponse.json({ error: "Username is required." }, { status: 400 });
    }

    const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;
    if (!usernameRegex.test(cleanUsername)) {
      return NextResponse.json(
        { error: "Username must be 3-20 characters long and can only contain letters, numbers, underscores, or hyphens." },
        { status: 400 }
      );
    }

    if (RESERVED_USERNAMES.has(cleanUsername)) {
      return NextResponse.json(
        { error: "This username is reserved. Please choose another one." },
        { status: 400 }
      );
    }

    // Check if username taken
    const existingUsername = await prisma.user.findFirst({
      where: { username: { equals: cleanUsername, mode: "insensitive" } },
    });
    if (existingUsername) {
      return NextResponse.json(
        { error: "This username is already taken. Please choose another one." },
        { status: 409 }
      );
    }

    // 2. Validate Email
    const cleanEmail = email?.toLowerCase().trim();
    if (!cleanEmail || !cleanEmail.includes("@") || !cleanEmail.includes(".")) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const existingEmail = await prisma.user.findFirst({
      where: { email: { equals: cleanEmail, mode: "insensitive" } },
    });
    if (existingEmail) {
      return NextResponse.json(
        { error: "An account with this email address already exists." },
        { status: 409 }
      );
    }

    // 3. Validate Password
    if (!password || password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    // 4. Prepare profile details
    const cleanDisplayName = displayName?.trim() || cleanUsername;
    const cleanBio = bio?.trim() ? bio.trim().slice(0, 160) : null;
    const cleanAvatar = avatarUrl?.trim() || "/avatars/avatar-1.svg";
    const cleanPaymentLink = paymentLink?.trim() || null;
    const cleanPaymentQr = paymentQr?.trim() || null;

    // Hash password securely
    const hashedPassword = hashPassword(password);

    // 5. Create user and profile in DB
    const user = await prisma.user.create({
      data: {
        username: cleanUsername,
        email: cleanEmail,
        password: hashedPassword,
        displayName: cleanDisplayName,
        bio: cleanBio,
        avatarUrl: cleanAvatar,
        paymentLink: cleanPaymentLink,
        paymentQr: cleanPaymentQr,
        creatorProfile: {
          create: {
            displayName: cleanDisplayName,
            bio: cleanBio,
            avatarUrl: cleanAvatar,
            paymentLink: cleanPaymentLink,
            paymentQr: cleanPaymentQr,
          },
        },
      },
      include: {
        creatorProfile: true,
      },
    });

    // 6. Establish session cookie
    await createSession(user.id, user.email, user.username);

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        displayName: user.displayName,
      },
    });
  } catch (error: any) {
    console.error("[SIGNUP_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to create account. Please try again." },
      { status: 500 }
    );
  }
}
