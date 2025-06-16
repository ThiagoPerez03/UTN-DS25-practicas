import React from 'react';

function RegisterPage() {
    return (
        <>
            <h1 className="font-cinzel font-bold mb-4 uppercase tracking-wider text-3xl text-left">Formulario de Registro</h1>
            <div className="max-w-xl mx-auto p-8 border border-[#3D2B1F] bg-[#F5F5DC]">
                <form>
                    <div className="mb-4">
                        <label htmlFor="nombre" className="block mb-2 font-cinzel">Nombre:</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            required
                            className="w-full p-3 border border-[#c8bca9] bg-white font-lora text-base"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="apellido" className="block mb-2 font-cinzel">Apellido:</label>
                        <input
                            type="text"
                            id="apellido"
                            name="apellido"
                            required
                            className="w-full p-3 border border-[#c8bca9] bg-white font-lora text-base"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="nacimiento" className="block mb-2 font-cinzel">Fecha de Nacimiento:</label>
                        <input
                            type="date"
                            id="nacimiento"
                            name="nacimiento"
                            required
                            className="w-full p-3 border border-[#c8bca9] bg-white font-lora text-base"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-2 font-cinzel">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="w-full p-3 border border-[#c8bca9] bg-white font-lora text-base"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block mb-2 font-cinzel">Contraseña:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                            className="w-full p-3 border border-[#c8bca9] bg-white font-lora text-base"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 font-cinzel">Sexo:</label>
                        <div className="flex gap-6">
                            <label className="flex items-center gap-2 font-lora">
                                <input type="radio" name="sexo" value="masculino" />
                                Masculino
                            </label>
                            <label className="flex items-center gap-2 font-lora">
                                <input type="radio" name="sexo" value="femenino" />
                                Femenino
                            </label>
                            <label className="flex items-center gap-2 font-lora">
                                <input type="radio" name="sexo" value="otro" />
                                Otro
                            </label>
                        </div>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="tema" className="block mb-2 font-cinzel">Tema Favorito:</label>
                        <select
                            id="tema"
                            name="tema"
                            className="w-full p-3 border border-[#c8bca9] bg-white font-lora text-base"
                        >
                            <option value="fantasia">Fantasía</option>
                            <option value="ciencia-ficcion">Ciencia Ficción</option>
                            <option value="misterio">Misterio</option>
                            <option value="clasicos">Clásicos</option>
                        </select>
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