import Image from "next/image";
import Link from "next/link";

export function QuickSearch(){
    return (
        <div className="container mx-auto p-5">
            <div className="flex items-center">
                <div className="w-full h-[1px] bg-grayLighter"></div>
                <h2 className="px-5 font-medium text-grayPrimary whitespace-nowrap">Tente pesquisar por</h2>
                <div className="w-full h-[1px] bg-grayLighter"></div>


                
            </div>

            <div className="flex w-full justify-between mt-5 lg:justify-center lg:gap-40 lg:mt-10">
                    <div className="flex flex-col items-center gap-1">
                       <Link href="/trips/search?text=hotel" className="flex flex-col items-center">
                         <Image src="/hotel-icon.png" alt="Hotel" width={35} height={35}/>
                         <p className="text-sm lg:text-base text-grayPrimary">Hotel</p>
                       </Link>
                      
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <Link href="/trips/search?text=fazenda" className="flex flex-col items-center">
                          <Image src="/farm-icon.png" alt="Hotel" width={35} height={35}/>
                          <p className="text-sm lg:text-base text-grayPrimary">Fazenda</p>

                        </Link>
                        
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <Link href="/trips/search?text=Chalé" className="flex flex-col items-center">
                          <Image src="/cottage-icon.png" alt="Hotel" width={35} height={35}/>
                          <p className="text-sm lg:text-base text-grayPrimary">Chalé</p>
                        </Link>
                       
                       
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <Link href="/trips/search?text=pousada" className="flex flex-col items-center">
                          <Image src="/inn-icon.png" alt="Hotel" width={35} height={35}/>
                          <p className="text-sm lg:text-base text-grayPrimary">Pousada</p>

                        </Link>
                        
                    </div>
                </div>
        </div>
    )
}