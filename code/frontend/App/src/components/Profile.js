import './Profile.css';
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import 'react-phone-number-input/style.css'; 
import PhoneInput from 'react-phone-number-input';

// Exemple de données de profil à récupérer depuis la base de données
const profileData = {
  nom: 'Test',
  prenom: 'testt',
  aPropos: 'Senior Developer  .',
  email: 'test@example.com',
  genre: 'Homme',
  codePostal: '13002',
  ville: 'Marseille',
  dateNaissance: '1999-01-01', // format ISO pour date picker
  pays: 'France',
  numeroTelephone: '0123456789'
};

const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(profileData);
  const [profilePhoto, setProfilePhoto] = useState('');
  const [activeTab, setActiveTab] = useState('aPropos');
  const [uploadedCV, setUploadedCV] = useState(null);

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

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setUploadedCV(file);
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

  // Utilisation de useDropzone pour gérer le Dropzone
  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: '.pdf' });

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
          <>
            <UserInfoSection
              label="A propos de moi"
              value={{ name: 'aPropos', value: formData.aPropos }}
              handleChange={handleChange}
            />
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
           <div className="profile-section">
              <p className="profile-label">Numéro de téléphone</p>
              {editMode ? (
                <PhoneInput
                  placeholder="Enter phone number"
                  value={formData.numeroTelephone}
                  onChange={(value) => setFormData({ ...formData, numeroTelephone: value })}
                  className="profile-input"
                />
              ) : (
                <p className="profile-value">{formData.numeroTelephone}</p>
              )}
            </div>
            <UserInfoSection
              label="Pays"
              value={{ name: 'pays', value: formData.pays }}
              handleChange={handleChange}
            />
          </>
        ) : (
          <div className="profile-cv">
            <div {...getRootProps()} className="dropzone">
              <input {...getInputProps()} />
              <p>Déposez votre CV ici, ou cliquez pour sélectionner un fichier PDF</p>
            </div>
            {uploadedCV && (
              <div className="uploaded-cv">
                <p>CV téléchargé : {uploadedCV.name}</p>
                <a href={URL.createObjectURL(uploadedCV)} target="_blank" rel="noopener noreferrer">
                  Voir le CV
                </a>
              </div>
            )}
          </div>
        )}
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
