import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function PageNotFound(){
  return(
    <>
      <Navbar />
      <section className="flex items-center justify-center h-[100vh]">
        <h1 className="text-5xl text-white font-bold">Page Not Found</h1>
      </section>
      <Footer />
    </>
  )
}