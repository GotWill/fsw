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
        <div className="container mx-auto p-5 bg-search-background bg-cover bg-center bg-no-repeat">
            <h1 className="font-semibold text-2xl text-primaryDarker text-center">Encontre a sua próxima <span className="text-primary">estadia!</span></h1>

            <div className="flex flex-col gap-4 mt-5">
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

                <div className="flex gap-4">
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
                            />


                        )}

                    />

                </div>

                <Button onClick={()=>handleSubmit(onSubmit)()}>
                    Buscar
                </Button>
            </div>


        </div>
    )
}