import React from 'react';

function BookCard({ title, author, description, imageUrl, altText }) {
  return (
    <div className="text-center border border-[#c8bca9] p-4 bg-[#fdfaf2] max-w-sm mx-auto">
      <img
        src={imageUrl}
        alt={altText}
        className="w-[180px] h-[270px] mx-auto mb-4 border border-[#3D2B1F] object-cover sm:w-full sm:h-64 md:h-80"
      />
      <h3 className="font-cinzel font-bold text-lg sm:text-[1.2rem] uppercase tracking-wider mb-4">{title}</h3>
      <p className="font-cinzel mb-2">{author}</p>
      <p className="text-base">{description}</p>
    </div>
  );
}

export default BookCard;