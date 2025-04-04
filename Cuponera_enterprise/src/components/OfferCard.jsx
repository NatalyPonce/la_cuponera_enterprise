import React from "react";

export const OfferCard = ({ offer }) => {
  return (
    <div className="border border-gray-300 rounded-2xl shadow-md p-4 max-w-md bg-white">
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

      {offer.offerRejectedReason && (
        <div>
          <strong>Razón de Rechazo:</strong> {offer.offerRejectedReason}
        </div>
      )}
    </div>
  );
};
