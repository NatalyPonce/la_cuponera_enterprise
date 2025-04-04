import { useEffect, useState } from "react";
import fetchCategories from "../fetch/fetchCategories";
import fetchCreateOffer from "../fetch/fetchCreateOffer";

const ModalOffer = ({ isOpen, onClose }) => { 
  const initialState = {
    title: "",
    description: "",
    originalPrice: 0,
    discountPrice: 0,
    validFrom: "",
    validUntil: "",
    quantityLimit: 0,
    categoryId: 0,
  };
  
  const [offerForm, setOfferForm] = useState(initialState);
  const [categorias, setCategorias] = useState([]);
  const [errors, setErrors] = useState({});  // Para mostrar los errores

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOfferForm({
      ...offerForm,
      [name]:
        name === "originalPrice" ||
        name === "discountPrice" ||
        name === "quantityLimit" ||
        name === "categoryId"
          ? Number(value)
          : value,
    });
  };

  useEffect(() => {
    const cargarCategorias = async () => {
      const data = await fetchCategories();
      if (data && data.categories) {
        setCategorias(data.categories);
      }
    };
    cargarCategorias();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = {};

    Object.keys(offerForm).forEach((key) => {
  const value = offerForm[key].toString().trim();
  if (value === "" || value === "0" || value === 0) {
    formErrors[key] = `${key} es obligatorio`;
  }
    });

    if (offerForm.originalPrice <= 0) {
      formErrors.originalPrice = "El precio original debe ser mayor a 0";
    }

    if (offerForm.discountPrice <= 0) {
      formErrors.discountPrice = "El precio con descuento debe ser mayor a 0";
    }

    if (offerForm.discountPrice >= offerForm.originalPrice) {
      formErrors.discountPrice = "El precio con descuento debe ser menor al precio original";
    }

    const currentDate = new Date();
    const validFromDate = new Date(offerForm.validFrom);
    if (validFromDate < new Date(currentDate.setFullYear(currentDate.getFullYear() - 2))) {
      formErrors.validFrom = "La fecha de inicio no puede ser menor a dos años a partir de hoy";
    }

const hoyDate = new Date();
hoyDate.setHours(0, 0, 0, 0);
const validUntilDate = new Date(offerForm.validUntil);
validUntilDate.setHours(0, 0, 0, 0);

if (validUntilDate <= hoyDate) {
  formErrors.validUntil =
    "La fecha de finalización debe ser mayor que la fecha actual";
}
    if (offerForm.quantityLimit <= 0) {
      formErrors.quantityLimit = "La cantidad límite debe ser mayor a 0";
    }

    if (offerForm.categoryId === 0) {
      formErrors.categoryId = "Debe seleccionar una categoría";
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const formattedOfferForm = {
      ...offerForm,
      validFrom: new Date(offerForm.validFrom).toISOString(),
      validUntil: new Date(offerForm.validUntil).toISOString(),
    };

    const jsonOfferData = JSON.stringify(formattedOfferForm);

    console.log(`Formulario enviado con éxito: ${jsonOfferData}`);

    const response = await fetchCreateOffer(jsonOfferData);
    if (response) {
      console.log("Oferta creada con éxito:", response);
      setOfferForm(initialState);
      setErrors({});
      onClose();
    } else {
      console.error("Hubo un error al crear la oferta");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="absolute top-40 left-0 w-full h-full flex items-center justify-center pointer-events-none">
      <div className="absolute inset-0"></div>

      <div className="relative z-10 bg-gray-100 p-6 rounded-lg shadow-lg w-96 pointer-events-auto">
        <form onSubmit={handleSubmit}>
          <h2 className="text-xl font-bold mb-4 text-blue-950">Crear oferta</h2>
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700" htmlFor="title">
              Titulo
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={offerForm.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded placeholder-blue-900 text-blue-950"
              placeholder="Ingresa el titulo de la oferta"
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700" htmlFor="description">
              Descripción
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={offerForm.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded placeholder-blue-900 text-blue-950"
              placeholder="Ingresa la descripción de la oferta"
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700" htmlFor="originalPrice">
              Precio sin descuento
            </label>
            <input
              type="number"
              id="originalPrice"
              name="originalPrice"
              value={offerForm.originalPrice}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded placeholder-blue-800 text-blue-950"
              placeholder="Ingresa el precio sin descuento de la oferta"
            />
            {errors.originalPrice && <p className="text-red-500 text-sm">{errors.originalPrice}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700" htmlFor="discountPrice">
              Precio con descuento
            </label>
            <input
              type="number"
              id="discountPrice"
              name="discountPrice"
              value={offerForm.discountPrice}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded placeholder-blue-800 text-blue-950"
              placeholder="Ingresa el precio con descuento de la oferta"
            />
            {errors.discountPrice && <p className="text-red-500 text-sm">{errors.discountPrice}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700" htmlFor="validFrom">
              Válido desde:
            </label>
            <input
              type="date"
              id="validFrom"
              name="validFrom"
              value={offerForm.validFrom}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded placeholder-blue-800 text-blue-950"
            />
            {errors.validFrom && <p className="text-red-500 text-sm">{errors.validFrom}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700" htmlFor="validUntil">
              Válido hasta:
            </label>
            <input
              type="date"
              id="validUntil"
              name="validUntil"
              value={offerForm.validUntil}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded placeholder-blue-800 text-blue-950"
            />
            {errors.validUntil && <p className="text-red-500 text-sm">{errors.validUntil}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700" htmlFor="quantityLimit">
              Cantidad límite
            </label>
            <input
              type="number"
              id="quantityLimit"
              name="quantityLimit"
              value={offerForm.quantityLimit}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded placeholder-blue-800 text-blue-950"
            />
            {errors.quantityLimit && <p className="text-red-500 text-sm">{errors.quantityLimit}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700" htmlFor="categoryId">
              Categoría
            </label>
            <select
              id="categoryId"
              name="categoryId"
              value={offerForm.categoryId}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded placeholder-blue-800 text-blue-950"
            >
              <option value="">Selecciona una categoría</option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.name}
                </option>
              ))}
            </select>
            {errors.categoryId && <p className="text-red-500 text-sm">{errors.categoryId}</p>}
          </div>

          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Crear Oferta
          </button>
          <button
            onClick={onClose}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Cerrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalOffer;
