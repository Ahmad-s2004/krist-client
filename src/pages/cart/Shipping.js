import React, { useEffect, useState } from 'react'
import '../cart/Shipping.css'
import Navbar from '../../components/Navbar'
import { Link } from 'react-router-dom'
import axios from 'axios'


const Shipping = () => {

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postal: "",
    country: "",
  })
  const[product, setProduct] = useState([])
  const[userid, setUserid] = useState('')

  const sendRequest = async () => {
    try {
      const res = await axios.post('https://krist-server.vercel.app/post/getAddress', {
        name: inputs.name,
        email: inputs.email,
        phone: inputs.phone,
        addresses: inputs.address,
        city: inputs.city,
        postal: inputs.postal,
        country: inputs.country,
      }, { withCredentials: true });
      console.log(res, "sucessfull")
    } catch (err) {
      console.error(err);
    }
  };

  let fetchData = async() =>{
    let res = await fetch('https://krist-server.vercel.app/post/getAllAddress')
    res = await res.json()
    setProduct(res)
  }


  useEffect(()=>{
    fetchData()
  },[])
  let handelChange = (e) => {
    const { name, value } = e.target;
    setInputs(x => ({
      ...x,
      [name]: value
    }))
  }
  let handelSubmit = (e) => {
    e.preventDefault();
    sendRequest()
  }
  let sendId = (x) =>{
    setUserid(x._id)

  }


  return (
    <div>
      <Navbar />
      <div className='mt-4'>
        <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
        <div className="container">
          <div className="row">
            <div className="col-xl-8">
              <div className="card">
                <div className="card-body">
                  <ol className="activity-checkout mb-0 px-4 mt-3">
                    <li className="checkout-">
                      <div className="feed-item-list">
                        <div>
                          <h5 className="font-size-16 mb-1">Billing Info</h5>
                          <p className="text-muted text-truncate mb-4">Add a new address</p>
                          <div className="mb-3">
                            <form onSubmit={handelSubmit}>
                              <div>
                                <div className="row">
                                  <div className="col-lg-4">
                                    <div className="mb-3">
                                      <label className="form-label" htmlFor="billing-name">Name</label>
                                      <input type="text" className="form-control" name='name' onChange={handelChange} id="billing-name" placeholder="Enter name" />
                                    </div>
                                  </div>
                                  <div className="col-lg-4">
                                    <div className="mb-3">
                                      <label className="form-label" htmlFor="billing-email-address">Email Address</label>
                                      <input type="email" className="form-control" name='email' onChange={handelChange} id="billing-email-address" placeholder="Enter email" />
                                    </div>
                                  </div>
                                  <div className="col-lg-4">
                                    <div className="mb-3">
                                      <label className="form-label" htmlFor="billing-phone">Phone</label>
                                      <input type="text" className="form-control" name='phone' onChange={handelChange} id="billing-phone" placeholder="Enter Phone no." />
                                    </div>
                                  </div>
                                </div>
                                <div className="mb-3">
                                  <label className="form-label" htmlFor="billing-address">Address</label>
                                  <textarea className="form-control" id="billing-address" name='address' onChange={handelChange} rows={3} placeholder="Enter full address" defaultValue={""} />
                                </div>
                                <div className="row">
                                  <div className="col-lg-4">
                                    <div className="mb-4 mb-lg-0">
                                      <label className="form-label">Country</label>
                                      <input type="text" name='country' onChange={handelChange} className='form-control' placeholder='Enter Country' />
                                    </div>
                                  </div>
                                  <div className="col-lg-4">
                                    <div className="mb-4 mb-lg-0">
                                      <label className="form-label" htmlFor="billing-city">City</label>
                                      <input type="text" className="form-control" id="billing-city" name='city' onChange={handelChange} placeholder="Enter City" />
                                    </div>
                                  </div>
                                  <div className="col-lg-4">
                                    <div className="mb-0">
                                      <label className="form-label" htmlFor="zip-code">Zip / Postal code</label>
                                      <input type="text" className="form-control" id="zip-code" name='postal' onChange={handelChange} placeholder="Enter Postal code" />
                                    </div>
                                  </div>
                                  <button type="submit" className="mt-2 ms-2 btn btn-dark" onClick={()=>sendRequest()} style={{ width: "100px" }}>
                                    Submit
                                  </button>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="checkout-itm">
                      <div className="feed-item-list">
                        <div>
                          <h5 className="font-size-16 mb-1">Shipping Info</h5>
                          <p className="text-muted text-truncate mb-4">Select a delivery address</p>
                          <div className="mb-3">
                            <div className="row">
                              {
                                product.map((x, i)=>{
                                  return(
                                    <div className="col-lg-4 col-sm-6">
                                <div data-bs-toggle="collapse">
                                  <label className="card-radio-label mb-0" onClick={()=>sendId(x)}>
                                    <input type="radio" name="address" id="info-address1" className="card-radio-input" defaultChecked />
                                    <div className="card-radio text-truncate p-3">
                                      <span className="fs-14 mb-2 d-block">Address {i+1}</span>
                                      <span className="fs-14 mb-2 d-block">{x.name}</span>
                                      <span className="text-muted fw-normal text-wrap mb-1 d-block">{x.addresses}</span>
                                      <span className="text-muted fw-normal d-block">Mo. {x.phone}</span>
                                    </div>
                                  </label>
                                </div>
                              </div>
                                  )
                                })
                              }
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="checkout-iem">
                    </li>
                  </ol>
                </div>
              </div>
              <div className="row my-4">
                <div className="col">
                  <a href="ecommerce-products.html" className="btn btn-link text-muted">
                    <i className="mdi mdi-arrow-left me-1" /> Continue Shopping </a>
                </div> {/* end col */}
                <div className="col">
                  <div className="text-end mt-2 mt-sm-0">
                    <Link to="/payment" className="btn btn-success">
                      <i className="mdi mdi-cart-outline me-1" /> Procced </Link>
                  </div>
                </div> {/* end col */}
              </div> {/* end row*/}
            </div>
            <div className="col-xl-4">
              <div className="card checkout-order-summary">
                <div className="card-body">
                  <div className="p-3 bg-light mb-3 rounded-2">
                    <span className="font-size-16 mb-0 fw-bold">SubTotal </span><span className="float-end ms-2">#MN0124</span>
                  </div>
                  <div className="table-responsive">
                    <table className="table table-centered mb-0 table-nowrap">

                      <tbody>

                        <tr>
                          <td colSpan={2}>
                            <div className="font-size-14 m-0 h6">Discount :</div>
                          </td>
                          <td>
                            asdasd
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={2}>
                            <h6 className="font-size-14 m-0">Shipping Charge :</h6>
                          </td>
                          <td>
                            Rs. 400
                          </td>
                        </tr>
                        <tr className="bg-light">
                          <td colSpan={2}>
                            <h6 className="font-size-14 m-0">Total:</h6>
                          </td>
                          <td>
                            Rs. 745.2
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* end row */}
        </div>
      </div>

    </div>
  )
}

export default Shipping