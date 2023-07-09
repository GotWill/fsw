import { Trip } from "@prisma/client"
import { TripItem } from "./TripItem"
import { prisma } from "@/app/lib/prisma"


export const allTrips = async () => {
    const data = await prisma.trip.findMany()
    return data;
}

export async function ReccomendsTrips() {
    
    const trips = await allTrips()

    return (
        <div className="container mx-auto p-5">
            <div className="flex items-center">
                <div className="w-full h-[1px] bg-grayLighter"></div>
                <h2 className="px-5 font-medium text-grayPrimary whitespace-nowrap">Destinos Recomendados</h2>
                <div className="w-full h-[1px] bg-grayLighter"></div>
            </div>


            <div className="flex flex-col items-center mt-5 gap-5">
                {
                    trips.map((trip: Trip) => {
                        return <TripItem trip={trip} key={trip.id} />
                    })
                }
            </div>
        </div>
    )
}