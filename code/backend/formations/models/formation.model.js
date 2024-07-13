// backend/models/formation.model.js

// to define the schema of the Formation if using a database like MongoDB or SQL
// in-memory array
class Formation {
    constructor(id, nom, niveau, categorie, description, texte, formateur, video, image) {
        this.id = id;
        this.nom = nom;
        this.niveau = niveau;
        this.categorie = categorie;
        this.description = description;
        this.texte = texte;
        this.formateur = formateur;
        this.video = video;
        this.image = image;
        this.date = date;
    }
}

export default Formation;
