import Image from "next/image"

interface TripHighLightsProps {
    highlights: string[]
}


export function TripHighLights({ highlights }: TripHighLightsProps) {
    return (
        <div className="flex flex-col p-5 lg:p-0 lg:mt-12">
            <h2 className="font-semibold text-primaryDarker mb-2 lg:text-xl">Destaques</h2>

            <div className="flex flex-wrap gap-y-3 lg:mt-5">
                {highlights.map((highlight) => {
                    return (
                        <div key={highlight} className="flex items-center gap-1 w-1/2 lg:gap-3">
                            <Image  src="/check-icon.png" width={15} height={15} alt={highlight} />
                            <p className="text-grayPrimary text-xs lg:text-base">{highlight}</p>
                        </div>
                    )
                })}
            </div>
            
        </div>
    )
}