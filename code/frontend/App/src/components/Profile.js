import React, { useState } from 'react';
import './Profile.css'

// Exemple de données de profil à récupérer depuis la base de données
const profileData = {
  nom: 'Doe',
  prenom: 'John',
  aPropos: 'Senior Developer at XYZ Corp.',
  email: 'johndoe@example.com',
  genre: 'Homme',
  codePostal: '13002',
  ville: 'Marseille',
  dateNaissance: '1980-01-01', // format ISO pour date picker
  pays: 'France',
  numeroTelephone: '0123456789'
};

const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(profileData);
  const [profilePhoto, setProfilePhoto] = useState('');
  const [activeTab, setActiveTab] = useState('aPropos');

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

  const UserInfoSection = ({ label, value, type, handleChange }) => (
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
          <h1>{`${formData.nom} ${formData.prenom}`}</h1>
          <p className="profile-subinfo">{formData.codePostal}</p>
        </div>
        <button className="profile-edit-button" onClick={() => setEditMode(!editMode)}>
          {editMode ? 'Annuler' : 'Modifier'}
        </button>
      </header>

      <div className="profile-tabs">
        <button
          className={`profile-tab ${activeTab === 'aPropos' ? 'active' : ''}`}
          onClick={() => setActiveTab('aPropos')}
        >
          A propos de moi
        </button>
        <button
          className={`profile-tab ${activeTab === 'cv' ? 'active' : ''}`}
          onClick={() => setActiveTab('cv')}
        >
          Mon CV
        </button>
      </div>

      <div className="profile-body">
        {activeTab === 'aPropos' ? (
          <UserInfoSection
            label="A propos de moi"
            value={{ name: 'aPropos', value: formData.aPropos }}
            handleChange={handleChange}
          />
        ) : (
          <div className="profile-section">
            <p className="profile-label">Mon CV</p>
            <a href="https://www.moo.com/" target="_blank" rel="noopener noreferrer">
              Moo cv
            </a>
          </div>
        )}

        <UserInfoSection
          label="Email"
          value={{ name: 'email', value: formData.email }}
          type="email"
          handleChange={handleChange}
        />
        <div className="profile-section">
          <p className="profile-label">Genre</p>
          {editMode ? (
            <select
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              className="profile-input"
            >
              <option value="Homme">Homme</option>
              <option value="Femme">Femme</option>
            </select>
          ) : (
            <p className="profile-value">{formData.genre}</p>
          )}
        </div>
        <UserInfoSection
          label="Code postal"
          value={{ name: 'codePostal', value: formData.codePostal }}
          handleChange={handleChange}
        />
        <UserInfoSection
          label="Date de naissance"
          value={{ name: 'dateNaissance', value: formData.dateNaissance }}
          type="date"
          handleChange={handleChange}
        />
        <UserInfoSection
          label="Ville"
          value={{ name: 'ville', value: formData.ville }}
          handleChange={handleChange}
        />
        <UserInfoSection
          label="Numéro de téléphone"
          value={{ name: 'numeroTelephone', value: formData.numeroTelephone }}
          handleChange={handleChange}
        />
        <UserInfoSection
          label="Pays"
          value={{ name: 'pays', value: formData.pays }}
          handleChange={handleChange}
        />
      </div>

      {editMode && (
        <button type="submit" className="profile-submit-button" onClick={handleSubmit}>
          Enregistrer
        </button>
      )}
    </div>
  );
};

export default Profile;
