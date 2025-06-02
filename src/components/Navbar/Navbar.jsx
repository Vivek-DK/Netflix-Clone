import React, { useState, useRef, useEffect } from 'react';
import './Navbar.css';
import logo from '../../assets/logo.png';
import search_icon from '../../assets/search_icon.svg';
import bell_icon from '../../assets/bell_icon.svg';
import IMG_0806 from '../../assets/IMG_0806.JPG';
import { logout } from '../../firebase'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMovies } from '../../context/MovieContext';
import { userData } from '../../context/UserContext';

const Navbar = () => {
  const { user } = userData();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const menuRef = useRef(null);
  const menuToggleRef = useRef(null);
  const { movies, setSearchResult } = useMovies();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const [activeItem, setActiveItem] = useState(() => {
    return localStorage.getItem('activeNavItem') || '/';
  });

  useEffect(() => {
    if (location.pathname !== activeItem) {
      setActiveItem(location.pathname);
      localStorage.setItem('activeNavItem', location.pathname);
    }
  }, [location.pathname]);

  useEffect(() => {
    const storedPath = localStorage.getItem('activeNavItem');
    if (storedPath && location.pathname !== storedPath) {
      navigate(storedPath);
    }
  }, []);

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
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  const handleNavigation = (path) => {
    setMenuOpen(false);
    setActiveItem(path);
    localStorage.setItem('activeNavItem', path);
    navigate(path);
  };

  return (
    <div className='navbar'>
      <div className="navbar-left">
        <img src={logo} alt="Logo" className='logo'/>
        <ul className={`navbar-menu ${menuOpen ? 'show' : ''}`} ref={menuRef}>
          <li
            className={activeItem === '/' ? 'active-nav-item' : ''}
            onClick={() => handleNavigation('/')}
          >Home</li>
          <li
            className={activeItem === '/tvshows' ? 'active-nav-item' : ''}
            onClick={() => handleNavigation('/tvshows')}
          >TV Shows</li>
          <li
            className={activeItem === '/movies' ? 'active-nav-item' : ''}
            onClick={() => handleNavigation('/movies')}
          >Movies</li>
          <li
            className={activeItem === '/entertainment' ? 'active-nav-item' : ''}
            onClick={() => handleNavigation('/entertainment')}
          >Entertainment</li>
          <li
            className={activeItem === '/sports' ? 'active-nav-item' : ''}
            onClick={() => handleNavigation('/sports')}
          >Sports</li>
          <li
            className={activeItem === '/crime' ? 'active-nav-item' : ''}
            onClick={() => handleNavigation('/crime')}
          >Crime</li>
          
          <li
            className={activeItem === '/dailynews' ? 'active-nav-item' : ''}
            onClick={() => handleNavigation('/dailynews')}
          >Technology</li>
          <li
            className={activeItem === '/business' ? 'active-nav-item' : ''}
            onClick={() => handleNavigation('/business')}
          >Business</li>
          <div className="sign" onClick={() => { logout(); setMenuOpen(false); }}>
            <li>Log Out</li>
          </div>
        </ul>
      </div>

      <div className="navbar-right">
        <div className="menu-toggle" ref={menuToggleRef} onClick={() => setMenuOpen(prev => !prev)}>
          <span><FontAwesomeIcon icon={faBars} /></span>
        </div>
        <input
          type="text"
          placeholder='Search'
          autoComplete='on'
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
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
          className={localStorage.getItem('bellClicked') === 'true' ? 'navclk' : 'bell-icon'}
          onClick={() => {
            const newState = localStorage.getItem('bellClicked') !== 'true';
            localStorage.setItem('bellClicked', newState.toString());
          }}
        />
        <div className="navbar-profile" ref={menuRef}>
          <img
            src={IMG_0806}
            alt="Profile"
            className="profile-icon"
            onClick={() => setProfileOpen(prev => !prev)}
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
