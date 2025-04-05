const fetchOfferEnterprise = async () => {
    const URL = "https://apiv1.lacuponera.store/api/v1/offers/enterprise";
    try {
        const response = await fetch(`${URL}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
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
