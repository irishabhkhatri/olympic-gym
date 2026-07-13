import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Trainer from "@/components/Trainer";
import Gallery from "@/components/Gallery";
import Supplements from "@/components/Supplements";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <SmoothScroll>
      <main>
        <Navbar />
        <Hero />
        <About />
        <Services />
        <Trainer />
        <Gallery />
        <Supplements />
        <Contact />
      </main>
    </SmoothScroll>
  );
}
