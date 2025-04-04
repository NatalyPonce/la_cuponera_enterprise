const fetchCategories = async () => {
    const URL = "https://apiv1.lacuponera.store/api/v1/categories";
    const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW50ZXJwcmlzZUlkIjoyLCJyb2xlIjoiZW50ZXJwcmlzZSIsImVtYWlsIjoibmFob21pQG5haG9taS5jb20iLCJpYXQiOjE3NDM3Nzk5NjcsImV4cCI6MTc0MzgwMTU2N30.YBPSgZBYpskG36g2Fvo9gmBpeJuMhbaiamTRiF7sunA";

    try {
        const response = await fetch(`${URL}`, {
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
