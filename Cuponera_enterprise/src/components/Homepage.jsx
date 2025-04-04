import React, { useEffect, useState } from "react";
import fetchOfferEnterprise from "../fetch/fetchOfferEnterprise";
import { OfferCard } from "./offerCard";
import EditOfferModal from "./EditOfferModal"; // Asegúrate que la ruta sea correcta

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
  const [selectedOffers, setSelectedOffers] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);

  const today = new Date();

  useEffect(() => {
    const loadOffers = async () => {
      const data = await fetchOfferEnterprise();
      if (data) {
        setOffers(data.offers);
        setSelectedOffers(data.offers);
      }
    };
    loadOffers();
  }, []);

  const handleCategorieChange = (category) => {
    setSelectedCategorie(category);

    let filteredOffers = [...offers];

    switch (category) {
      case "Ofertas en espera de aprobación":
        filteredOffers = offers.filter((offer) => offer.offerState === "PENDING");
        break;
      case "Ofertas aprobadas futuras":
        filteredOffers = offers.filter(
          (offer) =>
            offer.offerState === "APPROVED" && new Date(offer.validFrom) > today
        );
        break;
      case "Ofertas activas":
        filteredOffers = offers.filter(
          (offer) =>
            offer.offerState === "APPROVED" &&
            new Date(offer.validFrom) <= today &&
            new Date(offer.validUntil) >= today
        );
        break;
      case "Ofertas pasadas":
        filteredOffers = offers.filter(
          (offer) =>
            offer.offerState === "APPROVED" && new Date(offer.validUntil) < today
        );
        break;
      case "Ofertas rechazadas":
        filteredOffers = offers.filter((offer) => offer.offerState === "REJECTED");
        break;
      case "Ofertas descartadas":
        filteredOffers = offers.filter((offer) => offer.offerState === "DISCARDED");
        break;
      default:
        filteredOffers = offers;
    }

    setSelectedOffers(filteredOffers);
  };

  const openEditModal = (offer) => {
    setSelectedOffer(offer);
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
    setSelectedOffer(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <h1 className="text-3xl font-bold text-indigo-900 mb-6">¡Bienvenido!</h1>

      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Aquí puedes ver tus ofertas:
        </h2>

        <select
          value={selectedCategorie}
          onChange={(e) => handleCategorieChange(e.target.value)}
          className="mt-1 md:mt-0 border border-gray-300 rounded-xl px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
        >
          <option value="">Selecciona una categoría</option>
          {categories.map((categorie, index) => (
            <option key={index} value={categorie}>
              {categorie}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap justify-around items-center mt-6">
        {selectedOffers.map((oferta) => (
          <div key={oferta.id} className="m-4">
            <OfferCard offer={oferta} />
            {selectedCategorie === "Ofertas rechazadas" && (
              <button
                onClick={() => openEditModal(oferta)}
                className="mt-2 w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Editar y reenviar
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Modal */}
      <EditOfferModal
        isOpen={isModalOpen}
        onClose={closeEditModal}
        offerData={selectedOffer}
        token={"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW50ZXJwcmlzZUlkIjoyLCJyb2xlIjoiZW50ZXJwcmlzZSIsImVtYWlsIjoibmFob21pQG5haG9taS5jb20iLCJpYXQiOjE3NDM3Nzk5NjcsImV4cCI6MTc0MzgwMTU2N30.YBPSgZBYpskG36g2Fvo9gmBpeJuMhbaiamTRiF7sunA"} // Sustituye por tu token real
      />
    </div>
  );
};

export default HomePage;
