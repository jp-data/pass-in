import { prisma } from '../src/lib/prisma'

async function seed() {
    await prisma.event.create({
        data: {
            id: '03e31bea-c124-44d8-9473-0c1dcb1aee1e',
            title: 'United Summit',
            slug: 'Unite-summit',
            details: 'Evento para devs',
            maximumAttendees: 120,
        }
    })
}

seed().then(() => {
    console.log('Database seeded')
    prisma.$disconnect()
})