const fetchDiscardOffer = async (offer) => {
    const URL = `https://apiv1.lacuponera.store/api/v1/offers/enterprise/${offer.id}/discard`;
    const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW50ZXJwcmlzZUlkIjoyLCJyb2xlIjoiZW50ZXJwcmlzZSIsImVtYWlsIjoibmFob21pQG5haG9taS5jb20iLCJpYXQiOjE3NDM3Nzk5NjcsImV4cCI6MTc0MzgwMTU2N30.YBPSgZBYpskG36g2Fvo9gmBpeJuMhbaiamTRiF7sunA";
    try {
        const response = await fetch(`${URL}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${TOKEN}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error al descartar la oferta: ${response.status}`);
        }
        const responseData = await response.json();
        console.log(responseData);
        return responseData;
    } catch (error) {
        console.error('Error en fetchDiscardOffer:', error);
        return null;
    }
};

export default fetchDiscardOffer;
