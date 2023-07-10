'use client'

import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Prisma, TripReservation } from "@prisma/client"
import { UserReservationItem } from './components/userReservationItem'

function MyTrips() {

    const { status, data } = useSession()
    const [reservations, setReservations] = useState<
        Prisma.TripReservationGetPayload<{
            include: { trip: true };
        }>[]
    >([]);

    const router = useRouter()



    useEffect(() => {
        if (status === 'unauthenticated' || !data?.user) {
            return router.push('/')
        }

        async function fetchReservations() {
            const response = await fetch(`http://localhost:3000/api/user/${(data?.user as any).id}/reservations`)
            const json = await response.json()
            setReservations(json)
        }

        fetchReservations()
    }, [status])

    return (
        <div className="container mx-auto p-5">
            <h1 className="font-semibold text-xl text-primaryDarker">Minhas viagens</h1>

            {reservations.map(reservation => <UserReservationItem key={reservation.id} reservation={reservation} />)}
        </div>
    )
}


export default MyTrips