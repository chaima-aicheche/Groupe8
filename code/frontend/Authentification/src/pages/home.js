import React, { useEffect } from 'react';

import {
  ContainerHome,

  LoginHome,
  ImageHome,
  FormHome,
} from '../styles/home.style';

import {
  StyledLink
} from '../styles/commun.style';

const Home = () => {

  useEffect(() => {
    document.body.classList.add('no-scroll-y');

    return () => {
      document.body.classList.remove('no-scroll-y');
    };
  }, []);

  return (
    <ContainerHome>
      <LoginHome>
        <ImageHome>
          <div>
            <h1>Welcome Back</h1>
          </div>
          <div>
            <p>Please log in using your personal information to stay connected with us.</p>
          </div>
        </ImageHome>
        <FormHome>
          <div>
            <h1> Login </h1>
          </div>
          <div>
            <input placeholder='Email'></input>
            <input placeholder='Password'></input>
            <StyledLink to="/ResetPassword">Forgot Password ?</StyledLink>
          </div>
          <div>
            <StyledLink to="/Redirect">
              <p> Log in </p>
            </StyledLink>
          </div>
          <div>
            <p>Don't have an account?</p>
            <StyledLink to="/RegisterCandidat">Sign Up</StyledLink>
          </div>
        </FormHome>
      </LoginHome>
    </ContainerHome>
  );
};

export default Home;
