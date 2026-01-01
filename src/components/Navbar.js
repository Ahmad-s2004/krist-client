import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaHeart, FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
import './Navbar.css';
import Badge from '@mui/material/Badge';
import { useSelector } from 'react-redux';
import gsap from 'gsap';

const Navbar = () => {
  const [sidebar, setSidebar] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [search, setSearch] = useState('');

  const data = useSelector(x => x.product.cart);

  useEffect(() => {
    gsap.set("#navMenu", { x: "-100%" });
    gsap.set("#search-field", {
      opacity: 0,
      visibility: "hidden",
      y: -20,
    });
  }, []);
  

  const toggleSidebar = () => {
    gsap.to("#navMenu", {
      x: sidebar ? "-100%" : "0%",
      duration: 0.8,
      ease: "power4.inOut",
    });
    setSidebar(!sidebar);

    if (searchActive) toggleSearch();
  };

  const toggleSearch = () => {
    if (!searchActive) {
      gsap.to("#search-field", {
        opacity: 1,
        visibility: "visible",
        pointerEvents: "auto",
        y: 0,
        duration: 0.5,
        ease: "power3.out",
      });
    } else {
      gsap.to("#search-field", {
        opacity: 0,
        // visibility: "hidden",
        pointerEvents: "none",
        y: -20,
        duration: 0.5,
        ease: "power3.in",
      });
    }
  
    setSearchActive(!searchActive);
  
    if (sidebar) {
      gsap.to("#navMenu", { x: "-100%", duration: 0.6 });
      setSidebar(false);
    }
  };
  

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && search.trim()) {
      window.location.href = `/getProducts/${search}`;
    }
  };

  return (
    <>
      <nav style={{zIndex:1}} className="navbar d-flex align-items-center position-relative">
        <div className="d-flex align-items-center gap-3">
          <FaBars className="menu-bars" onClick={toggleSidebar} />
          <Link to="/" className="navbar-brand fw-semibold fs-3">Krist</Link>
        </div>

        <div className="d-none d-sm-block">
          <ul className="navbar-nav flex-row gap-4 position-absolute top-50 start-50 translate-middle">
            <li><Link className='nav-link' to="/">Home</Link></li>
            <li><Link className='nav-link' to="/men">Men</Link></li>
            <li><Link className='nav-link' to="/women">Women</Link></li>
            <li><Link className='nav-link' to="/kids">Kids</Link></li>
            <li><Link className='nav-link' to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="d-flex align-items-center gap-3 ms-auto">
          <FaSearch className="icon" onClick={toggleSearch} />
          <FaHeart className="icon d-none d-sm-block" />

          <Link to="/cart">
            <Badge badgeContent={data.length} color="primary">
              <FaShoppingCart className="icon" />
            </Badge>
          </Link>

          {localStorage.getItem("token") ? (
            <Link to="/dashboard" className="btn btn-dark d-none d-md-block">Account</Link>
          ) : (
            <Link to="/signin" className="btn btn-dark d-none d-md-block">Login</Link>
          )}
        </div>
      </nav>

      <div style={{zIndex:0}} id="search-field" className="search-field mt-1">
        <input
          type="text"
          placeholder="Search..."
          className='w-100 font-12'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyPress}
        />
      </div>

      <nav id="navMenu" className="nav-menu">
        <ul className="nav-menu-items">
          <li className="navbar-toggle">
            <FaTimes className="menu-bars-close" onClick={toggleSidebar} />
          </li>
          <li><Link to="/" onClick={toggleSidebar}>Home</Link></li>
          <li><Link to="/men" onClick={toggleSidebar}>Men</Link></li>
          <li><Link to="/women" onClick={toggleSidebar}>Women</Link></li>
          <li><Link to="/kids" onClick={toggleSidebar}>Kids</Link></li>
          <li><Link to="/contact" onClick={toggleSidebar}>Contact</Link></li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
