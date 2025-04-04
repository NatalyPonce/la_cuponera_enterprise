import fetchDiscardOffer from "../fetch/fetchDiscardOffer";

const baseCardStyle =
  "rounded-2xl shadow-lg p-6 max-w-md transition-transform transform hover:scale-[1.02] hover:shadow-xl m-5 border-2";

const classForPending = `${baseCardStyle} border-yellow-300 bg-yellow-50`;
const classForApproved = `${baseCardStyle} border-green-300 bg-green-50`;
const classForRejected = `${baseCardStyle} border-red-300 bg-red-50`;
const classForDiscarded = `${baseCardStyle} border-stone-300 bg-stone-100`;

export const OfferCard = ({ offer }) => {
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

  const getClassByStatus = (status) => {
    switch (status) {
      case "PENDING":
        return classForPending;
      case "APPROVED":
        return classForApproved;
      case "REJECTED":
        return classForRejected;
      case "DISCARDED":
        return classForDiscarded;
      default:
        return `${baseCardStyle} bg-white border-gray-300`;
    }
  };

  return (
    <div className={getClassByStatus(offer.offerState)}>
      <div className="flex items-center mb-4">
        <img src="/coupon.png" alt="coupon" className="w-10 h-10 mr-3" />
        <h2 className="text-2xl font-semibold text-gray-800">{offer.title}</h2>
      </div>

      <div className="space-y-1 text-gray-700 text-sm">
        <p>
          <strong>Estado:</strong> {offer.offerState}
        </p>
        <p>
          <strong>Descripción:</strong> {offer.description}
        </p>
        <p>
          <strong>Precio Original:</strong> ${offer.originalPrice}
        </p>
        <p>
          <strong>Precio con Descuento:</strong> ${offer.discountPrice}
        </p>
        <p>
          <strong>Válido Desde:</strong>{" "}
          {new Date(offer.validFrom).toLocaleDateString()}
        </p>
        <p>
          <strong>Válido Hasta:</strong>{" "}
          {new Date(offer.validUntil).toLocaleDateString()}
        </p>
        <p>
          <strong>Límite de Cantidad:</strong> {offer.quantityLimit}
        </p>
        <p>
          <strong>Vendidos:</strong> {offer.sold}
        </p>
        <p>
          <strong>Disponibles:</strong> {offer.quantityLimit - offer.sold}
        </p>
        <p>
          <strong>Ingresos Totales:</strong> ${offer.discountPrice * offer.sold}
        </p>

        {offer.offerState !== "DISCARDED" && (
          <p>
            <strong>Cargo por servicio:</strong>{" "}
            {/* Aquí puedes agregar el dato si lo tienes */}
          </p>
        )}

        {offer.offerRejectedReason && (
          <p>
            <strong>Razón de Rechazo:</strong> {offer.offerRejectedReason}
          </p>
        )}
      </div>

      {offer.offerState === "PENDING" && (
        <div className="flex justify-end gap-3 mt-6">
          <button className="bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition">
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
    </div>
  );
};