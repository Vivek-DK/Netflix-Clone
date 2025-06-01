import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import MoreInfo from './pages/MoreInfo/MoreInfo';
import Player from './pages/Player/Player';
import TvShows from './pages/TvShows/TvShows';
import Movies from './pages/Movies/Movies';
import Sports from './pages/NewsAndSports/Sports';
import DailyNews from './pages/NewsAndSports/DailyNews';
import Business from './pages/NewsAndSports/Business';
import { MovieProvider } from './context/MovieContext';
import Login from './pages/Login/Login'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const App = () => {


const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("User is signed in:", user);
        navigate('/');
      } else {
        console.log("User is signed out");
        navigate('/login');
      }
    });
  }, []);
  return (
    <>
      <ScrollToTop />
    <AnimatePresence mode="wait">
      <MovieProvider>
        <Routes key={location.pathname} location={location}>
          <Route path='/login' element={<Login />}/>
          <Route path='*' element={<h1>Page Not Found</h1>}/>
          <Route path="/" element={<Home />} />
          <Route path="/moreinfo/:id" element={<MoreInfo />} />
          <Route path="/player/:id" element={<Player />} />
          <Route path="/tvshows" element={<TvShows />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/sports" element={<Sports />} />
          <Route path="/dailynews" element={<DailyNews />} />
          <Route path="/business" element={<Business />} />
        </Routes>
      </MovieProvider>
    </AnimatePresence>
    </>
  )
}

export default App
