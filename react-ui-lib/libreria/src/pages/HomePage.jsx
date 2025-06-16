import React from 'react';
import { allBooks } from '../data/books'; 

function HomePage() {
  const featuredBooks = allBooks.filter(book => book.featured);

  return (
    <>
      <div className="flex flex-col gap-12">
        {featuredBooks.map(book => (
          <div key={book.id} className="flex items-center gap-8 p-4 border-2 border-secondary">
            <img
              src={book.imageUrl}
              alt={book.altText}
              className="w-[150px] flex-shrink-0"
            />
            <div className="featured-book-info">
              <p className="font-semibold text-sm text-secondary tracking-widest uppercase mb-1">
                {book.section}
              </p>
              <h3 className="font-cinzel font-bold text-xl uppercase tracking-wider mb-2">{book.title}</h3>
              <p className="italic mb-4">{book.author}</p>
              <p className="text-base">{book.description}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default HomePage;