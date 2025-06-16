import React from 'react';
import { Link } from 'react-router-dom';

function Layout({ children }) {
  return (
    <>
      <header className="bg-secondary text-primary text-center py-5 px-2 shadow-md w-6xl content-center mx-auto p-10">
        <div className="flex justify-center">
          <img className="w-24 h-24 object-contain" src="/images/logo.png" alt="logo de la librería"/>
        </div>
        <h1 className="font-cinzel md:text-5xl font-bold uppercase tracking-widest drop-shadow-lg">
          Liberia Antiguitos
        </h1>
      </header>

      <nav className="bg-terciary py-2 w-6xl content-center mx-auto p-10">
        <ul className="list-none flex gap-8 justify-center">
          <li>
            <Link to="/" className="text-primary font-cinzel text-[1.1rem] px-2 py-1 border border-transparent transition-all duration-500 no-underline hover:border-[#F5F5DC]">
              Inicio
            </Link>
          </li>
          <li>
            <Link to="/catalogo/Clasicos" className="text-primary font-cinzel text-[1.1rem] px-2 py-1 border border-transparent transition-all duration-500 no-underline hover:border-[#F5F5DC]">
              Clasicos
            </Link>
          </li>
          <li>
            <Link to="/catalogo/Novelas" className="text-primary font-cinzel text-[1.1rem] px-2 py-1 border border-transparent transition-all duration-500 no-underline hover:border-[#F5F5DC]">
              Novelas
            </Link>
          </li>
          <li>
            <Link to="/catalogo/Fantasia" className="text-primary font-cinzel text-[1.1rem] px-2 py-1 border border-transparent transition-all duration-500 no-underline hover:border-[#F5F5DC]">
              Fantasia
            </Link>
          </li>
          <li>
            <Link to="/catalogo/Poesia" className="text-primary font-cinzel text-[1.1rem] px-2 py-1 border border-transparent transition-all duration-500 no-underline hover:border-[#F5F5DC]">
              Poesia
            </Link>
          </li>
          <li>
            <Link to="/registro" className="text-primary font-cinzel text-[1.1rem] px-2 py-1 border border-transparent transition-all duration-500 no-underline hover:border-[#F5F5DC]">
              Registro
            </Link>
          </li>
          <li>
            <Link to="/contacto" className="text-primary font-cinzel text-[1.1rem] px-2 py-1 border border-transparent transition-all duration-500 no-underline hover:border-[#F5F5DC]">
              Contacto
            </Link>
          </li>
        </ul>
      </nav>

      <main className="bg-primary min-h-screen w-6xl content-center mx-auto p-10">
        {children}
      </main>

      <footer className="bg-terciary text-primary text-center py-6 border-t-4 border-secondary w-6xl content-center mx-auto p-10">
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
      </footer>
    </>
  );
}

export default Layout;