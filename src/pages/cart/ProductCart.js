import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { useDispatch } from 'react-redux'
import { addToCart, removeFromCart, removeSingleItem, TotalPrice } from '../../redux/sliceReducer'
import { Link } from 'react-router-dom'

const ProductCart = () => {

  let dispatch = useDispatch()
  let data = useSelector(x => x.product)

  const [totalBill, setTotalBill] = useState(0)
  const [totalPrice, setTotalPrice] = useState()

  let handelInc = (product) => {
    dispatch(addToCart({ product, data: product.sizes }))
  }
  let handelRemove = (_id, product) => {
    dispatch(removeFromCart({ _id: product._id, data: product.sizes }))
  }
  let handelDec = (product) => {
    dispatch(removeSingleItem({ product, data: product.sizes }))
  }

  const grandTotal = () => {
    let total = 0;
    data.map(ele => {
      total = ele.price * ele.qnty + total;
    })
    setTotalBill(total)
  }

  useEffect(() => {
    grandTotal()
  }, [grandTotal])

  const formatPrice = (price) => {
    return `${price.toLocaleString()}`;
  };

  const dispatchTotal = () =>{
    dispatch(TotalPrice({totalPrice}))
  }
  console.log(totalPrice)



  return (
    <>
      <Navbar />
      <div className="shoppingcart text-center h4 my-5 py-2 bg-light fw-semibold d-none d-md-block">Shopping Cart</div>
      <div className="shoppingcart text-center h6 my-3 py-2 bg-light fw-semibold d-block d-md-none">Shopping Cart</div>
      <div>
        <div className="container">
          <div className="row d-flex align-items-center mt-3">
            {
              data.map((x) => {
                return (
                  <>
                    <div className="col-lg-5 col-12 d-flex cartPart my-4">
                      <img src={`https://krist-server.vercel.app/${x.gallery[0].img1}`} style={{ width: "100px", height: "100px" }} alt="" />
                      <span className='ps-2 pt-2 cartDetail'>
                        <p className='py-1'>{x.title}</p>
                        <p className='py-1 greyColor'>Color : {x.color[0]}</p>
                        <p className='greyColor'>Size : {x.sizes}</p>
                      </span>
                    </div>
                    <div className="col-lg-7 col-12 cartPart2 cartPart">
                      <div className="row">
                        <div className="col-lg-4 col-md-5 col-sm-5 col-12 cartText"><span className='text-decoration-line-through' style={{ color: "red" }}>Rs. {formatPrice(x.price)}</span><span className='ms-3'>Rs. {formatPrice(Math.floor(x.price - x.price / x.salePercent))}</span></div>
                        <div className="col-lg-4 col-md-4 col-sm-4 incDecBtn1 d-flex justify-content-center">
                          <div className='d-flex justify-content-around ' style={{ border: "1px solid black", borderRadius: "10px", overflow: "hidden", width: "80px" }}>
                            <button className='cartButton' onClick={() => handelInc(x)} style={{ border: "none", background: "white" }}>+</button>
                            <input type="text" value={x.qnty} style={{ width: "30px", border: "none" }} className='cartText text-center me-1' />
                            <button className='cartButton' onClick={() => x.qnty > 1 ? handelDec(x) : handelRemove(x._id, x)} style={{ border: "none", background: "white" }}>-</button>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-4 incDecBtn2  cartText">
                          <div className='d-flex justify-content-around ' style={{ border: "1px solid black", borderRadius: "10px", overflow: "hidden", width: "80px" }}>
                            <button className='cartButton' onClick={() => handelInc(x)} style={{ border: "none", background: "white" }}>+</button>
                            <input type="text" value={x.qnty} style={{ width: "30px", border: "none" }} className='text-center me-1' />
                            <button className='cartButton' onClick={() => x.qnty > 1 ? handelDec(x) : handelRemove(x._id, x)} style={{ border: "none", background: "white" }}>-</button>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-3 col-sm-3 col-12 greyColor cartText">Rs. {formatPrice(x.price * x.qnty)}</div>
                        <div className="d-none">{setTotalPrice(x.price * x.qnty)}</div>
                      </div>
                    </div>
                  </>
                )
              })
            }
          </div>
        </div>
      </div>
      <div className="container my-5">
        <div className="row">
          <div className="col-12 text-center">
            <div className='d-none d-sm-block h5 fw-semibold'>SUBTOTAL : Rs. {formatPrice(totalBill)}</div>
            <div className='d-block d-sm-none h6 fw-semibold'>SUBTOTAL : Rs. {formatPrice(totalBill)}</div>
            <p style={{fontSize:"0.8rem"}} className='d-none d-sm-block'>Tax included and shipping calculated at checkout</p>
            <p style={{fontSize:"0.65rem"}} className='d-block d-sm-none'>Tax included and shipping calculated at checkout</p>
            <Link to='/shipping'><button className='btn btn-dark rounded-5 py-2 px-5 mx-auto d-none d-sm-block' onClick={dispatchTotal()}>CheckOut</button></Link>
            <Link to='/shipping'><button className='btn btn-dark rounded-5 py-2 px-4 mx-auto d-block d-sm-none' onClick={dispatchTotal()} style={{fontSize:"0.8rem"}}>CheckOut</button></Link>
            </div>
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default ProductCart