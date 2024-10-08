import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaHeart, FaShoppingCart, FaUser, FaBars, FaTimes } from 'react-icons/fa';
import './Navbar.css';
import Badge from '@mui/material/Badge';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const [sidebar, setSidebar] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  let data = useSelector(x=>x.product.cart)


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
      <nav className="navbar">
        <div className="navbar-left">
          <FaBars className="menu-bars" onClick={showSidebar} />
          <div className="navbar-logo">
            <Link to="/">Krist </Link>
          </div>
        </div>
        <ul className="navbar-menu z-3">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/men">Men</Link></li>
          <li><Link to="/women">Women</Link></li>
          <li><Link to="/kids">Kids</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
        <div className="navbar-icons ">
          <span><FaSearch className="icon" onClick={toggleSearch} /></span>
          <span className='d-none d-sm-block'><FaHeart className="icon " /></span>
          <span className=' d-block d-sm-none'>
            {/* <Link to="/dashboard"><FaUser className="icon" /></Link> */}
            {
              localStorage.getItem('token')?
              <Link to="/dashboard"><FaUser className="icon" /></Link>
              :
              <Link to="/signin"><FaUser className="icon" /></Link>
            }
          </span>
          <span><Link to="/cart">
            <Badge badgeContent={data.length} color="primary">
                <FaShoppingCart className="icon" />
            </Badge>
          </Link></span>
          
          <div>
            {
              localStorage.getItem('token')?
              <Link className=" btn btn-dark d-none d-md-block px-4 py-1 rounded-3" to='/dashboard'>Account</Link>
              :
              <Link className=" btn btn-dark d-none d-md-block px-4 py-1 rounded-3" to='/signin'>Login</Link>
            }
          </div>
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
                search === '' || ""? <Link className="search-link"><FaSearch className="icon iconSearch ps-1 " /></Link> : <Link to={`/getProducts/${search}`} className="search-link"><FaSearch className="icon iconSearch ps-1" onClick={navigateToSearch} /></Link>
              }
                
              </span>
            
      </div>

      <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <ul className="nav-menu-items" onClick={showSidebar}>
          <li className="navbar-toggle">
            <FaTimes className="menu-bars-close z-3" style={{marginLeft:"85%"}} onClick={showSidebar} />
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
