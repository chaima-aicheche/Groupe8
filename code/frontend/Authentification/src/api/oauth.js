
// callback function
export const getAuthCodeFromURL = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get('code');
};

export const exchangeCodeForToken = async (code) => {
    try {
        const response = await fetch('/api/auth/github', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code, "provider": "github" }),
        });

        if (!response.ok)
            throw new Error('Erreur lors de l\'échange du code contre un jeton.');

        const data = await response.json();

        console.log(data);

        const accessToken = data.access_token;
        sessionStorage.setItem('accessToken', accessToken);
        
        return data;
    } catch (err) {
        console.error(err);
        return null;
    }
};
//

// get url github connect
export async function get_url() {
    try {
    const response = await fetch(`/api/oauth/get_url`, {
      method: 'GET'
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la requête');
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};
//