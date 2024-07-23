// src/components/RegisterCandidateForm.js

import React, { useState } from 'react';
import './style.css'; 
import { register } from '../../api/register';

const RegisterCandidateForm = () => {
  const [formData, setFormData] = useState({
    nom: '',
    num: '',
    prenom: '',
    adresse: '',
    ville: '',
    code_postal: '',
    pays: '',
    email: '',
    password: '',
    genre: '',
    cv: 'aucun'
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
      const data = await register(formData, "Candidat");
      setSuccess('Utilisateur enregistré avec succès ! ');

      const timer = setTimeout(() => {
        window.location.href = 'https://auth.techtalent.fr/';
      }, 500);
    } catch (error) {
      setError('Erreur lors de l\'enregistrement');
      if (error.data) {
        setError(error.data.message);
      }
    }
  };

  return (
    <div className="form-container">
      <div className="form-paragraphe">
        <p>Take the first step towards <br />your future career .<br /> Register as a candidate today!</p>
        <div></div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-col">
            <input
              type="text"
              name="nom"
              placeholder="Nom"
              value={formData.nom}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-col">
            <input
              type="text"
              name="prenom"
              placeholder="Prénom"
              value={formData.prenom}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
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
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-col">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
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
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-col">
            <input
              type="text"
              name="genre"
              placeholder="Genre"
              value={formData.genre}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-col">
            <input
              type="text"
              name="num"
              placeholder="Numero de Téléphone"
              value={formData.num}
              onChange={handleChange}
              className="form-input"
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

export default RegisterCandidateForm;
