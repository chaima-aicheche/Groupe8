import React from 'react';

import {
  ContainerFooter,

} from '../styles/footer.style';

const Footer = () => {
  return (
    <ContainerFooter>
        <div>
            <img alt="Logo1" />
            <img alt="Logo2" />
            <img alt="Logo3" />
        </div>
        <div>
            <h5>Espace Candidats</h5>
            <a>Toute les offres</a>
            <a>Profils recruteurs</a>
        </div>
        <div>
            <h5>Espace Recruteurs</h5>
            <a>Profils Candidats</a>
        </div>
        <div>
            <h5>Liens utiles</h5>
            <a>Qui sommes nous ?</a>
        </div>
    </ContainerFooter>
  );
};

export default Footer;
