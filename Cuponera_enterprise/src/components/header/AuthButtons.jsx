import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'; // Corrección aquí
import ModalOffer from '../ModalOffer';

const AuthButtons = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <NavLink
        to="/"
        className="border border-primary text-primary px-4 py-2 rounded"
      >
        Iniciar sesión
      </NavLink>
      <button
        onClick={() => setModalOpen(true)}
        className="border border-primary text-primary px-4 py-2 rounded ml-2"
      >
        Crear nueva oferta
      </button>
      <ModalOffer isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};
export default AuthButtons;
