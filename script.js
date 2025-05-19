const timeSelect = document.getElementById('time-select');
const genreButtons = document.querySelectorAll('.genre-buttons button');
const playlistsSection = document.getElementById('playlists-section');
const genreTitle = document.getElementById('genre-title');
const backButton = document.getElementById('back-button');

const cortaContainer = document.getElementById('corta-playlists');
const mediaContainer = document.getElementById('media-playlists');
const largaContainer = document.getElementById('larga-playlists');

// Datos de ejemplo (estructura: playlists[genero][duracion])
const playlists = {
  rock: {
    corta: [
      { title: "Rock Energético Corta", desc: "Playlists de rock intenso para menos de 30 min." },
      { title: "Clásicos del Rock Corto", desc: "Hits clásicos y rápidos." }
    ],
    media: [
      { title: "Rock de media duracion", desc: "Rock balanceado para 30-60 min." }
    ],
    larga: [
      { title: "Maratón Rock Larga", desc: "Rock para largas sesiones." }
    ]
  },
  pop: {
    corta: [
      { title: "Pop Corto y Dulce", desc: "Hits pop para menos de 30 minutos." }
    ],
    media: [
      { title: "Pop de media duracion", desc: "Playlists pop entre 30 y 60 minutos." }
    ],
    larga: [
      { title: "Pop Extendido", desc: "Pop para maratones largas." }
    ]
  },
  jazz: {
    corta: [
      { title: "Jazz Chill Corto", desc: "Jazz suave para menos de media hora." }
    ],
    media: [
      { title: "Jazz de media duracion", desc: "Jazz relajado de 30-60 min." }
    ],
    larga: [
      { title: "Jazz Profundo Larga", desc: "Sesión larga de jazz." }
    ]
  },
  electronica: {
    corta: [
      { title: "Electrónica Rápida", desc: "Electrónica intensa y corta." }
    ],
    media: [
      { title: "Electrónica de media duracion", desc: "Sesión media de electrónica." }
    ],
    larga: [
      { title: "Electrónica Maratón", desc: "Electrónica larga para fiesta." }
    ]
  }
};

// Desactivar botones género inicialmente
genreButtons.forEach(btn => btn.disabled = true);

// Al cambiar la duración, activamos botones y ocultamos sección
timeSelect.addEventListener('change', () => {
  const selectedTime = timeSelect.value;
  genreButtons.forEach(btn => btn.disabled = selectedTime === "");
  playlistsSection.classList.add('hidden');
  clearPlaylistsContainers();
});

// Al hacer clic en género, mostrar playlists filtradas por duración y género
genreButtons.forEach(button => {
  button.addEventListener('click', () => {
    const genre = button.getAttribute('data-genre');
    const time = timeSelect.value;
    if (!time) return;

    genreTitle.textContent = `Playlists de ${capitalize(genre)} (${capitalize(time)})`;
    mostrarPlaylistsPorGeneroYDuracion(genre, time);

    playlistsSection.classList.remove('hidden');
    window.scrollTo({ top: playlistsSection.offsetTop - 50, behavior: 'smooth' });
  });
});

backButton.addEventListener('click', () => {
  playlistsSection.classList.add('hidden');
  timeSelect.value = "";
  genreButtons.forEach(btn => btn.disabled = true);
  clearPlaylistsContainers();
});

function mostrarPlaylistsPorGeneroYDuracion(genre, time) {
  clearPlaylistsContainers();

  // Mostrar solo el contenedor de la duración seleccionada y ocultar los demás
  cortaContainer.style.display = 'none';
  mediaContainer.style.display = 'none';
  largaContainer.style.display = 'none';

  let container;

  switch(time) {
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
      msg.textContent = "No hay playlists disponibles para esta categoría.";
      container.appendChild(msg);
      return;
    }
    playlists[genre][time].forEach(p => {
      const div = crearPlaylistDiv(p);
      container.appendChild(div);
    });
  }
}

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

function clearPlaylistsContainers() {
  cortaContainer.innerHTML = "";
  mediaContainer.innerHTML = "";
  largaContainer.innerHTML = "";
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
