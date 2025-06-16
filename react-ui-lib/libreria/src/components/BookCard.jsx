import React from 'react';

function BookCard({ title, author, description, imageUrl, altText }) {
  return (
    <div className="text-center border border-[#c8bca9] p-4 bg-[#fdfaf2]">
      <img
        src={imageUrl}
        alt={altText}
        className="w-[180px] h-[270px] object-cover mb-4 border border-[#3D2B1F] mx-auto"
      />
      <h3 className="font-cinzel font-bold text-[1.2rem] uppercase tracking-wider mb-4">{title}</h3>
      <p className="font-cinzel mb-2">{author}</p>
      <p className="text-base">{description}</p>
    </div>
  );
}

export default BookCard;