let blown = false;
const bgm = document.getElementById("bgm");

function startExperience() {
  // PLAY MUSIK (DIJAMIN BUNYI)
  bgm.play().catch(() => {});

  // HILANGKAN SPLASH
  const splash = document.getElementById("splash");
  splash.classList.remove("active");

  setTimeout(() => {
    splash.style.display = "none";
  }, 600);
}

function blowCandle() {
  if (blown) return;
  blown = true;

  document.querySelector(".candle").classList.add("off");

  const flame = document.getElementById("flame");
  flame.style.opacity = "0";
  flame.style.transform = "scale(0.2)";

  document.getElementById("smoke").classList.remove("hidden");
  document.querySelector(".hint").classList.add("hide");

  startConfettiBurst();
  document.getElementById("nextToMessage").classList.remove("hidden");
}

function goToMessage(e) {
  e.stopPropagation();
  switchSection("messageSection");
}

function goToGallery() {
  switchSection("gallerySection");
}

function switchSection(id) {
  document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

/* CONFETTI MELEDAK */
function startConfettiBurst() {
  const canvas = document.getElementById("confetti");
  const ctx = canvas.getContext("2d");
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  const cx = canvas.width / 2;
  const cy = canvas.height / 2 - 80;

  const particles = Array.from({ length: 140 }, () => {
    const a = Math.random() * Math.PI * 2;
    const s = Math.random() * 6 + 4;
    return {
      x: cx, y: cy,
      vx: Math.cos(a) * s,
      vy: Math.sin(a) * s,
      g: 0.15,
      r: Math.random() * 5 + 4,
      life: 0,
      c: `hsl(${Math.random()*360},100%,70%)`
    };
  });

  function anim() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach(p=>{
      p.vy += p.g; p.x += p.vx; p.y += p.vy; p.life++;
      ctx.globalAlpha = Math.max(1 - p.life/80, 0);
      ctx.fillStyle = p.c;
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill();
    });
    ctx.globalAlpha = 1;
    if (particles.some(p=>p.life<80)) requestAnimationFrame(anim);
    else ctx.clearRect(0,0,canvas.width,canvas.height);
  }
  anim();
}