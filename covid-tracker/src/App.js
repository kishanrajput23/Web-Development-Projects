import Landing_Page from './Components/Landing_Page';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Countries from './Components/Countries';
import Country from './Components/Country';
import Footer from './Components/Footer';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<Landing_Page />} />
          <Route path="home" element={<Home />} />
          <Route path="countries" element={<Countries/>} />
          <Route path="country" element={<Country/>} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
