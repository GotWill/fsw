'use client'
import { TripItem } from "@/components/TripItem";
import { Trip } from "@prisma/client";
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";

interface GetTripParams {
    text: string;
    startDate: Date | null;
    budget: string;
}





export default  function Trips(){

    const searchParams = useSearchParams()
    const [trips, setTtrips] = useState<Trip[]>([])

    useEffect(() => {
        async function fecthTrips(){
          const response =  await fetch(`/api/trips/search?text=${searchParams.get("text") ?? ""}&startDate=${searchParams.get("startDate")}&budget=${searchParams.get("budget")}`)

          const data = await response.json()

          setTtrips(data)
        }

        fecthTrips()
    },[])

    


    return (
        <div className="container mx-auto flex flex-col p-5 justify-center items-center lg:items-start">
            <h1 className="text-primaryDarker font-semibold text-xl lg:text-[2.5rem] lg:w-full lg:text-left">Viagens encontradas</h1>
            <h2 className="text-grayPrimary font-medium mb-5 lg:mt-6 lg:w-full lg:text-left">{trips.length > 0 ? 'Listamos as melhores viagens para você' : 'Não encontramos nenhuma viagen!'}</h2>
          

          <div className="flex flex-col gap-4 lg:flex-row lg:flex-wrap  lg:gap-10 lg:mt-6 lg:pb-16">
           {trips.map((trip) => <TripItem trip={trip} key={trip.id}/>)}
          </div>
        </div>
    )
}
