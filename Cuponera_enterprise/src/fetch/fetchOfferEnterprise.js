const fetchOfferEnterprise = async () => {
    const URL = "https://apiv1.lacuponera.store/api/v1/offers/enterprise";
   const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW50ZXJwcmlzZUlkIjoyLCJyb2xlIjoiZW50ZXJwcmlzZSIsImVtYWlsIjoibmFob21pQG5haG9taS5jb20iLCJpYXQiOjE3NDM4MDcxMjgsImV4cCI6MTc0MzgyODcyOH0.-0w-JLtl_He2D5prCkL5G6WjZXCNccImSKPkHdMRVAE  ";
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
