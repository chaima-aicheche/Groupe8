import './RecruiterProfile.css';
import React, { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

const initialData = {
  company: 'Nom de l\'entreprise',
  about: 'À propos de l\'entreprise',
  email: 'email@example.com',
  category: '',
  codePostal: '75000',
  phoneNumber: '',
  country: 'France',
  city: 'Paris'
};

const categories = [
  'Technologie',
  'Finance',
  'Santé',
  'Éducation',
  'Marketing',
  'Manufacturing',
  'Transport',
  'Retail',
  'Énergie',
  'Autres'
];

const UserInfoSection = ({ label, value, type, handleChange, editMode }) => (
  <div className="profile-section">
    <p className="profile-label">{label}</p>
    {editMode ? (
      <input
        type={type || 'text'}
        name={value.name}
        value={value.value}
        onChange={handleChange}
        className="profile-input"
      />
    ) : (
      <p className="profile-value">{value.value}</p>
    )}
  </div>
);

const RecruiterProfile = () => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(initialData);
  const [profilePhoto, setProfilePhoto] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Envoyer les données modifiées au serveur
    console.log(formData);
    setEditMode(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfilePhoto(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile">
      <header className="profile-header">
        <div className="profile-photo-section">
          {profilePhoto ? (
            <img src={profilePhoto} alt="Photo de profil" className="profile-photo" />
          ) : (
            editMode && (
              <label htmlFor="profilePhotoInput" className="profile-photo-upload">
                Sélectionner une photo
                <input
                  type="file"
                  id="profilePhotoInput"
                  onChange={handleFileChange}
                  className="profile-photo-input"
                />
              </label>
            )
          )}
        </div>
        <div className="profile-name-section">
          <h1>{formData.company}</h1>
          <p className="profile-subinfo">{formData.codePostal}</p>
        </div>
        <button className="profile-edit-button" onClick={() => setEditMode(!editMode)}>
          {editMode ? 'Annuler' : 'Modifier'}
        </button>
      </header>
      <form onSubmit={handleSubmit}>
        <div className="profile-body">
          <UserInfoSection
            label="À propos de l'entreprise"
            value={{ name: 'about', value: formData.about }}
            type="textarea"
            handleChange={handleChange}
            editMode={editMode}
          />
          <UserInfoSection
            label="Email"
            value={{ name: 'email', value: formData.email }}
            type="email"
            handleChange={handleChange}
            editMode={editMode}
          />
          <div className="profile-section">
            <p className="profile-label">Catégorie</p>
            {editMode ? (
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="profile-input"
              >
                <option value="" disabled>Choisir une catégorie</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </select>
            ) : (
              <p className="profile-value">{formData.category}</p>
            )}
          </div>
          <UserInfoSection
            label="Code postal"
            value={{ name: 'codePostal', value: formData.codePostal }}
            handleChange={handleChange}
            editMode={editMode}
          />
          <div className="profile-section">
            <p className="profile-label">Numéro de téléphone</p>
            {editMode ? (
              <PhoneInput
                placeholder="Enter phone number"
                value={formData.phoneNumber}
                onChange={(value) => setFormData({ ...formData, phoneNumber: value })}
                className="profile-input"
              />
            ) : (
              <p className="profile-value">{formData.phoneNumber}</p>
            )}
          </div>
          <UserInfoSection
            label="Pays"
            value={{ name: 'country', value: formData.country }}
            handleChange={handleChange}
            editMode={editMode}
          />
          <UserInfoSection
            label="Ville"
            value={{ name: 'city', value: formData.city }}
            handleChange={handleChange}
            editMode={editMode}
          />
        </div>
        {editMode && (
          <button type="submit" className="profile-submit-button">
            Enregistrer
          </button>
        )}
      </form>
    </div>
  );
};

export default RecruiterProfile;
