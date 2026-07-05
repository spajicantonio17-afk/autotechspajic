import Intro from "@/components/Intro";
import ScrollFilm from "@/components/ScrollFilm";
import Navbar from "@/components/Navbar";
import Services from "@/components/Services";
import InstagramBar from "@/components/InstagramBar";
import Process from "@/components/Process";
import Gallery from "@/components/Gallery";
import About from "@/components/About";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";

export default function Home() {
  return (
    <main className="min-h-screen bg-bg">
      <Intro />
      <ScrollFilm />
      <Navbar />
      <Services />
      <InstagramBar />
      <Process />
      <Gallery />
      <About />
      <Contact />
      <Faq />
      <Footer />
      <WhatsAppFAB />
    </main>
  );
}
