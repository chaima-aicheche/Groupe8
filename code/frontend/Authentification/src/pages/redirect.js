import React, { useEffect } from 'react';

import {
    ContainerRedirect,
    ContainerSubRedirect
} from '../styles/redirect.style';

import {
  StyledLink
} from '../styles/commun.style';

import logo from'../assets/logo.png';

const Redirect = () => {

    useEffect(() => {
        document.body.classList.add('no-scroll-y');
    
        const timer = setTimeout(() => {
          window.location.href = 'https://techtalent.fr';
        }, 250);
    
        return () => {
          document.body.classList.remove('no-scroll-y');
          clearTimeout(timer);
        };
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
