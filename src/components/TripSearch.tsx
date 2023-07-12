'use client'

import { Controller, useForm } from "react-hook-form";
import Button from "./Button";
import CurrencyInput from "./CurrencyInput";
import DatePicker from "./DatePicker";
import Input from "./Input";
import { useRouter } from "next/navigation";

interface TripSearchForm {
    text: string;
    startDate: Date | null;
    budget: string;
}

export function TripSearch() {

    const router = useRouter();

    const { control, register, handleSubmit, formState: { errors } } = useForm<TripSearchForm>()

    function onSubmit(data: TripSearchForm){
        router.push(`/trips/search?text=${data.text}&startDate=${data.startDate?.toISOString()}&budget=${data.budget}`);
    }

    return (
        <div className="container mx-auto p-5 bg-search-background bg-cover bg-center bg-no-repeat lg:py-28">
            <h1 className="font-semibold text-2xl text-primaryDarker text-center lg:text-[2.5rem]">Encontre a sua próxima <span className="text-primary">estadia!</span></h1>

            <div className="flex flex-col gap-4 mt-5 lg:flex-row lg:max-w-[948px] lg:mx-auto lg:p-4 lg:bg-primary lg:bg-opacity-20 lg:rounded-lg lg:mt-12">
                <Input 
                error={!!errors.text}
                errorMessage={errors.text?.message}
                placeholder="Onde voce quer ir?"
                {...register('text', {
                    required: {
                        value: true,
                        message: 'Campo é obrigatório.'
                    }
                })}
                
                 />

                <div className="flex gap-4 lg:w-full">
                    <Controller
                        name="startDate"
                        control={control}
                        render={({ field }) => (
                            <DatePicker
                                error={!!errors.startDate}
                                placeholderText="Data de Inicio"
                                onChange={field.onChange}
                                selected={field.value}
                                minDate={new Date()}
                                className="w-full" />

                        )}

                    />

                    <Controller
                        name="budget"
                        rules={{
                            required: {
                                value: true,
                                message: "Data inicial é obrigatoria"
                            }
                        }}
                        control={control}
                        render={({ field }) => (
                            <CurrencyInput 
                            placeholder="Orçamento" 
                            onValueChange={field.onChange as any}
                            value={field.value}
                            onBlur={field.onBlur}
                            className="w-full"
                            />


                        )}

                    />

                </div>

                <Button onClick={()=>handleSubmit(onSubmit)()} className="w-full lg:w-1/2 lg:h-fit">
                    Buscar
                </Button>
            </div>


        </div>
    )
}