import Header from '/Users/thia/Desktop/Desarrollo 2025/UTN-DS25-practicas/react/my-app/src/coponents/header.jsx';
import Nav from '/Users/thia/Desktop/Desarrollo 2025/UTN-DS25-practicas/react/my-app/src/coponents/nav.jsx';
import FeaturedBookSection from '/Users/thia/Desktop/Desarrollo 2025/UTN-DS25-practicas/react/my-app/src/coponents/featureBook.jsx';
import Footer from '/Users/thia/Desktop/Desarrollo 2025/UTN-DS25-practicas/react/my-app/src/coponents/footer.jsx';
import './styles.css'; 


const featuredBooks = [
  {
    sectionTitle: "Clásicos",
    link: "#",
    imageUrl: "/images/clasicos/iliada.jpeg", 
    altText: "Libro destacado de clásicos",
    bookTitle: "La Ilíada",
    author: "Homero",
    description: "Poema épico que narra el décimo año de la Guerra de Troya, centrándose en la furia del héroe Aquiles."
  },
  {
    sectionTitle: "Novelas",
    link: "#",
    imageUrl: "/images/novelas/genji.jpg",
    altText: "Libro destacado de novelas",
    bookTitle: "El Cuento de Genji",
    author: "Murasaki Shikibu",
    description: "Considerada por muchos como la primera novela de la historia. Narra la vida y los romances del príncipe Hikaru Genji."
  },
  {
    sectionTitle: "Fantasia",
    link: "#",
    imageUrl: "/images/fantasia/epopeya.webp",
    altText: "Libro destacado de fantasia",
    bookTitle: "La Epopeya de Gilgamesh",
    author: "Anónimo",
    description: "La obra literaria más antigua. Narra las aventuras del rey Gilgamesh y su búsqueda de la inmortalidad."
  },
  {
    sectionTitle: "Poesia",
    link: "#",
    imageUrl: "/images/poesia/odisea.jpeg",
    altText: "Libro destacado de poesia",
    bookTitle: "La Odisea",
    author: "Homero",
    description: "Epopeya poética que narra el arduo viaje de regreso del héroe Odiseo, llena de monstruos y maravillas."
  }
];

function App() {
  return (
    <div className="container">
      <Header />
      <Nav />
      <main>
        {featuredBooks.map((book, index) => (
          <FeaturedBookSection
            key={index} // key es importante para React al renderizar listas
            title={book.sectionTitle}
            link={book.link}
            imageUrl={book.imageUrl}
            altText={book.altText}
            bookTitle={book.bookTitle}
            author={book.author}
            description={book.description}
          />
        ))}
      </main>
      <Footer />
    </div>
  );
}

export default App;