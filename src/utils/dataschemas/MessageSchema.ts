import {z} from "zod";

export const CreateMessageSchema = z.object({
    body: z.object({

    })
    .partial(),
})

export const UpdateMessageSchema = z.object({
    params: z.object({message_id: z.string()}),
    body: z.object({

    })
    .partial(),
})
