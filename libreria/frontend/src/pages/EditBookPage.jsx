import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { useBooks } from '../context/useBooks';
import { useAuth } from '../context/useAuth';

const schema = yup.object({
  title: yup.string().required('El título es obligatorio').min(2, 'El título debe tener al menos 2 caracteres'),
  author: yup.string().required('El autor es obligatorio').min(2, 'El autor debe tener al menos 2 caracteres'),
  section: yup.string().required('La sección es obligatoria'),
  description: yup.string(),
  imageUrl: yup.string().nullable(), // Removida validación de URL para permitir rutas locales
  altText: yup.string(),
  featured: yup.boolean().default(false),
}).required();

function EditBookPage() {
  const { id } = useParams();
  const { books, updateBook, fetchBooks } = useBooks();
  const { user, token } = useAuth();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const isAdmin = user?.role === 'admin';

  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const book = books.find(b => b.id === id);
    if (book) {
      setValue('title', book.title);
      setValue('author', book.author);
      setValue('section', book.section);
      setValue('description', book.description || '');
      setValue('imageUrl', book.imageUrl || '');
      setValue('altText', book.altText || '');
      setValue('featured', book.featured || false);
      setLoading(false);
    } else {
      // Si no se encuentra el libro, redirigir
      navigate('/catalogo');
    }
  }, [id, books, setValue, navigate]);

  const onSubmit = async (data) => {
    const updatedBook = {
      title: data.title,
      author: data.author,
      description: data.description || '',
      imageUrl: data.imageUrl || '/images/novelas/quijote.avif',
      altText: data.altText || `Portada de ${data.title}`,
      section: data.section,
      featured: !!data.featured,
    };

    try {
      await updateBook(id, updatedBook);
      alert('Libro actualizado exitosamente');
      navigate('/catalogo');
    } catch (error) {
      // Si es error 409, significa que ya hay un libro destacado
      if (error.response?.status === 409 && error.response?.data?.existingBook) {
        const existingBook = error.response.data.existingBook;
        const replace = window.confirm(
          `Ya existe el libro destacado "${existingBook.title}" en la categoría ${data.section}.\n\n¿Deseas reemplazarlo con "${data.title}"?`
        );
        
        if (replace) {
          // Ahora reemplazar el destacado
          try {
            console.log('Token:', token ? 'Existe' : 'No existe');
            console.log('Reemplazando:', { oldBookId: existingBook.id, newBookId: id });
            
            const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/books/replace-featured`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify({
                oldBookId: existingBook.id,
                newBookId: id
              })
            });

            console.log('Response status:', response.status);
            
            if (!response.ok) {
              const errorData = await response.json();
              console.error('Error del servidor:', errorData);
              
              // Manejar token inválido
              if (errorData.message === 'Invalid token' || errorData.message === 'Missing token') {
                alert('Tu sesión ha expirado o el token es inválido. Por favor, cierra sesión y vuelve a iniciar sesión.');
                navigate('/login');
                return;
              }
              
              throw new Error(errorData.message || 'Error reemplazando libro destacado');
            }
            
            // Refrescar los libros para mostrar el cambio
            await fetchBooks();
            
            alert('Libro marcado como destacado exitosamente');
            navigate('/catalogo');
          } catch (replaceError) {
            console.error('Error reemplazando destacado:', replaceError);
            
            // Si el error ya fue manejado (token inválido), no mostrar alerta adicional
            if (replaceError.message && (replaceError.message.includes('sesión') || replaceError.message.includes('token'))) {
              return;
            }
            
            alert('Error al reemplazar el libro destacado. Por favor intenta de nuevo.');
          }
        }
      } else {
        console.error('Error actualizando libro:', error);
        alert(error.response?.data?.message || 'Error al actualizar el libro. Por favor intenta de nuevo.');
      }
    }
  };

  if (loading) {
    return <div className="text-center">Cargando...</div>;
  }

  return (
    <>
      <h1 className="font-cinzel font-bold mb-8 uppercase tracking-wider text-3xl text-left">
        Editar Libro
      </h1>
      <div className="max-w-3xl mx-auto p-8 border border-[#3D2B1F] bg-[#F5F5DC]">
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
          <div>
            <input 
              {...register('title')} 
              placeholder="Título *" 
              className="w-full p-3 border border-[#c8bca9] bg-white font-lora text-base" 
            />
            {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>}
          </div>

        <div>
          <input 
            {...register('author')} 
            placeholder="Autor *" 
            className="w-full p-3 border border-[#c8bca9] bg-white font-lora text-base" 
          />
          {errors.author && <p className="text-red-600 text-sm mt-1">{errors.author.message}</p>}
        </div>

        <div>
          <label className="block">
            <span className="block mb-2 font-cinzel font-semibold">Sección *</span>
            <select {...register('section')} className="w-full p-3 border border-[#c8bca9] bg-white font-lora text-base">
              <option value="Clasicos">Clasicos</option>
              <option value="Novelas">Novelas</option>
              <option value="Fantasia">Fantasia</option>
              <option value="Poesia">Poesia</option>
            </select>
          </label>
          {errors.section && <p className="text-red-600 text-sm mt-1">{errors.section.message}</p>}
        </div>

        <div>
          <input 
            {...register('imageUrl')} 
            placeholder="URL imagen (opcional)" 
            className="w-full p-3 border border-[#c8bca9] bg-white font-lora text-base" 
          />
          {errors.imageUrl && <p className="text-red-600 text-sm mt-1">{errors.imageUrl.message}</p>}
        </div>

        <div>
          <input 
            {...register('altText')} 
            placeholder="Texto alternativo para la imagen" 
            className="w-full p-3 border border-[#c8bca9] bg-white font-lora text-base" 
          />
          {errors.altText && <p className="text-red-600 text-sm mt-1">{errors.altText.message}</p>}
        </div>

        <div>
          <textarea 
            {...register('description')} 
            placeholder="Descripción del libro" 
            className="w-full p-3 border border-[#c8bca9] bg-white font-lora text-base h-32 resize-none" 
            rows="4"
          />
          {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description.message}</p>}
        </div>

        {isAdmin && (
          <label className="flex items-center gap-2">
            <input type="checkbox" {...register('featured')} /> 
            <span>Marcar como destacado</span>
          </label>
        )}

        <div className="flex gap-2">
          <button type="submit" className="px-6 py-3 bg-[#3D2B1F] text-[#F5F5DC] font-cinzel uppercase hover:bg-[#5a3a2a] transition-colors">
            Guardar Cambios
          </button>
          <button 
            type="button" 
            onClick={() => navigate(-1)} 
            className="px-6 py-3 border border-[#3D2B1F] bg-white font-cinzel uppercase hover:bg-gray-100 transition-colors"
          >
            Cancelar
          </button>
        </div>

        <p className="text-sm text-gray-600 mt-2">* Campos obligatorios</p>
      </form>
      </div>
    </>
  );
}

export default EditBookPage;
