import React from 'react'

const OfferCard = ({ title, state, description, originalPrice, discountPrice, validFrom, validUntil }) => {
  return (
    <>
      <div className='p-4 py-7'>
        <h2 className="text-lg font-bold uppercase">{title}</h2>
        <p className="text-gray-700">{description}</p>
        <p className="text-gray-500">State: {state}</p>
        <p className="text-gray-500">Original Price: ${originalPrice}</p>
        <p className="text-gray-500">Discount Price: ${discountPrice}</p>
        <p className="text-gray-500">Valid From: {validFrom}</p>
        <p className="text-gray-500">Valid Until: {validUntil}</p>
      </div>
    </>
  )
}

export default OfferCard