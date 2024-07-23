import React, { useEffect, useState } from 'react';
import { ContainerGithub } from '../styles/github.style';
import { getAuthCodeFromURL, exchangeCodeForToken } from '../api/oauth';

const Github = () => {
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleAuthCode = async () => {
      const code = getAuthCodeFromURL();
      if (code) {
        try {
          const data = await exchangeCodeForToken(code);

          console.log(data);
        } catch (err) {
          setError('Une erreur est survenue lors de l\'échange du code.');
        }
      } else {
        setError('Code d\'autorisation non trouvé dans l\'URL.');
      }

    };

    handleAuthCode();
  }, []);

  return (
    <ContainerGithub>
      {error && <p>Erreur: {error}</p>}
      {!error && (
        <>
          <h2>Github</h2>
          <p>Jeton d'accès obtenu avec succès!</p>
        </>
      )}
    </ContainerGithub>
  );
};

export default Github;

