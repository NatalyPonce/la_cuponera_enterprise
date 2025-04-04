const fetchOfferEnterprise = async () => {
    const URL = "https://apiv1.lacuponera.store/api/v1/offers/enterprise";
   const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW50ZXJwcmlzZUlkIjoyLCJyb2xlIjoiZW50ZXJwcmlzZSIsImVtYWlsIjoibmFob21pQG5haG9taS5jb20iLCJpYXQiOjE3NDM4MTA1MzYsImV4cCI6MTc0MzgzMjEzNn0.5PXpQdLuhB_JJ5_bwWHgU0rlVF4V00Y-_0Fh-LCnqo4";
    try {
        const response = await fetch(`${URL}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${TOKEN}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error al obtener ofertas: ${response.status}`);
        }

        const data = await response.json();
        console.log(data)
        return data;
    } catch (error) {
        console.error('Error en fetchOfferEnterprise:', error);
        return null;
    }
};

export default fetchOfferEnterprise;
