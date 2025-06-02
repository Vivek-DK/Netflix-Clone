import React, { useEffect, useState } from 'react';
import './Player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [apiData, setApiData] = useState({});

  const pageTransition = {
  initial: { opacity: 0, x: -40 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, x: 40, transition: { duration: 0.3 } }
};

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MDdiMzQxOTg1NjNhYTU1NmQyMDc3MDNjNjA5MTE3NiIsIm5iZiI6MTc0ODU5ODQ3Ny4zMzYsInN1YiI6IjY4Mzk3ZWNkY2E5ZDljNDIwYmNkOWZmNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MKKW9zBGTGlarnzH7SwOkN_K49r3ycJpfIzvE_HL23E'
    }
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then(res => res.json())
      .then(res => setApiData(res.results[0] || {}))
      .catch(err => console.error(err));
  }, []);

  return (
    <motion.div
      className='player'
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
    >
      <div className='back-arrow' onClick={() => navigate(-1)}>
        <img src={back_arrow_icon} alt="Back" />
      </div>
      <iframe src={`https://www.youtube.com/embed/${apiData.key}`} title='trailer' frameBorder='0' allowFullScreen></iframe>
      <div className="player-info">
        <p>{apiData.published_at ? apiData.published_at.slice(0, 10) : apiData.first_air_date}</p>
        <p>{apiData.type ? apiData.type : apiData.media_type}</p>
      </div>
      <div className="player-name">{apiData.name}</div>
    </motion.div>
  );
};

export default Player;