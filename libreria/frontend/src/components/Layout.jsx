import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Layout({ children }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState('');
  const navigate = useNavigate();

  function submitSearch(e) {
    e && e.preventDefault();
    const term = q.trim();
    navigate(`/catalogo${term ? `?q=${encodeURIComponent(term)}` : ''}`);
    setSearchOpen(false);
  }
  return (
    <>
      <header className="text-primary">
        <div className="max-w-6xl mx-auto py-4 px-4 flex items-center justify-between bg-secondary shadow-md">
          <div className="flex items-center gap-4">
            <img className="w-12 h-12 sm:w-16 sm:h-16 object-contain" src="/images/logo.png" alt="logo de la librería" />
            <h1 className="hidden sm:block font-cinzel text-lg sm:text-2xl md:text-4xl font-bold uppercase tracking-widest drop-shadow-lg">
              <Link to="/" className="no-underline text-primary hover:opacity-90">Antiqua</Link>
            </h1>
          </div>

          {/* Registro icon on header (moved out of nav) */}
          <div className="flex items-center">
            <Link to="/registro" aria-label="Registro" className="text-primary hover:opacity-90">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 sm:w-9 sm:h-9">
                <path d="M12 12a5 5 0 100-10 5 5 0 000 10zm-7 9a7 7 0 0114 0H5z" />
              </svg>
            </Link>
          </div>
        </div>
      </header>

      <nav>
        <div className="max-w-6xl mx-auto py-3 px-4 bg-terciary">
          {/* Mobile: hamburger + dropdown; Desktop: horizontal menu */}
          <NavMenu onToggleSearch={() => setSearchOpen(s => !s)} />

          {/* Search panel shown inside nav container, bottom and centered */}
          {searchOpen && (
            <div className="mt-3 flex justify-center">
              <form onSubmit={submitSearch} className="bg-[#e9e9e9] p-4 rounded-md shadow-sm flex gap-2 items-center w-full max-w-2xl">
                <input
                  autoFocus
                  value={q}
                  onChange={e => setQ(e.target.value)}
                  onKeyDown={e => e.key === 'Escape' && setSearchOpen(false)}
                  placeholder="Buscar libros por título, autor o descripción..."
                  className="flex-1 p-2 border border-[#c8bca9] bg-white"
                />
                <button type="submit" className="px-4 py-2 bg-secondary text-primary">Buscar</button>
                <button type="button" onClick={() => setSearchOpen(false)} className="px-3 py-2 border">Cerrar</button>
              </form>
            </div>
          )}
        </div>
      </nav>

      <main className="bg-primary min-h-screen max-w-6xl mx-auto p-6 sm:p-10">
        {children}
      </main>

      <footer className="text-primary text-center">
        <div className="max-w-6xl mx-auto py-6 px-4 bg-terciary border-t-4 border-secondary">
          <div className="flex justify-center items-center gap-6 mb-4">
            <a href="https://www.facebook.com" aria-label="Facebook">
              <img src="/images/fb.png" alt="Facebook" className="w-8 opacity-70 hover:opacity-100 transition-opacity duration-300" />
            </a>
            <a href="https://www.instagram.com" aria-label="Instagram">
              <img src="/images/ig.png" alt="Instagram" className="w-8 opacity-70 hover:opacity-100 transition-opacity duration-300" />
            </a>
            <a href="https://www.x.com" aria-label="Twitter">
              <img src="/images/tw.png" alt="Twitter" className="w-8 opacity-70 hover:opacity-100 transition-opacity duration-300" />
            </a>
          </div>
          <div className="mt-4">
            <p className="text-sm">&copy; 2025 El Emporio del Lector. Todos los derechos reservados.</p>
            <a href="#" className="text-primary text-xs mx-2 hover:underline">Términos y Condiciones</a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Layout;

function NavMenu({ onToggleSearch }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <div className="flex items-center justify-center">
        {/* Hamburger for mobile */}
        <button
          className="sm:hidden p-2 rounded-md text-primary absolute left-4 top-1/2 -translate-y-1/2"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(o => !o)}
        >
          {open ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {/* Search toggle (right) - visible on all sizes, toggles the panel rendered inside the nav */}
        <button
          className="p-2 rounded-md text-primary absolute right-4 top-1/2 -translate-y-1/2 sm:static sm:translate-y-0 sm:ml-4"
          aria-label="Buscar"
          onClick={() => { onToggleSearch && onToggleSearch(); setOpen(false); }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z" />
          </svg>
        </button>

        {/* Desktop / always-visible menu (hidden on small) */}
        <ul
          className={`${open ? 'block p-4 rounded-md shadow-md w-full' : 'hidden'} sm:flex flex-col sm:flex-row gap-3 sm:gap-8 justify-center items-center`}
        >
          <li className="w-full sm:w-auto">
            <Link to="/" className="block w-full text-center text-primary font-cinzel text-base sm:text-[1.1rem] px-2 py-1 border border-transparent transition-all duration-500 no-underline hover:border-[#F5F5DC]">
              Inicio
            </Link>
          </li>
          <li className="w-full sm:w-auto">
            <Link to="/catalogo/Clasicos" className="block w-full text-center text-primary font-cinzel text-base sm:text-[1.1rem] px-2 py-1 border border-transparent transition-all duration-500 no-underline hover:border-[#F5F5DC]">
              Clasicos
            </Link>
          </li>
          <li className="w-full sm:w-auto">
            <Link to="/catalogo/Novelas" className="block w-full text-center text-primary font-cinzel text-base sm:text-[1.1rem] px-2 py-1 border border-transparent transition-all duration-500 no-underline hover:border-[#F5F5DC]">
              Novelas
            </Link>
          </li>
          <li className="w-full sm:w-auto">
            <Link to="/catalogo/Fantasia" className="block w-full text-center text-primary font-cinzel text-base sm:text-[1.1rem] px-2 py-1 border border-transparent transition-all duration-500 no-underline hover:border-[#F5F5DC]">
              Fantasia
            </Link>
          </li>
          <li className="w-full sm:w-auto">
            <Link to="/catalogo/Poesia" className="block w-full text-center text-primary font-cinzel text-base sm:text-[1.1rem] px-2 py-1 border border-transparent transition-all duration-500 no-underline hover:border-[#F5F5DC]">
              Poesia
            </Link>
          </li>
          <li className="w-full sm:w-auto">
            <Link to="/contacto" className="block w-full text-center text-primary font-cinzel text-base sm:text-[1.1rem] px-2 py-1 border border-transparent transition-all duration-500 no-underline hover:border-[#F5F5DC]">
              Contacto
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}