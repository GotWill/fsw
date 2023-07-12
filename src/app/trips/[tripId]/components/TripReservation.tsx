'use client'
import Button from "@/components/Button";
import DatePicker from "@/components/DatePicker";
import Input from "@/components/Input";
import { Trip } from "@prisma/client";
import { differenceInDays } from "date-fns";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";

interface TripReservationProps {
    tripId: string;
    tripStartDate: Date;
    tripEndDate: Date;
    maxGuests: number;
    pricePerDay: number

}


interface TripReservationForm {

    guests: number;
    startDate: Date | null;
    endDate: Date | null;
}

export function TripReservation({ tripId, maxGuests, pricePerDay, tripEndDate, tripStartDate }: TripReservationProps) {

    const { register, handleSubmit, formState: { errors }, control, watch, setError } = useForm<TripReservationForm>()

    const router = useRouter();

    const onSubmit = async (data: TripReservationForm) => {
        const response = await fetch('/api/trips/check', {
            method: 'POST',
            body: Buffer.from(JSON.stringify({
                startDate: data.startDate,
                endDate: data.endDate,
                tripId
            }))
        })

        const req = await response.json();




        if (req?.error?.code === 'TRIP_ALREADY_RESERVED') {
            setError("startDate", {
                type: 'manual',
                message: 'Esta data ja esta reservada'
            })

            return setError("endDate", {
                type: 'manual',
                message: 'Esta data ja esta reservada'
            })
        }

        if (req?.error?.code === 'INVALID_START_DATE') {
            return setError("startDate", {
                type: 'manual',
                message: 'Data invalida'
            })

        }

        if (req?.error?.code === 'INVALID_END_DATE') {
            return setError("endDate", {
                type: 'manual',
                message: 'Data invalida'
            })

        }


        router.push(
            `/trips/${tripId}/confirmation?startDate=${data.startDate?.toISOString()}&endDate=${data.endDate?.toISOString()}&guests=${data.guests}`
        )

    }


    const startDate = watch('startDate')
    const endDate = watch('endDate')


    return (
        <div className="flex flex-col px-5 lg:min-w-[380px] lg:p-5 lg:border-grayLighter lg:border lg:rounded-lg lg:shadow-md">
            <p className="text-xl hidden text-primaryDarker mb-4 lg:block">
                <span className="font-semibold">R${pricePerDay}</span> por dia
            </p>
            <div className="flex gap-3">
                <Controller
                    name="startDate"
                    rules={{
                        required: {
                            value: true,
                            message: "Data inicial é obrigatoria"
                        }
                    }}
                    control={control}
                    render={({ field }) => (
                        <DatePicker
                            error={!!errors.startDate}
                            errorMessage={errors.startDate?.message}
                            placeholderText="Data de Inicio"
                            onChange={field.onChange}
                            selected={field.value}
                            minDate={tripStartDate}
                            className="w-full" />

                    )}

                />
                <Controller
                    name="endDate"
                    rules={{
                        required: {
                            value: true,
                            message: "Data Final"
                        }
                    }}
                    control={control}
                    render={({ field }) => (
                        <DatePicker
                            error={!!errors.endDate}
                            errorMessage={errors.endDate?.message}
                            placeholderText="Data de Inicio"
                            onChange={field.onChange}
                            selected={field.value}
                            className="w-full"
                            minDate={startDate ?? tripStartDate}
                            maxDate={tripEndDate}
                        />

                    )}

                />
            </div>

            <Input
                {...register("guests", {
                    required: {
                        value: true,
                        message: 'Número de hóspedes é obrigatorio.'
                    },
                    max: {
                        value: maxGuests,
                        message: `Número de hóspedes não pode ser maior que ${maxGuests}`
                    }
                })}
                placeholder={`Número de hóspedes (max: ${maxGuests})`}
                className="mt-4"
                error={!!errors?.guests}
                errorMessage={errors?.guests?.message}
                type="number"
            />

            <div className="flex justify-between mt-2">
                <p className="font-medium text-sm text-primaryDarker">Total: </p>
                <p className="font-medium text-sm text-primaryDarker">
                    {
                        startDate && endDate ? `R$ ${differenceInDays(endDate, startDate) * pricePerDay}` ?? 1 : 'R$ 0'
                    }
                </p>
            </div>

            <div className="pb-10  border-b lg:border-none lg:pb-0 border-grayLighter w-full">
                <Button className="mt-3 w-full" onClick={() => handleSubmit(onSubmit)()}>
                    Reservar agora
                </Button>
            </div>


        </div>
    )
}