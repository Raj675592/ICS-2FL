const API_KEY = '20c60ed9fc4b4d0ab710c7cd6a6c2603';

// Correct API URL to fetch nutrition articles
const API_URL = `https://newsapi.org/v2/everything?q=nutrition&language=en&sortBy=publishedAt&apiKey=${API_KEY}`;

fetch(API_URL)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    const articlesContainer = document.getElementById('articles');
    if (data.articles && data.articles.length > 0) { // Correct property name is `articles`
      data.articles.forEach(article => {
        const articleCard = document.createElement('div');
        articleCard.className = 'article-card';
        articleCard.innerHTML = `
          <h2>${article.title}</h2>
          <p>${article.description || 'No description available.'}</p>
          <a href="${article.url}" target="_blank">Read more</a>
        `;
        articlesContainer.appendChild(articleCard);
      });
    } else {
      articlesContainer.innerHTML = '<p>No articles found.</p>';
    }
  })
  .catch(error => {
    console.error('Error fetching articles:', error);
    const articlesContainer = document.getElementById('articles');
    articlesContainer.innerHTML = '<p>Failed to load articles. Please try again later.</p>';
  });
