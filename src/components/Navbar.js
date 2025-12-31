import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaHeart, FaShoppingCart, FaUser, FaBars, FaTimes } from 'react-icons/fa';
import './Navbar.css';
import Badge from '@mui/material/Badge';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const [sidebar, setSidebar] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  let data = useSelector(x => x.product.cart)


  const [search, setSearch] = useState('');

  const getValue = (e) => {
    setSearch(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      navigateToSearch();
    }
  };

  const navigateToSearch = () => {
    if (search.trim() !== '') {
      window.location.href = `/getProducts/${search}`;
    }
  };
  const showSidebar = () => {
    setSidebar(!sidebar);
    setSearchActive(false);
  };

  const toggleSearch = () => {
    setSearchActive(!searchActive);
    setSidebar(false);
  };



  return (
    <>
      <nav className="navbar navbar-left d-flex align-items-center position-relative">
        <div className="d-flex align-items-center gap-3">
          <FaBars className="menu-bars" onClick={showSidebar} />
          <Link to="/" className="navbar-brand fw-semibold fs-3 mb-0">Krist</Link>
        </div>

        <div className='d-none d-sm-block'>
          <ul className="navbar-nav navbar-icons flex-row gap-4 position-absolute top-50 start-50 translate-middle">
            <li className="nav-item fw-medium">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item fw-medium">
              <Link className="nav-link" to="/men">Men</Link>
            </li>
            <li className="nav-item fw-medium">
              <Link className="nav-link" to="/women">Women</Link>
            </li>
            <li className="nav-item fw-medium">
              <Link className="nav-link" to="/kids">Kids</Link>
            </li>
            <li className="nav-item fw-medium">
              <Link className="nav-link" to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        <div className="d-flex align-items-center gap-3 ms-auto">
          <FaSearch className="icon"  onClick={toggleSearch}/>
          <FaHeart className="icon d-none d-sm-block" />
          <Link to="/cart">
            <Badge badgeContent={data.length} color="primary">
              <FaShoppingCart className="icon" />
            </Badge>
          </Link>

          {localStorage.getItem("token") ? (
            <Link to="/dashboard" className="btn btn-dark d-none d-md-block">
              Account
            </Link>
          ) : (
            <Link to="/signin" className="btn btn-dark d-none d-md-block">
              Login
            </Link>
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
        <span>

          {
            search === '' || "" ? <Link className="search-link"><FaSearch className="icon iconSearch ps-1 " /></Link> : <Link to={`/getProducts/${search}`} className="search-link"><FaSearch className="icon iconSearch ps-1" onClick={navigateToSearch} /></Link>
          }

        </span>

      </div>

      <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <ul className="nav-menu-items" onClick={showSidebar}>
          <li className="navbar-toggle">
            <FaTimes className="menu-bars-close z-3" style={{ marginLeft: "85%" }} onClick={showSidebar} />
          </li>
          <li className='hoverEffect'><Link className='ms-3' to="/">Home</Link></li>
          <li className='hoverEffect'><Link className='ms-3' to="/men">Men</Link></li>
          <li className='hoverEffect'><Link className='ms-3' to="/women">Women</Link></li>
          <li className='hoverEffect'><Link className='ms-3' to="/kids">Kids</Link></li>
          <li className='hoverEffect'><Link className='ms-3' to="/contact">Contact</Link></li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
