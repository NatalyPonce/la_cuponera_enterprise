import React, { useState } from 'react'

const ReclamarCuponDetalles = ({ offer, enterprise, client }) => {

    const now = new Date();
    const expired = Date.parse(offer.validUntil) < now;
    const [redeemed, setRedeemed] = useState(false);

    const handleReclamar = () => {
        const authToken = localStorage.getItem('authToken');
        console.log(offer.id);
        fetch(`https://ez7weiqisc.execute-api.us-east-1.amazonaws.com/v1/offers/${offer.id}/redeem`, {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + authToken
            }
        }).then((res) => {
            setRedeemed(res.ok);
        })
        .catch(err => console.error(err.message))
    }

    return (
        <>
            <div className="flex justify-center items-center">
                <h2 className="lg:text-3xl md:text-3xl text-2xl text-resaltador">
                    Comprobación
                </h2>
            </div>

            {/* Componente de los detalles del cupón en sí */}
            <div className="flex lg:flex-row flex-col items-center justify-center py-16 lg:mx-32 md:mx-16 mx-8 lg:gap-x-24 lg:gap-y-0 gap-y-12 mt-12">
                <img className="w-64 lg:w-auto" src="../../../public/img/Cuponazo.png" alt="" />

                {/* Descripción de la oferta generada */}
                <div className="flex flex-col items-center text-center text-lg">
                    <h3>{offer.id}</h3>                    
                    <p className="line-through text-md opacity-80">Regular: ${parseFloat(offer.regularPrice).toFixed(2)}</p>
                    <p className="text-xl text-resaltador">Oferta: ${parseFloat(offer.offerPrice).toFixed(2)}</p>
                    {offer.redeemed ? <p className="text-red-500">Reclamado</p> : <p className="text-green-500">Válido</p>}
                    <p className="text-red-500">{expired && "Cupón expirado"}</p>
                    <p>Empresa: {enterprise.enterpriseName}</p>
                    <p>Cliente: {client.firstName + " " + client.lastName}</p>
                    <p>DUI del cliente: {client.dui}</p>
                    {redeemed || offer.redeemed ? <button className="hover:cursor-not-allowed bg-slate-800 opacity-70 p-6 mt-4 text-xl text-gray-300">¡Cupón Reclamado!</button> : <button disabled={expired} className="hover:cursor-pointer bg-resaltador text-white p-6 mt-4 text-xl" onClick={handleReclamar}>Reclamar</button>}
                </div>
            </div>
        </>
    )
}

export default ReclamarCuponDetalles