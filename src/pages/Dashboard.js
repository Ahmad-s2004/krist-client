import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { FaPhoneAlt, FaTrash } from 'react-icons/fa';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';


const Dashboard = () => {
  const [value, setValue] = useState('dashboard');
  const[address, setAddress] = useState([])
  const[addressz, setAddressz] = useState({})
  var adde
  const[user, setUser] = useState({
    email: "",
    name:"",
    password:"",
    phone:"",
  })
  const [showPassword, setShowPassword] = useState(false)

  var fetchedData

  let fetchUserData = async() =>{
    let token = localStorage.getItem('token')
    let res = await fetch('https://krist-server.vercel.app/post/getUser',{
      headers:{
        Authorization : token
      }
    }, { withCredentials: 'include' })
    res = await res.json()
    setUser({
      email: res.findData.email,
      name: res.findData.name,
      password: res.findData.password,
      phone: res.findData.phone,
    });
  }


  let fetchData = async() =>{
    let token = localStorage.getItem('token')
    let res = await fetch('https://krist-server.vercel.app/post/getUserAddress',{
      headers:{
        Authorization : token
      }
    }, { withCredentials: 'include' })
    res = await res.json()
    console.log(res, 'Addresses')
    setAddressz(res)
    adde = res
    console.log(typeof(adde))
    console.log(addressz, 'Addresses')
  }
  const removeAddress = async (id) => {
    try {
        let res = await fetch(`https://krist-server.vercel.app/post/removeAddress/${id}`,{
        method: "delete"
    })
        console.log("Response:", res.data);
        fetchData();
    } catch (error) {
        console.error("Error in removeAddress:", error.response ? error.response.data : error.message, error);
    }
};

let togglePassword = () =>{
  setShowPassword(!showPassword)
}

  useEffect(()=>{
    fetchData()
    fetchUserData()
  },[])
  return (
    <div>
      <Navbar className="sticky-top" />
      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-4 col-md-4 col-12 mb-4">
            <div className='border mt-5'>
              <div className='border px-2 py-1' style={{ cursor: "pointer" }} onClick={() => setValue('dashboard')}>Dashboard</div>
              <div className='border px-2 py-1' style={{ cursor: "pointer" }} onClick={() => setValue('address')}>Addresses</div>
              <div className='border px-2 py-1'>
                <Link style={{ cursor: "pointer", color: "black" }} onClick={() => localStorage.removeItem('token')} to='/'>Logout</Link>
              </div>
            </div>
          </div>
          <div className="col-lg-8 col-md-8 col-12">
            {value === 'dashboard' &&
              <div className='ps-4'>
                <div className="title">Account Details : </div>
                <div className="row mt-4">
                  <div className="col my-3">
                    <div style={{ fontSize: "13px" }}>Name</div>
                    <input type="text" className="form-control" placeholder={user.name || ''}  readOnly aria-label="First name" />
                  </div>
                  <div className="col my-3">
                    <div style={{ fontSize: "13px" }}>Email</div>
                    <input type="email" className="form-control" placeholder={user.email || ''} value={user.email || ''} readOnly aria-label="Last name" />
                  </div>
                </div>
                <div className="row">
                  <div className="col my-3" style={{ position: 'relative' }}>
                    <div style={{ fontSize: "13px" }}>Password</div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="form-control"
                      value={user.password || ''}
                      aria-label="Password"
                    />
                    <button
                      onClick={togglePassword}
                      style={{
                        position: 'absolute',
                        right: '20px',
                        top: '65%',
                        transform: 'translateY(-50%)',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        outline: 'none',
                        padding: '0',
                      }}
                    >
                      <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </button>
                  </div>
                  <div className="col my-3">
                    <div style={{ fontSize: "13px" }}>Phone</div>
                    <input type="text" className="form-control" placeholder={user.phone || ''} readOnly aria-label="Last name" />
                  </div>
                </div>
              </div>
            }
            {value === 'adde' ||
              <div>
                <div className='fw-semibold text-center mb-2'>Address </div>
                <div className="container">
                  <div className="row">
                    {adde.length === 0 ? (
                      <div className="col-12 text-center my-3" style={{ fontSize: "15px", color: "#888" }}>
                        No addresses added
                      </div>
                    ) : (
                      adde.map(x => (
                        <div key={x._id} className="col-12 border m-1 py-1 rounded d-flex justify-content-between align-items-center">
                          <div>
                            <div className='name fw-semibold' style={{ fontSize: "15px" }}>{x.name}</div>
                            <div className='address' style={{ fontSize: "13px" }}>{x.addresses}</div>
                            <div className='phone' style={{ fontSize: "13px" }}>
                              <FaPhoneAlt className='me-1' /> {x.phone}
                            </div>
                          </div>
                          <div>
                            <button className='btn btn-dark' onClick={() => removeAddress(x._id)}>
                              <FaTrash />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
  
}

export default Dashboard;
