import React, { useState } from 'react';
import './style.css'; 

const RegisterRecruiterForm = () => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    raisonSociale: '',
    categorie: '',
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
              name="nom"
              placeholder="Nom"
              value={formData.nom}
              onChange={handleChange}
              className="form-input"
              autoComplete="given-name" 
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
              autoComplete="family-name" 
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-col">
            <input
              type="text"
              name="raisonSociale"
              placeholder="Raison sociale"
              value={formData.raisonSociale}
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
            <div className="small-text">Siège Social</div>
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
        <div className="form-row">
          <div className="form-col">
            <input
              type="text"
              name="codepostal"
              placeholder="Code postal"
              value={formData.codepostal}
              onChange={handleChange}
              className="form-input"
              autoComplete="postal-code" 
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
        <button type="submit" className="form-button">Register</button>
      </form>
    </div>
  );
};

export default RegisterRecruiterForm;
