import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '../context/useAuth';
import { useBooks } from '../context/useBooks';
import { useNavigate } from 'react-router-dom';
import BookCard from '../components/BookCard';

const schema = yup.object({
  nombre: yup.string().required('El nombre es obligatorio').min(2, 'El nombre debe tener al menos 2 caracteres'),
  apellido: yup.string().required('El apellido es obligatorio').min(2, 'El apellido debe tener al menos 2 caracteres'),
  email: yup.string().email('Email inválido').required('El email es obligatorio'),
}).required();

function ProfilePage() {
  const { user, updateUser } = useAuth();
  const { books = [], deleteBook } = useBooks();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const isAdmin = user?.role === 'admin';

  // Admin ve todos los libros, usuarios normales solo los suyos
  const userBooks = isAdmin 
    ? books 
    : books.filter(book => book.ownerId === user?.id);
  const userBooksCount = userBooks.length;

  // Formatear fecha de creación
  const formatDate = (dateString) => {
    if (!dateString) {
      return 'Información no disponible';
    }
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Fecha inválida';
      }
      return date.toLocaleDateString('es-ES', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch {
      return 'Error al formatear fecha';
    }
  };

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      nombre: user?.nombre || '',
      apellido: user?.apellido || '',
      email: user?.email || '',
    }
  });

  const onSubmit = async (data) => {
    try {
      setMessage({ type: '', text: '' });
      
      // Preparar datos para actualizar
      const updateData = {
        nombre: data.nombre,
        apellido: data.apellido,
        email: data.email,
      };

      await updateUser(updateData);
      setMessage({ type: 'success', text: '¡Perfil actualizado exitosamente!' });
      setIsEditing(false);
      
      // Mantener los datos actualizados en el formulario
      reset({
        nombre: data.nombre,
        apellido: data.apellido,
        email: data.email,
      });
    } catch (error) {
      console.error('Error actualizando perfil:', error);
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Error al actualizar el perfil. Por favor intenta de nuevo.' 
      });
    }
  };

  const handleDelete = async (bookId, bookTitle) => {
    if (window.confirm(`¿Estás seguro de eliminar "${bookTitle}"?`)) {
      try {
        await deleteBook(bookId);
        setMessage({ type: 'success', text: 'Libro eliminado exitosamente' });
      } catch (error) {
        console.error('Error eliminando libro:', error);
        setMessage({ type: 'error', text: 'Error al eliminar el libro. Por favor intenta de nuevo.' });
      }
    }
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div>
      <h1 className="font-cinzel font-bold mb-8 uppercase tracking-wider text-3xl text-left">
        Mi Perfil
      </h1>

      {message.text && (
        <div className={`p-4 mb-6 ${message.type === 'success' ? 'bg-green-100 text-green-800 border border-green-300' : 'bg-red-100 text-red-800 border border-red-300'}`}>
          {message.text}
        </div>
      )}

      <div className="max-w-3xl mx-auto p-8 border border-[#3D2B1F] bg-[#F5F5DC] mb-12">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Información del usuario */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#3D2B1F]">
            <div>
              <h2 className="font-cinzel text-xl font-bold">Información Personal</h2>
              <p className="text-sm text-gray-600">Actualiza tus datos personales</p>
            </div>
            {!isEditing && (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-[#3D2B1F] text-[#F5F5DC] font-cinzel hover:bg-[#5a3a2a] transition-colors"
              >
                Editar
              </button>
            )}
          </div>

          {/* Nombre */}
          <div>
            <label className="block mb-2 font-cinzel font-semibold">Nombre *</label>
            <input 
              {...register('nombre')} 
              disabled={!isEditing}
              className={`w-full p-3 border border-[#c8bca9] font-lora ${!isEditing ? 'bg-gray-100' : 'bg-white'}`}
            />
            {errors.nombre && <p className="text-red-600 text-sm mt-1">{errors.nombre.message}</p>}
          </div>

          {/* Apellido */}
          <div>
            <label className="block mb-2 font-cinzel font-semibold">Apellido *</label>
            <input 
              {...register('apellido')} 
              disabled={!isEditing}
              className={`w-full p-3 border border-[#c8bca9] font-lora ${!isEditing ? 'bg-gray-100' : 'bg-white'}`}
            />
            {errors.apellido && <p className="text-red-600 text-sm mt-1">{errors.apellido.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 font-cinzel font-semibold">Email *</label>
            <input 
              {...register('email')} 
              type="email"
              disabled={!isEditing}
              className={`w-full p-3 border border-[#c8bca9] font-lora ${!isEditing ? 'bg-gray-100' : 'bg-white'}`}
            />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Botones de acción */}
          {isEditing && (
            <div className="flex gap-2 mt-4">
              <button 
                type="submit" 
                className="px-6 py-3 bg-[#3D2B1F] text-[#F5F5DC] font-cinzel uppercase hover:bg-[#5a3a2a] transition-colors"
              >
                Guardar Cambios
              </button>
              <button 
                type="button" 
                onClick={() => {
                  setIsEditing(false);
                  setMessage({ type: '', text: '' });
                  reset();
                }} 
                className="px-6 py-3 border border-[#3D2B1F] bg-white font-cinzel uppercase hover:bg-gray-100 transition-colors"
              >
                Cancelar
              </button>
            </div>
          )}
        </form>

        {/* Información adicional */}
        <div className="mt-8 pt-6 border-t border-[#3D2B1F]">
          <h2 className="font-cinzel text-lg font-bold mb-4">Mis Estadísticas</h2>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-white/50 p-4 border border-[#c8bca9]">
              <p className="text-3xl font-bold text-[#3D2B1F] font-cinzel">{userBooksCount}</p>
              <p className="text-sm text-gray-700 font-lora">Libros publicados</p>
            </div>
            <div className="bg-white/50 p-4 border border-[#c8bca9]">
              <p className="text-base font-bold text-[#3D2B1F] font-cinzel">
                {user?.createdAt ? formatDate(user.createdAt) : 'Vuelve a iniciar sesión'}
              </p>
              <p className="text-sm text-gray-700 font-lora">Miembro desde</p>
            </div>
          </div>
          
          {!user?.createdAt && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-400 text-sm text-yellow-800">
              💡 Para ver la fecha de registro completa, por favor cierra sesión y vuelve a iniciar sesión.
            </div>
          )}
        </div>
      </div>

      {/* Sección de Mis Libros */}
      <div className="mt-12">
        <h1 className="font-cinzel font-bold mb-8 uppercase tracking-wider text-3xl text-left">
          {isAdmin ? 'Todos los Libros (Admin)' : 'Mis Libros Agregados'}
        </h1>
        
        {userBooks.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">{isAdmin ? 'No hay libros en el catálogo' : 'Aún no has agregado ningún libro'}</p>
            <button
              onClick={() => navigate('/agregar')}
              className="px-4 py-2 bg-secondary text-white rounded hover:bg-secondary/90"
            >
              Agregar {isAdmin ? 'libro' : 'mi primer libro'}
            </button>
          </div>
        ) : (
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {userBooks.map(book => (
              <BookCard
                key={book.id}
                title={book.title}
                author={book.author}
                description={book.description}
                imageUrl={book.imageUrl}
                altText={book.altText}
                canEdit={true}
                onDelete={() => handleDelete(book.id, book.title)}
                onEdit={() => navigate(`/editar/${book.id}`)}
              />
            ))}
          </section>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
