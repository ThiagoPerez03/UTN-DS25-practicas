import React from 'react';

function FeaturedBookSection({ title, link, imageUrl, altText, bookTitle, author, description }) {
  return (
    <section className="generos">
      <h2><a href={link}>{title}</a></h2>
      <div className="featured-book">
        <img src={imageUrl} alt={altText} />
        <div className="featured-book-info">
          <h3>{bookTitle}</h3>
          <p className="author">{author}</p>
          <p>{description}</p>
        </div>
      </div>
    </section>
  );
}

export default FeaturedBookSection;