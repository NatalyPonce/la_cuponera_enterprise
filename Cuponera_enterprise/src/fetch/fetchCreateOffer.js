const fetchCreateOffer = async (data) => {
    const URL = "https://apiv1.lacuponera.store/api/v1/offers/enterprise";
    const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW50ZXJwcmlzZUlkIjoyLCJyb2xlIjoiZW50ZXJwcmlzZSIsImVtYWlsIjoibmFob21pQG5haG9taS5jb20iLCJpYXQiOjE3NDM4MTA1MzYsImV4cCI6MTc0MzgzMjEzNn0.5PXpQdLuhB_JJ5_bwWHgU0rlVF4V00Y-_0Fh-LCnqo4";

    try {
        const response = await fetch(`${URL}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: data
        });

        if (!response.ok) {
            throw new Error(`Error al crear la oferta: ${response.status}`);
        }
        const responseData = await response.json();
        console.log(responseData);
        return responseData;
    } catch (error) {
        console.error('Error en fetchCreateOffer:', error);
        return null;
    }
};

export default fetchCreateOffer;
