import React from 'react';
import CardsData from '../data/cards.json';
import '../styles/Cards.css';

const Cards = () => {
    return (
        <div className="cards-container">
            <div className="card">
                <div className="card-info">
                    <h3>{CardsData.appliedOffers}</h3>
                    <p>Offres candidatées</p>
                </div>
            </div>
            <div className="card">
                <div className="card-info">
                    <h3>{CardsData.refusedOffers}</h3>
                    <p>Offres refusées</p>
                </div>
            </div>
            <div className="card">
                <div className="card-info">
                    <h3>{CardsData.acceptedOffers}</h3>
                    <p>Offres acceptées</p>
                </div>
            </div>
        </div>
    );
};

export default Cards;
