const timeSelect = document.getElementById('time-select');
const genreButtons = document.querySelectorAll('.genre-buttons button');
const playlistsSection = document.getElementById('playlists-section');
const genreTitle = document.getElementById('genre-title');
const backButton = document.getElementById('back-button');

const cortaContainer = document.getElementById('corta-playlists');
const mediaContainer = document.getElementById('media-playlists');
const largaContainer = document.getElementById('larga-playlists');

// Ejemplo de playlists por género y duración
const playlists = {
  rock: {
    corta: [
      { title: "Rock Rápido", desc: "Un boost de energía en menos de 30 minutos." },
      { title: "Clásicos Cortos", desc: "Temas legendarios en versión exprés." }
    ],
    media: [
      { title: "Rock a Buen Ritmo", desc: "Perfecto para media hora de flow." }
    ],
    larga: [
      { title: "Rock Sin Pausa", desc: "Sesiones largas para perderte en el rock." }
    ]
  },
  pop: {
    corta: [
      { title: "Pop Ligero", desc: "Hits para acompañarte un ratito." }
    ],
    media: [
      { title: "Pop para un Break", desc: "Entre 30 y 60 minutos de buen pop." }
    ],
    larga: [
      { title: "Pop para Largas Horas", desc: "¡No pares de bailar!" }
    ]
  },
  jazz: {
    corta: [
      { title: "Jazz en Corto", desc: "Relájate con un poco de jazz suave." }
    ],
    media: [
      { title: "Jazz en su Punto", desc: "Ni mucho ni poco, solo lo justo." }
    ],
    larga: [
      { title: "Jazz Profundo", desc: "Ideal para largas sesiones relajantes." }
    ]
  },
  electronica: {
    corta: [
      { title: "Electro Rápido", desc: "Sube la energía al toque." }
    ],
    media: [
      { title: "Electro Chill", desc: "Buena vibra por 30-60 minutos." }
    ],
    larga: [
      { title: "Fiesta Electrónica", desc: "Para cuando no quieres parar." }
    ]
  }
};

// Desactivar los botones al inicio
genreButtons.forEach(btn => btn.disabled = true);

// Activar géneros cuando se selecciona duración
timeSelect.addEventListener('change', () => {
  const selectedTime = timeSelect.value;
  genreButtons.forEach(btn => btn.disabled = selectedTime === "");
  playlistsSection.classList.add('hidden');
  clearPlaylistsContainers();
});

// Al elegir un género, mostrar playlists correspondientes
genreButtons.forEach(button => {
  button.addEventListener('click', () => {
    const genre = button.getAttribute('data-genre');
    const time = timeSelect.value;
    if (!time) return;

    genreTitle.textContent = `Playlists de ${capitalize(genre)} - ${capitalize(time)}`;
    mostrarPlaylistsPorGeneroYDuracion(genre, time);

    playlistsSection.classList.remove('hidden');
    window.scrollTo({ top: playlistsSection.offsetTop - 50, behavior: 'smooth' });
  });
});

// Botón "Atrás"
backButton.addEventListener('click', () => {
  playlistsSection.classList.add('hidden');
  timeSelect.value = "";
  genreButtons.forEach(btn => btn.disabled = true);
  clearPlaylistsContainers();
});

// Mostrar playlists filtradas
function mostrarPlaylistsPorGeneroYDuracion(genre, time) {
  clearPlaylistsContainers();

  // Ocultar todos los contenedores al inicio
  cortaContainer.style.display = 'none';
  mediaContainer.style.display = 'none';
  largaContainer.style.display = 'none';

  let container;

  switch (time) {
    case 'corta':
      container = cortaContainer;
      break;
    case 'media':
      container = mediaContainer;
      break;
    case 'larga':
      container = largaContainer;
      break;
  }

  container.style.display = 'block';

  if (playlists[genre] && playlists[genre][time]) {
    if (playlists[genre][time].length === 0) {
      const msg = document.createElement('p');
      msg.textContent = "No hay playlists por ahora para esta combinación.";
      container.appendChild(msg);
      return;
    }
    playlists[genre][time].forEach(p => {
      const div = crearPlaylistDiv(p);
      container.appendChild(div);
    });
  }
}

// Crea un div con la info de cada playlist
function crearPlaylistDiv(playlist) {
  const div = document.createElement('div');
  div.classList.add('playlist');

  const title = document.createElement('h3');
  title.textContent = playlist.title;
  div.appendChild(title);

  const desc = document.createElement('p');
  desc.textContent = playlist.desc;
  div.appendChild(desc);

  return div;
}

// Limpia los contenedores
function clearPlaylistsContainers() {
  cortaContainer.innerHTML = "";
  mediaContainer.innerHTML = "";
  largaContainer.innerHTML = "";
}

// Capitaliza la primera letra
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
