import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import HomePage from './pages/HomePage.jsx';
import CatalogPage from './pages/CatalogPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import AddBookPage from './pages/AddBookPage.jsx';
import { BooksProvider } from './context/BooksContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import LoginPage from './pages/LoginPage.jsx';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <BooksProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/catalogo" element={<CatalogPage />} />
              <Route path="/catalogo/:categoryName" element={<CatalogPage />} />
              <Route path="/registro" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/contacto" element={<ContactPage />} />
              <Route path="/agregar" element={<AddBookPage />} />
            </Routes>
          </Layout>
        </BooksProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;