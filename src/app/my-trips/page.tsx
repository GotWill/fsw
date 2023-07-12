'use client'

import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Prisma, TripReservation } from "@prisma/client"
import { UserReservationItem } from './components/userReservationItem'
import Button from "@/components/Button"
import Link from "next/link"

function MyTrips() {

    const { status, data } = useSession()
    const [reservations, setReservations] = useState<
        Prisma.TripReservationGetPayload<{
            include: { trip: true };
        }>[]
    >([]);

    const router = useRouter()

    async function fetchReservations() {
        const response = await fetch(`/api/user/${(data?.user as any)?.id}/reservations`)
        const json = await response.json()
        setReservations(json)
    }

    useEffect(() => {
        if (status === 'unauthenticated') {
            return router.push('/')
        }



        fetchReservations()
    }, [status])

    return (
        <div className="container mx-auto p-5">
            <h1 className="font-semibold text-xl text-primaryDarker lg:mb-5">Minhas viagens</h1>

            {
                reservations.length > 0 ? 
                <div className="flex flex-col lg:flex-row lg:flex-wrap lg:gap-14">
                    {
                        reservations.map(reservation => <UserReservationItem fetchReservations={fetchReservations} key={reservation.id} reservation={reservation} />)
                    }
                </div>
                    : <div className="flex flex-col w-full">
                        <p className="font-medium text-primaryDarker text-xl mt-2">Voce nao tem nenhuma reserva!</p>

                        <Link href="/">
                            <Button className="w-full">Fazer reserva</Button>
                        </Link>
                    </div>
            }
        </div>
    )
}


export default MyTrips