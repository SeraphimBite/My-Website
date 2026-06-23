let isDragging = false;
let dragOffset = { x: 0, y: 0 };
let draggedElement = null;

// Apple Menu Functions
let appleMenuVisible = false;

function toggleAppleMenu() {
  const appleMenu = document.getElementById('appleMenu');
  
  if (appleMenuVisible) {
    appleMenu.style.display = 'none';
    appleMenuVisible = false;
  } else {
    appleMenu.style.display = 'block';
    appleMenuVisible = true;
    
    setTimeout(() => {
      document.addEventListener('click', closeAppleMenuOnClickOutside, true);
    }, 100);
  }
  
  beep();
}

function closeAppleMenuOnClickOutside(e) {
  const appleMenu = document.getElementById('appleMenu');
  const appleLogo = document.querySelector('.apple-logo-container');
  
  if (!appleMenu.contains(e.target) && !appleLogo.contains(e.target)) {
    appleMenu.style.display = 'none';
    appleMenuVisible = false;
    document.removeEventListener('click', closeAppleMenuOnClickOutside, true);
  }
}

// Fecha menu ao pressionar ESC
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && appleMenuVisible) {
    document.getElementById('appleMenu').style.display = 'none';
    appleMenuVisible = false;
  }
});

// Z-Index management para Apple Menu
function ensureAppleMenuOnTop() {
  const appleMenu = document.getElementById('appleMenu');
  if (appleMenu.style.display === 'block') {
    appleMenu.style.zIndex = '9999';
  }
}

function openBlogWindow() {
  const blogWindow = document.getElementById('blogWindow');
  blogWindow.style.display = 'block';
  ensureDraggable(blogWindow);
}

function openAboutWindowDirect() {
  const aboutWindow = document.getElementById('aboutWindow');
  aboutWindow.style.display = 'block';
  ensureDraggable(aboutWindow);
  closeAppleMenu();
  beep();
}

function closeAppleMenu() {
  document.getElementById('appleMenu').style.display = 'none';
  appleMenuVisible = false;
  document.removeEventListener('click', closeAppleMenuOnClickOutside, true);
}

function openArtworks() {
  const artworksWindow = document.getElementById('artworksWindow');
  artworksWindow.style.display = 'block';
  ensureDraggable(artworksWindow);
}

function openFiles() {
  const filesWindow = document.getElementById('filesWindow');
  filesWindow.style.display = 'block';
  ensureDraggable(filesWindow);
}

function openMusicPlayer() {
  const musicPlayer = document.getElementById('musicPlayer');
  musicPlayer.style.display = 'block';
  ensureDraggable(musicPlayer);
}

function openFullscreen(imageSrc, customName) {
  const fullscreenWindow = document.getElementById('fullscreenWindow');
  const fullscreenImage = document.getElementById('fullscreenImage');
  const fullscreenTitle = document.getElementById('fullscreenTitle');

  fullscreenImage.src = imageSrc;
  fullscreenTitle.textContent = customName || imageSrc.split('/').pop();
  fullscreenWindow.style.display = 'block';
  ensureDraggable(fullscreenWindow);
}

function closeFullscreen() {
  document.getElementById('fullscreenWindow').style.display = 'none';
}

function closeWindow(windowId) {
  document.getElementById(windowId).style.display = 'none';
}

function ensureDraggable(windowElement) {
  windowElement.style.position = 'absolute';
  windowElement.style.zIndex = '1000';
}

function startDrag(e, element) {
  e.preventDefault();
  e.stopPropagation();

  const touch = e.touches ? e.touches[0] : e;
  const clientX = touch.clientX;
  const clientY = touch.clientY;

  isDragging = true;
  draggedElement = element;

  const rect = element.getBoundingClientRect();
  dragOffset.x = clientX - element.offsetLeft;
  dragOffset.y = clientY - element.offsetTop;

  document.addEventListener('mousemove', drag, { passive: false });
  document.addEventListener('mouseup', stopDrag);
  document.addEventListener('touchmove', drag, { passive: false });
  document.addEventListener('touchend', stopDrag);
}

function drag(e) {
  if (!isDragging || !draggedElement) return;
  e.preventDefault();

  const touch = e.touches ? e.touches[0] : e;
  const clientX = touch.clientX;
  const clientY = touch.clientY;

  const x = clientX - dragOffset.x;
  const y = clientY - dragOffset.y;

  const maxX = window.innerWidth - draggedElement.offsetWidth;
  const maxY = window.innerHeight - draggedElement.offsetHeight;

  draggedElement.style.left = Math.max(0, Math.min(maxX, x)) + 'px';
  draggedElement.style.top = Math.max(0, Math.min(maxY, y)) + 'px';
}

function stopDrag() {
  if (!isDragging) return;
  isDragging = false;
  draggedElement = null;
  document.removeEventListener('mousemove', drag);
  document.removeEventListener('mouseup', stopDrag);
  document.removeEventListener('touchmove', drag);
  document.removeEventListener('touchend', stopDrag);
}

// INICIALIZAÇÃO
document.addEventListener('DOMContentLoaded', function() {
  
// Torna janelas draggable
  document.querySelectorAll('.window[style*="display:block"], .fullscreen-window[style*="display:block"]').forEach(windowElement => {
    ensureDraggable(windowElement);
  });

  // Adiciona eventos de drag (mouse + touch)
  document.querySelectorAll('.title-bar, .fullscreen-title-bar').forEach(titleBar => {
    titleBar.addEventListener('mousedown', function(e) {
      startDrag(e, this.parentElement);
    });
    titleBar.addEventListener('touchstart', function(e) {
      startDrag(e, this.parentElement);
    }, { passive: false });
  });

  // Impede propagation nos botões
  document.querySelectorAll('.btn').forEach(btn => {
    ['mousedown', 'touchstart'].forEach(event => {
      btn.addEventListener(event, function(e) {
        e.stopPropagation();
      }, { passive: false });
    });
  });
});

function openJadetoshHD() {
  const jadetoshWindow = document.getElementById('jadetoshHDWindow');
  jadetoshWindow.style.display = 'block';
  ensureDraggable(jadetoshWindow);
  beep();
}

function openFiles() {
  openJadetoshHD();
}

function openAboutWindow() {
  toggleAppleMenu();
  const aboutWindow = document.getElementById('aboutWindow');
  if (aboutWindow.style.display === 'block') {
    aboutWindow.style.display = 'none';
  }
}

//playlist de musicas
let playlistVisible = false;

function togglePlaylist() {
  const container = document.getElementById('playlistContainer');
  const list = document.getElementById('playlistList');
  
  if (!playlistVisible) {
    list.innerHTML = '';
    track_list.forEach((track, index) => {
      const div = document.createElement('div');
      div.className = 'playlist-item';
      div.innerHTML = (index === trackIndex ? '▶ ' : '') + track.name;
      div.onclick = function() {
        loadTrack(index);
        beep();
      };
      list.appendChild(div);
    });
    container.style.display = 'block';
    playlistVisible = true;
  } else {
    container.style.display = 'none';
    playlistVisible = false;
  }
}

//lista de musicas
var track_list = [
  { name: "Burzum - Dunkelheit", id: "DPyOhP1GTRQ" },
  { name: "BLACK MAGICK SS - The Oath Synthwave Remix", id: "VXNPRieL56A" },
  { name: "Molchat Doma - Toska", id: "Fg2CvKG39Rc" },
  { name: "Molchat Doma - Kletka", id: "c69eHlQrKaY" },
  { name: "Crystal Castles - Transgender", id: "FQStbwNCl2Y" },
  { name: "Radiohead - Creep", id: "XFkzRNyygfk" },
  { name: "Radiohead Would Sound Like in Silent Hill", id: "pYypT4L7_FA" },
  { name: "Marilyn Manson - The Nobodies", id: "qi5nTb-NRFU" },
  { name: "Marilyn Manson - Coma White", id: "QQPJYnr48yU" },
  { name: "A Flock Of Seagulls - I Ran", id: "iIpfWORQWhU" },
  { name: "Tory Lanez - Time", id: "wBsYX4HvYd0" },
  { name: "Kwn - Back Of The Club", id: "2Fj-dHJsAxc" },
  { name: "Bryson Tiller - Don't", id: "d7cVLE4SaN0" },
  { name: "Justin Bieber - Confident", id: "qnD1hwjR3WU" },
  { name: "Don Toliver - 2AM", id: "evOtL3_djv4" },
  { name: "Don Toliver - No Idea", id: "_r-nPqWGG6c" },
  { name: "SZA - Love Language", id: "npu0F7n4M9Y" },
  { name: "Emxnii - Shots On Shots", id: "qG7LuyNSpL8" },
  { name: "Emxnii - stay or go", id: "aVLuGm7Nbfo" },
];

var ytPlayer;
var trackIndex = 0;
var isPlaying = false;

// Carrega YouTube API
function loadYouTubeAPI() {
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

// Inicializa YouTube API
function onYouTubeIframeAPIReady() {
  ytPlayer = new YT.Player('yt-player', {
    height: '0',
    width: '0',
    playerVars: { 
      'controls': 0,
      'enablejsapi': 1,
      'rel': 0,
      'modestbranding': 1
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerReady(event) {
  // Player pronto
}

function onPlayerStateChange(event) {
  // Quando a música termina, toca a próxima
  if (event.data == YT.PlayerState.ENDED) {
    nextTrack();
  }
}

// Carrega uma música
function loadTrack(index) {
  trackIndex = index;
  ytPlayer.loadVideoById(track_list[index].id);
  isPlaying = true;
  
  // Atualiza o título
var titleEl = document.getElementById('songTitleContent');
if (titleEl) {
  titleEl.textContent = "♫ " + track_list[index].name;
}
}

// Play/Pause
function playpauseTrack() {
  var btn = document.querySelector('.cd-play-btn');
  
  if (isPlaying) {
    ytPlayer.pauseVideo();
    isPlaying = false;
    if (btn) btn.textContent = "▶";
  } else {
    ytPlayer.playVideo();
    isPlaying = true;
    if (btn) btn.textContent = "⏸";
  }
}

// Próxima música
function nextTrack() {
  trackIndex = (trackIndex + 1) % track_list.length;
  loadTrack(trackIndex);
}

// Música anterior
function prevTrack() {
  trackIndex = (trackIndex - 1 + track_list.length) % track_list.length;
  loadTrack(trackIndex);
}

// Atualiza o tempo e barra de progresso
function updateProgress() {
  if (!ytPlayer || !ytPlayer.getCurrentTime) return;
  
  var current = ytPlayer.getCurrentTime() || 0;
  var duration = ytPlayer.getDuration() || 0;
  
  var currentEl = document.querySelector('.cd-current-time');
  var totalEl = document.querySelector('.cd-total-time');
  var fillEl = document.querySelector('.cd-progress-fill');
  
  if (currentEl) {
    currentEl.textContent = Math.floor(current/60) + ":" + 
      (Math.floor(current%60) < 10 ? "0" : "") + Math.floor(current%60);
  }
  
  if (totalEl) {
    totalEl.textContent = Math.floor(duration/60) + ":" + 
      (Math.floor(duration%60) < 10 ? "0" : "") + Math.floor(duration%60);
  }
  
  if (fillEl && duration > 0) {
    var percent = (current / duration) * 100;
    fillEl.style.width = percent + "%";
  }
}

// Inicializa tudo
document.addEventListener('DOMContentLoaded', function() {
  // Espera o DOM carregar
  setTimeout(function() {
    if (typeof YT === 'undefined') {
      loadYouTubeAPI();
    }
  }, 1000);
  
  // Atualiza o progresso a cada segundo
  setInterval(updateProgress, 1000);
});