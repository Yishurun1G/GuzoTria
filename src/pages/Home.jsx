import AppPreview from "../components/AppPreview";
import Explore from "../components/Explore";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import How from "../components/How";
import Map from "../components/Map";
import Navbar from "../components/Navbar";
import Pricing from "../components/Pricing";
import Sustainability from "../components/Sustainability";
import Testimonial from "../components/Testimonial";
import Why from "../components/Why";

export default function Home(){
    return(
      <>
        <Hero>
          {/* <Navbar /> */}
        </Hero> 
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