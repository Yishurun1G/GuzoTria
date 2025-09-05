import Navbar from "../../components/Navbar";

export default function Profile(){
  return(
    <>
      <Navbar />
      <section className="flex items-center justify-center h-[100vh]">
        <h1 className="text-5xl text-white font-bold">User Profile Page</h1>
      </section>
    </>
  )
}