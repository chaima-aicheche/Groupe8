import React, { useState } from 'react';

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
  };

  // State pour gérer l'édition du profil
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(profileData);

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
  const [profilePhoto, setProfilePhoto] = useState('');

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
      <h1>Mon profil</h1>
      <button onClick={() => setEditMode(!editMode)}>
        {editMode ? 'Annuler' : 'Modifier'}
      </button>

      <div className="profile-info">
        <div className="profile-section">
          <h2>Nom & prénom</h2>
          {editMode ? (
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
            />
          ) : (
            <p>{formData.nom} {formData.prenom}</p>
          )}
        </div>

        <div className="profile-section">
          <h2>A propos de moi</h2>
          {editMode ? (
            <textarea
              name="aPropos"
              value={formData.aPropos}
              onChange={handleChange}
            />
          ) : (
            <p>{formData.aPropos}</p>
          )}
        </div>

        <div className="profile-section">
          <h2>Email</h2>
          {editMode ? (
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          ) : (
            <p>{formData.email}</p>
          )}
        </div>

        <div className="profile-section">
          <h2>Genre</h2>
          {editMode ? (
            <select
              name="genre"
              value={formData.genre}
              onChange={handleChange}
            >
              <option value="Homme">Homme</option>
              <option value="Femme">Femme</option>
            </select>
          ) : (
            <p>{formData.genre}</p>
          )}
        </div>

        <div className="profile-section">
          <h2>Code postal</h2>
          {editMode ? (
            <input
              type="text"
              name="codePostal"
              value={formData.codePostal}
              onChange={handleChange}
            />
          ) : (
            <p>{formData.codePostal}</p>
          )}
        </div>

        <div className="profile-section">
          <h2>Date de naissance</h2>
          {editMode ? (
            <input
              type="text"
              name="dateNaissance"
              value={formData.dateNaissance}
              onChange={handleChange}
            />
          ) : (
            <p>{formData.dateNaissance}</p>
          )}
        </div>

        <div className="profile-section">
          <h2>Ville</h2>
          {editMode ? (
            <input
              type="text"
              name="ville"
              value={formData.ville}
              onChange={handleChange}
            />
          ) : (
            <p>{formData.ville}</p>
          )}
        </div>

        <div className="profile-section">
          <h2>Pays</h2>
          {editMode ? (
            <input
              type="text"
              name="pays"
              value={formData.pays}
              onChange={handleChange}
            />
          ) : (
            <p>{formData.pays}</p>
          )}
        </div>
      </div>

      {/* Affichage de la photo de profil */}
      {editMode ? (
        <div className="profile-photo">
          {profilePhoto ? (
            <img src={profilePhoto} alt="Photo de profil" />
          ) : (
            <label htmlFor="profilePhotoInput">
              Sélectionner une photo
              <input
                type="file"
                id="profilePhotoInput"
                onChange={handleFileChange}
              />
            </label>
          )}
        </div>
      ) : null}

      {/* Bouton pour soumettre le formulaire en mode édition */}
      {editMode && (
        <button type="submit" onClick={handleSubmit}>Enregistrer</button>
      )}
    </div>
  );
};

export default Profile;
