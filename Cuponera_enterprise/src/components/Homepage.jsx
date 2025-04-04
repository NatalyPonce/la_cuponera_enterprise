import React, { useEffect, useState } from "react";
import ModalOffer from "./ModalOffer";
import fetchOfferEnterprise from "../fetch/fetchOfferEnterprise";
import { OfferCard } from "./offerCard";

const HomePage = () => {
  const categories = [
    "Ofertas en espera de aprobación",
    "Ofertas aprobadas futuras",
    "Ofertas activas",
    "Ofertas pasadas",
    "Ofertas rechazadas",
    "Ofertas descartadas",
  ];
  const [offers, setOffers] = useState([]);

  const [selectedCategorie, setSelectedCategorie] = useState("");

  const [selectedOffers, setSelectedOffers] = useState(offers)

    useEffect(() => {
    const loadOffers = async () => {
      const data = await fetchOfferEnterprise();
      if (data) {
        setOffers(data.offers);
      }
    };
    loadOffers();
    }, []);
  const handleCategorieChange = () => {
    
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <h1 className="text-3xl font-bold text-indigo-900 mb-6">¡Bienvenido!</h1>

      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Aquí puedes ver tus ofertas:
        </h2>

        {/* Dropdown */}
        <select
          value={selectedCategorie}
          onChange={(e) => setSelectedCategorie(e.target.value)}
          className="mt-1 md:mt-0 border border-gray-300 rounded-xl px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
        >
          <option value="">Selecciona una categoría</option>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      {offers.map((oferta) => {
        return <OfferCard offer={oferta} key={oferta.id} />;
      })}
    </div>
  );
};

export default HomePage;
