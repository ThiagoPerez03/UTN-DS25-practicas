import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '../context/useAuth';
import { Link } from 'react-router-dom';

const schema = yup.object({
  email: yup.string().email('Email inválido').required('El email es obligatorio'),
  password: yup.string().required('La contraseña es obligatoria').min(6, 'La contraseña debe tener al menos 6 caracteres'),
}).required();

function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const { login } = useAuth();

  const onSubmit = async (data) => {
    try {
      await login({ email: data.email, password: data.password });
    } catch (error) {
      // Error ya mostrado en AuthContext via alert
      console.error('Error en login:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 border bg-[#F5F5DC]">
      <h2 className="font-cinzel text-2xl mb-4">Iniciar sesión</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-3">
        <div>
          <input 
            {...register('email')} 
            type="email" 
            placeholder="Email" 
            className="w-full p-2 border" 
          />
          {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
        </div>
        
        <div>
          <input 
            {...register('password')} 
            type="password" 
            placeholder="Contraseña" 
            className="w-full p-2 border" 
          />
          {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>}
        </div>
        
        <button type="submit" className="px-4 py-2 bg-secondary text-primary">Ingresar</button>
      </form>

      <p className="text-center mt-4 text-sm">
        ¿No tenés cuenta?{' '}
        <Link to="/registro" className="underline text-secondary">Registrate</Link>
      </p>
    </div>
  );
}

export default LoginPage;
