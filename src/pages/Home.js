import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PaidIcon from '@mui/icons-material/Paid';
import PaymentIcon from '@mui/icons-material/Payment';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import Footer from '../components/Footer';


const Home = () => {

  const [product, setProduct] = useState([])
  const [loading, setLoading] = useState(false)

  let fetchData = async () => {
    let res = await fetch('https://krist-server.vercel.app/product/getKids?limit=6')
    res = await res.json()
    setProduct(res)
    setLoading(true)
  }
  useEffect(() => {
    fetchData()
  }, [])



  return (
    <>{
      loading?
    <>
      <Navbar />
      <div>
        <div className=''>
          <img src="/media/banner.png" style={{ width: "100%" }} alt="" />
        </div>
        <div className='shopByCategory mx-3 '>
          <div className="d-none d-md-block h3 text-center mt-5">Shop by Categories</div>
          <div className="d-block d-md-none h6 text-center mt-5">Shop by Categories</div>
          <div className="conatiner mt-3">
            <div className="row">
              <div className="col-lg-4 col-md-4 col-6 text-center">
                <div className="dat">
                  <div className="card">
                    <img src="/media/kids.webp" alt="" />
                  </div>
                  <Link to="/kids" className='categoryBtn'>Kids</Link>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-6 text-center">
                <div className="dat">
                  <div className="card">
                    <img src="/media/women.webp" alt="" />
                  </div>
                  <Link to="/women" className='categoryBtn'>Women</Link>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-12 text-center">
                <div className="dat">
                  <div className="card">
                    <img src="/media/men.webp" alt="" />
                  </div>
                  <Link to="/men" className=' categoryBtn'>Men</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bestCollection mx-1">
          <div className="d-none d-md-block h3 text-center mb-4 mt-5">Our Bestsellers</div>
          <div className="d-block d-md-none h6 text-center mb-4 mt-5">Our Bestsellers</div>
          <div className="container-fluid px-3">
            <div className="row">
              {
                product.map((x) => {
                  return (
                    <div className="col-lg-4 col-md-4 col-6">
                      <div className="card" >
                        <div className='card-img-container'>
                          <img src={`https://krist-server.vercel.app/${x.gallery[0].img1}`} className="card-img-top primary" alt="Primary" />
                          <img src={`https://krist-server.vercel.app/${x.gallery[0].img2}`} className="card-img-top secondary" alt="Secondary" />
                        </div>
                        <div className="card-body">
                          <p className="card-text fw-semibold d-none d-lg-block" style={{ fontSize: "0.75rem" }}>{x.title}</p>
                          <p className="card-text fw-semibold d-none d-sm-block d-lg-none" style={{ fontSize: "0.55rem", marginTop: "-10px" }}>{x.title}</p>
                          <p className="card-text fw-semibold d-block d-sm-none" style={{ fontSize: "0.45rem", marginTop: "-10px" }}>{x.title.slice(0, 30)}...</p>
                          <p class="card-text d-none d-lg-block" style={{ marginTop: "-6px", fontSize: "0.9rem" }}>Rs. {x.price}</p>
                          <p class="card-text d-none d-md-block d-lg-none" style={{ marginTop: "-12px", fontSize: "0.6rem" }}>Rs. {x.price}</p>
                          <p class="card-text d-block d-md-none" style={{ marginTop: "-14px", fontSize: "0.5rem" }}>Rs. {x.price}</p>
                        </div>
                      </div>

                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
        <div className="serviceSection">
      <div className="container">
        <div className="row text-center">
          <div className="col-lg-3 col-md-3 col-sm-6 col-12">
            <div className="serviceItem">
              <LocalShippingIcon className="iconService" />
              <div className="titleService">Free Shipping</div>
              <div className="descriptionService">Free shipping for order above 2000</div>
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6 col-12">
            <div className="serviceItem">
              <PaidIcon className="iconService" />
              <div className="titleService">Money Guarantee</div>
              <div className="descriptionService">Within 20 days for an exchange</div>
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6 col-12">
            <div className="serviceItem">
              <SupportAgentIcon className="iconService" />
              <div className="titleService">Online Support</div>
              <div className="descriptionService">24 hours a day, 7 days a week</div>
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6 col-12">
            <div className="serviceItem">
              <PaymentIcon className="iconService" />
              <div className="titleService">Flexible Payment</div>
              <div className="descriptionService">Pay with multiple credit cards</div>
            </div>
          </div>
        </div>
      </div>
    </div>
      </div>
      <Footer />
      </>
      :
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
    }
    </>
  )
}

export default Home
