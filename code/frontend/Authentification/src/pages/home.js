import React, { useState } from 'react';
import { StyledLink } from '../styles/commun.style';
import {
  ContainerHome,
  LoginHome,
  ImageHome,
  FormHome,
} from '../styles/home.style';

import { login } from '../api/login';

const Home = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);

    try {
      const data = await login(formData);
      setSuccess('Connexion réussie !');

      const accessToken = data.access_token;
      sessionStorage.setItem('accessToken', accessToken);

      const storedToken = sessionStorage.getItem('accessToken');
      if (storedToken === accessToken) {
        console.log('Le token d\'accès a été correctement stocké dans sessionStorage.');
      } else {
        console.error('Erreur : Le token d\'accès n\'a pas été correctement stocké dans sessionStorage.');
      }

      window.location.href =  'https://auth.techtalent.fr/Redirect'; //prod
      //window.location.href = 'http://localhost:3001/Redirect'; //dev
    } catch (error) {
      setError('Erreur lors de la connexion');
      console.error(error);
    }
  };

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
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="form-input"
              required
            />
            <StyledLink to="/ResetPassword">Forgot Password ?</StyledLink>
          </div>
          <div>
            <button onClick={handleSubmit}>
              Log in
            </button>
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
