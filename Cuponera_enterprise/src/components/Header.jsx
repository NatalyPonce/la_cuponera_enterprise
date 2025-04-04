import React, { useState } from "react";
import ModalOffer from "./ModalOffer";

export const Header = () => {
const [modalOpen, setModalOpen] = useState(false);
  return (
    <header className="bg-indigo-900 text-white w-full shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img src="/logo.png" alt="Logo" className="h-20 w-25" />
          <span className="text-xl font-bold">Cuponazo</span>
        </div>

        <div>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Crear nueva oferta
          </button>
          <button className="bg-white text-indigo-900 px-4 py-2 rounded-xl font-semibold hover:bg-indigo-100 transition">
            Mi cuenta
          </button>
        </div>
      </div>
      <ModalOffer isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </header>
  );
};
