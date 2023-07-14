import Button from "@/components/Button";
import Link from "next/link";

interface TripLocationProps {
    location: string;
    locationDescription: string;
}


export function TripLocation({ location, locationDescription }: TripLocationProps) {
    return (
        <div className="p-5 lg:p-0 lg:mt-12 lg:pb-20">
            <h2 className="font-semibold text-primaryDarker mb-5 lg:text-xl">Localização</h2>

            <iframe
               className="w-full h-[450px]"
                loading="lazy"
                src={`https://www.google.com/maps/embed/v1/place?key=${process.env.GOOGLE_MAPS_KEY}&q=${encodeURI(location)}`}>
            </iframe>



            <h3 className="text-primaryDarker text-sm font-semibold mt-3 lg:text-base lg:mt-5">{location}</h3>
            <p className="text-xs text-primaryDarker mt-2 leading-5 lg:text-base lg:mt-4">{locationDescription}</p>
            <Button variant="outlined" className="w-full mt-5">
               <Link target="_blank" href={`https://www.google.com/maps/search/?api=${process.env.GOOGLE_MAPS_KEY}&q=${encodeURI(location)}`}>
                 Ver no Google Maps
               </Link>
            </Button>
        </div>
    )
}