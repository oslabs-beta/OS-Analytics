
import Navbar from '../Navbar/Navbar'
import Hero from './Hero'
import Footer from '../Footer/Footer'
import NavMobile from '../Navbar/NavMobile'
import Loading from '../Loading/Loading'

export default function Landing() {
  return (
    <div className="viewNoSide">
        <Navbar />
        <NavMobile />
        <Hero />
        <Footer />
        </div>
  )
}
