import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import BookCard from '../components/BookCard'; 

function CatalogPage({ books = [] }) {
  const { categoryName } = useParams();

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

  return (
    <>
      <div className="text-center mb-12">
        <h1 className="font-cinzel font-bold mb-4 uppercase tracking-wider text-3xl text-left">
          {pageTitle}
        </h1>
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredBooks.length > 0 ? (
          filteredBooks.map(book => (
            <BookCard
              key={book.id}
              title={book.title}
              author={book.author}
              description={book.description}
              imageUrl={book.imageUrl}
              altText={book.altText}
            />
          ))
        ) : (
          <p>No se encontraron libros en esta categoría.</p>
        )}
      </section>
    </>
  );
}

export default CatalogPage;