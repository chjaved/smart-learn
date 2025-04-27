import { NextResponse } from "next/server";
import { prisma } from "@/lib/db"; // Import your prisma client
import bcrypt from "bcryptjs"; // You can use bcrypt to hash passwords

export async function POST(request: Request) {
  const { email, password, name } = await request.json(); // Get the data from the request body

  // Validate the input fields
  if (!email || !password || !name) {
    return NextResponse.json(
      { message: "All fields are required." },
      { status: 400 }
    );
  }

  // Check if the user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return NextResponse.json(
      { message: "User already exists." },
      { status: 400 }
    );
  }

  // Hash the password before saving
  const hashedPassword = await bcrypt.hash(password, 12);

  // Create a new user in the database
  try {
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    // Return success response
    return NextResponse.json(
      { message: "User created successfully!", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating user. Please try again later." },
      { status: 500 }
    );
  }
}
