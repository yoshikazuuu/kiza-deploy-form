import { NextResponse } from "next/server";
import { z } from "zod";
import { userSchema } from "@/validation/user";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validate the request body against the schema
        const formData = userSchema.parse(body);

        // Create a new user in the database
        const user = await prisma.userData.create({
            data: {
                name: formData.name,
                email: formData.email,
                heardFrom: formData.heardFrom,
                photo: formData.photo ? formData.photo : {},
                phone: formData.phone,
                address: formData.address,
                occupation: formData.occupation,
                company: formData.company,
                comments: formData.comments,
            }
        });

        // Return the created user data
        return NextResponse.json({ message: user });

    } catch (error) {
        if (error instanceof z.ZodError) {
            // Return a 400 response with validation errors
            return NextResponse.json({ error: error.errors }, { status: 400 });
        }

        // Handle any other unexpected errors
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
