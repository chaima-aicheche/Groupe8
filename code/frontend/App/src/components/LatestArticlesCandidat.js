import React from 'react';
import ArticlesData from '../data/articles.json';

const LatestArticles = () => {
    return (
        <div className="articles-container">
            <h3>Derniers Articles Publiés</h3>
            <ul>
                {ArticlesData.map(article => (
                    <li key={article.id}>
                        <img src={article.image} alt={article.title} />
                        <h4>{article.title}</h4>
                        <p>{article.description}</p>
                        <button onClick={() => window.location.href=`/articles/${article.id}`}>Lire plus</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LatestArticles;
