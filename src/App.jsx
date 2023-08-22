import './App.css'
import Navbar from './components/general/Navbar'
import MainRoutes from './routes/MainRoutes'
import Footer from './components/general/Footer'

function App() {
//FALTA PROTEGER RUTAS
  return (
    <>
      <Navbar />
      <MainRoutes />
      <Footer />
    </>
  )
}

export default App
