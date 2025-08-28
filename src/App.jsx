import { BrowserRouter, Routes, Route } from 'react-router-dom'; 

import About from './pages/About.jsx';
import Blog from './pages/Blog.jsx';
import Home from './pages/Home.jsx';
import Location from './pages/Location.jsx';
import PageNotFound from './pages/PageNotFound.jsx';
import Scooters from './pages/Scooters.jsx';
import Signup from './pages/Signup.jsx';
import Navbar from './components/Navbar.jsx';

export default function App() {
  return (
    <BrowserRouter>
    
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/location" element={<Location />} />
        <Route path="/scooters" element={<Scooters />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}