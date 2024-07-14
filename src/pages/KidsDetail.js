import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch } from 'react-redux';
import {addToCart} from '../redux/sliceReducer'


const KidsDetail = () => {

    const { _id } = useParams()
    const [product, setProduct] = useState({})
    const [data, setData] = useState("2-3")
    const [loading, setLoading] = useState(false)
    let dispatch = useDispatch()


    let fetchData = async () => {
        let res = await fetch(`http://localhost:5050/product/getKids/${_id}`)
        res = await res.json()
        setProduct(res)
        setLoading(true)
    }
    useEffect(() => {
        fetchData()
    }, [])

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrow:false
    };
    const handleSizeClick = (size) => {
        setData(size);
    };


    let dispatchData = (product, data) =>{
        dispatch(addToCart({product, data}))
    }
    return (
        <>
       {
        loading?
        <div>
        <Navbar />
        <div className="container-fluid px-5">
            <div className="row my-5">
                <div className="col-lg-6 col-md-6 col-12 ps-3">
                    <Slider {...settings}>
                        <div>
                            {product.gallery ? <img src={`http://localhost:5050/${product.gallery[0].img1}`} alt="" /> : null}
                        </div>
                        <div>
                            {product.gallery ? <img src={`http://localhost:5050/${product.gallery[0].img2}`} alt="" /> : null}

                        </div>
                    </Slider>
                </div>
                <div className="col-lg-6 col-md-6 col-12 mt-5">
                    <div className="title h5 d-none d-lg-block">{product.title}</div>
                    <div className="title h6 d-block d-lg-none">{product.title}</div>
                    <div className="price h5 d-none d-lg-block mt-3"><span className='text-decoration-line-through'>Rs. {product.price}</span> <span style={{ color: "red" }}>Rs. {Math.floor(product.price - product.price / product.salePercent)}</span></div>
                    <div className="price h6 d-block d-lg-none mt-3"><span className='text-decoration-line-through'>Rs. {product.price}</span> <span style={{ color: "red" }}>Rs. {Math.floor(product.price - product.price / product.salePercent)}</span></div>
                    <p className='pe-2 mt-4' style={{fontSize:"0.8rem"}}>{product.description}</p>
                    <div className="d-none d-lg-block my-2">
                        {product.color && product.color.length > 0 &&
                            <div className='fw-semibold'>
                                Color: {product.color.map((color, index) => (
                                    <span key={index} className='text-uppercase'>{color}</span>
                                ))}
                            </div>
                        }
                    </div>
                    <div className="d-block d-lg-none my-2 "  style={{fontSize:"0.9rem"}}>
                        {product.color && product.color.length > 0 &&
                            <div className='fw-semibold'>
                                Color: {product.color.map((color, index) => (
                                    <span key={index} className='text-uppercase'>{color}</span>
                                ))}
                            </div>
                        }
                    </div>
                    <div className="d-none d-lg-block">
                        {product.size && product.size.length > 0 &&
                            <div><span className='fw-semibold'>Size</span>: <span className='text-capitalize fw-semibold'>{data} years</span>
                                <div>
                                    {product.size.map((x, index) => (
                                        <span key={index} className='text-uppercase me-2 btn btn-outline-dark rounded-4 my-2' onClick={() => handleSizeClick(x)} style={{ cursor: 'pointer' }}>{x} years</span>
                                    ))}
                                </div>
                            </div>
                        }
                    </div>
                    <div className="d-block d-lg-none" style={{fontSize:"0.9rem"}}>
                        {product.size && product.size.length > 0 &&
                            <div><span className='fw-semibold'>Size</span>: <span className='text-capitalize fw-semibold'>{data}</span>
                                <div>
                                    {product.size.map((x, index) => (
                                        <span key={index}  style={{fontSize:"0.7rem", cursor: 'pointer'}} className='text-uppercase me-2 btn btn-outline-dark rounded-4 my-2' onClick={() => handleSizeClick(x)}>{x}</span>
                                    ))}
                                </div>
                            </div>
                        }
                    </div>

                    <button className="btn btn-dark mt-5 px-3 py-2 fw-semibold" onClick={()=>dispatchData(product, data)}>Add to Cart</button>

                </div>
            </div>
        </div>
        <Footer/>
    </div>
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

export default KidsDetail