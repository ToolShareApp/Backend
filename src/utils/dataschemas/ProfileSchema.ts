import {z} from "zod";

export const CreateProfileSchema = z.object({
    body: z.object({
        email: z
            .string()
            .email({message: "Wrong email format"}),
    })
})

