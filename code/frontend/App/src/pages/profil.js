import React, { useEffect } from 'react';

import {
    ContainerProfil,
    HeaderProfil,
    NavProfil,
    InfoProfil,
    BtnNavProfil
} from '../styles/Profil.style';


const Profil = () => {

  return (
    <ContainerProfil>
        <HeaderProfil>
            <div>
            <p> profil </p>
            </div>
        </HeaderProfil>
        <NavProfil>
            <BtnNavProfil>
                <button> A propos </button>
            </BtnNavProfil>
            <BtnNavProfil>
                <button> Cv </button>
            </BtnNavProfil>
            <BtnNavProfil>
                <button> A propos de l'entreprise </button>
            </BtnNavProfil>
        </NavProfil>
        <InfoProfil>
            <p> info </p>
        </InfoProfil>
    </ContainerProfil>
  );
};

export default Profil;

