const fetchCategories = async () => {
    const URL = "https://apiv1.lacuponera.store/api/v1/categories";
    const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJpYXQiOjE3NDM3Mjk5NTIsImV4cCI6MTc0Mzc1MTU1Mn0.G53RlXtIbJ85U1VRmZAYkIlUnDMX_5oh1dAXMehG6c8";

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
