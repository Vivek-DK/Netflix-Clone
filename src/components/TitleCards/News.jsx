import React, { useState, useEffect, useRef } from 'react';
import './News.css'; 

const News = ({category}) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  useEffect(() => {
    fetch(`https://newsapi.org/v2/everything?q=${category}&apiKey=8088d4ee27fa4a7482f25276d0ee78af`, {
      headers: {
        'X-Api-Key': '8088d4ee27fa4a7482f25276d0ee78af'
      }
    })
      .then(res => res.json())
      .then(res => {
        setApiData(res.articles || []);
      })
      .catch(err => console.error('Error fetching news:', err));
  }, []);

  return (
    <div className='news-cards'>
      <div className="news-list" ref={cardsRef}>
        {apiData.map((card, index) => (
          <div className='news-card' key={index}>
            <span className="news-card-name">{card.source.name}</span>
            <div className="news-card-img-wrapper">
              {card.urlToImage && (
                <img src={card.urlToImage} alt={card.title} className="news-card-img" />
              )}
              <div>
                <h2>{card.title}</h2>
                <p>{card.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
