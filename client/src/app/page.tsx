import React from "react";
import Hero from "./ui/landingPage/hero";
import Footer from "./ui/landingPage/footer";
import About from "./ui/landingPage/about";
import HeroSecond from "./ui/landingPage/heroSecond";

function LandingPage() {
  return (
    <main>
      <div className="h-2/6">
        <Hero />
      </div>
      <div>
        <About />
      </div>
      <div className="h-2/6">
        <HeroSecond />
      </div>
      <div className="4/6">
        <Footer />
      </div>
    </main>
  );
}

export default LandingPage;
