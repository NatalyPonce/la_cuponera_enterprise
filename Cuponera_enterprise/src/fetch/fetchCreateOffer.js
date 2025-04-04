const fetchCreateOffer = async (data) => {
    const URL = "https://apiv1.lacuponera.store/api/v1/offers/enterprise";
    const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW50ZXJwcmlzZUlkIjoyLCJyb2xlIjoiZW50ZXJwcmlzZSIsImVtYWlsIjoibmFob21pQG5haG9taS5jb20iLCJpYXQiOjE3NDM4MDE3NjYsImV4cCI6MTc0MzgyMzM2Nn0.z65rLpkaRsISt4R25KPH_bhhOmbGA_n4uuGNzc4FfrM";

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
