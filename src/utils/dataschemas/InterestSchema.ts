import {z} from "zod";

export const CreateInterestSchema = z.object({
    body: z.object({

    })
})

export const UpdateInterestSchema = z.object({
    params: z.object({chat_id: z.string()}),
    body: z.object({

    })
    .partial(),
})
