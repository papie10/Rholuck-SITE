import Nav from "./components/Nav"
import ScrollProgress from "./components/ScrollProgress"
import Hero from "./components/Hero"
import About from "./components/About"
import Accreditations from "./components/Accreditations"
import Services from "./components/Services"
import WhyUs from "./components/WhyUs"
import SafetyNetwork from "./components/SafetyNetwork"
import Training from "./components/Training"
import Projects from "./components/Projects"
import Clients from "./components/Clients"
import VideoTestimonials from "./components/VideoTestimonials"
import Team from "./components/Team"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import { EnquiryProvider } from "./context/EnquiryContext"

export default function App() {
  return (
    <EnquiryProvider>
      <div className="min-h-screen">
        <ScrollProgress />
        <Nav />
        <main>
          <Hero />
          <About />
          <Accreditations />
          <Services />
          <WhyUs />
          <SafetyNetwork />
          <Training />
          <Projects />
          <Clients />
          <VideoTestimonials />
          <Team />
          <Contact />
        </main>
        <Footer />
      </div>
    </EnquiryProvider>
  )
}
