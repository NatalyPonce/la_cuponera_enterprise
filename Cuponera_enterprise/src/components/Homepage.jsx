import React, { useState } from "react";
import ModalOffer from "./ModalOffer";
const HomePage = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">      
      <button 
        onClick={() => setModalOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Crear nueva oferta
      </button>

      <ModalOffer isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default HomePage;
