import AppPreview from "../components/landingPage/AppPreview";
import Explore from "../components/landingPage/Explore";
import FAQ from "../components/landingPage/FAQ";
import Footer from "../components/Footer";
import Hero from "../components/landingPage/Hero";
import How from "../components/landingPage/How";
import Map from "../components/landingPage/Map";
import Navbar from "../components/Navbar";
import Pricing from "../components/landingPage/Pricing";
import Sustainability from "../components/landingPage/Sustainability";
import Testimonial from "../components/landingPage/Testimonial";
import Why from "../components/landingPage/Why";

export default function Home(){
    return(
      <>
        <Navbar />
        <Hero/>
        <How />
        <Why />
        <Map />
        <AppPreview />
        <Pricing />
        <Testimonial />
        <FAQ />
        <Sustainability />
        <Explore />
        <Footer />
      </>
    )
}