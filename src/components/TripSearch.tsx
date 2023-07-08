'use client'

import CurrencyInput from "./CurrencyInput";
import DatePicker from "./DatePicker";
import Input from "./Input";

export function TripSearch(){
    return (
        <div className="container mx-auto p-5">
            <h1 className="font-semibold text-2xl text-primaryDarker text-center">Encontre a sua próxima <span className="text-primary">estadia!</span></h1>

            <div className="flex flex-col gap-4 mt-5">
                <Input placeholder="Onde voce quer ir?"/>

                <div className="flex gap-4">
                  <DatePicker placeholderText="Data de ida" className="w-full" onChange={() => {}}/> 
                  <CurrencyInput placeholder="Orçamento"/> 
                </div>
            </div>
        </div>
    )
}