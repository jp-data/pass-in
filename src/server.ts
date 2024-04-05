import fastify from "fastify";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { generateSlug } from "./utils/slug-generate";

const app = fastify()

const prisma = new PrismaClient({
    log: ['query'],
})

app.post('/events', async (req, res) => {
    // validação dos dados
    const createEventSchema = z.object({
        title: z.string().min(4),
        details: z.string().nullable(),
        maximumAttendees: z.number().int().positive().nullable(),
    })
    // comparacao - recebido(req.body) x esperado(createEventSchema)
    const data = createEventSchema.parse(req.body)

    //slug
    const slug = generateSlug(data.title)

    // inserindo os dados na tabela
    const event = await prisma.event.create({
        data: {
            title: data.title,
            details: data.details,
            maximumAttendees: data.maximumAttendees,
            slug: slug,
        }
    }) 

    return res.status(201).send({ eventId:  event.id })
    
})



app.listen({ port: 3333 }).then(() => {
    console.log('HTTP server running')
})