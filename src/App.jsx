import { BrowserRouter, Routes, Route } from 'react-router-dom'; 

import AboutUs from './pages/AboutUs.jsx';
import Blog from './pages/Blog.jsx';
import Home from './pages/Home.jsx';
import Locations from './pages/Locations.jsx';
import PageNotFound from './pages/PageNotFound.jsx';
import Scooters from './pages/Scooters.jsx';
import Signup from './pages/Signup.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/scooters" element={<Scooters />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}