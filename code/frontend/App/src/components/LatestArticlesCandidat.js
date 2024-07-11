import React from 'react';
import ArticlesData from '../data/articles.json';

const LatestArticlesDatas = () => {
    console.log(ArticlesData);
    return (
        <div className="ArticlesData-container">
            <h4>Derniers ArticlesDatas Publiés</h4>
            <div className='article-container'>
                <img src={ArticlesData.image} />
                <div key={ArticlesData.id} className='article-info'>
                    <h5>{ArticlesData.title}</h5>
                    <p>{ArticlesData.description}</p>
                    <button key={ArticlesData.id}>Lire plus</button>
                </div>
            </div>
        </div>
    );
};

export default LatestArticlesDatas;
