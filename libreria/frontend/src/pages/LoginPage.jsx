import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/useAuth';
import { Link } from 'react-router-dom';

function LoginPage() {
  const { register: r, handleSubmit } = useForm();
  const { login } = useAuth();

  const onSubmit = (data) => {
    // simple login: only email required
    login({ email: data.email });
  };

  return (
    <div className="max-w-md mx-auto p-6 border bg-[#F5F5DC]">
      <h2 className="font-cinzel text-2xl mb-4">Iniciar sesión</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <input {...r('email')} type="email" placeholder="Email" className="p-2 border" />
        <input {...r('password')} type="password" placeholder="Contraseña" className="p-2 border" />
        <button className="px-4 py-2 bg-secondary text-primary">Ingresar</button>
      </form>

      <p className="text-center mt-4 text-sm">
        ¿No tenés cuenta?{' '}
        <Link to="/registro" className="underline text-primary">Registrate</Link>
      </p>
    </div>
  );
}

export default LoginPage;
