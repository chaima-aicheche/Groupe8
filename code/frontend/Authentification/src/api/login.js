export const login = async (formData) => {
  try {
    const response = await fetch(`/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la requête');
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};
