'use client'


import Button from "@/components/Button"
import { Trip } from "@prisma/client"
import { loadStripe } from "@stripe/stripe-js"
import { format } from "date-fns"
import ptBr from "date-fns/locale/pt-BR"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import ReactCountryFlag from "react-country-flag"
import { toast } from "react-toastify"

function TripConfirmation({ params }: { params: { tripId: string } }) {

    const [trip, setTrip] = useState<Trip | null>()
    const [totalPrice, setTotalPrice] = useState<number>(0)

    const searchParams = useSearchParams()

    const { status, data } = useSession();


    const router = useRouter()

    useEffect(() => {
        async function fetchTrip() {
            const response = await fetch(`/api/trips/check`, {
                method: 'POST',
                body: JSON.stringify({
                    tripId: params.tripId,
                    startDate: searchParams.get('startDate'),
                    endDate: searchParams.get('endDate'),

                })
            })


            const req = await response.json()

            if(req?.error){
              return router.push('/')
            }

            setTrip(req.trip)
            setTotalPrice(req.totalPrice)

        }

        if (status === 'unauthenticated') {
            router.push('/')
        }

        fetchTrip()
    }, [status, params.tripId,searchParams, router])

    if (!trip) return null

    const startDate = new Date(searchParams.get('startDate') as string)
    const endDate = new Date(searchParams.get('endDate') as string)
    const guests = searchParams.get('guests')


    async function handleByClick(){
       const res = await fetch('/api/payment', {
            method: 'POST',
            body: Buffer.from(JSON.stringify({
                tripId: params.tripId,
                startDate: searchParams.get("startDate"),
                endDate: searchParams.get("endDate"),
                guests: Number(searchParams.get("guests")),
                totalPrice: totalPrice,
                coverImage: trip?.coverImage,
                name: trip?.name,
                description: trip?.description
            }))
        })

        if(!res.ok){
            return toast.error("Ocorreu um erro ao realizar sua reserva!", {position: 'bottom-center'})
        }


       const {sessionId} = await res.json()

       const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY as string)

       await stripe?.redirectToCheckout({sessionId})



        toast.success("Reserva realizada com sucesso", {position: 'bottom-center'})
    }


    return (
        <div className="container mx-auto p-5 lg:max-w-[600px]">
            <h1 className="font-semibold text-xl text-primaryDarker">Sua viagem</h1>

            {/* CARD */}
            <div className="flex flex-col p-5 mt-5 border-grayLighter border-solid border shadow-lg rounded-lg">
                <div className="flex items-center gap-3 pb-5 border-b border-grayLighter border-solid">
                    <div className="relative h-[106px] w-[124px]">
                        <Image src={trip.coverImage} fill style={{ objectFit: "cover" }} className="rounded-lg" alt={trip.name} />
                    </div>

                    <div className="flex flex-col">
                        <h2 className="text-xl text-primaryDarker font-semibold">{trip.name}</h2>
                        <div className="flex items-center gap-1">
                            <ReactCountryFlag countryCode={trip.countryCode} svg />
                            <p className="text-xs text-grayPrimary underline">{trip.location}</p>
                        </div>
                    </div>
                </div>

                <h3 className="font-semibold text-lg text-primaryDarker mt-3">Informações sobre o preço</h3>

                <div className="flex justify-between mt-1">
                    <p className="text-primaryDarker">Total:</p>
                    <p className="font-medium">R$ {totalPrice}</p>
                </div>
            </div>

            <div className="flex flex-col mt-5 text-primaryDarker">
                <h3 className="font-semibold">Data</h3>
                <div className="flex items-center gap-1 mt-1">
                    <p>
                        {format(startDate, "dd 'de' MMMM", { locale: ptBr })}
                    </p>
                    {" - "}
                    <p>
                        {format(endDate, "dd 'de' MMMM", { locale: ptBr })}
                    </p>
                </div>

                <h3 className="font-semibold mt-5">Hóspedes</h3>
                <p> hóspedes {guests} </p>

                <Button className="mt-5" onClick={handleByClick}>
                    Finalizar Compra
                </Button>
            </div>
        </div>
    )
}

export default TripConfirmation