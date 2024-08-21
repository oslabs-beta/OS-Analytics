import './App.css';
import Footer from './componenets/Footer/Footer';
import Hero from './componenets/Landing/Hero';
import Login from './componenets/Login/Login';
import Navbar from './componenets/Navbar/Navbar';

function App() {
  function handleServer() {
    const URL = 'http://localhost:8080/api';
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }

  return (
    <div className="app">
      <Navbar />
      <Hero />
      <Login />
      <Footer />
    </div>
  );
}

export default App;
