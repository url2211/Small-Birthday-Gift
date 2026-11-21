// ======== APNA TEXT YAHAN BADLO ========
const PASSWORD = "2211";   // birthdate DDMM
const NAME = "Pal";
const WISHES = [
  "Tum meri life ki sabse khoobsurat wajah ho 💖",
  "Teri smile se mera poora din ban jata hai 😊",
  "Tere saath har pal yaadgaar ban jata hai ✨",
  "Hamesha aise hi hasti rehna, main saath hoon 🤗",
  "Ye saal tere liye bohot saari khushiyaan laye 🎁"
];
const LETTER = `Madamji Pal,\n\nAaj tera din hai, aur mere liye tu har din special hai.\n\nBas hamesha khush rehna, baaki sab main sambhal lunga.\n\nHappy Birthday meri jaan ❤️`;
// =======================================

const $ = s => document.querySelector(s), secs = [...document.querySelectorAll('.s')], done = {};
function go(n) { secs.forEach((s, i) => s.classList.toggle('on', i === n)); if (!done[n]) { done[n] = 1; [0, initCake, initBalloons, initEnv][n]?.(); } }

// petals
for (let i = 0; i < 14; i++) { const e = document.createElement('span'); e.className = 'p'; e.textContent = ['🌸', '💗', '✨'][i % 3]; e.style.cssText = `left:${Math.random()*100}%;font-size:${12+Math.random()*14}px;animation-duration:${9+Math.random()*9}s;animation-delay:-${Math.random()*12}s`; $('#petals').append(e); }

// ---- 0. password ----
let pin = '';
'123456789 0⌫'.split('').forEach(k => {
  const b = document.createElement('button'); b.textContent = k === ' ' ? '' : k; if (k === ' ') b.className = 'x';
  b.onclick = () => {
    if (k === '⌫') pin = pin.slice(0, -1); else if (pin.length < 4) pin += k;
    [...$('#pins').children].forEach((d, i) => d.classList.toggle('f', i < pin.length));
    if (pin.length === 4) setTimeout(check, 200);
  };
  $('#pad').append(b);
});
function check() {
  if (pin === PASSWORD) { $('#lk').textContent = '🔓'; $('#lk').classList.add('ok'); burst(innerWidth / 2, innerHeight / 3, 60); setTimeout(() => go(1), 900); }
  else { $('#pins').classList.add('bad'); $('#lmsg').innerHTML = 'Galat password 🙈<br>Hint: birthdate, DD aur MM'; setTimeout(() => { $('#pins').classList.remove('bad'); pin = ''; [...$('#pins').children].forEach(d => d.classList.remove('f')); }, 450); }
}

// ---- 1. cake ----
function initCake() {
  let lit = 0;
  for (let i = 0; i < 3; i++) { const c = document.createElement('button'); c.className = 'cd';
    c.onclick = () => { if (c.classList.contains('on')) return; c.classList.add('on'); if (++lit === 3) { $('#cmsg').textContent = 'Ab dil se wish maango… 🤫'; $('#b1').classList.remove('hide'); burst(innerWidth / 2, innerHeight / 3, 90); } };
    $('#cn').append(c); }
}

// ---- 2. balloons ----
function initBalloons() {
  const cols = ['#ff8fab', '#a78bfa', '#7ecbff', '#ffd166', '#6ee7b7'], pos = [[4, 12], [58, 0], [26, 90], [74, 100], [44, 190]];
  let n = 0;
  WISHES.forEach((w, i) => {
    const b = document.createElement('button'); b.className = 'bl'; b.style.cssText = `background:${cols[i]};left:${pos[i][0]}%;top:${pos[i][1]}px;animation-delay:-${i * .6}s`;
    b.onclick = () => {
      if (b.classList.contains('pop')) return; b.classList.add('pop'); const r = b.getBoundingClientRect(); burst(r.x + 31, r.y + 38, 36);
      const el = $('#wish'); el.textContent = w; el.classList.remove('new'); void el.offsetWidth; el.classList.add('new');
      if (++n === WISHES.length) setTimeout(() => $('#b2').classList.remove('hide'), 600);
    };
    $('#sky').append(b);
  });
}

// ---- 3. letter ----
function initEnv() {
  $('#env').onclick = () => {
    if ($('#env').classList.contains('open')) return; $('#env').classList.add('open'); $('#emsg').textContent = '';
    setTimeout(() => { $('#env').classList.add('hide'); $('#paper').classList.remove('hide'); $('#to').textContent = `Dear ${NAME} 💌`; type(); }, 1500);
  };
}
function type() {
  let i = 0; const t = setInterval(() => { $('#txt').textContent = LETTER.slice(0, ++i); secs[3].scrollTop = 9999; if (i >= LETTER.length) { clearInterval(t); finale(); } }, 45);
}
function finale() {
  $('#end').classList.remove('hide'); secs[3].scrollTop = 9999;
  const f = () => burst(innerWidth * (.15 + Math.random() * .7), innerHeight * (.12 + Math.random() * .35), 46, 1);
  f(); setInterval(f, 700); burst(innerWidth / 2, innerHeight / 2, 140);
}

// ---- confetti / fireworks ----
const cv = $('#fx'), cx = cv.getContext('2d'); let ps = [], run = 0;
const rs = () => { cv.width = innerWidth; cv.height = innerHeight; }; addEventListener('resize', rs); rs();
function burst(x, y, n = 40, fw = 0) {
  const cols = ['#e8588d', '#f6b93b', '#7ecbff', '#a78bfa', '#6ee7b7'];
  for (let i = 0; i < n; i++) { const a = Math.random() * 6.28, v = fw ? 1.5 + Math.random() * 4.5 : 2 + Math.random() * 7;
    ps.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - (fw ? 0 : 4), g: fw ? .05 : .22, l: fw ? 70 : 100, m: fw ? 70 : 100, s: fw ? 2.6 : 7, c: cols[i % 5], r: 0, fw }); }
  if (!run) { run = 1; loop(); }
}
function loop() {
  cx.clearRect(0, 0, cv.width, cv.height);
  ps.forEach(p => { p.x += p.vx; p.y += p.vy; p.vy += p.g; p.l--; p.r += .2; cx.globalAlpha = Math.max(p.l / p.m, 0); cx.fillStyle = p.c;
    if (p.fw) { cx.beginPath(); cx.arc(p.x, p.y, p.s, 0, 6.3); cx.fill(); } else { cx.save(); cx.translate(p.x, p.y); cx.rotate(p.r); cx.fillRect(-p.s / 2, -p.s / 3, p.s, p.s * .6); cx.restore(); } });
  ps = ps.filter(p => p.l > 0); ps.length ? requestAnimationFrame(loop) : run = 0;
}
