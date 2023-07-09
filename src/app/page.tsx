import { QuickSearch } from "@/components/QuickSearch";
import { ReccomendsTrips } from "@/components/ReccomendsTrips";
import { TripSearch } from "@/components/TripSearch";

export default function Home() {

  return (
    <main>
      <TripSearch/>
      <QuickSearch/>
      <ReccomendsTrips/>
        
    </main>
  )
}
