import React, { useState } from 'react';
import { StyledLink } from '../styles/commun.style';
import {
  ContainerHome,
  LoginHome,
  ImageHome,
  FormHome,
} from '../styles/home.style';

import { login } from '../api/login';
import { get_url } from '../api/oauth';

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

    try {
      const data = await login(formData);
      setSuccess('Connexion réussie !');

      const accessToken = data.access_token;
      sessionStorage.setItem('accessToken', accessToken);

      window.location.href = 'https://auth.techtalent.fr/Redirect'; //prod
    } catch (error) {
      setError('Erreur lors de la connexion');
      console.error(error);
    }
  };

  const gitHub = async () => {
    try {
      const url = await get_url();
      window.location.href = url.authorization_url+"&scope=user:email+read:user"; //prod
    } catch (error) {
      setError('Erreur lors de la connexion');
    }
  }

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
            <div />
            <button onClick={gitHub}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/GitHub_Invertocat_Logo.svg/640px-GitHub_Invertocat_Logo.svg.png"></img>
              <p>
                Continuer avec GitHub | Candidat
              </p>
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
