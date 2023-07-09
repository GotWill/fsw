import { prisma } from "@/app/lib/prisma"
import Image from "next/image";
import ReactCountryFlag from "react-country-flag";
import { TripHeader } from "./components/TripHeader";
import { TripReservation } from "./components/TripReservation";
import { TripDescription } from "./components/TripDescription";
import { TripHighLights } from "./components/TripHighLights";


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

    console.log(trip.highlights)

    return (
        <div className="container mx-auto">
           
           <TripHeader trip={trip}/>

           <TripReservation trip={trip}/>
           <TripDescription description={trip.description}/>
           <TripHighLights highlights={trip.highlights}/>
        </div>
    )
}

export default TripDetails;