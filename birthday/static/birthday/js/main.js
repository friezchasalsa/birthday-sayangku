/* ============================================================
   PENGATURAN UTAMA — ganti bagian ini sesuai kebutuhanmu
   ============================================================ */
const SETTINGS = {
  password: "131005",           // kode password pembuka halaman
  name: "Sayang",               // nama yang muncul di judul besar
  heroSubtitle: "Semoga hari ini secerah bintang yang menemani setiap malamnya ayanggg.",

  // Ganti "src" dengan link foto asli kamu (upload ke imgur/drive/hosting lalu paste link,
  // atau taruh file di folder birthday/static/birthday/photos/ lalu tulis path-nya,
  // mis: "/static/birthday/photos/foto1.jpg")
 photos: [
    { src: "/static/birthday/photos/foto1.jpeg", caption: "foto di trio mall jaman sendal posee masih ada" },
    { src: "/static/birthday/photos/foto2.jpeg", caption: "foto pas anniversary" },
    { src: "/static/birthday/photos/foto3.jpeg", caption: "foto di dlass before ayang kkn" },
    { src: "/static/birthday/photos/foto4.jpeg", caption: "foto kita pas masih piyik" },
    { src: "/static/birthday/photos/foto5.jpeg", caption: "foto ayang ultah tahun lalu" }
],

  // Interval pergantian slide otomatis (dalam milidetik)
  slideshowIntervalMs: 3500,

  message: "Happy 21st birthday, sayangkuuu. ❤️ Selamat bertambah usia ya ayy. Semoga di umur ayang yang baru ini, semua hal baik yang ayang semogakan pelan-pelan dateng ke ayang. Semoga ayang selalu diberi kesehatan, dimudahkan dalam setiap langkah, dan dikelilingi orang-orang yang sayang sama ayang. Aku juga mau minta maaf karena tahun ini aku belum bisa ada di samping ayang buat ngerayain ulang tahun ayang secara langsung. Jujur, aku sedih banget karena tahun lalu kita masih bisa ngerayain bareng, dan sekarang kita harus ngelewatin hari spesial ini dengan jarak di antara kita. Kalau boleh milih, aku pasti lebih pengin ada di sana, nemenin ayang, lihat senyum ayang, dan ngerayain hari ini sama ayang. Tapi walaupun kali ini kita harus LDR, aku harap ayang tahu kalau jarak nggak pernah bikin rasa sayangku ke ayang berkurang. Aku mungkin nggak bisa ngasih pelukan langsung hari ini, tapi aku selalu ada buat ayang, dari jauh sekalipun. Terima kasih sudah tetap bertahan ay, tetap sabar, dan tetap jadi ayang yang aku sayang sampai hari ini. Aku bersyukur banget bisa kenal ayang dan menjadi bagian dari perjalanan hidup ayang. Di umur 21 ini, aku cuma berharap semoga kita masih bisa terus berjalan bersama, melewati banyak ulang tahun berikutnya, dan suatu hari nanti kita bisa ngeliat lagi masa-masa LDR ini sambil bilang, “ternyata kita berhasil melewatinya.” Sekali lagi, selamat ulang tahun, ayang. ❤️ Aku sayang ayang, dan aku kangen banget. Semoga nanti pas kita ketemu, aku bisa mengganti semua pelukan dan perayaan yang tertunda hari ini. I hope we make many more memories together. LOVE YOU THE MOST SAYANG! ❤️",

  signature: "— Dengan sayang"
};

/* ============================================================
   Jangan diubah di bawah ini kecuali kamu mau ubah perilaku
   ============================================================ */

document.getElementById('heroName').textContent = SETTINGS.name;
document.getElementById('heroSub').textContent = SETTINGS.heroSubtitle;
document.getElementById('messageSign').textContent = SETTINGS.signature;

/* ---------------- Starfield background ---------------- */
(function starfield(){
  const canvas = document.getElementById('stars-canvas');
  const ctx = canvas.getContext('2d');
  let w, h, stars = [];

  function resize(){
    w = canvas.width = window.innerWidth;
    h = canvas.height = document.documentElement.scrollHeight;
  }
  function init(){
    resize();
    const count = Math.floor((w*h)/9000);
    stars = Array.from({length: count}, () => ({
      x: Math.random()*w,
      y: Math.random()*h,
      r: Math.random()*1.4 + 0.3,
      a: Math.random(),
      speed: Math.random()*0.015 + 0.003
    }));
  }
  function draw(){
    ctx.clearRect(0,0,w,h);
    stars.forEach(s => {
      s.a += s.speed;
      const op = (Math.sin(s.a)+1)/2 * 0.8 + 0.15;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
      ctx.fillStyle = `rgba(220,230,255,${op})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  window.addEventListener('resize', () => { init(); });
  init();
  draw();
  // recalc height after content loads/unlocks
  window.addEventListener('load', () => setTimeout(init, 500));
})();

/* ---------------- Floating balloons in hero ---------------- */
(function balloons(){
  const hero = document.getElementById('hero');
  const colors = ['#4d7cf7', '#7ce6f2', '#aab6ff', '#ffd873'];
  for(let i=0;i<7;i++){
    const b = document.createElement('div');
    b.className = 'balloon';
    b.style.left = (Math.random()*90)+'%';
    b.style.background = colors[i % colors.length];
    b.style.animationDuration = (14 + Math.random()*10)+'s';
    b.style.animationDelay = (-Math.random()*20)+'s';
    hero.appendChild(b);
  }
})();

/* ---------------- Password gate ---------------- */
(function passwordGate(){
  const gate = document.getElementById('gate');
  const pwInput = document.getElementById('pw-input');
  const pwBtn = document.getElementById('pw-btn');
  const pwError = document.getElementById('pw-error');
  const gateCard = document.querySelector('.gate-card');
  const envelopeScreen = document.getElementById('envelope-screen');

  function tryUnlock(){
    if(pwInput.value === SETTINGS.password){
      gate.classList.add('hidden');
      setTimeout(() => {
        envelopeScreen.classList.add('show');
      }, 400);
    } else {
      pwError.classList.add('show');
      gateCard.classList.add('shake');
      setTimeout(() => gateCard.classList.remove('shake'), 450);
      pwInput.value = '';
      pwInput.focus();
    }
  }

  pwBtn.addEventListener('click', tryUnlock);
  pwInput.addEventListener('keydown', (e) => { if(e.key === 'Enter') tryUnlock(); });
})();

/* ---------------- Envelope open ---------------- */
(function envelopeOpen(){
  const envelope = document.getElementById('envelope');
  const envWrap = document.getElementById('env-wrap');
  const envelopeScreen = document.getElementById('envelope-screen');
  const mainContent = document.getElementById('main-content');

  envWrap.addEventListener('click', () => {
    if(envelope.classList.contains('open')) return;
    envelope.classList.add('open');
    if(window.launchConfetti) window.launchConfetti();
    setTimeout(() => {
      envelopeScreen.classList.add('hidden-out');
      mainContent.classList.add('revealed');
      window.dispatchEvent(new Event('resize'));
    }, 900);
  });
})();

/* ---------------- Typewriter message reveal on scroll ---------------- */
(function typewriter(){
  const el = document.getElementById('messageText');
  const signEl = document.getElementById('messageSign');
  const full = SETTINGS.message;
  let started = false;

  function type(i){
    if(i <= full.length){
      el.innerHTML = full.slice(0, i) + '<span class="message-cursor">&nbsp;</span>';
      requestAnimationFrame(() => setTimeout(() => type(i+1), 18));
    } else {
      el.innerHTML = full;
      signEl.classList.add('show');
    }
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting && !started){
        started = true;
        type(0);
      }
    });
  }, { threshold: 0.4 });

  observer.observe(document.getElementById('message'));
})();

/* ---------------- Candles interaction ---------------- */
(function candles(){
  document.querySelectorAll('.candle').forEach(c => {
    c.addEventListener('click', () => {
      c.classList.toggle('out');
    });
  });
})();

/* ---------------- Confetti ---------------- */
(function confetti(){
  const canvas = document.getElementById('confetti-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let running = false;

  function resize(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  const colors = ['#4d7cf7', '#7ce6f2', '#aab6ff', '#ffd873', '#ffffff'];

  function burst(){
    for(let i=0;i<140;i++){
      particles.push({
        x: canvas.width/2 + (Math.random()-0.5)*120,
        y: canvas.height*0.35,
        vx: (Math.random()-0.5)*11,
        vy: Math.random()*-11 - 3,
        size: Math.random()*7 + 3,
        color: colors[Math.floor(Math.random()*colors.length)],
        rot: Math.random()*Math.PI*2,
        vr: (Math.random()-0.5)*0.3,
        gravity: 0.28,
        life: 0
      });
    }
    if(!running){ running = true; loop(); }
  }

  function loop(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach(p => {
      p.vy += p.gravity;
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;
      p.life++;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size*0.6);
      ctx.restore();
    });
    particles = particles.filter(p => p.y < canvas.height + 40 && p.life < 260);
    if(particles.length > 0){
      requestAnimationFrame(loop);
    } else {
      running = false;
      ctx.clearRect(0,0,canvas.width,canvas.height);
    }
  }

  document.getElementById('confettiBtn').addEventListener('click', burst);
  document.getElementById('moonWrap').addEventListener('click', () => {
    burst();
    shootingStar();
  });

  // Diekspos supaya bisa dipanggil dari luar (mis. saat amplop dibuka)
  window.launchConfetti = burst;

  function shootingStar(){
    const startX = Math.random()*canvas.width*0.5;
    const startY = Math.random()*canvas.height*0.2;
    let t = 0;
    const trail = [];
    function step(){
      t += 1;
      const x = startX + t*9;
      const y = startY + t*5;
      trail.push({x,y});
      if(trail.length > 18) trail.shift();
      ctx.save();
      trail.forEach((pt, idx) => {
        ctx.globalAlpha = idx/trail.length * 0.9;
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 2, 0, Math.PI*2);
        ctx.fill();
      });
      ctx.restore();
      if(x < canvas.width + 50 && y < canvas.height + 50 && t < 60){
        requestAnimationFrame(step);
      }
    }
    if(!running){ running = true; step(); setTimeout(()=>{ running=false; }, 900); }
    else step();
  }
})();

/* ---------------- Scroll reveal for sections ---------------- */
(function scrollReveal(){
  const targets = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
      }
    });
  }, { threshold: 0.15 });
  targets.forEach(t => observer.observe(t));
})();

/* ---------------- Ambient drifting hearts & petals ---------------- */
(function ambientDrift(){
  const layer = document.getElementById('ambient-layer');
  const symbols = ['♥', '✦', '❀', '✧'];
  const colors = ['#ff9d9d', '#7ce6f2', '#aab6ff', '#ffd873'];

  function spawn(){
    const el = document.createElement('div');
    el.className = 'drift-item';
    el.textContent = symbols[Math.floor(Math.random()*symbols.length)];
    const size = 12 + Math.random()*16;
    el.style.left = (Math.random()*100)+'%';
    el.style.fontSize = size+'px';
    el.style.color = colors[Math.floor(Math.random()*colors.length)];
    el.style.setProperty('--drift-x', (Math.random()*80-40)+'px');
    el.style.setProperty('--drift-r', (Math.random()*40-20)+'deg');
    const dur = 12 + Math.random()*10;
    el.style.animationDuration = dur+'s';
    layer.appendChild(el);
    setTimeout(() => el.remove(), dur*1000 + 200);
  }

  // gentle steady stream
  setInterval(spawn, 1400);
  for(let i=0;i<4;i++) setTimeout(spawn, i*400);
})();

/* ---------------- Cursor / touch sparkle trail ---------------- */
(function cursorSparkle(){
  let lastTime = 0;
  function makeSparkle(x, y){
    const s = document.createElement('div');
    s.className = 'sparkle';
    s.style.left = (x - 3) + 'px';
    s.style.top = (y - 3) + 'px';
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 700);
  }
  function handleMove(x, y){
    const now = Date.now();
    if(now - lastTime < 45) return;
    lastTime = now;
    makeSparkle(x, y);
  }
  window.addEventListener('mousemove', (e) => handleMove(e.clientX, e.clientY));
  window.addEventListener('touchmove', (e) => {
    if(e.touches[0]) handleMove(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: true });
})();

/* ---------------- Moon parallax tilt on mouse ---------------- */
(function moonParallax(){
  const wrap = document.getElementById('moonWrap');
  const moon = wrap.querySelector('.moon');
  wrap.addEventListener('mousemove', (e) => {
    const rect = wrap.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width/2)) / rect.width;
    const dy = (e.clientY - (rect.top + rect.height/2)) / rect.height;
    moon.style.transform = `translate(${dx*10}px, ${dy*10}px)`;
  });
  wrap.addEventListener('mouseleave', () => {
    moon.style.transform = '';
  });
})();

/* ---------------- Slideshow foto otomatis ---------------- */
(function slideshow(){
  const track = document.getElementById('slideshowTrack');
  const dotsWrap = document.getElementById('slideshowDots');
  const prevBtn = document.getElementById('slidePrev');
  const nextBtn = document.getElementById('slideNext');
  if(!track) return;

  const photos = SETTINGS.photos;
  let current = 0;
  let timer = null;

  // Render slides
  photos.forEach((p, i) => {
    const slide = document.createElement('div');
    slide.className = 'slide' + (i === 0 ? ' active' : '');
    slide.innerHTML = `<img src="${p.src}" alt="${p.caption}" loading="lazy"><div class="slide-caption">${p.caption}</div>`;
    track.appendChild(slide);
  });

  // Render dots
  photos.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'sdot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });

  const slides = Array.from(track.querySelectorAll('.slide'));
  const dots = Array.from(dotsWrap.querySelectorAll('.sdot'));

  function render(){
    slides.forEach((s, i) => s.classList.toggle('active', i === current));
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  function goTo(i){
    current = (i + slides.length) % slides.length;
    render();
    restart();
  }

  function next(){ goTo(current + 1); }
  function prev(){ goTo(current - 1); }

  function restart(){
    if(timer) clearInterval(timer);
    timer = setInterval(next, SETTINGS.slideshowIntervalMs || 3500);
  }

  prevBtn.addEventListener('click', prev);
  nextBtn.addEventListener('click', next);

  // Pause auto-play saat user hover (desktop) supaya nyaman dilihat
  const wrap = document.getElementById('slideshowWrap');
  wrap.addEventListener('mouseenter', () => { if(timer) clearInterval(timer); });
  wrap.addEventListener('mouseleave', restart);

  // Swipe untuk mobile
  let touchStartX = 0;
  wrap.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });
  wrap.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if(Math.abs(dx) > 40){ dx > 0 ? prev() : next(); }
  }, { passive: true });

  if(slides.length > 1) restart();
})();
