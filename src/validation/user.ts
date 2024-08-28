
import { z } from "zod";

export const page1Schema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    heardFrom: z.string().nonempty(),
});

export const page2Schema = z.object({
    photo: z.nullable(z.string()),
});

export const page3Schema = z.object({
    phone: z.string().min(1, "Phone number is required"),
    address: z.string().min(1, "Address is required"),
});

export const page4Schema = z.object({
    occupation: z.string().min(1, "Occupation is required"),
    company: z.string().min(1, "Company is required"),
});

export const page5Schema = z.object({
    comments: z.optional(z.string()),
});

export const userSchema = page1Schema.merge(page2Schema).merge(page3Schema).merge(page4Schema).merge(page5Schema);

export type UserSchemaType = z.infer<typeof userSchema>;