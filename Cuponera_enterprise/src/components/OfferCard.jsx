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

  const getClassByStatus = (status) => {
    switch (status) {
      case "PENDING":
        return "border-l-4 border-yellow-400 p-4 bg-yellow-50";
      case "APPROVED":
        return "border-l-4 border-green-500 p-4 bg-green-50";
      case "REJECTED":
        return "border-l-4 border-red-500 p-4 bg-red-50";
      case "DISCARDED":
        return "border-l-4 border-gray-400 p-4 bg-gray-100";
      default:
        return "border-l-4 border-blue-500 p-4 bg-white";
    }
  };
  

  return (
    <div className={getClassByStatus(offer.offerState)}>
      <div className="flex items-center mb-4">
        <img src="/coupon.png" alt="coupon" className="w-10 h-10 mr-3" />
        <h2 className="text-2xl font-semibold text-gray-800">{offer.title}</h2>
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
        <>
          <p className="text-gray-600 italic mb-4">{offer.description}</p>

          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-700">
            <div>
              <span className="font-medium text-gray-900">Estado:</span>{" "}
              {offer.offerState}
            </div>
            <div>
              <span className="font-medium text-gray-900">Precio Original:</span> $
              {offer.originalPrice}
            </div>
            <div>
              <span className="font-medium text-gray-900">Con Descuento:</span> $
              {offer.discountPrice}
            </div>
            <div>
              <span className="font-medium text-gray-900">Válido Desde:</span>{" "}
              {new Date(offer.validFrom).toLocaleDateString()}
            </div>
            <div>
              <span className="font-medium text-gray-900">Válido Hasta:</span>{" "}
              {new Date(offer.validUntil).toLocaleDateString()}
            </div>
            <div>
              <span className="font-medium text-gray-900">Cantidad Límite:</span>{" "}
              {offer.quantityLimit}
            </div>
            <div>
              <span className="font-medium text-gray-900">Vendidos:</span>{" "}
              {offer.sold}
            </div>
            <div>
              <span className="font-medium text-gray-900">Disponibles:</span>{" "}
              {offer.quantityLimit - offer.sold}
            </div>
            <div className="col-span-2">
              <span className="font-medium text-gray-900">Ingresos Totales:</span> $
              {offer.discountPrice * offer.sold}
            </div>

            {offer.offerState !== "DISCARDED" && (
              <div className="col-span-2">
                <span className="font-medium text-gray-900">Cargo por servicio:</span>{" "}
              </div>
            )}

            {offer.offerRejectedReason && (
              <div className="col-span-2 text-red-600">
                <span className="font-medium">Razón de Rechazo:</span>{" "}
                {offer.offerRejectedReason}
              </div>
            )}
          </div>
        </>
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
            className="bg-red-500 text-white py-2 px-4 rounded-xl hover:bg-red-600 transition"
            onClick={() => handleDiscardOnclick(offer)}
          >
            Descartar
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