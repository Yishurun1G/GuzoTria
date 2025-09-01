import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import ScooterList from "../components/scooters/ScooterList"

export default function Scooters(){
  return(
    <>
      <Navbar />
      <ScooterList/>
      <Footer />
    </>
  )
}