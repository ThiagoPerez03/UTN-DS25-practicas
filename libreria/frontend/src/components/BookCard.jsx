import React, { useState, useEffect, useRef } from 'react';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';

function BookCard({ title, author, description, imageUrl, altText, canEdit, onDelete, onEdit }) {
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
    <div className="text-center border border-[#c8bca9] p-4 bg-[#fdfaf2] max-w-sm mx-auto relative">
      {/* Botón de lápiz en la esquina superior derecha */}
      {canEdit && (
        <div className="absolute top-2 right-2" ref={menuRef}>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 bg-secondary text-white rounded-full hover:bg-secondary/90 transition-colors shadow-md"
            title="Opciones"
            aria-label="Opciones del libro"
          >
            <FaPencilAlt className="text-sm" />
          </button>

          {/* Menú desplegable */}
          {showMenu && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-md shadow-lg z-10">
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
        src={imageUrl}
        alt={altText}
        className="w-[180px] h-[270px] mx-auto mb-4 border border-[#3D2B1F] object-cover sm:w-full sm:h-64 md:h-80"
      />
      <h3 className="font-cinzel font-bold text-lg sm:text-[1.2rem] uppercase tracking-wider mb-4">{title}</h3>
      <p className="font-cinzel mb-2">{author}</p>
      <p className="text-base mb-4">{description}</p>
    </div>
  );
}

export default BookCard;