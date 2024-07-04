import React, { useState } from 'react';
import './style.css'; 

const RegisterCandidateForm = () => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    adresse: '',
    ville: '',
    codepostal: '',
    pays: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
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
              name="codepostal"
              placeholder="Code postal"
              value={formData.codepostal}
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
        <button type="submit" className="form-button">Register</button>
      </form>
    </div>
  );
};

export default RegisterCandidateForm;
