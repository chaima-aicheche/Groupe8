import React from 'react';

import {
  ContainerResetPass,

} from '../styles/resetPassword.style';

import ResetPasswordForm from '../components/forms/ResetPasswordForm';

const ResetPassword = () => {
  return (
    <ContainerResetPass>
        <h2>Reset Password</h2>
        <ResetPasswordForm />
    </ContainerResetPass>
  );
};

export default ResetPassword;
