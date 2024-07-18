// src/components/RegisterRecruiterForm.js

import React, { useState } from 'react';
import './style.css';
import { register } from '../../api/register';

const RegisterRecruiterForm = () => {
  const [formData, setFormData] = useState({
    raison_sociale: '',
    categorie: '',
    num: '',
    adresse: '',
    ville: '',
    code_postal: '',
    pays: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const data = await register(formData, "Entreprise");
      setSuccess('Utilisateur enregistré avec succès !');
    } catch (error) {
      setError('Erreur lors de l\'enregistrement');
      console.error('Erreur lors de la requête :', error);
    }
  };

  return (
    <div className="form-container">
      <div className="form-paragraphe">
        <p>Unlock your potential to find the best talent.<br />Register as a recruiter now!</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-col">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              autoComplete="email"
              required
            />
          </div>
          <div className="form-col">
            <input
              type="password"
              name="password"
              placeholder="Mot de passe"
              value={formData.password}
              onChange={handleChange}
              className="form-input"
              autoComplete="current-password"
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-col">
            <input
              type="text"
              name="raison_sociale"
              placeholder="Raison sociale"
              value={formData.raison_sociale}
              onChange={handleChange}
              className="form-input"
              autoComplete="organization"
              required
            />
          </div>
          <div className="form-col">
            <input
              type="text"
              name="num"
              placeholder="N SIREN / SIRET"
              value={formData.num}
              onChange={handleChange}
              className="form-input"
              autoComplete="off"
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-col">
            <input
              type="text"
              name="categorie"
              placeholder="Categorie"
              value={formData.categorie}
              onChange={handleChange}
              className="form-input"
              autoComplete="categorie"
              required
            />
          </div>
          <div className="form-col">
          </div>
        </div>
        <div className="form-row">
          <div className="form-col">
            <p style={{ margin: 0 }}>Siége Sociale</p>
          </div>
          <div className="form-col"></div>
        </div>
        <div className="form-row">
          <div className="form-col">
            <input
              type="text"
              name="adresse"
              placeholder="Adresse"
              value={formData.adresse}
              onChange={handleChange}
              className="form-input"
              autoComplete="street-address"
              required
            />
          </div>
          <div className="form-col">
            <input
              type="text"
              name="pays"
              placeholder="Pays"
              value={formData.pays}
              onChange={handleChange}
              className="form-input"
              autoComplete="country"
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-col">
            <input
              type="text"
              name="code_postal"
              placeholder="Code postal"
              value={formData.code_postal}
              onChange={handleChange}
              className="form-input"
              autoComplete="postal-code"
              required
            />
          </div>
          <div className="form-col">
            <input
              type="text"
              name="ville"
              placeholder="Ville"
              value={formData.ville}
              onChange={handleChange}
              className="form-input"
              autoComplete="address-level2"
              required
            />
          </div>
        </div>
        <button type="submit" className="form-button">Register</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
      </form>
    </div>
  );
};

export default RegisterRecruiterForm;
