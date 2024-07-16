import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { FaPhoneAlt, FaTrash } from 'react-icons/fa';
import axios from 'axios'


const Dashboard = () => {
  const [value, setValue] = useState('dashboard');
  const[address, setAddress] = useState([])


  let fetchData = async() =>{
    let res = await fetch('https://krist-server.vercel.app/post/getAllAddress')
    res = await res.json()
    setAddress(res)
  }

  const removeAddress = async (req, res) => {
    const { _id } = req.params;
    console.log(_id, "ID");
    try {
        const fetchedData = await address.deleteOne({ _id });
        if (fetchedData.deletedCount === 0) {
            return res.status(404).json({ message: "Address not found" });
        }
        return res.status(200).json({ message: "Removed" });
    } catch (error) {
        console.error("Error in removeAddress:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

  useEffect(()=>{
    fetchData()
  },[])
  return (
    <div>
      <Navbar className="sticky-top" />
      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-4 col-md-4 col-12 mb-4">
            <div className='border mt-5'>
              <div className='border px-2 py-1' style={{cursor:"pointer"}} onClick={() => setValue('dashboard')}>Dashboard</div>
              <div className='border px-2 py-1' style={{cursor:"pointer"}} onClick={() => setValue('address')}>Addresses</div>
              <div className='border px-2 py-1'>
                <Link style={{cursor:"pointer", color:"black"}}  onClick={() => localStorage.removeItem('token')} to='/'>Logout</Link>
              </div>
            </div>
          </div>
          <div className="col-lg-8 col-md-8 col-12">
            {value === 'dashboard' &&
              <div className='ps-4'>
                <div className="title">Account Details : </div>
                <div className="row mt-4">
                  <div className="col my-3">
                    <div style={{fontSize:"13px"}}>Name</div>
                    <input type="text" className="form-control" placeholder="First name" value='Ahmad Amman' readOnly aria-label="First name" />
                  </div>
                  <div className="col my-3">
                    <div style={{fontSize:"13px"}}>Email</div>
                    <input type="email" className="form-control" placeholder="Last name" value='ahmad@gmail.com' readOnly aria-label="Last name" />
                  </div>
                </div>
                <div className="row">
                  <div className="col my-3">
                    <div style={{fontSize:"13px"}}>Password</div>
                    <input type="password" className="form-control" placeholder="First name" value='ahmad' readOnly aria-label="First name" />
                  </div>
                  <div className="col my-3">
                    <div style={{fontSize:"13px"}}>Phone</div>
                    <input type="text" className="form-control" placeholder="Last name" value='03010875529' readOnly aria-label="Last name" />
                  </div>
                </div>

              </div>
            }
            {value === 'address' &&
              <div>
                <div className='fw-semibold text-center mb-2'>Address </div>
                <div className="container">
                  <div className="row">
                    {
                      address.map(x=>{
                        return(
                          <>
                          <div className="col-12 border m-1 py-1 rounded d-flex justify-content-between align-items-center">
                            <div>
                        <div className='name fw-semibold' style={{fontSize:"15px"}}>{x.name}</div>
                        <div className='address' style={{fontSize:"13px"}} >{x.addresses}</div>
                        <div className='phone' style={{fontSize:"13px"}}><FaPhoneAlt className='me-1'/> {x.phone}</div>
                            </div>
                      <div><button className='btn btn-dark ' onClick={()=>removeAddress(x._id)}><FaTrash/></button></div>
                      </div>
                          </>
                        )
                      })
                    }
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
