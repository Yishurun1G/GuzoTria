import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function Locations(){
  return(
    <>
      <Navbar />
      <section className="flex items-center justify-center h-[100vh]">
        <h1 className="text-5xl text-white font-bold">Locations</h1>
      </section>
      <Footer />
    </>
  )
}