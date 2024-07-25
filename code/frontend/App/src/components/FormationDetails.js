// src/FormationDetail.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const FormationDetail = () => {
    const { id } = useParams();
    const [formation, setFormation] = useState(null);

    useEffect(() => {
        const fetchFormation = async () => {
            const res = await axios.get(`http://localhost:8080/api/formations/${id}`);
            setFormation(res.data);
        };
        fetchFormation();
    }, [id]);

    if (!formation) return <div>Loading...</div>;

    return (
        <Container className="mt-5">
            <Card>
                <Card.Img variant="top" src={`http://localhost:8080/${formation.image}`} />
                <Card.Body>
                    <Card.Title>{formation.nom}</Card.Title>
                    <Card.Text>
                        <strong>Niveau:</strong> {formation.niveau}<br />
                        <strong>Catégorie:</strong> {formation.categorie}<br />
                        <strong>Formateur:</strong> {formation.formateur}<br />
                        <strong>Description:</strong> {formation.description}<br />
                        <strong>Texte:</strong> {formation.texte}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default FormationDetail;
