import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '../context/useAuth';

const schema = yup.object({
    nombre: yup.string().required('El nombre es obligatorio'),
    apellido: yup.string().required('El apellido es obligatorio'),
    nacimiento: yup.date().required('La fecha de nacimiento es obligatoria').nullable(),
    email: yup.string().email('Email inválido').required('El email es obligatorio'),
    password: yup.string().required('La contraseña es obligatoria').min(6, 'Mínimo 6 caracteres'),
    sexo: yup.string().required('Seleccione su sexo'),
    tema: yup.string().required('Seleccione un tema'),
}).required();

function RegisterPage() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
    });
    const { register: registerUser } = useAuth();

    const onSubmit = async (data) => {
        try {
            await registerUser(data);
            reset();
        } catch (error) {
            // Error ya mostrado en AuthContext via alert
            console.error('Error en registro:', error);
        }
    };

    return (
        <>
            <h1 className="font-cinzel font-bold mb-4 uppercase tracking-wider text-3xl text-left">Formulario de Registro</h1>
            <div className="max-w-xl mx-auto p-8 border border-[#3D2B1F] bg-[#F5F5DC]">
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="mb-4">
                        <label htmlFor="nombre" className="block mb-2 font-cinzel">Nombre:</label>
                        <input
                            type="text"
                            id="nombre"
                            {...register('nombre')}
                            className="w-full p-3 border border-[#c8bca9] bg-white font-lora text-base"
                        />
                        {errors.nombre && <p className="text-red-600 text-sm mt-1">{errors.nombre.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="apellido" className="block mb-2 font-cinzel">Apellido:</label>
                        <input
                            type="text"
                            id="apellido"
                            {...register('apellido')}
                            className="w-full p-3 border border-[#c8bca9] bg-white font-lora text-base"
                        />
                        {errors.apellido && <p className="text-red-600 text-sm mt-1">{errors.apellido.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="nacimiento" className="block mb-2 font-cinzel">Fecha de Nacimiento:</label>
                        <input
                            type="date"
                            id="nacimiento"
                            {...register('nacimiento')}
                            className="w-full p-3 border border-[#c8bca9] bg-white font-lora text-base"
                        />
                        {errors.nacimiento && <p className="text-red-600 text-sm mt-1">{errors.nacimiento.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-2 font-cinzel">Email:</label>
                        <input
                            type="email"
                            id="email"
                            {...register('email')}
                            className="w-full p-3 border border-[#c8bca9] bg-white font-lora text-base"
                        />
                        {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block mb-2 font-cinzel">Contraseña:</label>
                        <input
                            type="password"
                            id="password"
                            {...register('password')}
                            className="w-full p-3 border border-[#c8bca9] bg-white font-lora text-base"
                        />
                        {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2 font-cinzel">Sexo:</label>
                        <div className="flex gap-6">
                            <label className="flex items-center gap-2 font-lora">
                                <input type="radio" {...register('sexo')} value="masculino" />
                                Masculino
                            </label>
                            <label className="flex items-center gap-2 font-lora">
                                <input type="radio" {...register('sexo')} value="femenino" />
                                Femenino
                            </label>
                            <label className="flex items-center gap-2 font-lora">
                                <input type="radio" {...register('sexo')} value="otro" />
                                Otro
                            </label>
                        </div>
                        {errors.sexo && <p className="text-red-600 text-sm mt-1">{errors.sexo.message}</p>}
                    </div>

                    <div className="mb-6">
                        <label htmlFor="tema" className="block mb-2 font-cinzel">Tema Favorito:</label>
                        <select
                            id="tema"
                            {...register('tema')}
                            className="w-full p-3 border border-[#c8bca9] bg-white font-lora text-base"
                        >
                            <option value="fantasia">Fantasía</option>
                            <option value="ciencia-ficcion">Ciencia Ficción</option>
                            <option value="misterio">Misterio</option>
                            <option value="clasicos">Clásicos</option>
                        </select>
                        {errors.tema && <p className="text-red-600 text-sm mt-1">{errors.tema.message}</p>}
                    </div>

                    <button
                        type="submit"
                        className="block mx-auto bg-[#3D2B1F] text-[#F5F5DC] px-6 py-3 font-cinzel uppercase text-lg transition-colors duration-300 hover:bg-[#5a3a2a]"
                    >
                        Registrarse
                    </button>
                </form>
            </div>
        </>
    );
}

export default RegisterPage;