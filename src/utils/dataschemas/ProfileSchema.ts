import {z} from "zod";

export const CreateProfileSchema = z.object({
    body: z.object({
        email: z
            .string()
            .min(1,{message: "Name must be at least one character"}),
    })
})

