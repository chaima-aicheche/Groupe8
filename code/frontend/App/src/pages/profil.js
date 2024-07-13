import React, { useEffect } from 'react';
import { Link, Route, Routes } from 'react-router-dom';

import {
    ContainerProfil,
    HeaderProfil,
    NavProfil,
    InfoProfil,
    BtnNavProfil
} from '../styles/Profil.style';

const TT = () => {

    return (
        <p>test</p>
    );
}


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
                <Link to="/aPropos">
                    <button> A propos </button>
                </Link>
            </BtnNavProfil>
            <BtnNavProfil>
                <Link to="/CuriculumVitae">
                    <button> Cv </button>
                </Link>
            </BtnNavProfil>
            <BtnNavProfil>
                <Link to="/aProposDelEntreprise">
                    <button> A propos de l'entreprise </button>
                </Link>
            </BtnNavProfil>
        </NavProfil>
        <InfoProfil>
            <Routes>
                <Route path="/aPropos" element={<TT />} />
                <Route path="/CuriculumVitae" element={<TT />} />
                <Route path="/aProposDelEntreprise" element={<TT />} />
            </Routes>
        </InfoProfil>
    </ContainerProfil>
  );
};

export default Profil;

