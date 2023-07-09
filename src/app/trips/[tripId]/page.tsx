import { prisma } from "@/app/lib/prisma"
import Image from "next/image";
import ReactCountryFlag from "react-country-flag";
import { TripHeader } from "./components/TripHeader";
import { TripReservation } from "./components/TripReservation";
import { TripDescription } from "./components/TripDescription";
import { TripHighLights } from "./components/TripHighLights";
import { TripLocation } from "./components/TripLocation";


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

           <TripReservation tripId={trip.id} pricePerDay={trip.pricePerDay as any} tripStartDate={trip.startDate} tripEndDate={trip.endDate} maxGuests={trip.maxGuests}/>
           <TripDescription description={trip.description}/>
           <TripHighLights highlights={trip.highlights}/>
           <TripLocation location={trip.location} locationDescription={trip.locationDescription}/>
        </div>
    )
}

export default TripDetails;