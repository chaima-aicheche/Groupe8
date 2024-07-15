import Formation from '../models/formation.model.js';

// Mock Database
let formations = [];

// Get all formations with optional date filtering
export const getFormations = (req, res) => {
    const { date } = req.query;
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
    const date = new Date();
    
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
        date
    );

    formations.push(newFormation);
    res.status(201).json(newFormation);
};

// Get unique formateurs
export const getFormateurs = (req, res) => {
    const uniqueFormateurs = [...new Set(formations.map(f => f.formateur))];
    res.json(uniqueFormateurs);
};
