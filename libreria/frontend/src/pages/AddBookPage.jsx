import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function AddBookPage({ setBooks }) {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const id = `${data.section.toLowerCase()}-${Date.now()}`;
    const newBook = {
      id,
      title: data.title || 'Sin título',
      author: data.author || 'Desconocido',
      description: data.description || '',
      imageUrl: data.imageUrl || '/images/novelas/quijote.avif',
      altText: data.altText || `Portada de ${data.title || 'libro'}`,
      section: data.section || 'Novelas',
      featured: data.featured === 'on' || false,
    };

    setBooks(prev => [newBook, ...prev]);
    reset();
    navigate('/catalogo');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="font-cinzel text-3xl mb-4">Agregar un libro</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <input {...register('title')} placeholder="Título" className="p-2 border" />
        <input {...register('author')} placeholder="Autor" className="p-2 border" />
        <input {...register('section')} placeholder="Sección (Clasicos/Novelas/Fantasia/Poesia)" className="p-2 border" />
        <input {...register('imageUrl')} placeholder="URL imagen (opcional)" className="p-2 border" />
        <input {...register('altText')} placeholder="Alt text" className="p-2 border" />
        <textarea {...register('description')} placeholder="Descripción" className="p-2 border" />
        <label className="flex items-center gap-2">
          <input type="checkbox" {...register('featured')} /> Destacado
        </label>
        <div className="flex gap-2">
          <button type="submit" className="px-4 py-2 bg-secondary text-primary">Agregar</button>
          <button type="button" onClick={() => navigate(-1)} className="px-4 py-2 border">Cancelar</button>
        </div>
      </form>
    </div>
  );
}

export default AddBookPage;
