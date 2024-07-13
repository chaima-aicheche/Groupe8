import React from 'react';

import {
  ContainerRegisterCand,

} from '../styles/registerCandidat.style';

import RegisterCandidateForm from '../components/forms/RegisterCandidateForm';

const RegisterCandidat = () => {
  return (
    <ContainerRegisterCand>
        <h2>Register Candidat</h2>
        <RegisterCandidateForm />
    </ContainerRegisterCand>
  );
};

export default RegisterCandidat;

