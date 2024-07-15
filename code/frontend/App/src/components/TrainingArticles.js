import './TrainingArticles.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, Form, Card, Col, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const TrainingArticles = () => {
    const [formations, setFormations] = useState([]);
    const [formateurs, setFormateurs] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newFormation, setNewFormation] = useState({
        nom: '',
        niveau: '',
        categorie: '',
        description: '',
        texte: '',
        formateur: '',
        video: null,
        image: null
    });
    const [filters, setFilters] = useState({
        categorie: '',
        niveau: '',
        formateur: '',
        date: ''
    });

    useEffect(() => {
        fetchFormations();
        fetchFormateurs();
    }, []);

    const fetchFormations = async () => {
        const res = await axios.get('http://localhost:8080/api/formations', { params: filters });
        setFormations(res.data);
    };

    const fetchFormateurs = async () => {
        const res = await axios.get('http://localhost:8080/api/formations/formateurs');
        setFormateurs(res.data);
    };

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewFormation({
            ...newFormation,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        const { name } = e.target;
        setNewFormation({
            ...newFormation,
            [name]: e.target.files[0]
        });
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({
            ...filters,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (let key in newFormation) {
            formData.append(key, newFormation[key]);
        }
        await axios.post('http://localhost:8080/api/formations', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        fetchFormations();
        handleCloseModal();
    };

    useEffect(() => {
        fetchFormations();
    }, [filters]);

    const filteredFormations = formations.filter((formation) =>
        (filters.categorie ? formation.categorie === filters.categorie : true) &&
        (filters.niveau ? formation.niveau === filters.niveau : true) &&
        (filters.formateur ? formation.formateur === filters.formateur : true) &&
        (filters.date ? new Date(formation.date).toISOString().split('T')[0] === new Date(filters.date).toISOString().split('T')[0] : true)
    );

    return (
        <div className="container mt-5">
            <h1>Formations Formateur</h1>
            <Button onClick={handleShowModal}>Ajouter Formation</Button>
            <div className="mt-3">
                <h5>Filtrer par:</h5>
                <Form>
                    <Row>
                        <Col>
                            <Form.Group controlId="filterCategorie">
                                <Form.Label>Catégorie</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="categorie"
                                    value={filters.categorie}
                                    onChange={handleFilterChange}
                                >
                                    <option value="">Toutes</option>
                                    <option value="Développement">Développement</option>
                                    <option value="Design">Design</option>
                                    <option value="Marketing">Marketing</option>
                                    <option value="Business">Business</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="filterNiveau">
                                <Form.Label>Niveau</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="niveau"
                                    value={filters.niveau}
                                    onChange={handleFilterChange}
                                >
                                    <option value="">Tous</option>
                                    <option value="Débutant">Débutant</option>
                                    <option value="Intermédiaire">Intermédiaire</option>
                                    <option value="Avancé">Avancé</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="filterFormateur">
                                <Form.Label>Formateur</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="formateur"
                                    value={filters.formateur}
                                    onChange={handleFilterChange}
                                >
                                    <option value="">Choisir un formateur</option>
                                    {formateurs.map((formateur, index) => (
                                        <option key={index} value={formateur}>
                                            {formateur}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="filterDate">
                                <Form.Label>Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="date"
                                    value={filters.date}
                                    onChange={handleFilterChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </div>
            <div className="mt-4">
                <Row>
                    {filteredFormations.map((formation) => (
                        <Col key={formation.id} sm={6} md={4} lg={3}>
                            <Card className="mb-3">
                                <Card.Img variant="top" src={`http://localhost:8080/${formation.image}`} />
                                <Card.Body>
                                    <Card.Title>{formation.nom}</Card.Title>
                                    <Card.Text>
                                        <strong>Niveau:</strong> {formation.niveau}<br />
                                        <strong>Catégorie:</strong> {formation.categorie}<br />
                                        <strong>Formateur:</strong> {formation.formateur}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Ajout de Formation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formNom">
                            <Form.Label>Nom de la formation</Form.Label>
                            <Form.Control
                                type="text"
                                name="nom"
                                value={newFormation.nom}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formNiveau">
                            <Form.Label>Niveau</Form.Label>
                            <Form.Control
                                as="select"
                                name="niveau"
                                value={newFormation.niveau}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Choisir...</option>
                                <option value="Débutant">Débutant</option>
                                <option value="Intermédiaire">Intermédiaire</option>
                                <option value="Avancé">Avancé</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formCategorie">
                            <Form.Label>Catégorie</Form.Label>
                            <Form.Control
                                as="select"
                                name="categorie"
                                value={newFormation.categorie}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Choisir...</option>
                                <option value="Développement">Développement</option>
                                <option value="Design">Design</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Business">Business</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="description"
                                value={newFormation.description}
                                onChange={handleInputChange}
                                rows={3}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formTexte">
                            <Form.Label>Texte</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="texte"
                                value={newFormation.texte}
                                onChange={handleInputChange}
                                rows={5}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formFormateur">
                            <Form.Label>Formateur</Form.Label>
                            <Form.Control
                                type="text"
                                name="formateur"
                                value={newFormation.formateur}
                                onChange={handleInputChange}
                                placeholder="Nom du formateur"
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formVideo">
                            <Form.Label>Vidéo</Form.Label>
                            <Form.Control
                                type="file"
                                name="video"
                                onChange={handleFileChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formImage">
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type="file"
                                name="image"
                                onChange={handleFileChange}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Ajouter
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default TrainingArticles;
