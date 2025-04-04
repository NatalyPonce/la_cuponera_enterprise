import { useState } from "react";
import fetchDiscardOffer from "../fetch/fetchDiscardOffer";
import EditOfferModal from "../components/EditOfferModal";

export const OfferCard = ({ offer, token }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);

  const handleDiscardOnclick = async (offer) => {
    const discarded = confirm("¿Deseas descartar la oferta?");
    if (discarded) {
      const result = await fetchDiscardOffer(offer);
      if (result) {
        alert(`Oferta con título "${offer.title}" fue descartada.`);
      } else {
        alert("Hubo un error al descartar la oferta.");
      }
    }
  };

  const handleEditAndResend = (offer) => {
    setSelectedOffer(offer);
    setIsModalOpen(true);
  };

  return (
    <div className="border border-gray-300 rounded-2xl shadow-md p-8 max-w-md bg-white m-5">
      <h2 className="text-xl font-bold mb-4">{offer.title}</h2>
      <div>
        <strong>Estado:</strong> {offer.offerState}
      </div>
      <div>
        <strong>Descripción:</strong> {offer.description}
      </div>
      <div>
        <strong>Precio Original:</strong> ${offer.originalPrice}
      </div>
      <div>
        <strong>Precio con Descuento:</strong> ${offer.discountPrice}
      </div>
      <div>
        <strong>Válido Desde:</strong>{" "}
        {new Date(offer.validFrom).toLocaleDateString()}
      </div>
      <div>
        <strong>Válido Hasta:</strong>{" "}
        {new Date(offer.validUntil).toLocaleDateString()}
      </div>
      <div>
        <strong>Límite de Cantidad:</strong> {offer.quantityLimit}
      </div>
      <div>
        <strong>Vendidos:</strong> {offer.sold}
      </div>
      <div>
        <strong>Disponibles:</strong> {offer.quantityLimit - offer.sold}
      </div>
      <div>
        <strong>Ingresos totales:</strong> {offer.discountPrice * offer.sold}
      </div>
      <div>
        <strong>Cargo por servicio:</strong>{" "}
      </div>

      {offer.offerRejectedReason && (
        <div>
          <strong>Razón de Rechazo:</strong> {offer.offerRejectedReason}
        </div>
      )}

      {offer.offerState === "PENDING" && (
        <div className="flex gap-4 mt-4">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            onClick={() => handleEditAndResend(offer)}
          >
            Editar y reenviar
          </button>
          <button
            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
            onClick={() => handleDiscardOnclick(offer)}
          >
            Descartar oferta
          </button>
        </div>
      )}

      <EditOfferModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        offerData={selectedOffer}
        token={token}
      />
    </div>
  );
};
