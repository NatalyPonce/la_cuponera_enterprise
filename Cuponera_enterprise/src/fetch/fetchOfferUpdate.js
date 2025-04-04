const fetchUpdateOffer = async (offerId, updatedData, token) => {
    try {
      const response = await fetch(
        `https://apiv1.lacuponera.store/api/v1/offers/enterprise/${offerId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW50ZXJwcmlzZUlkIjoyLCJyb2xlIjoiZW50ZXJwcmlzZSIsImVtYWlsIjoibmFob21pQG5haG9taS5jb20iLCJpYXQiOjE3NDM4MTA1MzYsImV4cCI6MTc0MzgzMjEzNn0.5PXpQdLuhB_JJ5_bwWHgU0rlVF4V00Y-_0Fh-LCnqo4"}`,
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
  