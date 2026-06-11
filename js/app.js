const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

const state = {
  currentMemory: 0,
  typingStarted: false,
  toastTimer: null,
  hearts: [],
  raining: false,
  heartAnimationId: null,
  heartResizeHandler: null,
  heartStopTimer: null
};

function initLoader() {
  const messages = [
    "Inicializando sistema...",
    "Carregando memórias...",
    "Buscando momentos especiais...",
    "Preparando algo importante...",
    "Pronto ❤️"
  ];
  const loader = $("#loader");
  const text = $("#loaderText");
  let index = 0;

  const interval = window.setInterval(() => {
    index += 1;
    text.textContent = messages[index] || messages.at(-1);

    if (index === messages.length - 1) {
      window.clearInterval(interval);
      window.setTimeout(() => loader.classList.add("hidden"), 650);
    }
  }, 760);
}

function createParticles() {
  const container = $("#particles");
  const total = window.matchMedia("(max-width: 700px)").matches ? 22 : 42;

  for (let i = 0; i < total; i += 1) {
    const particle = document.createElement("span");
    particle.className = "particle";
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.setProperty("--speed", `${7 + Math.random() * 7}s`);
    particle.style.animationDelay = `${Math.random() * 4}s`;
    particle.style.transform = `scale(${0.55 + Math.random() * 1.35})`;
    container.appendChild(particle);
  }
}

function initReveal() {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");

        if (entry.target.id === "statsList") animateStats();
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.16 }
  );

  $$(".reveal").forEach(element => observer.observe(element));
}

function initScrollButtons() {
  $$("[data-scroll-to]").forEach(button => {
    button.addEventListener("click", () => {
      const target = $(button.dataset.scrollTo);
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function initEnvelope() {
  const button = $("#envelopeButton");
  button.addEventListener("click", () => {
    button.classList.add("open");
    button.setAttribute("aria-expanded", "true");
    document.body.classList.add("envelope-open");

    window.setTimeout(() => {
      $("#carta").scrollIntoView({ behavior: "smooth", block: "start" });
      typeLetter();
    }, 1050);
  });
}

function typeLetter() {
  if (state.typingStarted) return;
  state.typingStarted = true;

  $("#letterDate").textContent = CONFIG.letterDate;
  $("#letterSignature").textContent = CONFIG.signature;

  const target = $("#typedLetter");
  const fullText = CONFIG.letter;
  let index = 0;

  const typeNext = () => {
    target.textContent = fullText.slice(0, index);
    index += 1;

    if (index <= fullText.length) {
      const char = fullText[index - 2];
      const delay = char === "\n" ? 280 : char === "." || char === "," ? 70 : 28;
      window.setTimeout(typeNext, delay);
    } else {
      target.classList.add("done");
    }
  };

  typeNext();
}

function renderGallery() {
  const grid = $("#memoryGrid");
  grid.innerHTML = "";

  CONFIG.memories.forEach((memory, index) => {
    const button = document.createElement("button");
    button.className = `memory-card reveal${memory.featured ? " featured" : ""}`;
    button.type = "button";
    button.style.setProperty("--object-position", memory.position || "center");
    button.setAttribute("aria-label", `Abrir memória: ${memory.title}`);

    const visual = memory.src
      ? `<img src="${memory.src}" alt="${memory.alt}" loading="lazy">`
      : `<div class="memory-visual" style="--memory-bg:${memory.gradient}">${memory.emoji}</div>`;

    button.innerHTML = `
      ${visual}
      <span>${memory.title}</span>
      ${memory.note ? `<small>${memory.note}</small>` : ""}
    `;
    button.addEventListener("click", () => openMemory(index));
    grid.appendChild(button);
  });
}

function openMemory(index) {
  state.currentMemory = index;
  const memory = CONFIG.memories[index];
  const modal = $("#memoryModal");
  const image = $("#modalImage");

  image.alt = memory.alt;
  image.style.objectPosition = memory.position || "center";
  image.src =
    memory.src ||
    `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(createMemorySvg(memory))}`;
  $("#modalCaption").textContent = memory.note ? `${memory.title} - ${memory.note}` : memory.title;
  modal.showModal();
}

function createMemorySvg(memory) {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" role="img">
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stop-color="#ffe1ec"/>
          <stop offset="0.5" stop-color="#fff8fb"/>
          <stop offset="1" stop-color="#f6e3b7"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="800" fill="url(#g)"/>
      <circle cx="190" cy="165" r="95" fill="#f7a7c4" opacity=".28"/>
      <circle cx="1005" cy="620" r="150" fill="#caa45c" opacity=".18"/>
      <text x="50%" y="45%" text-anchor="middle" font-size="108">${memory.emoji}</text>
      <text x="50%" y="58%" text-anchor="middle" font-family="Arial, sans-serif" font-size="42" fill="#7d6170">${memory.title}</text>
    </svg>`;
}

function initModal() {
  const modal = $("#memoryModal");
  $("#modalClose").addEventListener("click", () => modal.close());
  $("#modalPrev").addEventListener("click", () => {
    openMemory((state.currentMemory - 1 + CONFIG.memories.length) % CONFIG.memories.length);
  });
  $("#modalNext").addEventListener("click", () => {
    openMemory((state.currentMemory + 1) % CONFIG.memories.length);
  });

  modal.addEventListener("click", event => {
    if (event.target === modal) modal.close();
  });
}

function updateCounter() {
  const start = new Date(CONFIG.relationshipStart).getTime();
  const diff = Math.max(0, Date.now() - start);
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  $("#days").textContent = days.toLocaleString("pt-BR");
  $("#hours").textContent = String(hours).padStart(2, "0");
  $("#minutes").textContent = String(minutes).padStart(2, "0");
  $("#seconds").textContent = String(seconds).padStart(2, "0");
}

function renderReminders() {
  const grid = $("#reminderGrid");
  grid.innerHTML = "";

  CONFIG.reminders.forEach(([emoji, title, message]) => {
    const button = document.createElement("button");
    button.className = "reminder-card reveal";
    button.type = "button";
    button.innerHTML = `
      <span class="emoji" aria-hidden="true">${emoji}</span>
      <strong>${title}</strong>
      <p>Um detalhe especial guardado aqui.</p>
    `;
    button.addEventListener("click", () => showToast(message));
    grid.appendChild(button);
  });
}

function renderManual() {
  const list = $("#manualList");
  list.innerHTML = "";

  Object.entries(CONFIG.manual).forEach(([term, value]) => {
    const dt = document.createElement("dt");
    const dd = document.createElement("dd");
    dt.textContent = `${term}:`;

    if (Array.isArray(value)) {
      dd.className = "manual-tags";
      value.forEach(item => {
        const tag = document.createElement("span");
        tag.textContent = item;
        dd.appendChild(tag);
      });
    } else {
      dd.textContent = value;
    }

    list.append(dt, dd);
  });
}

function renderStats() {
  const list = $("#statsList");
  list.innerHTML = "";

  CONFIG.stats.forEach(([label, value, percent]) => {
    const row = document.createElement("div");
    row.className = "stat-row";
    row.innerHTML = `
      <div class="stat-meta">
        <span>${label}</span>
        <strong>${value}</strong>
      </div>
      <div class="stat-bar" aria-hidden="true">
        <span class="stat-fill" style="--target:${percent}%"></span>
      </div>
    `;
    list.appendChild(row);
  });
}

function animateStats() {
  $$(".stat-fill").forEach(fill => {
    fill.style.width = fill.style.getPropertyValue("--target");
  });
}

function renderReasons() {
  const grid = $("#reasonGrid");
  grid.innerHTML = "";

  CONFIG.reasons.forEach((reason, index) => {
    const card = document.createElement("article");
    card.className = "reason-card reveal";
    card.innerHTML = `<span>${String(index + 1).padStart(2, "0")}</span><p>${reason}</p>`;
    grid.appendChild(card);
  });
}

function initEasterEggs() {
  const messages = {
    ".frog-egg": "Sapinho secreto encontrado: ele disse que você é muito amada.",
    ".capybara-egg": "Capivara escondida desbloqueada: calma, fofa e 100% do seu time.",
    ".cat-egg": "Foto surpresa do gato desbloqueada.",
    ".moonwalk-egg": "Hee-hee! Moonwalk romântico ativado."
  };

  Object.entries(messages).forEach(([selector, message]) => {
    const egg = $(selector);
    egg.addEventListener("click", () => {
      if (selector === ".moonwalk-egg") {
        egg.classList.remove("dance");
        void egg.offsetWidth;
        egg.classList.add("dance");
      }
      if (selector === ".cat-egg") {
        const catIndex = CONFIG.memories.findIndex(memory =>
          memory.title.toLowerCase().includes("gato")
        );
        if (catIndex >= 0) {
          openMemory(catIndex);
        }
      }
      showToast(message);
    });
  });
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(state.toastTimer);
  state.toastTimer = window.setTimeout(() => toast.classList.remove("show"), 4200);
}

function initFinalSurprise() {
  $("#finalButton").addEventListener("click", () => {
    $("#finalMessage").textContent = CONFIG.finalMessage;
    startHeartRain();
  });
}

function startHeartRain() {
  const canvas = $("#heartRain");
  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;

  window.clearTimeout(state.heartStopTimer);
  if (state.heartAnimationId) {
    cancelAnimationFrame(state.heartAnimationId);
  }
  if (state.heartResizeHandler) {
    window.removeEventListener("resize", state.heartResizeHandler);
  }

  const resize = () => {
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  state.heartResizeHandler = resize;
  resize();
  state.hearts = Array.from({ length: 90 }, () => ({
    x: Math.random() * window.innerWidth,
    y: -Math.random() * window.innerHeight,
    speed: 1.2 + Math.random() * 2.8,
    size: 12 + Math.random() * 18,
    sway: Math.random() * 1.8,
    alpha: 0.45 + Math.random() * 0.55
  }));

  state.raining = true;

  const draw = () => {
    if (!state.raining) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.font = "20px serif";
    state.hearts.forEach(heart => {
      heart.y += heart.speed;
      heart.x += Math.sin(heart.y * 0.02) * heart.sway;
      if (heart.y > window.innerHeight + 40) {
        heart.y = -40;
        heart.x = Math.random() * window.innerWidth;
      }
      ctx.globalAlpha = heart.alpha;
      ctx.font = `${heart.size}px serif`;
      ctx.fillText("\u2764\uFE0F", heart.x, heart.y);
    });
    ctx.globalAlpha = 1;

    state.heartAnimationId = requestAnimationFrame(draw);
  };

  window.addEventListener("resize", resize, { passive: true });
  draw();
  state.heartStopTimer = window.setTimeout(() => {
    state.raining = false;
    cancelAnimationFrame(state.heartAnimationId);
    state.heartAnimationId = null;
    state.hearts = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    window.removeEventListener("resize", resize);
    state.heartResizeHandler = null;
  }, 8500);
}

function initQrCode() {
  const url = window.location.href;
  const fallback = $("#qrFallback");

  const render = () => {
    if (!window.QRCode) {
      fallback.textContent = `QRCode.js não carregou. URL para guardar: ${url}`;
      return;
    }

    new QRCode($("#qrcode"), {
      text: url,
      width: 180,
      height: 180,
      colorDark: "#41202f",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H
    });
    fallback.textContent = url;
  };

  window.setTimeout(render, 450);
}

function initPrint() {
  $("#printButton").addEventListener("click", () => {
    $("#letterDate").textContent = CONFIG.letterDate;
    $("#letterSignature").textContent = CONFIG.signature;
    $("#typedLetter").textContent = CONFIG.letter;
    $("#typedLetter").classList.add("done");
    window.print();
  });
}

function boot() {
  initLoader();
  createParticles();
  initScrollButtons();
  initEnvelope();
  renderGallery();
  initModal();
  renderReminders();
  renderManual();
  renderStats();
  renderReasons();
  initReveal();
  initEasterEggs();
  initFinalSurprise();
  initQrCode();
  initPrint();
  updateCounter();
  window.setInterval(updateCounter, 1000);
}

document.addEventListener("DOMContentLoaded", boot);
