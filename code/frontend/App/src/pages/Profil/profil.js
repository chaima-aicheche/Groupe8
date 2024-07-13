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
    EditHeaderProfil
} from '../../styles/Profil/Profil.style';

import img from '../../assets/img.png';

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
                <EditHeaderProfil>
                    <p>Edit Profil</p>
                </EditHeaderProfil>
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
                <Route path="Candidat" />
                <Route path="CuriculumVitae" />
                <Route path="Entreprise" />
            </Routes>
        </InfoProfil>
    </ContainerProfil>
  );
};

export default Profil;

