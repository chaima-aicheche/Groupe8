import Formation from '../models/formation.model.js';

// Mock Database
let formations = [];

// Get all formations with optional date filtering
export const getFormations = (req, res) => {
    const { date } = req.query; // Récupérer la date du query string
    let filteredFormations = formations;

    if (date) {
        filteredFormations = formations.filter(formation => 
            new Date(formation.date).toISOString().split('T')[0] === date
        );
    }

    res.json(filteredFormations);
};

// Add a new formation
export const addFormation = (req, res) => {
    const { nom, niveau, categorie, description, texte, formateur } = req.body;
    const video = req.files['video'][0].path;
    const image = req.files['image'][0].path;
    const date = new Date(); // Capture the current date
    const newFormation = new Formation(
        formations.length + 1,
        nom,
        niveau,
        categorie,
        description,
        texte,
        formateur,
        video,
        image,
        date // Pass the date here
    );
    formations.push(newFormation);
    res.status(201).json(newFormation);
};
