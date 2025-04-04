import { useEffect, useState } from "react";
import fetchCategories from "../fetch/fetchCategories";

const ModalOffer = ({ isOpen, onClose }) => {    
    const [offerForm, setOfferForm] = useState({
        titulo: '',
        descripcion: '',
        originalPrice: 0,
        discountPrice: 0,
        validFrom: '',
        validUntil:'',
        categoryId:1
    });

    const [categorias, setCategorias] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOfferForm({
            ...offerForm,
            [name]: value
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


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`Formulario enviado con exito: ${offerForm}`)
    }

    if (!isOpen) return null;
  return (
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none">
      <div className="absolute inset-0"></div>

      <div className="relative z-10 bg-white p-6 rounded-lg shadow-lg w-96 pointer-events-auto">
              <form onSubmit={handleSubmit}
              >
                  <h2 className="text-xl font-bold mb-4">Crear oferta</h2>
        <div className="mb-4">
          <label className="block text-sm font-bold text-gray-700" htmlFor="titulo">
            Titulo
          </label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            value={offerForm.titulo}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            placeholder="Ingresa el titulo de la oferta"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold text-gray-700" htmlFor="descripcion">
            Descripción
          </label>
          <input
            type="text"
            id="descripcion"
            name="descripcion"
            value={offerForm.descripcion}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            placeholder="Ingresa la descripción de la oferta"
          />
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
            className="w-full px-3 py-2 border border-gray-300 rounded"
            placeholder="Ingresa el precio sin descuento de la oferta"
          />
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
            className="w-full px-3 py-2 border border-gray-300 rounded"
            placeholder="Ingresa el precio con descuento de la oferta"
          />
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
            className="w-full px-3 py-2 border border-gray-300 rounded"
            placeholder=""
          />
          </div>

                  <div className="mb-4">
          <label className="block text-sm font-bold text-gray-700" htmlFor="validFrom">
            Válido hasta:
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
  <label className="block text-sm font-bold text-gray-700" htmlFor="categoryId">
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
        {categoria.nombre || categoria.name}
      </option>
    ))}
  </select>
</div>


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
