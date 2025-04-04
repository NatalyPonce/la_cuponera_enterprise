const fetchCategories = async () => {
    const URL = "https://apiv1.lacuponera.store/api/v1/categories";
    const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYWRtaW5JZCI6MSwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJpYXQiOjE3NDM3OTQ1NzIsImV4cCI6MTc0MzgxNjE3Mn0.ovYFdrIUHd37hi9ml54K8jOpBx_MMS9Cj-SSoFRCP0w";

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
