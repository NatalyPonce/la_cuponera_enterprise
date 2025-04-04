const fetchUpdateOffer = async (offerId, updatedData, token) => {
    try {
      const response = await fetch(
        `https://apiv1.lacuponera.store/api/v1/offers/enterprise/${offerId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedData),
        }
      );
  
      if (!response.ok) {
        throw new Error("Error al actualizar la oferta.");
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("fetchUpdateOffer error:", error);
      return null;
    }
  };
  
  export default fetchUpdateOffer;
  