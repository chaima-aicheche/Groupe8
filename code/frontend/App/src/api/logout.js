export const logout = async () => {
  try {
    const response = await fetch(`/api/logout`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Erreur lors de la requête: ${response.statusText}`);
    }

    console.log('Déconnexion réussie.');
  } catch (error) {
    console.error('Erreur:', error);
    throw error;
  }
};
