import {z} from "zod";

export const CreateExampletableSchema = z.object({
    body: z.object({
        counter: z
            .number()
            .int({message: "Only Integers allowed"})
            .nonnegative({message: "Counter mst be equal to or larger than zero"}),
        name: z
            .string()
            .min(1,{message: "Name must be at least one character"}),
        birthday: z
            .string().datetime({ message: "Invalid datetime string! Must be UTC." })
        
    })
})

export const UpdateExampletableSchema = z.object({
    params: z.object({record_id: z.string()}),
    body: z.object({
        counter: z
            .number()
            .int({message: "Only Integers allowed"})
            .nonnegative({message: "Counter must be equal to or larger than zero"}),
        name: z
            .string()
            .min(1,{message: "Name must be at least one character"}),
        birthday: z
            .string().datetime({ message: "Invalid datetime string! Must be UTC." })
    })
    .partial(),
})