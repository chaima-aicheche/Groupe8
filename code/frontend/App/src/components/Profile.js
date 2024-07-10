import React, { useState } from 'react';
import './Profile.css'

const Profile = () => {
  // Exemple de données de profil à récupérer depuis la base de données
  const profileData = {
    nom: 'Doe',
    prenom: 'John',
    aPropos: 'Senior Developer at XYZ Corp.',
    email: 'johndoe@example.com',
    genre: 'Homme',
    codePostal: '13002',
    ville: 'Marseille',
    dateNaissance: '01/01/1980',
    pays: 'France',
    numeroTelephone: '0123456789'
  };

  // State pour gérer l'édition du profil
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(profileData);
  const [profilePhoto, setProfilePhoto] = useState('');

  // Handler pour la soumission du formulaire de modification
  const handleSubmit = (event) => {
    event.preventDefault();
    // Envoyer les données modifiées au serveur
    console.log(formData);
    setEditMode(false); // Désactiver le mode édition après soumission
  };

  // Handler pour gérer les changements dans le formulaire
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handler pour la gestion de la photo de profil
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

  // Component for each user information section
  const UserInfoSection = ({ label, value, editMode, handleChange }) => {
    return (
      <div className="profile-section">
        <p className="profile-label">{label}</p>
        {editMode ? (
          <input
            type={value.type || 'text'} // Set input type based on value type
            name={value.name}
            value={value.value}
            onChange={handleChange}
          />
        ) : (
          <p className="profile-value">{value.value}</p>
        )}
      </div>
    );
  };

  return (
    <div className="profile">
      <header className="profile-header">
        <h1>Mon profil</h1>
        <button onClick={() => setEditMode(!editMode)}>
          {editMode ? 'Annuler' : 'Modifier'}
        </button>
      </header>

      <div className="profile-body">
        <div className="profile-info">
          <UserInfoSection
            label="Nom & prénom"
            value={{ name: 'nom', value: `${formData.nom} ${formData.prenom}` }}
            editMode={editMode}
            handleChange={handleChange}
          />
          <UserInfoSection
            label="A propos de moi"
            value={{ name: 'aPropos', value: formData.aPropos }}
            editMode={editMode}
            handleChange={handleChange}
          />
          <UserInfoSection
            label="Email"
            value={{ name: 'email', value: formData.email }}
            editMode={editMode}
            handleChange={handleChange}
          />
          <UserInfoSection
            label="Genre"
            value={{ name: 'genre', value: formData.genre }}
            editMode={editMode}
            handleChange={handleChange}
          />
          <UserInfoSection
            label="Code postal"
            value={{ name: 'codePostal', value: formData.codePostal }}
            editMode={editMode}
            handleChange={handleChange}
          />
          <UserInfoSection
            label="Date de naissance"
            value={{ name: 'dateNaissance', value: formData.dateNaissance }}
            editMode={editMode}
            handleChange={handleChange}
          />
          <UserInfoSection
            label="Ville"
            value={{ name: 'ville', value: formData.ville }}
            editMode={editMode}
            handleChange={handleChange}
          />
          <UserInfoSection
            label="Pays"
            value={{ name: 'pays', value: formData.pays }}
            editMode={editMode}
            handleChange={handleChange}
          />
          <UserInfoSection
            label="Numéro de téléphone"
            value={{ name: 'numeroTelephone', value: formData.numeroTelephone }}
            editMode={editMode}
            handleChange={handleChange}
          />
        </div>

        <div className="profile-photo">
          {profilePhoto ? (
            <img src={profilePhoto} alt="Photo de profil" />
          ) : (
            editMode && (
              <label htmlFor="profilePhotoInput">
                Sélectionner une photo
                <input
                  type="file"
                  id="profilePhotoInput"
                  onChange={handleFileChange}
                />
              </label>
            )
          )}
        </div>
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
