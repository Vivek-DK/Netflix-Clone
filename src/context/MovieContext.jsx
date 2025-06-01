import { createContext, useContext, useState } from 'react';

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [searchResult, setSearchResult] = useState(null);

  return (
    <MovieContext.Provider value={{ movies, setMovies, searchResult, setSearchResult }}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovies = () => useContext(MovieContext);
