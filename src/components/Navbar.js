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
  }, []);

  const toggleSidebar = () => {
    if (!sidebar) {
      gsap.to("#navMenu", {
        x: "0%",
        duration: 1,    
        ease: "power4.out",
      });
    } else {
      gsap.to("#navMenu", {
        x: "-100%",
        duration: 1,
        ease: "power4.in",
      });
    }
    setSidebar(!sidebar);
  };

  const toggleSearch = () => {
    setSearchActive(!searchActive);

    if (sidebar) {
      gsap.to("#navMenu", { x: "-100%", duration: 3 });
      setSidebar(false);
    }
  };

  const getValue = (e) => setSearch(e.target.value);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && search.trim() !== '') {
      window.location.href = `/getProducts/${search}`;
    }
  };

  return (
    <>
      <nav className="navbar navbar-left d-flex align-items-center position-relative">
        <div className="d-flex align-items-center gap-3">
          <FaBars className="menu-bars" onClick={toggleSidebar} />
          <Link to="/" className="navbar-brand fw-semibold fs-3 mb-0">Krist</Link>
        </div>

        <div className="d-none d-sm-block">
          <ul className="navbar-nav navbar-icons flex-row gap-4 position-absolute top-50 start-50 translate-middle">
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/men">Men</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/women">Women</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/kids">Kids</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/contact">Contact</Link></li>
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

      <div className={`search-field ${searchActive ? 'active' : ''}`}>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={getValue}
          onKeyPress={handleKeyPress}
        />
      </div>

      <nav id="navMenu" className="nav-menu">
        <ul className="nav-menu-items">
          <li className="navbar-toggle">
            <FaTimes
              className="menu-bars-close"
              style={{ marginLeft: "85%" }}
              onClick={toggleSidebar}
            />
          </li>
          <li className="hoverEffect"><Link to="/" onClick={toggleSidebar}>Home</Link></li>
          <li className="hoverEffect"><Link to="/men" onClick={toggleSidebar}>Men</Link></li>
          <li className="hoverEffect"><Link to="/women" onClick={toggleSidebar}>Women</Link></li>
          <li className="hoverEffect"><Link to="/kids" onClick={toggleSidebar}>Kids</Link></li>
          <li className="hoverEffect"><Link to="/contact" onClick={toggleSidebar}>Contact</Link></li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
