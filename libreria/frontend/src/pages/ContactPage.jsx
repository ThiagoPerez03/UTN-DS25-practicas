import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
    name: yup.string().required('El nombre es obligatorio'),
    email: yup.string().email('Email inválido').required('El email es obligatorio'),
    message: yup.string().required('El mensaje es obligatorio').min(10, 'Escribí al menos 10 caracteres'),
}).required();

function ContactPage() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = data => {
        console.log('Contacto:', data);
        alert('Mensaje enviado (ver consola)');
        reset();
    };

    return (
        <>
            <h1 className="font-cinzel font-bold mb-4 uppercase tracking-wider text-3xl text-left">
                Contactanos
            </h1>
            <div className="max-w-xl mx-auto p-8 border border-[#3D2B1F] bg-[#F5F5DC]">
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="mb-4">
                        <label htmlFor="name" className="block mb-2 font-cinzel">Nombre:</label>
                        <input
                            type="text"
                            id="name"
                            {...register('name')}
                            className="w-full p-3 border border-[#c8bca9] bg-white font-lora text-base"
                        />
                        {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
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

                    <div className="mb-6">
                        <label htmlFor="message" className="block mb-2 font-cinzel">Mensaje:</label>
                        <textarea
                            id="message"
                            {...register('message')}
                            className="w-full p-3 border border-[#c8bca9] bg-white font-lora text-base h-32 resize-none"
                        ></textarea>
                        {errors.message && <p className="text-red-600 text-sm mt-1">{errors.message.message}</p>}
                    </div>

                    <button
                        type="submit"
                        className="block mx-auto bg-[#3D2B1F] text-[#F5F5DC] px-6 py-3  font-cinzel uppercase text-lg transition-colors duration-300 hover:bg-[#5a3a2a]"
                    >
                        Enviar
                    </button>
                </form>
            </div>
        </>
    );
}

export default ContactPage;
