import {z} from "zod";

export const CreateProfileSchema = z.object({
    body: z.object({
        email: z
            .string()
            .email({message: "Wrong email format"}),
    })
})

export const UpdateProfileSchema = z.object({
    params: z.object({profile_id: z.string()}),
    body: z.object({

    })
    .partial(),
})
