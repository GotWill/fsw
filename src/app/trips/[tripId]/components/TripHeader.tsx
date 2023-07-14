'use client'

import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { Trip } from "@prisma/client";
import Image from "next/image";
import ReactCountryFlag from "react-country-flag";
import { useState } from "react";




interface HeaderProps {
  trip: Trip
}

export function TripHeader({ trip }: HeaderProps) {

  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
  })



  return (
    <div className="flex flex-col">
      <div className="relative lg:hidden">
        <div ref={sliderRef} className="keen-slider">

          {
            trip.imagesUrl.map((img) => {
              return (
                <div key={img} className="keen-slider__slide   flex items-center justify-center text-[50px] text-white font-medium h-[300px] max-h-[100vh]">
                  <div className="relative h-[300px] w-full">
                    <Image src={img} fill alt={trip.name} style={{
                      objectFit: 'cover'
                    }} />
                  </div>
                </div>
              )
            })
          }


        </div>
        {loaded && instanceRef.current && (
          <>
            <Arrow
              left
              onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.prev()
              }
              disabled={currentSlide === 0}
            />

            <Arrow
              onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.next()
              }
              disabled={
                currentSlide ===
                instanceRef.current.track.details.slides.length - 1
              }
            />
          </>
        )}
      </div>
      






      <div className="hidden lg:grid grid-cols-[2fr,1fr,1fr] gap-2 grid-rows-2 lg:order-2">
        <div className="relative row-span-2">
          <Image
            src={trip.coverImage}
            fill
            style={{
              objectFit: "cover",
            }}
            alt={trip.name}
            className="rounded-tl-lg rounded-bl-lg shadow-md"
          />
        </div>

        <div className="relative h-[200px] w-full">
          <Image
            src={trip.imagesUrl[0]}
            fill
            style={{
              objectFit: "cover",
            }}
            alt={trip.name}
            className="shadow-md"
          />
        </div>

        <div className="relative h-[200px] w-full">
          <Image
            src={trip.imagesUrl[1]}
            fill
            style={{
              objectFit: "cover",
            }}
            alt={trip.name}
            className="shadow-md  rounded-tr-lg"
          />
        </div>

        <div className="relative h-[200px] w-full">
          <Image
            src={trip.imagesUrl[2]}
            fill
            style={{
              objectFit: "cover",
            }}
            alt={trip.name}
            className="shadow-md"
          />
        </div>

        <div className="relative h-[200px] w-full">
          <Image
            src={trip.coverImage}
            fill
            style={{
              objectFit: "cover",
            }}
            alt={trip.name}
            className="shadow-md  rounded-br-lg"
          />
        </div>
      </div>

      <div className="flex flex-col p-5 lg:p-0 lg:mb-10 lg:pt-10">
        <h1 className="font-semibold text-xl text-primaryDarker lg:text-3xl">{trip.name}</h1>
        <div className="flex items-center gap-1 my-1">
          <ReactCountryFlag countryCode={trip.countryCode} svg />
          <p className="text-xs text-grayPrimary underline lg:text-base">{trip.location}</p>
        </div>

        <p className="text-xs text-grayPrimary lg:hidden">
          <span className="text-primary font-medium">R$ {trip.pricePerDay.toString()} </span>
          por dia
        </p>

      </div>
    </div>
  )
}





function Arrow(props: {
  disabled: boolean
  left?: boolean
  onClick: (e: any) => void
}) {
  const disabeld = props.disabled ? " fill-[#ffffff80]" : ""
  return (
    <svg
      onClick={props.onClick}
      className={`arrow w-[30px] h-[30px] translate-y-[-50%]  absolute top-2/4 fill-white cursor-pointer ${props.left ? "left-1" : "left-auto right-1"
        } ${disabeld}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {props.left && (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      )}
      {!props.left && (
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      )}
    </svg>
  )
}
