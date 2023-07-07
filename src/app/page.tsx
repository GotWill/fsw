import Image from 'next/image'
import { prisma } from './lib/prisma'

const tripes = async () => {
  const allTrips = prisma.trip.findMany({})

  return allTrips
}

export  default async function Home() {

  const data = await tripes();

  console.log({data})



  return (
  <main>

  </main>
  )
}
