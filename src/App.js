import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Men from './pages/Men'
import Women from './pages/Women'
import Kids from './pages/Kids'
import About from './pages/About'
import Contact from './pages/Contact'
import MenDetail from './pages/MenDetail'
import WomenDetail from './pages/WomenDetail'
import KidsDetail from './pages/KidsDetail'
import SearchProducts from './pages/SearchProducts'
import ProductCart from './pages/cart/ProductCart'
import Shipping from './pages/cart/Shipping'
import Payment from './pages/cart/Payment'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Dashboard from './pages/Dashboard'

const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/men' element={<Men/>}/>
      <Route path='/getMen/:_id' element={<MenDetail/>}/>
      <Route path='/women' element={<Women/>}/>
      <Route path='/getWomen/:_id' element={<WomenDetail/>}/>
      <Route path='/kids' element={<Kids/>}/>
      <Route path='/getKids/:_id' element={<KidsDetail/>}/>
      <Route path='/getProducts/:search' element={<SearchProducts/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/cart' element={<ProductCart/>}/>
      <Route path='/shipping' element={<Shipping/>}/>
      <Route path='/payment' element={<Payment/>}/>
      <Route path='/signin' element={<SignIn/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>

    </Routes>
    </>
  )
}

export default App