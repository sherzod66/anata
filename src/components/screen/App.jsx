import AboutUs from "../aboutUs/AboutUs"
import Catalog from "../catalog/Catalog"
import Footer from "../footer/Footer"
import Header from "../header/Header"
import Slider from "../ui/slider/Sl-Swiper"



function App({ image }) {
  return (
    <>
      <Header image={'vite.svg'} />
      <Slider />
      <Catalog />
      <AboutUs />
      <Footer />
    </>
  )
}

export default App
