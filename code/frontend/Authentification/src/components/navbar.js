import React, { useState } from 'react';

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

  const [activeP, setActiveP] = useState('connect');

  const handlePClick = (pName) => {
    setActiveP(pName);
  };

  return (
    <ContainerNav>
      <HomeNav>
        <StyledLink to="/"><h1>Tech Talent</h1></StyledLink>
      </HomeNav>
      <Navigation>
        <div>
          <BtnContact isActive={activeP == 'contact'} onClick={() => handlePClick('contact')}>
            <StyledLink to="/Contact">Contact</StyledLink>
          </BtnContact>
        </div>
        <div>
          <BtnConnect isActive={activeP == 'connect'}  onClick={() => handlePClick('connect')}>
            <StyledLink to="/">Connexion</StyledLink>
          </BtnConnect>
          <BtnEntrerpise isActive={activeP == 'entreprise'}  onClick={() => handlePClick('entreprise')}>
            <StyledLink to="/RegisterEntreprise">Entreprise</StyledLink>
          </BtnEntrerpise>
          <BtnCandidat isActive={activeP == 'candidat'}  onClick={() => handlePClick('candidat')}>
            <StyledLink to="/RegisterCandidat">Candidat</StyledLink>
          </BtnCandidat>
        </div>
      </Navigation>
    </ContainerNav>
  );
};

export default Navbar;
