import React from 'react'
import "./Footer.css"
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <>
      <footer className="site-footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6">
              {/* Contact Info*/}
              <section className="widget widget-light-skin">
                <h3 className="widget-title">Get In Touch With Us</h3>
                <p className="text-white phoneNo">Phone: 00 33 169 7720</p>
                <ul className="list-unstyled text-sm text-white">
                  <li><span className="opacity-50">Monday-Friday:</span>9.00 am - 8.00 pm</li>
                  <li><span className="opacity-50">Saturday:</span>10.00 am - 6.00 pm</li>
                </ul>
                <p><Link className="navi-link-light linkSupport" href="#">support@unishop.com</Link></p><Link className="social-button shape-circle sb-facebook sb-light-skin" href="#"><i className="socicon-facebook" /></Link><Link className="social-button shape-circle sb-twitter sb-light-skin" href="#"><i className="socicon-twitter" /></Link><Link className="social-button shape-circle sb-instagram sb-light-skin" href="#"><i className="socicon-instagram" /></Link><Link className="social-button shape-circle sb-google-plus sb-light-skin" href="#"><i className="socicon-googleplus" /></Link>
              </section>
            </div>
            <div className="col-lg-3 col-md-6">
              {/* Mobile App Buttons*/}
              <section className="widget widget-light-skin">
                <h3 className="widget-title">Our Mobile App</h3>
                <Link className="market-button apple-button mb-light-skin" href="#">
                  <span className="mb-subtitle">Download on the</span>
                  <span className="mb-title">App Store</span>
                </Link>
                <Link className="market-button google-button mb-light-skin" href="#">
                  <span className="mb-subtitle">Download on the</span>
                  <span className="mb-title">Google Play</span>
                </Link>
                <Link className="market-button windows-button mb-light-skin" href="#">
                  <span className="mb-subtitle">Download on the</span>
                  <span className="mb-title">Windows Store</span>
                </Link>
              </section>
            </div>
            <div className="col-lg-3 col-md-6">
              {/* About Us*/}
              <section className="widget widget-links widget-light-skin">
                <h3 className="widget-title">Services</h3>
                <ul className='list-unstyled'>
                  <li><Link to="">About US</Link></li>
                  <li><Link to="">Contact</Link></li>
                  <li><Link to="">Terms & Condition</Link></li>
                  <li><Link to="">Privacy Policy</Link></li>
                  {/* <li><Link href="#">Our Blog</Link></li> */}
                </ul>
              </section>
            </div>
            <div className="col-lg-3 col-md-6">
              {/* Account / Shipping Info*/}
              <section className="widget widget-links widget-light-skin">
                <h3 className="widget-title">Information</h3>
                <ul className='list-unstyled'>
                  <li><Link to="/dashboard">My Account</Link></li>
                  <li><Link to="/signin">Login</Link></li>
                  <li><Link to="/cart">My Cart</Link></li>
                  <li><Link to="">My Wishlist</Link></li>
                  <li><Link to="/shipping">Checkout</Link></li>
                </ul>
              </section>
            </div>
          </div>
          <hr className="hr-light mt-2 margin-bottom-2x" />
          <div className="row">
            <div className="col-md-7 padding-bottom-1x" />
            <div className="col-md-5 padding-bottom-1x">
              <div className="margin-top-1x hidden-md-up" />
              {/*Subscription*/}
              <form className="subscribe-form" action="#" method="post" target="_blank" noValidate>
                <div className="clearfix">
                  <div className="input-group input-light">
                    <input className="form-control" type="email" name="EMAIL" width={100} placeholder="Your e-mail" /><span className="input-group-addon"><i className="icon-mail" /></span>
                  </div>
                  <button className="btn btn-primary mt-2 linkSupport" type="submit">Suscbribe</button>
                </div><span className="form-text text-sm text-white opacity-50 linkSupport">Subscribe to our Newsletter to receive early discount offers, latest news, sales and promo information.</span>
              </form>
            </div>
          </div>
          {/* Copyright*/}
          <p className="footer-copyright"><Link>© All rights reserved.</Link></p>
        </div>
      </footer>

    </>
  )
}

export default Footer