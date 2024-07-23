import React from 'react';

import {
  ContainerRegisterEntr,

} from '../styles/registerEntreprise.style';

import RegisterRecruiterForm from '../components/forms/RegisterRecruiterForm';

const RegisterEntreprise = () => {
  return (
    <ContainerRegisterEntr>
        <h2>Register Entreprise</h2>
        <RegisterRecruiterForm />
    </ContainerRegisterEntr>
  );
};

export default RegisterEntreprise;

