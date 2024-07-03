import React from 'react';

import {
  ContainerNav,
  HomeNav,
  Navigation,

  BtnContact,
  BtnConnect,

  BtnEntrerpise,
  BtnCandidat
} from '../styles/navbar.style';

import {
  StyledLink
} from '../styles/commun.style';

const Navbar = () => {
  return (
    <ContainerNav>
      <HomeNav>
        <StyledLink to="/">Logo/Home</StyledLink>
      </HomeNav>
      <Navigation>
        <div>
          <BtnContact>
            <StyledLink to="/Contact">Contact</StyledLink>
          </BtnContact>
        </div>
        <div>
          <BtnConnect>
            <StyledLink to="/">Connexion</StyledLink>
          </BtnConnect>
          <BtnEntrerpise>
            <StyledLink to="/RegisterEntreprise">Entreprise</StyledLink>
          </BtnEntrerpise>
          <BtnCandidat>
            <StyledLink to="/RegisterCandidat">Candidat</StyledLink>
          </BtnCandidat>
        </div>
      </Navigation>
    </ContainerNav>
  );
};

export default Navbar;
