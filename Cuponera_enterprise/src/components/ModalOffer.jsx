import { useEffect, useState } from "react";
import fetchCategories from "../fetch/fetchCategories";
import fetchCreateOffer from "../fetch/fetchCreateOffer";

const ModalOffer = ({ isOpen, onClose }) => {    
    const [offerForm, setOfferForm] = useState({
      title: "",
      description: "",
      originalPrice: 0,
      discountPrice: 0,
      validFrom: "",
      validUntil: "",
      quantityLimit: 0,
      categoryId: 0,
    });

    const [categorias, setCategorias] = useState([]);

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
                console.log(data.categories);
            }
        };
        cargarCategorias();
    }, []);

const handleSubmit = async (e) => {
  e.preventDefault();
  const formattedOfferForm = {
    ...offerForm,
    validFrom: new Date(offerForm.validFrom).toISOString(),
    validUntil: new Date(offerForm.validUntil).toISOString(),
  };

  const jsonOfferData = JSON.stringify(formattedOfferForm);

  console.log(`Formulario enviado con exito: ${jsonOfferData}`);

  const response = await fetchCreateOffer(jsonOfferData);
  if (response) {
    console.log("Oferta creada con éxito:", response);
    onClose();
  } else {
    console.error("Hubo un error al crear la oferta");
  }
};

    if (!isOpen) return null;

    return (
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none">
        <div className="absolute inset-0"></div>

        <div className="relative z-10 bg-white p-6 rounded-lg shadow-lg w-96 pointer-events-auto">
          <form onSubmit={handleSubmit}>
            <h2 className="text-xl font-bold mb-4">Crear oferta</h2>
            <div className="mb-4">
              <label
                className="block text-sm font-bold text-gray-700"
                htmlFor="title"
              >
                Titulo
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={offerForm.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                placeholder="Ingresa el titulo de la oferta"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-sm font-bold text-gray-700"
                htmlFor="description"
              >
                Descripción
              </label>
              <input
                type="text"
                id="description"
                name="description"
                value={offerForm.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                placeholder="Ingresa la descripción de la oferta"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-sm font-bold text-gray-700"
                htmlFor="originalPrice"
              >
                Precio sin descuento
              </label>
              <input
                type="number"
                id="originalPrice"
                name="originalPrice"
                value={offerForm.originalPrice}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                placeholder="Ingresa el precio sin descuento de la oferta"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-sm font-bold text-gray-700"
                htmlFor="discountPrice"
              >
                Precio con descuento
              </label>
              <input
                type="number"
                id="discountPrice"
                name="discountPrice"
                value={offerForm.discountPrice}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                placeholder="Ingresa el precio con descuento de la oferta"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-sm font-bold text-gray-700"
                htmlFor="validFrom"
              >
                Válido desde:
              </label>
              <input
                type="date"
                id="validFrom"
                name="validFrom"
                value={offerForm.validFrom}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                placeholder="Ingresa desde qué fecha será válido el cupón."
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-sm font-bold text-gray-700"
                htmlFor="validUntil"
              >
                Válido hasta:
              </label>
              <input
                type="date"
                id="validUntil"
                name="validUntil"
                value={offerForm.validUntil}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                placeholder="Ingresa hasta qué fecha será válido el cupón."
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-bold text-gray-700"
                htmlFor="quantityLimit"
              >
                Cantidad límite
              </label>
              <input
                type="number"
                id="quantityLimit"
                name="quantityLimit"
                value={offerForm.quantityLimit}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                placeholder="Ingresa la cantidad límite de ofertas"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-sm font-bold text-gray-700"
                htmlFor="categoryId"
              >
                Categoría
              </label>
              <select
                id="categoryId"
                name="categoryId"
                value={offerForm.categoryId}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              >
                <option value="">Selecciona una categoría</option>
                {categorias.map((categoria) => (
                  <option key={categoria.id} value={categoria.id}>
                    {categoria.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Crear Oferta
            </button>
          </form>

          <button
            onClick={onClose}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Cerrar
          </button>
        </div>
      </div>
    );
};

export default ModalOffer;
