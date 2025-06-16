import { BrowserRouter, Routes, Route } from 'react-router-dom' ;
import Layout from './components/Layout' ;
import HomePage from './pages/HomePage' ;
import CatalogPage from './pages/CatalogPage' ;
import ContactPage from './pages/ContactPage' ;
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <>
      <div className="bg-[url(../public/images/fondo.jpg)] min-h-screen">
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/contacto" element={<ContactPage />} />
              <Route path="/registro" element={<RegisterPage />} />
              <Route path="/catalogo" element={<CatalogPage />} />
              <Route path="/catalogo/:categoryName" element={<CatalogPage />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App