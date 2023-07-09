import Image from "next/image"

interface TripHighLightsProps {
    highlights: string[]
}


export function TripHighLights({ highlights }: TripHighLightsProps) {
    return (
        <div className="flex flex-col p-5">
            <h2 className="font-semibold text-primaryDarker mb-2">Destaques</h2>

            <div className="flex flex-wrap gap-y-3">
                {highlights.map((highlight) => {
                    return (
                        <div key={highlight} className="flex items-center gap-1 w-1/2">
                            <Image  src="/check-icon.png" width={15} height={15} alt={highlight} />
                            <p className="text-grayPrimary text-xs">{highlight}</p>
                        </div>
                    )
                })}
            </div>
            
        </div>
    )
}