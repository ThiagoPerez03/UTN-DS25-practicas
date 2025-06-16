import React from 'react';

function ContactPage() {
    return (
        <>
            <h1 className="font-cinzel font-bold mb-4 uppercase tracking-wider text-3xl text-left">
                Contactanos
            </h1>
            <div className="max-w-xl mx-auto p-8 border border-[#3D2B1F] bg-[#F5F5DC]">
                <form>
                    <div className="mb-4">
                        <label htmlFor="name" className="block mb-2 font-cinzel">
                            Nombre:
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            className="w-full p-3 border border-[#c8bca9] bg-white font-lora text-base"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-2 font-cinzel">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="w-full p-3 border border-[#c8bca9] bg-white font-lora text-base "
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="message" className="block mb-2 font-cinzel">
                            Mensaje:
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            required
                            className="w-full p-3 border border-[#c8bca9] bg-white font-lora text-base h-32 resize-none"
                        ></textarea>
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
