import Nav from "@/components/Nav";
import ScrollTour from "@/components/ScrollTour";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Credibility from "@/components/sections/Credibility";
import Footer from "@/components/sections/Footer";
import Listings from "@/components/sections/Listings";
import Neighborhoods from "@/components/sections/Neighborhoods";
import Paths from "@/components/sections/Paths";
import Process from "@/components/sections/Process";
import Stories from "@/components/sections/Stories";
import Why from "@/components/sections/Why";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[70] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-ivory"
      >
        Skip to content
      </a>
      <Nav />
      <main id="top">
        <ScrollTour />
        <div id="main">
          <Credibility />
          <Paths />
          <Listings />
          <Why />
          <About />
          <Neighborhoods />
          <Stories />
          <Process />
          <Contact />
        </div>
      </main>
      <Footer />
    </>
  );
}
