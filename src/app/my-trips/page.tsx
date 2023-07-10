'use client'

import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { TripReservation } from "@prisma/client"

 function MyTrips (){

    const {status, data} = useSession()
    const [reservations, setReservations] = useState<TripReservation[]>([])

    const router = useRouter()



    useEffect(() => {
        if(status === 'unauthenticated' || !data?.user){
          return  router.push('/')
        }

      async function fetchReservations(){
        const response = await fetch(`http://localhost:3000/api/user/${(data?.user as any).id}/reservations`)
        const json = await response.json()
        setReservations(json)
      }

      fetchReservations()
    },[status])
   
    return (
        <div>
            
        </div>
    )
}


export default MyTrips