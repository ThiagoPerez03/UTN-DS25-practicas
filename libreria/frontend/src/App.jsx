import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import HomePage from './pages/HomePage.jsx';
import CatalogPage from './pages/CatalogPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import AddBookPage from './pages/AddBookPage.jsx';
import { useState } from 'react';
import { allBooks as initialBooks } from './data/books';

function App() {
  const [books, setBooks] = useState(initialBooks);

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage books={books} />} />
          <Route path="/catalogo" element={<CatalogPage books={books} />} />
          <Route path="/catalogo/:categoryName" element={<CatalogPage books={books} />} />
          <Route path="/registro" element={<RegisterPage />} />
          <Route path="/contacto" element={<ContactPage />} />
          <Route path="/agregar" element={<AddBookPage setBooks={setBooks} />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;