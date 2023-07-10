import { prisma } from "@/app/lib/prisma"
import { NextResponse } from "next/server"

export async function DELETE(request: Request, { params: { reservationId } }: { params: { reservationId: string } }) {

    console.log('id da trip', { reservationId })

    if (!reservationId) {
        return {
            status: 400,
            body: {
                message: 'Missing userId'
            }
        }
    }

    const reservation = await prisma.tripReservation.delete({
        where: {
            id: reservationId
        }
    })

    return new NextResponse(JSON.stringify(reservation), { status: 200 })
}