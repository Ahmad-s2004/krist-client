import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link, useParams } from 'react-router-dom'

const SearchProducts = () => {

  const [product, setProduct] = useState([])
  const [loading, setLoading] = useState(true)
  const [local, setLocal] = useState({
    category: "",
    name:""
  })
  const { search } = useParams()

  if(local.category == 'Kids'){
    setLocal.name("getKids")
  }
  if(local.category == 'Men'){
    setLocal.name("getMen")
  }
  if(local.category == 'Women'){
    setLocal.name("getWomen")
  }
  useEffect(() => {
    let fetchData = async () => {
      let res = await fetch(`https://krist-server.vercel.app/product/getProducts?search=${search}`)
      res = await res.json()
      setProduct(res)
      setLoading(false)
    }
    fetchData()
  }, [search])



  let ShowProducts = () => {
    return (
      <div className="container-fluid px-4 mt-4">
        <div className="row">
          {
            product.map(x => {
              return (
                <div className='col-lg-4 col-md-4 col-sm-6 col-12'>
                  <div className="card">
                    <div className="card-img-container">
                      <div className="sale my-auto">{Number(x.salePercent)}%</div>
                      <img src={`https://krist-server.vercel.app//${x.gallery[0].img1}`} className="card-img-top primary" alt="Primary" />
                      <img src={`https://krist-server.vercel.app//${x.gallery[0].img2}`} className="card-img-top secondary" alt="Secondary" />
                      <Link className="button" to={`/${local.name}/${x._id}`}>Quick View</Link>
                    </div>

                    <div className="card-body">
                      <h5 className="card-title d-none d-lg-block h6">{x.title.slice(0, 40)}...</h5>
                      <h5 className="card-title d-block d-lg-none" style={{ fontSize: "0.8rem" }}>{x.title.slice(0, 40)}...</h5>
                      <p className="card-text d-none d-lg-block">Rs. {Math.floor(x.price - x.price / x.salePercent)}{setLocal.category(x.category)}</p>
                      <p className="card-text d-block d-lg-none" style={{ fontSize: "0.8rem" }}>Rs. {Math.floor(x.price - x.price / x.salePercent)}</p>
                    </div>
                  </div>

                </div>
              )
            })
          }
        </div>
      </div>
    )
  }

  let NotFound = () => {
    return (
      <>
        <h5 className='text-center mt-5 py-5' style={{ marginBottom: "300px" }}>Product Not Found</h5>
      </>
    )
  }


  let Loading = () => {
    return (
      <>
        <div className="d-none d-sm-block">
          <div className="d-flex justify-content-center align-items-center" style={{ height: "550px" }}>
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
        <div className="d-block d-sm-none ">
          <div className="d-flex justify-content-center align-items-center" style={{ height: "550px" }}>
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
      <Navbar />
      <div>
        {
          loading ? (
            <Loading />
          ) : product.length === 0 ? (
            <NotFound />
          ) : (
            <ShowProducts />
          )
        }
      </div>
      <Footer />
    </>

  )
}

export default SearchProducts