import {z} from "zod";

export const CreateChatSchema = z.object({
    body: z.object({

    })
})

export const UpdateChatSchema = z.object({
    params: z.object({chat_id: z.string()}),
    body: z.object({

    })
    .partial(),
})
