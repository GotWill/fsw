import Image from "next/image";

export function QuickSearch(){
    return (
        <div className="container mx-auto p-5">
            <div className="flex items-center">
                <div className="w-full h-[1px] bg-grayLighter"></div>
                <h2 className="px-5 font-medium text-grayPrimary whitespace-nowrap">Tente pesquisar por</h2>
                <div className="w-full h-[1px] bg-grayLighter"></div>


                
            </div>

            <div className="flex w-full justify-between mt-5">
                    <div className="flex flex-col items-center gap-1">
                        <Image src="/hotel-icon.png" alt="Hotel" width={35} height={35}/>
                        <p className="text-sm text-grayPrimary">Hotel</p>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <Image src="/farm-icon.png" alt="Hotel" width={35} height={35}/>
                        <p className="text-sm text-grayPrimary">Fazenda</p>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <Image src="/cottage-icon.png" alt="Hotel" width={35} height={35}/>
                        <p className="text-sm text-grayPrimary">Shalé</p>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <Image src="/inn-icon.png" alt="Hotel" width={35} height={35}/>
                        <p className="text-sm text-grayPrimary">Pusada</p>
                    </div>
                </div>
        </div>
    )
}