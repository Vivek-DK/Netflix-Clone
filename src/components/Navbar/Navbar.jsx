import React, { useState, useRef, useEffect } from 'react';
import './Navbar.css';
import logo from '../../assets/logo.png';
import search_icon from '../../assets/search_icon.svg';
import bell_icon from '../../assets/bell_icon.svg';
import IMG_0806 from '../../assets/IMG_0806.JPG';
import { logout } from '../../firebase'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useMovies } from '../../context/MovieContext';
import { userData } from '../../context/UserContext';

const Navbar = () => {
  const { user } = userData();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const menuRef = useRef(null);
  const menuToggleRef = useRef(null);
  const profileRef = useRef(null); 
  const [isClicked, setIsClicked] = useState(() => {
  return localStorage.getItem('bellClicked') === 'true';
});
  const { movies, setSearchResult } = useMovies();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  
  const handleSearch = () => {
    if (!searchQuery.trim()) return;

    const foundMovie = movies.find(
      (movie) =>
        movie.original_title?.toLowerCase() === searchQuery.toLowerCase() ||
        movie.title?.toLowerCase() === searchQuery.toLowerCase()
    );

    if (foundMovie) {
      setSearchResult(foundMovie);
      navigate(`/moreinfo/${foundMovie.id}`);
    } else {
      alert('No results found.');
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        menuToggleRef.current &&
        !menuToggleRef.current.contains(e.target)
      ) {
        setMenuOpen(false);
      }

      if (
        profileRef.current &&
        !profileRef.current.contains(e.target)
      ) {
        setProfileOpen(false);
        }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = () => {
    if (!menuOpen) setProfileOpen(false);
    setMenuOpen(prev => !prev);
  };

  const toggleProfile = () => {
    if (!profileOpen) setMenuOpen(false);
    setProfileOpen(prev => !prev);
  };

  return (
    <div className='navbar'>
      <div className="navbar-left">
        <img src={logo} alt="Logo" />
        <ul className={`navbar-menu ${menuOpen ? 'show' : ''}`} ref={menuRef}>
          <li onClick={() => { navigate('/'); setMenuOpen(false); }}>Home</li>
          <li onClick={() => { navigate('/tvshows'); setMenuOpen(false); }}>TV Shows</li>
          <li onClick={() => { navigate('/movies'); setMenuOpen(false); }}>Movies</li>
          <li onClick={() => { navigate('/sports'); setMenuOpen(false); }}>Sports</li>
          <li onClick={() => { navigate('/dailynews'); setMenuOpen(false); }}>Technology</li>
          <li onClick={() => { navigate('/business'); setMenuOpen(false); }}>Business</li>
          <div className="sign" onClick={() => { logout(); setMenuOpen(false); }}>
            <li>Log Out</li>
          </div>
        </ul>
      </div>

      <div className="navbar-right">
        <div className="menu-toggle" ref={menuToggleRef} onClick={toggleMenu}>
          <span><FontAwesomeIcon icon={faBars} /></span>
        </div>
        <input
          type="text"
          placeholder='Search'
          autoComplete='on'
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
          className='search-input'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <img
          src={search_icon}
          alt="Search"
          className='search-icon'
          onClick={handleSearch}
        />
        <img
          src={bell_icon}
          alt="Bell"
          className={isClicked ? 'navclk' : 'bell-icon'}
          onClick={() => {
            const newState = !isClicked;
            setIsClicked(newState);
            localStorage.setItem('bellClicked', newState.toString());
          }}
        />

        <div className="navbar-profile" ref={profileRef}>
          <img
            src={IMG_0806}
            alt="Profile"
            className="profile-icon"
            onClick={toggleProfile}
          />

          {profileOpen && (
            <div className="profile-dropdown">
              <img src={IMG_0806} alt="Profile" className="dropdown-profile-img" />
              <p className="dropdown-name">{user.name || 'Guest'}</p>
              <p className="dropdown-email">{user.email || 'No Email'}</p>
              <button className="logout-btn" onClick={logout}>Log Out</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
