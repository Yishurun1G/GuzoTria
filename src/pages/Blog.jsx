import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function Blog(){
  return(
    <>
      <Navbar />
      <section className="flex items-center justify-center h-[100vh]">
        <h1 className="text-5xl text-white font-bold">Blog</h1>
      </section>
      <Footer />
    </>
  )
}