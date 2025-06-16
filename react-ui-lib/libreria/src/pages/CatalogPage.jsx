import React from 'react';
import { useParams } from 'react-router-dom';
import { allBooks } from '../data/books'; 
import BookCard from '../components/BookCard'; 

function CatalogPage() {
  const { categoryName } = useParams();

  const filteredBooks = categoryName 
    ? allBooks.filter(book => book.section === categoryName)
    : allBooks;

  const pageTitle = categoryName ? categoryName : 'Nuestro Catálogo';

  return (
    <>
      <div className="text-center mb-12">
        <h1 className="font-cinzel font-bold mb-4 uppercase tracking-wider text-3xl text-left">
          {pageTitle}
        </h1>
      </div>

      <section className="grid grid-cols-4 gap-8">
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