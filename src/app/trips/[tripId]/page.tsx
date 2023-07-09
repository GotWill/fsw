import { prisma } from "@/app/lib/prisma"
import Image from "next/image";
import ReactCountryFlag from "react-country-flag";
import { TripHeader } from "./components/TripHeader";


async function getTrip(tripId: string) {
    const trip = await prisma.trip.findUnique({
        where: {
            id: tripId,
        }
    })

    return trip;
}

async function TripDetails({ params }: { params: { tripId: string } }) {

    const trip = await getTrip(params.tripId);

    if (!trip) return null;

    return (
        <div className="container mx-auto">
           
           <TripHeader trip={trip}/>

            <div>
                
            </div>
        </div>
    )
}

export default TripDetails;