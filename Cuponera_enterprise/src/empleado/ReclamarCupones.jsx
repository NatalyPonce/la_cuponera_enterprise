import React, { useState } from 'react';
import ReclamarCuponDetalles from './ReclamarCuponDetalles';
import fetchCouponRedeem from '../fetch/fetchCouponRedeem';

const ReclamarCupones = () => {
  const [codigoCupon, setCodigoCupon] = useState("");
  const [dui, setDui] = useState("");
  const [error, setError] = useState("");
  const [offerData, setOfferData] = useState({});

  const handleChangeCodigoCupon = (e) => {
    setCodigoCupon(e.target.value);
  };

  const handleChangeDui = (e) => {
    setDui(e.target.value);
  };

  const handleRedimirCupon = () => {
    setError("");

    if (!codigoCupon.trim() || !dui.trim()) {
      setError("Debe ingresar el código del cupón y su DUI.");
      return;
    }

    fetchCouponRedeem({ couponCode: codigoCupon, DUI: dui })
      .then(data => {
        if (data?.offer) {
          setOfferData(data);
        } else {
          setError("No se pudo redimir el cupón o no existe.");
        }
      })
      .catch(err => {
        setError("Error al redimir el cupón.");
        console.error(err);
      });
  };

  return (
    <div className={"bg-base " + (Object.keys(offerData).length === 0 ? "h-screen" : "h-full")}>
      <div>
        <div className="flex justify-center align-items-center lg:p-8 md:p-6 p-4 bg-base">
          <h1 className="lg:text-3xl md:text-2xl text-xl text-resaltador">
            Canjear Cupones
          </h1>
        </div>

        <div className="flex justify-center items-center lg:flex-row flex-col bg-fondo p-12 my-24 lg:mx-24 md:mx-12 mx-6 lg:gap-x-10 lg:gap-y-0 gap-y-10">
          <div className="flex flex-col gap-4 w-full">
            <label className="text-primary text-xl text-center">Ingresar Código</label>
            <input
              type="text"
              className="w-full bg-white border-primary border-4 h-12 text-xl p-4"
              onChange={handleChangeCodigoCupon}
              value={codigoCupon}
              placeholder="Ej. CUPON123"
            />

            <label className="text-primary text-xl text-center">Ingresar DUI</label>
            <input
              type="text"
              className="w-full bg-white border-primary border-4 h-12 text-xl p-4"
              onChange={handleChangeDui}
              value={dui}
              placeholder="Ej. 01234567-8"
            />

            {error && <p className="text-red-600 text-xl text-center">{error}</p>}

            <div className="flex justify-center">
              <button
                className="bg-black text-white p-4 text-xl mt-4"
                onClick={handleRedimirCupon}
              >
                Redimir Cupón
              </button>
            </div>
          </div>
        </div>

        {/* Mostrar detalles del cupón redimido */}
        {offerData.offer && (
          <ReclamarCuponDetalles
            offer={offerData.offer}
            enterprise={offerData.enterprise}
            client={offerData.client}
          />
        )}
      </div>
    </div>
  );
};
export default ReclamarCupones;
