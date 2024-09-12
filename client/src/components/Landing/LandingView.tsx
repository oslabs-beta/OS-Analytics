import Navbar from "../Navbar/Navbar";
import Hero from "./Hero";
import NavMobile from "../Navbar/NavMobile";
import WhyOSA from "./WhyOSA";
import TeamSection from "./githubProfiles";
import FAQSection from "./FAQSection";
import GettingStarted from "./GettingStarted";
import Footer from "./Footer";

export default function Landing() {
  return (
    <div className="viewNoSide">
      <Navbar />
      <NavMobile />
      <Hero />
      <WhyOSA />
      <TeamSection />
      <FAQSection />
      <GettingStarted />
      <Footer />
      
    </div>
  );
}
