import Image from "next/image";

export function Foother(){
    return (
        <div className="bg-walterWhite p-5 flex flex-col items-center justify-center">
            <Image src="/logo.png" width={133} height={23} alt="FSW" />
            <p className="text-sm font-medium text-primaryDarker mt-1">Todos os direitos reservados.</p>
        </div>
    )
}