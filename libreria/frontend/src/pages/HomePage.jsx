import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import { useBooks } from '../context/useBooks';
import { useAuth } from '../context/useAuth';

function HomePage() {
  const { books = [], loading, deleteBook } = useBooks();
  const { user } = useAuth();
  const navigate = useNavigate();
  const featuredBooks = books.filter(book => book.featured);

  const handleDelete = async (bookId, bookTitle) => {
    if (window.confirm(`¿Estás seguro de eliminar "${bookTitle}"?`)) {
      try {
        await deleteBook(bookId);
        alert('Libro eliminado exitosamente');
      } catch (error) {
        console.error('Error eliminando libro:', error);
        alert('Error al eliminar el libro. Por favor intenta de nuevo.');
      }
    }
  };

  return (
    <>
      <div className="flex flex-col gap-12">
        {loading ? (
          <p>Cargando destacados...</p>
        ) : (
          <>
            {featuredBooks.map(book => {
              const isAdmin = user?.role === 'admin';
              const isOwner = user && book.ownerId === user.id;
              const canEdit = isAdmin || isOwner;
              
              return (
                <FeaturedBookCard
                  key={book.id}
                  book={book}
                  canEdit={canEdit}
                  onDelete={() => handleDelete(book.id, book.title)}
                  onEdit={() => navigate(`/editar/${book.id}`)}
                />
              );
            })}
          </>
        )}
      </div>
    </>
  );
}

// Componente separado para los libros destacados con menú desplegable
function FeaturedBookCard({ book, canEdit, onDelete, onEdit }) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  // Cerrar el menú al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    }

    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showMenu]);

  return (
    <div className="flex flex-col md:flex-row items-center gap-8 p-4 border-2 border-secondary relative">
      {/* Menú desplegable */}
      {canEdit && (
        <div className="absolute top-4 right-4 z-10" ref={menuRef}>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 bg-secondary text-white rounded-full hover:bg-secondary/90 transition-colors shadow-md"
            title="Opciones"
            aria-label="Opciones del libro"
          >
            <FaPencilAlt className="text-sm" />
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-md shadow-lg">
              <button
                onClick={() => {
                  setShowMenu(false);
                  onEdit && onEdit();
                }}
                className="w-full px-4 py-2 text-left text-sm hover:bg-secondary/10 flex items-center gap-2 text-secondary border-b"
              >
                <FaPencilAlt />
                <span>Editar</span>
              </button>
              <button
                onClick={() => {
                  setShowMenu(false);
                  onDelete && onDelete();
                }}
                className="w-full px-4 py-2 text-left text-sm hover:bg-red-50 flex items-center gap-2 text-red-600"
              >
                <FaTrashAlt />
                <span>Eliminar</span>
              </button>
            </div>
          )}
        </div>
      )}

      <img
        src={book.imageUrl}
        alt={book.altText}
        className="w-full md:w-[150px] h-64 md:h-auto object-cover flex-shrink-0"
      />
      <div className="featured-book-info flex-1">
        <p className="font-semibold text-sm text-secondary tracking-widest uppercase mb-1">
          {book.section}
        </p>
        <h3 className="font-cinzel font-bold text-xl uppercase tracking-wider mb-2">{book.title}</h3>
        <p className="italic mb-4">{book.author}</p>
        <p className="text-base">{book.description}</p>
      </div>
    </div>
  );
}

export default HomePage;