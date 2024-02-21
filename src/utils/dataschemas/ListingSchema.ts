import {z} from "zod";

export const CreateListingSchema = z.object({
    body: z.object({
        owner_id: z
        .number()
        .int({message: "Owner id must be a positive whole number"}),
        tool: z
            .string()
            .min(1,{message: "Tool name must be at least one character"}),
        category: z
            .string()
            .min(1,{message: "Cateogry must be at least one character"}),
        subcategory: z
            .string()
            .min(1,{message: "Subcategory must be at least one character"}),
    })
})

