import React from 'react';
import CardsData from '../data/cards.json';

const Cards = () => {
    return (
        <div className="cards-container">
            <a className="card">
                <div className="card-info">
                    <h3>{CardsData.appliedOffers}</h3>
                    <p>Offres candidatées</p>
                </div>
            </a>
            <a className="card">
                <div className="card-info">
                    <h3>{CardsData.refusedOffers}</h3>
                    <p>Offres refusées</p>
                </div>
            </a>
            <a className="card">
                <div className="card-info">
                    <h3>{CardsData.acceptedOffers}</h3>
                    <p>Offres acceptées</p>
                </div>
            </a>
        </div>
    );
};

export default Cards;
