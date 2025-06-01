import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMovies } from '../../context/MovieContext';
import './MoreInfo.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png';

const MoreInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { movies } = useMovies();
  const [videoKey, setVideoKey] = useState(null);

  const movie = movies.find((m) => m.id.toString() === id);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MDdiMzQxOTg1NjNhYTU1NmQyMDc3MDNjNjA5MTE3NiIsIm5iZiI6MTc0ODU5ODQ3Ny4zMzYsInN1YiI6IjY4Mzk3ZWNkY2E5ZDljNDIwYmNkOWZmNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MKKW9zBGTGlarnzH7SwOkN_K49r3ycJpfIzvE_HL23E'
    }
  };

  useEffect(() => {
    if (id) {
      fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
        .then((res) => res.json())
        .then((res) => {
          const trailer = res.results?.find(video => video.type === 'Trailer' || video.site === 'YouTube');
          setVideoKey(trailer?.key || null);
        })
        .catch((err) => console.error(err));
    }
  }, [id]);

  if (!movie) {
    return <div className="no-data">No data found for this movie.</div>;
  }

  return (
    <div className="more-info">
      <div className='back-arrow' onClick={() => navigate(-1)}>
        <img src={back_arrow_icon} alt="Back" />
      </div>
      <h1>{movie.title || movie.original_title}</h1>

      {videoKey ? (
        <iframe
          src={`https://www.youtube.com/embed/${videoKey}`}
          title='trailer'
          frameBorder='0'
          allowFullScreen
          className="trailer-video"
        ></iframe>
      ) : (
        <p className="no-video">Trailer not available.</p>
      )}

      <div className="more">
        <p className="release-date"><strong>Release Date:</strong> {movie.release_date}</p>
        <p className="rating"><strong>Rating:</strong> {movie.vote_average}</p>
      </div>
      <p className="overview">{movie.overview}</p>
    </div>
  );
};

export default MoreInfo;
