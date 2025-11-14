import React from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import BookCard from '../components/BookCard';
import { useBooks } from '../context/useBooks';
import { useAuth } from '../context/useAuth';

function CatalogPage() {
  const { books = [], loading, deleteBook } = useBooks();
  const { user } = useAuth();
  const { categoryName } = useParams();
  const navigate = useNavigate();

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const q = params.get('q') || '';

  let filteredBooks = categoryName
    ? books.filter(book => book.section === categoryName)
    : books;

  if (q) {
    const term = q.toLowerCase();
    filteredBooks = filteredBooks.filter(b => (
      b.title.toLowerCase().includes(term) ||
      b.author.toLowerCase().includes(term) ||
      (b.description && b.description.toLowerCase().includes(term))
    ));
  }

  const pageTitle = categoryName ? categoryName : 'Nuestro Catálogo';

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
      <div className="text-center mb-12">
        <h1 className="font-cinzel font-bold mb-4 uppercase tracking-wider text-3xl text-left">
          {pageTitle}
        </h1>
      </div>

      {loading ? (
        <p>Cargando libros...</p>
      ) : (
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredBooks.length > 0 ? (
            filteredBooks.map(book => {
              const isAdmin = user?.role === 'admin';
              const isOwner = user && book.ownerId === user.id;
              const canEdit = isAdmin || isOwner;
              
              return (
                <BookCard
                  key={book.id}
                  title={book.title}
                  author={book.author}
                  description={book.description}
                  imageUrl={book.imageUrl}
                  altText={book.altText}
                  canEdit={canEdit}
                  onDelete={() => handleDelete(book.id, book.title)}
                  onEdit={() => navigate(`/editar/${book.id}`)}
                />
              );
            })
          ) : (
            <p>No se encontraron libros en esta categoría.</p>
          )}
        </section>
      )}

      {/* Botón flotante para agregar libro (solo si está autenticado) */}
      {user && (
        <button
          onClick={() => navigate('/agregar')}
          className="fixed bottom-8 right-8 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-all hover:scale-110 z-50"
          title="Agregar nuevo libro"
          aria-label="Agregar nuevo libro"
        >
          <FaPlus className="text-2xl" />
        </button>
      )}
    </>
  );
}

export default CatalogPage;