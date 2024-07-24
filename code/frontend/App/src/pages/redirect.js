import React, { useEffect } from 'react';

import {
    ContainerRedirect,
    ContainerSubRedirect
} from '../styles/redirect.style';

import logo from'../assets/logo.png';

import { logout } from '../api/logout';

const Redirect = () => {

    useEffect(() => {

        sessionStorage.removeItem("accessToken");
        try {
          logout();
        } catch (err) {
          setError('Une erreur est survenue lors du logout.');
        }
    
        const timer = setTimeout(() => {
          window.location.href = 'https://techtalent.fr';
        }, 500);
    }, []);

  return (
    <ContainerRedirect>
        <ContainerSubRedirect>
            <div>
                <img src={logo}></img>
            </div>
            <div>
                <p>Redirection en cours...</p>
            </div>
        </ContainerSubRedirect>
    </ContainerRedirect>
  );
};

export default Redirect;
