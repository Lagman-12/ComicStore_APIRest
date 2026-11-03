const API_URL = 'https://miniature-lamp-77pg4qvrp9w63rqv-3000.app.github.dev/api';

// Elementos del DOM
const btnComics = document.getElementById('btn-comics');
const btnAuthors = document.getElementById('btn-authors');
const sectionComics = document.getElementById('section-comics');
const sectionAuthors = document.getElementById('section-authors');
const comicsGrid = document.getElementById('comics-grid');
const authorsGrid = document.getElementById('authors-grid');
const searchInput = document.getElementById('search-input');

// Estado global de los datos traídos de la API
let allComics = [];
let allAuthors = [];

// Manejo de pestañas
btnComics.addEventListener('click', () => {
  btnComics.classList.add('active');
  btnAuthors.classList.remove('active');
  sectionComics.classList.remove('hidden');
  sectionAuthors.classList.add('hidden');
  // Aplica filtro sobre cómics al cambiar de pestaña
  filterData(searchInput ? searchInput.value : '');
});

btnAuthors.addEventListener('click', () => {
  btnAuthors.classList.add('active');
  btnComics.classList.remove('active');
  sectionAuthors.classList.remove('hidden');
  sectionComics.classList.add('hidden');
  // Aplica filtro sobre autores al cambiar de pestaña
  filterData(searchInput ? searchInput.value : '');
});

// Formato de moneda COP
const formatPrice = (price) => {
  return new Intl.NumberFormat('es-CO', { 
    style: 'currency', 
    currency: 'COP', 
    maximumFractionDigits: 0 
  }).format(price || 0);
};

// Renderizar tarjetas de cómics
function renderComics(comicsList) {
  if (!comicsList || comicsList.length === 0) {
    comicsGrid.innerHTML = '<p class="loading-text">No se encontraron cómics que coincidan.</p>';
    return;
  }

  comicsGrid.innerHTML = '';
  comicsList.forEach(comic => {
    const authorName = comic.autor
      ? `${comic.autor.nombre} ${comic.autor.apellido || ''}`
      : 'Autor desconocido';

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
}

// Renderizar tarjetas de autores
function renderAuthors(authorsList) {
  if (!authorsList || authorsList.length === 0) {
    authorsGrid.innerHTML = '<p class="loading-text">No se encontraron autores que coincidan.</p>';
    return;
  }

  authorsGrid.innerHTML = '';
  authorsList.forEach(author => {
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
}

// Función de filtrado en tiempo real
function filterData(searchTerm) {
  const term = searchTerm.toLowerCase().trim();

  // Si la sección activa es Cómics
  if (!sectionComics.classList.contains('hidden')) {
    const filteredComics = allComics.filter(comic => {
      const titleMatch = comic.titulo.toLowerCase().includes(term);
      const authorMatch = comic.autor && 
        (`${comic.autor.nombre} ${comic.autor.apellido || ''}`).toLowerCase().includes(term);
      const genreMatch = comic.generos && 
        comic.generos.some(g => g.toLowerCase().includes(term));
      return titleMatch || authorMatch || genreMatch;
    });
    renderComics(filteredComics);
  } else {
    // Si la sección activa es Autores
    const filteredAuthors = allAuthors.filter(author => {
      const nameMatch = `${author.nombre} ${author.apellido || ''}`.toLowerCase().includes(term);
      const aliasMatch = author.nombreArtistico && author.nombreArtistico.toLowerCase().includes(term);
      const nationalityMatch = author.nacionalidad && author.nacionalidad.toLowerCase().includes(term);
      return nameMatch || aliasMatch || nationalityMatch;
    });
    renderAuthors(filteredAuthors);
  }
}

// Cargar Cómics de la API
async function fetchComics() {
  try {
    const response = await fetch(`${API_URL}/comics`);
    const result = await response.json();
    if (result.success && result.data) {
      allComics = result.data;
      renderComics(allComics);
    }
  } catch (error) {
    comicsGrid.innerHTML = '<p class="loading-text">Error de conexión con la API.</p>';
  }
}

// Cargar Autores de la API
async function fetchAuthors() {
  try {
    const response = await fetch(`${API_URL}/authors`);
    const result = await response.json();
    if (result.success && result.data) {
      allAuthors = result.data;
      renderAuthors(allAuthors);
    }
  } catch (error) {
    authorsGrid.innerHTML = '<p class="loading-text">Error de conexión con la API.</p>';
  }
}

// Evento principal: Escuchar cada pulsación en el input de búsqueda
if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    filterData(e.target.value);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  fetchComics();
  fetchAuthors();
});