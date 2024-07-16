import React, {useState} from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
    let history = useNavigate()

  const [errorMessage, setErrorMessage] = useState("")


  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    phone: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((pInp) => ({
      ...pInp,
      [name]: value,
    }));
  }
  
  const sendRequest = async () => {
    try {
      const res = await axios.post('https://krist-server.vercel.app/post/signup', {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
        phone: inputs.phone,
      });
      setErrorMessage(res.data.message)
        if(res.data.message == "User created successfully."){
          setTimeout(() => {
            history("/signin")
          }, 500);
        }
        
      } catch (error) {
        console.log('Axios Error:', error.res.data.message);
        setErrorMessage(error.res.data.message)


    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
     await sendRequest()
  };


  return (

    <div>
      <div className="container text-center">
        <div className="row my-5">
          <form onSubmit={handleSubmit}>
              <div style={{color:"red", fontSize:"13px"}}>{errorMessage}</div>
            <div className="my-2">
              <input
                className="py-1 px-2"
                type="text"
                placeholder="Name"
                name="name"
                value={inputs.name}
                onChange={handleChange}
              />
            </div>
            <div className="my-2">
              <input
                className="py-1 px-2"
                type="email"
                placeholder="Email"
                name="email"
                value={inputs.email}
                onChange={handleChange}
              />
            </div>
            <div className="my-2">
              <input
                className="py-1 px-2"
                type="password"
                placeholder="Password"
                name="password"
                value={inputs.password}
                onChange={handleChange}
              />
            </div>
            <div className="my-2">
              <input
                className="py-1 px-2"
                type="phone"
                placeholder="Phone"
                name="phone"
                value={inputs.phone}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="mx-auto btn btn-dark" style={{width:"100px"}}>
              Submit
            </button>
          </form>
          <div className='text-center mt-3'>
            If already have account.<Link to="/signin">Login</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp