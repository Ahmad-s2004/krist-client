import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import '../components/Filter.css';
import CloseIcon from '@mui/icons-material/Close';

const Women = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const [search, setSearch] = useState([]);

  const showSidebar = () => setSidebar(!sidebar);

  const fetchData = async () => {
    const res = await fetch('https://krist-server.vercel.app/product/getWomen');
    const data = await res.json();
    setProduct(data);
    console.log(data)
    setLoading(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchFilteredProducts = async (searchString) => {
    const res = await fetch(`https://krist-server.vercel.app/product/getWomenProducts?search=${searchString}`);
    const data = await res.json();
    setProduct(data);
  };

  const handleFilterClick = (filter) => {
    setSearch((prevSearch) => [...prevSearch, filter]);
  };

  const handleFilterButtonClick = () => {
    const searchString = search.join(',');
    fetchFilteredProducts(searchString);
    setSidebar(!sidebar);
  };

  const handleClearFilter = () => {
    setSearch([]);
    setSidebar(!sidebar);
    fetchData();
  };

  const removeFilter = (filter) => {
    const newSearch = search.filter((item) => item !== filter);
    setSearch(newSearch);
    if (newSearch.length > 0) {
      fetchFilteredProducts(newSearch.join(','));
    } else {
      fetchData();
    }
  };
  let ShowProduct = () => {
    return (
      <>
        <Navbar />
        <div className="shoppingcart text-center h5 my-3 py-2 bg-light fw-semibold d-none d-md-block">Men</div>
      <div className="shoppingcart text-center h6 my-2 py-2 bg-light fw-semibold d-block d-md-none">Men</div>
      <div className="mb-3">
        <FilterAltIcon className="menu-bars ms-3" onClick={showSidebar} />
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className="nav-menu-items">
            <li className="navbar-toggle" style={{ position: "relative" }}>
              <h6 className='fw-semilight mt-1'>Filter</h6>
              <span style={{ position: "absolute", right: "15px" }}>
                <CloseIcon className="menu-bars-close z-3" onClick={showSidebar} />
              </span>
            </li>
            <ul className='filter'>
              <li className='d-flex flex-column align-items-start '>
                <h6>Price</h6>
                <input type="range" className='range-input mt-1' />
                <div>
                  <button
                    className="btn btn-outline-dark mt-3 px-4 fw-semibold rounded-5"
                    style={{ fontSize: "0.7rem", letterSpacing: "0.6px" }}
                    onClick={handleFilterButtonClick}
                  >
                    Filter
                  </button>
                  <button
                    className="btn btn-outline-dark mt-3 px-4 fw-semibold rounded-5 ms-1"
                    style={{ fontSize: "0.7rem", letterSpacing: "0.6px" }}
                    onClick={handleClearFilter}
                  >
                    Clear
                  </button>
                </div>
              </li>
              <li className='d-flex flex-column align-items-start '>
                <h6>Color</h6>
                <div className='colorScroll'>
                  <div onClick={() => handleFilterClick('Blue')}><span style={{ background: "blue" }}></span> Blue</div>
                  <div onClick={() => handleFilterClick('Pink')}><span style={{ background: "pink" }}></span> Pink</div>
                  <div onClick={() => handleFilterClick('Yellow')}><span style={{ background: "yellow" }}></span> Yellow</div>
                  <div onClick={() => handleFilterClick('Olive')}><span style={{ background: "olive" }}></span> Olive</div>
                  <div onClick={() => handleFilterClick('Red')}><span style={{ background: "red" }}></span> Red</div>
                  <div onClick={() => handleFilterClick('Black')}><span style={{ background: "black" }}></span> Black</div>
                  <div onClick={() => handleFilterClick('Slub Grey')}><span style={{ background: "grey" }}></span> Slub Grey</div>
                  <div onClick={() => handleFilterClick('Navy')}><span style={{ background: "navy" }}></span> Navy</div>
                </div>
              </li>
              <li className='d-flex flex-column align-items-start '>
                <h6>Size</h6>
                <div className='colorScroll'>
                  <div onClick={() => handleFilterClick('small')}>Small</div>
                  <div onClick={() => handleFilterClick('medium')}>Medium</div>
                  <div onClick={() => handleFilterClick('large')}>Large</div>
                  <div onClick={() => handleFilterClick('x large')}>X Large</div>
                </div>
              </li>
              <li className='d-flex flex-column align-items-start '>
                <h6>Product Type</h6>
                <div className='colorScroll'>
                  <div onClick={() => handleFilterClick('Unisex')}>Unisex</div>
                  <div onClick={() => handleFilterClick('Shirt')}>Shirt</div>
                  <div onClick={() => handleFilterClick('Jupiter')}>Jupiter</div>
                  <div onClick={() => handleFilterClick("Jacket")}>Jacket</div>
                  <div onClick={() => handleFilterClick('Jeans')}>Jeans</div>
                  <div onClick={() => handleFilterClick('Trouser')}>Trousers</div>
                  <div onClick={() => handleFilterClick('head wear')}>Head Wear</div>
                  <div onClick={() => handleFilterClick('accessories')}>Jewelery & Accressories</div>
                </div>
              </li>
            </ul>
          </ul>
        </nav>
        <span className='ms-3'>
          {search.map((x) => (
            <span key={x} className='btn btn-outline-dark rounded-5 mx-1' style={{ fontSize: "0.7rem" }} onClick={() => removeFilter(x)}>
              {x}
            </span>
          ))}
        </span>
      </div>
        <div>
          <div className="container-fluid px-4">
            <div className="row">
              {
                product.map(x => {
                  return (
                    <div className='col-lg-4 col-md-4 col-sm-6 col-12'>
                      <div className="card">
                        <div className="card-img-container">
                          <div className="sale my-auto">{Number(x.salePercent)}%</div>
                          <img src={`https://krist-server.vercel.app/${x.gallery[0].img1}`} className="card-img-top primary" alt="Primary" />
                          <img src={`https://krist-server.vercel.app/${x.gallery[0].img2}`} className="card-img-top secondary" alt="Secondary" />
                          <Link className="button" to={`/getWomen/${x._id}`}>Quick View</Link>
                        </div>

                        <div className="card-body">
                          <h5 className="card-title d-none d-lg-block h6">{x.title.slice(0, 40)}...</h5>
                          <h5 className="card-title d-block d-lg-none" style={{ fontSize: "0.8rem" }}>{x.title.slice(0, 40)}...</h5>
                          <p className="card-text d-none d-lg-block">Rs. {Math.floor(x.price - x.price / x.salePercent)}</p>
                          <p className="card-text d-block d-lg-none" style={{ fontSize: "0.8rem" }}>Rs. {Math.floor(x.price - x.price / x.salePercent)}</p>
                        </div>
                      </div>

                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  let Loading = () => {
    return (
      <>
      <div className="d-none d-sm-block">
      <div className="d-flex justify-content-center align-items-center" style={{height:"550px"}}> 
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
      </div>
      <div className="d-block d-sm-none ">
      <div className="d-flex justify-content-center align-items-center" style={{height:"550px"}}> 
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
      </div>
      
      
      </>

    )
  }

  return (

    <>
      {loading ? <ShowProduct /> : <Loading />}
    </>

  )
}

export default Women