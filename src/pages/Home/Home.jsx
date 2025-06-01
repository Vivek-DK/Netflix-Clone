import React, { useEffect, useState } from 'react';
import './Home.css';
import Navbar from '../../components/Navbar/Navbar';
import play_icon from '../../assets/play_icon.png';
import info_icon from '../../assets/Info_icon.png';
import TitleCards from '../../components/TitleCards/TitleCards';
import Footer from '../../components/Footer/Footer';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useMovies } from '../../context/MovieContext';
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const { movies, setMovies } = useMovies();
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const pageTransition = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -40, transition: { duration: 0.3 } }
  };

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MDdiMzQxOTg1NjNhYTU1NmQyMDc3MDNjNjA5MTE3NiIsIm5iZiI6MTc0ODU5ODQ3Ny4zMzYsInN1YiI6IjY4Mzk3ZWNkY2E5ZDljNDIwYmNkOWZmNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MKKW9zBGTGlarnzH7SwOkN_K49r3ycJpfIzvE_HL23E'
    }
  };

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
      .then(res => res.json())
      .then(res => setMovies(res.results || []))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => movies.length ? (prev + 1) % movies.length : 0);
    }, 5000);
    return () => clearInterval(interval);
  }, [movies]);

  const currentMovie = movies[currentIndex] || {};

  return (
    <motion.div
      className="home"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
    >
      <Navbar />
      <div className="hero">
        {currentMovie.backdrop_path && (
          <img
            src={`https://image.tmdb.org/t/p/original${currentMovie.backdrop_path}`}
            alt="hero"
            className='banner-img'
          />
        )}

        <div className='hero-caption'>
          <h1 className='caption-title'>{currentMovie.original_title || currentMovie.original_name}</h1>
          <p>{currentMovie.overview}</p>
          <div className="hero-btns">
            <Link to={`/player/${currentMovie.id}`} className='btn'>
              <img src={play_icon} alt="Play" className='imgbtn' /> Play
            </Link>
            <button className='btn' onClick={() => navigate(`/moreinfo/${currentMovie.id}`)}>
              <img src={info_icon} alt="Info" className='imgbtn' /> More Info
            </button>
          </div>
        </div>
        <div className="popular">
          <TitleCards />
        </div>
      </div>

      <div className="more-cards">
        <TitleCards title="Trending Movies" genre="trending" category="movie" day="day" />
        <TitleCards title="Blockbuster Movies" genre="movie" category="top_rated" />
        <TitleCards title="Trending TV Shows" genre="trending" category="tv" day="day" />
        <TitleCards title="TV Series" genre="tv" category="airing_today" />
        <TitleCards title="On The Air" genre="tv" category="on_the_air" />
      </div>

      <Footer />
    </motion.div>
  );
};

export default Home;
