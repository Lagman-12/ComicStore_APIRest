const API_URL = 'https://miniature-lamp-77pg4qvrp9w63rqv-3000.app.github.dev/api';

const btnComics = document.getElementById('btn-comics');
const btnAuthors = document.getElementById('btn-authors');
const sectionComics = document.getElementById('section-comics');
const sectionAuthors = document.getElementById('section-authors');
const comicsGrid = document.getElementById('comics-grid');
const authorsGrid = document.getElementById('authors-grid');

btnComics.addEventListener('click', () => {
  btnComics.classList.add('active');
  btnAuthors.classList.remove('active');
  sectionComics.classList.remove('hidden');
  sectionAuthors.classList.add('hidden');
});

btnAuthors.addEventListener('click', () => {
  btnAuthors.classList.add('active');
  btnComics.classList.remove('active');
  sectionAuthors.classList.remove('hidden');
  sectionComics.classList.add('hidden');
});

const formatPrice = (price) => {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(price || 0);
};

async function fetchComics() {
  try {
    const response = await fetch(`${API_URL}/comics`);
    const result = await response.json();
    if (!result.success || !result.data) return;

    comicsGrid.innerHTML = '';
    result.data.forEach(comic => {
      const authorName = comic.autor ? `${comic.autor.nombre} ${comic.autor.apellido || ''}` : 'Autor desconocido';
      const card = document.createElement('article');
      card.className = 'card';
      card.innerHTML = `
        <div>
          <h3 class="card-title">${comic.titulo}</h3>
          <p class="card-subtitle">✍️ ${authorName}</p>
          <div class="badges-container">
            ${comic.generos ? comic.generos.map(g => `<span class="badge">${g}</span>`).join('') : ''}
            <span class="badge">📅 ${comic.anioPublicacion || ''}</span>
          </div>
          <p class="card-body">${comic.sinopsis || 'Sin descripción disponible.'}</p>
        </div>
        <div class="card-footer">
          <span class="price">${formatPrice(comic.precio)}</span>
          <span class="stock">Stock: ${comic.stock || 0} ud.</span>
        </div>
      `;
      comicsGrid.appendChild(card);
    });
  } catch (error) {
    comicsGrid.innerHTML = '<p class="loading-text">Error de conexión con la API.</p>';
  }
}

async function fetchAuthors() {
  try {
    const response = await fetch(`${API_URL}/authors`);
    const result = await response.json();
    if (!result.success || !result.data) return;

    authorsGrid.innerHTML = '';
    result.data.forEach(author => {
      const card = document.createElement('article');
      card.className = 'card';
      card.innerHTML = `
        <div>
          <h3 class="card-title">${author.nombre} ${author.apellido || ''}</h3>
          ${author.nombreArtistico ? `<p class="card-subtitle">Alias: "${author.nombreArtistico}"</p>` : ''}
          <div class="badges-container">
            <span class="badge">🌍 ${author.nacionalidad}</span>
          </div>
          <p class="card-body">${author.biografia || 'Sin biografía disponible.'}</p>
        </div>
      `;
      authorsGrid.appendChild(card);
    });
  } catch (error) {
    authorsGrid.innerHTML = '<p class="loading-text">Error de conexión con la API.</p>';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  fetchComics();
  fetchAuthors();
});
