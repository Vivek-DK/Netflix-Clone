import React, { useState, useEffect, useRef } from 'react'
import './TitleCard.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom';

const TitleCards = ({ title, genre, category, day }) => {

  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MDdiMzQxOTg1NjNhYTU1NmQyMDc3MDNjNjA5MTE3NiIsIm5iZiI6MTc0ODU5ODQ3Ny4zMzYsInN1YiI6IjY4Mzk3ZWNkY2E5ZDljNDIwYmNkOWZmNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MKKW9zBGTGlarnzH7SwOkN_K49r3ycJpfIzvE_HL23E'
    }
  };
  
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/${ genre ? genre : 'movie'}/${category ? category : 'popular'}${day ? `/${day}` : ''}?language=en-US&page=1`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results))
    .catch(err => console.error(err));
  }, []);

  return (
    <div className='title-cards'>
      <h2 className="title-cards-title">{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return (
            <div className='title-card' key={index}>
              <Link to={`/player/${card.id}`} className="title-card-img-wrapper">
                <img src={`https://image.tmdb.org/t/p/original`+card.backdrop_path} alt={card.original_title} className="title-card-img" />
                <span className="title-card-rating">{card.vote_average ? card.vote_average.toFixed(1) : ''}</span>
                <div className="title-card-overlay">
                  <span className="title-card-name">{card.original_title ? card.original_title : card.original_name}</span>
                </div>
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default TitleCards