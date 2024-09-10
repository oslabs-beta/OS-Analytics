import Navbar from "../Navbar/Navbar";
import Hero from "./Hero";
import Footer from "../Footer/Footer";
import NavMobile from "../Navbar/NavMobile";
import WhyOSA from "./WhyOSA";
import TeamSection from "./githubProfiles";
import FAQSection from "./FAQSection";
// import Loading from '../Loading/Loading'

export default function Landing() {
  return (
    <div className="viewNoSide">
      <Navbar />
      <NavMobile />
      <Hero />
      <WhyOSA />
      <TeamSection />
      <FAQSection />
      <Footer />
      
    </div>
  );
}
