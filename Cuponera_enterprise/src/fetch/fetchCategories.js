const fetchCategories = async () => {
    const URL = import.meta.env.VITE_BASE_URL;
    const TOKEN = import.meta.env.VITE_TOKEN_ADMIN;

    try {
        const response = await fetch(`${URL}/categories`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${TOKEN}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error al obtener categorías: ${response.status}`);
        }

        const data = await response.json();
        console.log()
        return data;
    } catch (error) {
        console.error('Error en fetchCategories:', error);
        return null;
    }
};

export default fetchCategories;
