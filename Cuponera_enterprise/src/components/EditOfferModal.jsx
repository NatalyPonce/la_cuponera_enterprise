import { useEffect, useState } from "react";
import fetchUpdateOffer from "../fetch/fetchOfferUpdate.js";

const EditOfferModal = ({ isOpen, onClose, offerData, token }) => {
  const [offerForm, setOfferForm] = useState({ ...offerData });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (offerData) {
      setOfferForm({ ...offerData });
      setErrors({});
    }
  }, [offerData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOfferForm((prevForm) => ({
      ...prevForm,
      [name]:
        name === "originalPrice" ||
        name === "discountPrice" ||
        name === "quantityLimit"
          ? Number(value)
          : value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!offerForm.title?.trim()) newErrors.title = "El título es requerido.";
    if (!offerForm.description?.trim()) newErrors.description = "La descripción es requerida.";
    if (!offerForm.originalPrice || offerForm.originalPrice <= 0)
      newErrors.originalPrice = "El precio sin descuento debe ser mayor a 0.";
    if (!offerForm.discountPrice || offerForm.discountPrice <= 0)
      newErrors.discountPrice = "El precio con descuento debe ser mayor a 0.";
    if (offerForm.discountPrice >= offerForm.originalPrice)
      newErrors.discountPrice = "El precio con descuento debe ser menor al precio original.";
    if (!offerForm.validFrom) newErrors.validFrom = "La fecha de inicio es requerida.";
    if (!offerForm.validUntil) newErrors.validUntil = "La fecha de fin es requerida.";

    const currentDate = new Date();
    const validFromDate = new Date(offerForm.validFrom);
    if (validFromDate < new Date(currentDate.setFullYear(currentDate.getFullYear() - 2))) {
      newErrors.validFrom = "La fecha de inicio no puede ser menor a dos años a partir de hoy";
    }

    const hoyDate = new Date();
    hoyDate.setHours(0, 0, 0, 0);
    const validUntilDate = new Date(offerForm.validUntil);
    validUntilDate.setHours(0, 0, 0, 0);

    if (validUntilDate <= hoyDate) {
      newErrors.validUntil = "La fecha de finalización debe ser mayor que la fecha actual";
    }

    if (!offerForm.quantityLimit || offerForm.quantityLimit <= 0)
      newErrors.quantityLimit = "La cantidad límite debe ser mayor a 0.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

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
    <div className="absolute top-60 left-0 w-full h-full flex items-center justify-center pointer-events-none z-1000">
      <div className="absolute inset-0"></div>

      <div className="absolute z-1000 bg-gray-100 p-6 rounded-lg shadow-lg w-150 pointer-events-auto">
        <h2 className="text-xl font-bold mb-4 text-blue-950">
          Editar y reenviar oferta
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Título */}
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-bold text-gray-700"
            >
              Título
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={offerForm.title || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded placeholder-blue-900 text-blue-950"
              placeholder="Ingresa el título de la oferta"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title}</p>
            )}
          </div>

          {/* Descripción */}
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-bold text-gray-700"
            >
              Descripción
            </label>
            <input
              type="text"
              name="description"
              id="description"
              value={offerForm.description || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded placeholder-blue-900 text-blue-950"
              placeholder="Ingresa la descripción de la oferta"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
          </div>

          {/* Precio sin descuento */}
          <div className="mb-4">
            <label
              htmlFor="originalPrice"
              className="block text-sm font-bold text-gray-700"
            >
              Precio sin descuento
            </label>
            <input
              type="number"
              name="originalPrice"
              id="originalPrice"
              value={offerForm.originalPrice || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded placeholder-blue-800 text-blue-950"
              placeholder="Ingresa el precio sin descuento"
            />
            {errors.originalPrice && (
              <p className="text-red-500 text-sm">{errors.originalPrice}</p>
            )}
          </div>

          {/* Precio con descuento */}
          <div className="mb-4">
            <label
              htmlFor="discountPrice"
              className="block text-sm font-bold text-gray-700"
            >
              Precio con descuento
            </label>
            <input
              type="number"
              name="discountPrice"
              id="discountPrice"
              value={offerForm.discountPrice || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded placeholder-blue-800 text-blue-950"
              placeholder="Ingresa el precio con descuento"
            />
            {errors.discountPrice && (
              <p className="text-red-500 text-sm">{errors.discountPrice}</p>
            )}
          </div>

          {/* Fecha de inicio */}
          <div className="mb-4">
            <label
              htmlFor="validFrom"
              className="block text-sm font-bold text-gray-700"
            >
              Válido desde:
            </label>
            <input
              type="date"
              name="validFrom"
              id="validFrom"
              value={
                offerForm.validFrom
                  ? new Date(offerForm.validFrom).toISOString().split("T")[0]
                  : ""
              }
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded placeholder-blue-800 text-blue-950"
            />
            {errors.validFrom && (
              <p className="text-red-500 text-sm">{errors.validFrom}</p>
            )}
          </div>

          {/* Fecha de finalización */}
          <div className="mb-4">
            <label
              htmlFor="validUntil"
              className="block text-sm font-bold text-gray-700"
            >
              Válido hasta:
            </label>
            <input
              type="date"
              name="validUntil"
              id="validUntil"
              value={
                offerForm.validUntil
                  ? new Date(offerForm.validUntil).toISOString().split("T")[0]
                  : ""
              }
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded placeholder-blue-800 text-blue-950"
            />
            {errors.validUntil && (
              <p className="text-red-500 text-sm">{errors.validUntil}</p>
            )}
          </div>

          {/* Cantidad límite */}
          <div className="mb-4">
            <label
              htmlFor="quantityLimit"
              className="block text-sm font-bold text-gray-700"
            >
              Cantidad límite
            </label>
            <input
              type="number"
              name="quantityLimit"
              id="quantityLimit"
              value={offerForm.quantityLimit || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded placeholder-blue-800 text-blue-950"
            />
            {errors.quantityLimit && (
              <p className="text-red-500 text-sm">{errors.quantityLimit}</p>
            )}
          </div>

          {/* Botones */}
          <button
            type="submit"
            className="mt-4 bg-sky-900 text-white px-4 py-2 rounded hover:bg-blue-950 m-4"
          >
            Actualizar Oferta
          </button>
          <button
            onClick={onClose}
            className="mt-4 bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800 m-4"
          >
            Cerrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditOfferModal;
