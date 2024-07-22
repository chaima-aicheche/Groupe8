const API_URL = 'https://auth.techtalent.fr/api';

const handleResponse = async (response) => {
    if (!response.ok) {
        const errorData = await response.json();
        const error = new Error('Erreur lors de la requête');
        error.data = errorData;
        throw error;
    }
    return response.json();
};

export const register = async (formData, role) => {
    const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ [role]: formData })
    });

    return handleResponse(response);
};

