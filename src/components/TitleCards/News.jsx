import React, { useState, useEffect, useRef } from 'react';
import './News.css'; 
import { Link } from 'react-router-dom';

const News = ({category}) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  useEffect(() => {
    fetch(`https://newsdata.io/api/1/latest?apikey=pub_f0d815f5734d422997abb2a2cc31bd81&category=${category}&country=au,us,in&language=en`, {
    })
      .then(res => res.json())
      .then(res => {
        setApiData(res.results || []);
      })
      .catch(err => console.error('Error fetching news:', err));
  }, [category]);

  return (
    <div className='news-cards'>
      <div className="news-list" ref={cardsRef}>
        {apiData.map((card, index) => (
          <div className='news-card' key={index}>
            <span className="news-card-name">{card.source_name}</span>
            <Link to={card.link} className="news-card-img-wrapper">
              {card.image_url && (
                <img src={card.image_url} alt={card.title} className="news-card-img" />
              )}
              <div className='news-card-content'>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
