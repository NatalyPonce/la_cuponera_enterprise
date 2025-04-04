import { useEffect, useState } from "react";
import fetchUpdateOffer from "../fetch/fetchOfferUpdate.js";

const EditOfferModal = ({ isOpen, onClose, offerData, token }) => {
  const [offerForm, setOfferForm] = useState({ ...offerData });

  useEffect(() => {
    if (offerData) {
      setOfferForm({ ...offerData });
    }
  }, [offerData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOfferForm({
      ...offerForm,
      [name]:
        name === "originalPrice" ||
          name === "discountPrice" ||
          name === "quantityLimit"
          ? Number(value)
          : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedData = {
      ...offerForm,
      validFrom: new Date(offerForm.validFrom).toISOString(),
      validUntil: new Date(offerForm.validUntil).toISOString(),
    };

    const response = await fetchUpdateOffer(offerForm.id, formattedData, token);

    if (response) {
      console.log("Oferta actualizada:", response);
      onClose();
    } else {
      console.error("Error al reenviar la oferta");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none">
      <div className="absolute inset-0 bg-black opacity-40"></div>

      <div className="relative z-10 bg-white p-6 rounded-lg shadow-lg w-96 pointer-events-auto">
        <h2 className="text-xl font-bold mb-4">Editar y reenviar oferta</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-bold text-gray-700">Título</label>
            <input
              type="text"
              name="title"
              id="title"
              value={offerForm.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-bold text-gray-700">Descripción</label>
            <input
              type="text"
              name="description"
              id="description"
              value={offerForm.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="originalPrice" className="block text-sm font-bold text-gray-700">Precio sin descuento</label>
            <input
              type="number"
              name="originalPrice"
              id="originalPrice"
              value={offerForm.originalPrice}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="discountPrice" className="block text-sm font-bold text-gray-700">Precio con descuento</label>
            <input
              type="number"
              name="discountPrice"
              id="discountPrice"
              value={offerForm.discountPrice}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="validFrom" className="block text-sm font-bold text-gray-700">Válido desde</label>
            <input
              type="date"
              name="validFrom"
              id="validFrom"
              value={offerForm.validFrom ? offerForm.validFrom.split("T")[0] : ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="validUntil" className="block text-sm font-bold text-gray-700">Válido hasta</label>
            <input
              type="date"
              name="validUntil"
              id="validUntil"
              value={offerForm.validUntil ? offerForm.validUntil.split("T")[0] : ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>


          <div className="mb-4">
            <label htmlFor="quantityLimit" className="block text-sm font-bold text-gray-700">Cantidad límite</label>
            <input
              type="number"
              name="quantityLimit"
              id="quantityLimit"
              value={offerForm.quantityLimit}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>

          <button
            type="submit"
            className="mt-2 w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Reenviar oferta
          </button>
        </form>

        <button
          onClick={onClose}
          className="mt-4 w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default EditOfferModal;
