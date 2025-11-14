const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

const allBooks = [
  // --- CLÁSICOS ---
  {
    id: 'clasico-1',
    title: 'La Ilíada',
    author: 'Homero',
    description: 'Narra la furia de Aquiles durante la Guerra de Troya. Un texto fundamental sobre el honor, la gloria y la ira.',
    imageUrl: '/images/clasicos/iliada.jpeg',
    altText: 'Portada de La Ilíada',
    section: 'Clasicos',
    featured: true,
  },
  {
    id: 'clasico-2',
    title: 'Edipo Rey',
    author: 'Sófocles',
    description: 'La tragedia griega por excelencia sobre el destino, la culpa y la búsqueda de la verdad a cualquier precio.',
    imageUrl: '/images/clasicos/edipo.jpeg',
    altText: 'Portada de Edipo Rey',
    section: 'Clasicos',
    featured: false,
  },
  {
    id: 'clasico-3',
    title: 'La Eneida',
    author: 'Virgilio',
    description: 'La gran epopeya de Roma que narra el viaje del héroe Eneas desde Troya hasta la fundación de la ciudad.',
    imageUrl: '/images/clasicos/eneida.png',
    altText: 'Portada de La Eneida',
    section: 'Clasicos',
    featured: false,
  },
  {
    id: 'clasico-4',
    title: 'La Metamorfosis',
    author: 'Ovidio',
    description: 'Una colección de más de 250 mitos griegos y romanos, unidos por el tema de la transformación.',
    imageUrl: '/images/clasicos/metamorfosis.jpg',
    altText: 'Portada de La Metamorfosis',
    section: 'Clasicos',
    featured: false,
  },
  {
    id: 'clasico-5',
    title: 'Meditaciones',
    author: 'Marco Aurelio',
    description: 'El diario personal de un emperador romano, considerado el texto más importante de la filosofía estoica.',
    imageUrl: '/images/clasicos/meditaciones.jpg',
    altText: 'Portada de Meditaciones',
    section: 'Clasicos',
    featured: false,
  },
  {
    id: 'clasico-6',
    title: 'Historias',
    author: 'Heródoto',
    description: 'Considerado el primer libro de historia, narra las Guerras Médicas con fascinantes descripciones de pueblos antiguos.',
    imageUrl: '/images/clasicos/historia.png',
    altText: 'Portada de Historias de Heródoto',
    section: 'Clasicos',
    featured: false,
  },

  // --- NOVELAS ---
  {
    id: 'novela-1',
    title: 'El Cuento de Genji',
    author: 'Murasaki Shikibu',
    description: 'Considerada la primera novela de la historia, narra la vida y romances del príncipe Genji en la corte japonesa.',
    imageUrl: '/images/novelas/genji.jpg',
    altText: 'Portada de El Cuento de Genji',
    section: 'Novelas',
    featured: true,
  },
  {
    id: 'novela-2',
    title: 'Lazarillo de Tormes',
    author: 'Anónimo',
    description: 'La obra fundacional de la novela picaresca, donde un joven usa su astucia para sobrevivir a varios amos.',
    imageUrl: '/images/novelas/lazarillo.png',
    altText: 'Portada de Lazarillo de Tormes',
    section: 'Novelas',
    featured: false,
  },
  {
    id: 'novela-3',
    title: 'Don Quijote de la Mancha',
    author: 'Miguel de Cervantes',
    description: 'La primera novela moderna. Una parodia sobre un hidalgo que se cree caballero andante. Explora la locura y el idealismo.',
    imageUrl: '/images/novelas/quijote.avif',
    altText: 'Portada de Don Quijote de la Mancha',
    section: 'Novelas',
    featured: false,
  },
  {
    id: 'novela-4',
    title: 'La Princesa de Cléveris',
    author: 'Madame de La Fayette',
    description: 'Una novela pionera del análisis psicológico, centrada en los conflictos internos de su protagonista en la corte francesa.',
    imageUrl: '/images/novelas/fayette.webp',
    altText: 'Portada de La Princesa de Cléveris',
    section: 'Novelas',
    featured: false,
  },
  {
    id: 'novela-5',
    title: 'Robinson Crusoe',
    author: 'Daniel Defoe',
    description: 'Una de las primeras novelas inglesas. Narra la historia de un náufrago que sobrevive 28 años en una isla desierta.',
    imageUrl: '/images/novelas/crusoe.jpg',
    altText: 'Portada de Robinson Crusoe',
    section: 'Novelas',
    featured: false,
  },
  {
    id: 'novela-6',
    title: 'Las relaciones peligrosas',
    author: 'Choderlos de Laclos',
    description: 'Obra maestra del género epistolar que expone la manipulación y crueldad moral de dos aristócratas libertinos.',
    imageUrl: '/images/novelas/relaciones.jpg',
    altText: 'Portada de Las relaciones peligrosas',
    section: 'Novelas',
    featured: false,
  },

  // --- FANTASÍA ---
  {
    id: 'fantasia-1',
    title: 'La Epopeya de Gilgamesh',
    author: 'Anónimo',
    description: 'El poema narrativo más antiguo. El rey Gilgamesh lucha contra bestias y busca la inmortalidad.',
    imageUrl: '/images/fantasia/epopeya.webp',
    altText: 'Portada de La Epopeya de Gilgamesh',
    section: 'Fantasia',
    featured: true,
  },
  {
    id: 'fantasia-2',
    title: 'Las mil y una noches',
    author: 'Anónimo',
    description: 'Colección de cuentos de Oriente Medio llenos de genios, alfombras voladoras, magia y ciudades perdidas.',
    imageUrl: '/images/fantasia/mil.jpg',
    altText: 'Portada de Las mil y una noches',
    section: 'Fantasia',
    featured: false,
  },
  {
    id: 'fantasia-3',
    title: 'Beowulf',
    author: 'Anónimo',
    description: 'Poema épico anglosajón sobre el héroe Beowulf y sus batallas contra el monstruo Grendel y un dragón.',
    imageUrl: '/images/fantasia/beowulf.webp',
    altText: 'Portada de Beowulf',
    section: 'Fantasia',
    featured: false,
  },
  {
    id: 'fantasia-4',
    title: 'La Muerte de Arturo',
    author: 'Sir Thomas Malory',
    description: 'La recopilación más influyente de las leyendas del Rey Arturo, Merlín, Excalibur y los Caballeros de la Mesa Redonda.',
    imageUrl: '/images/fantasia/arturo.jpg',
    altText: 'Portada de La Muerte de Arturo',
    section: 'Fantasia',
    featured: false,
  },
  {
    id: 'fantasia-5',
    title: 'La Edda Poética',
    author: 'Anónimo',
    description: 'La fuente principal de la mitología nórdica, con las historias de Odín, Thor, Loki y el Ragnarök.',
    imageUrl: '/images/fantasia/edda.webp',
    altText: 'Portada de La Edda Poética',
    section: 'Fantasia',
    featured: false,
  },
  {
    id: 'fantasia-6',
    title: 'Viaje al Oeste',
    author: 'Wu Cheng\'en',
    description: 'Una novela clásica china sobre la peregrinación de un monje a la India acompañado por el Rey Mono y otros seres.',
    imageUrl: '/images/fantasia/viaje.jpg',
    altText: 'Portada de Viaje al Oeste',
    section: 'Fantasia',
    featured: false,
  },
  
  // --- POESÍA ---
  {
    id: 'poesia-1',
    title: 'La Odisea',
    author: 'Homero',
    description: 'El poema épico de aventuras por excelencia, narra el ingenioso y largo viaje de regreso a casa de Odiseo.',
    imageUrl: '/images/poesia/odisea.jpeg',
    altText: 'Portada de La Odisea',
    section: 'Poesia',
    featured: true,
  },
  {
    id: 'poesia-2',
    title: 'La Divina Comedia',
    author: 'Dante Alighieri',
    description: 'Un monumental poema que narra el viaje de su autor por el Infierno, el Purgatorio y el Paraíso.',
    imageUrl: '/images/poesia/divina.webp',
    altText: 'Portada de La Divina Comedia',
    section: 'Poesia',
    featured: false,
  },
  {
    id: 'poesia-3',
    title: 'Coplas a la muerte de su padre',
    author: 'Jorge Manrique',
    description: 'Una de las elegías más hermosas en español. Una serena meditación sobre la vida, la fama y la muerte.',
    imageUrl: '/images/poesia/coplas.jpg',
    altText: 'Portada de Coplas a la muerte de su padre',
    section: 'Poesia',
    featured: false,
  },
  {
    id: 'poesia-4',
    title: 'Sonetos',
    author: 'William Shakespeare',
    description: 'Una colección de 154 sonetos que exploran el amor, la belleza, el paso del tiempo y la mortalidad.',
    imageUrl: '/images/poesia/sonetos.gif',
    altText: 'Portada de Sonetos de Shakespeare',
    section: 'Poesia',
    featured: false,
  },
  {
    id: 'poesia-5',
    title: 'Bucólicas',
    author: 'Virgilio',
    description: 'Colección de poemas pastorales que idealizan la vida en el campo como un refugio de paz y belleza.',
    imageUrl: '/images/poesia/bucolicas.jpeg',
    altText: 'Portada de Bucólicas',
    section: 'Poesia',
    featured: false,
  },
  {
    id: 'poesia-6',
    title: 'Rubaiyat',
    author: 'Omar Jayam',
    description: 'Colección de cuartetas persas que reflexionan con hedonismo y escepticismo sobre el vino, el amor y la vida.',
    imageUrl: '/images/poesia/rubaiyat.jpg',
    altText: 'Portada de Rubaiyat',
    section: 'Poesia',
    featured: false,
  },
];

async function main() {
  console.log('🌱 Iniciando seed de base de datos...');
  
  // 1. Eliminar datos existentes
  await prisma.book.deleteMany({});
  await prisma.user.deleteMany({});
  console.log('🗑️  Datos existentes eliminados');

  // 2. Crear usuario administrador
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@libreria.com',
      password: hashedPassword,
      nombre: 'Admin',
      apellido: 'Libreria',
      role: 'admin',
    }
  });
  console.log('� Usuario admin creado: admin@libreria.com (password: admin123)');

  // 3. Insertar todos los libros asignados al admin
  let inserted = 0;
  for (const book of allBooks) {
    try {
      await prisma.book.create({
        data: {
          id: book.id,
          title: book.title,
          author: book.author,
          description: book.description || '',
          imageUrl: book.imageUrl || '',
          altText: book.altText || '',
          section: book.section,
          featured: book.featured,
          ownerId: adminUser.id, // Todos los libros pertenecen al admin
        }
      });
      inserted++;
      console.log(`  ✅ ${book.title} (${book.section})`);
    } catch (error) {
      console.error(`  ❌ Error insertando ${book.title}:`, error.message);
    }
  }

  console.log(`\n✨ Seed completado: ${inserted}/${allBooks.length} libros insertados`);
  console.log(`📚 Todos los libros pertenecen al usuario admin`);
}

main()
  .catch((e) => {
    console.error('❌ Error en seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
