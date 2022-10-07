import { HashRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import LoadingScreen from './components/LoadindScreen'
import MyNavbar from './components/MyNavbar'
import Home from './pages/Home'
import Login from './pages/Login'
import ProductDetail from './pages/ProductDetail'
import Purchases from './pages/Purchases'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getProductThunk } from './store/slices/product.slice'
import { Container } from 'react-bootstrap'
import ProtectedRoutes from './components/ProtectedRoutes'

function App() {

  const isLoading = useSelector(state => state.isLoading)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProductThunk())
  }, [])

  return (
    <div className="App">
      <HashRouter>
        {isLoading && <LoadingScreen />}
        <MyNavbar />
        <Container className='mt-5'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/product/:id' element={<ProductDetail />} />
            <Route path='/login' element={<Login />} />

            <Route element={<ProtectedRoutes />}>
              <Route path='/purchases' element={<Purchases />} />
            </Route>
          </Routes>
        </Container>
      </HashRouter>
    </div>
  )
}

export default App