import React, { useEffect } from 'react';
import { Link, Route, Routes } from 'react-router-dom';

import {
    ContainerProfil,
    HeaderProfil,
    NavProfil,
    InfoProfil,
    BtnNavProfil,

    ContainerHeaderProfil,
    InfoHeaderProfil,
} from '../../styles/Profil/Profil.style';

import img from '../../assets/img.png';

import ProfilCandidat from './candidat';
import ProfilEntreprise from './entreprise';
import ProfilCv from './cv';

const Profil = () => {

  return (
    <ContainerProfil>
        <HeaderProfil>
            <ContainerHeaderProfil>
                <InfoHeaderProfil>
                    <div>
                        <img src={img}></img>
                    </div>
                    <div>
                        <h1>Nom Prenom</h1>
                        <p>adresse</p>
                    </div>
                </InfoHeaderProfil>
                <button>Edit Profil</button>
            </ContainerHeaderProfil>
        </HeaderProfil>
        <NavProfil>
            <BtnNavProfil>
                <Link to="Candidat">
                    <button> A propos </button>
                </Link>
            </BtnNavProfil>
            <BtnNavProfil>
                <Link to="CuriculumVitae">
                    <button> Cv </button>
                </Link>
            </BtnNavProfil>
            <BtnNavProfil>
                <Link to="Entreprise">
                    <button> A propos de l'entreprise </button>
                </Link>
            </BtnNavProfil>
        </NavProfil>
        <InfoProfil>
            <Routes>
                <Route path="Candidat" element={<ProfilCandidat />} />
                <Route path="CuriculumVitae" element={<ProfilCv />} />
                <Route path="Entreprise" element={<ProfilEntreprise />} />
            </Routes>
        </InfoProfil>
    </ContainerProfil>
  );
};

export default Profil;

