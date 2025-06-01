import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { MovieProvider } from './context/MovieContext';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './context/UserContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <MovieProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </MovieProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
