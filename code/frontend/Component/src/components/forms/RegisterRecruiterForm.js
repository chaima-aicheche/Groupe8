import React, { useState } from 'react';
import './RegisterRecruiterForm.css'; 

const RegisterRecruiterForm = () => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    entreprise: '',
    num: '',
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
        <h1>Register as Recruiter</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-col">
            <label className="form-label">Nom :</label>
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-col">
            <label className="form-label">Prénom :</label>
            <input
              type="text"
              name="prenom"
              value={formData.prenom}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-col">
            <label className="form-label">Entreprise :</label>
            <input
              type="text"
              name="entreprise"
              value={formData.entreprise}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-col">
            <label className="form-label">N SIREN / SIRET :</label>
            <input
              type="text"
              name="num"
              value={formData.num}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-col">
            <label className="form-label">Adresse :</label>
            <input
              type="text"
              name="adresse"
              value={formData.adresse}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-col">
            <label className="form-label">Ville :</label>
            <input
              type="text"
              name="ville"
              value={formData.ville}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-col">
            <label className="form-label">Code postal :</label>
            <input
              type="text"
              name="codepostal"
              value={formData.codepostal}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-col">
            <label className="form-label">Pays :</label>
            <input
              type="text"
              name="pays"
              value={formData.pays}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-col">
            <label className="form-label">Email :</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-col">
            <label className="form-label">Mot de passe :</label>
            <input
              type="password"
              name="password"
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

export default RegisterRecruiterForm;
