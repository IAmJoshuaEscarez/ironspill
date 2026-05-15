import voiceMp3 from '../../assets/dadys home.mp3';
let audioCtx = null, thrusterNode = null, thrusterGain = null;
function getCtx() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (audioCtx.state === 'suspended') audioCtx.resume();
  return audioCtx;
}

function startThruster() {
  try {
    const ctx = getCtx();
    const len = ctx.sampleRate * 2;
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * 0.12;
    thrusterNode = ctx.createBufferSource();
    thrusterNode.buffer = buf;
    thrusterNode.loop = true;
    const f = ctx.createBiquadFilter();
    f.type = 'lowpass'; f.frequency.value = 180; f.Q.value = 0.5;
    const osc = ctx.createOscillator();
    osc.type = 'sawtooth'; osc.frequency.value = 45;
    const og = ctx.createGain(); og.gain.value = 0.04;
    thrusterGain = ctx.createGain();
    thrusterGain.gain.setValueAtTime(0.06, ctx.currentTime);
    osc.connect(og); og.connect(thrusterGain);
    thrusterNode.connect(f); f.connect(thrusterGain);
    thrusterGain.connect(ctx.destination);
    osc.start();
    thrusterNode.start();
  } catch(e) {}
}
function stopThruster() {
  try {
    if (thrusterGain) thrusterGain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.4);
    setTimeout(() => { if (thrusterNode) { thrusterNode.stop(); thrusterNode = null; } }, 500);
  } catch(e) {}
}

function playServo() {
  try {
    const ctx = getCtx();
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = 'sine'; o.frequency.setValueAtTime(400, ctx.currentTime);
    o.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.08);
    o.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.2);
    g.gain.setValueAtTime(0.06, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
    o.connect(g); g.connect(ctx.destination);
    o.start(); o.stop(ctx.currentTime + 0.25);
  } catch(e) {}
}

function playServoHigh() {
  try {
    const ctx = getCtx();
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = 'square'; o.frequency.setValueAtTime(800, ctx.currentTime);
    o.frequency.exponentialRampToValueAtTime(2000, ctx.currentTime + 0.05);
    o.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.15);
    g.gain.setValueAtTime(0.03, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
    o.connect(g); g.connect(ctx.destination);
    o.start(); o.stop(ctx.currentTime + 0.18);
  } catch(e) {}
}

function playClank() {
  try {
    const ctx = getCtx();
    const o = ctx.createOscillator(), g = ctx.createGain(), f = ctx.createBiquadFilter();
    o.type = 'triangle'; o.frequency.setValueAtTime(600, ctx.currentTime);
    o.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.12);
    f.type = 'bandpass'; f.frequency.value = 400; f.Q.value = 8;
    g.gain.setValueAtTime(0.1, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
    o.connect(f); f.connect(g); g.connect(ctx.destination);
    o.start(); o.stop(ctx.currentTime + 0.2);
  } catch(e) {}
}

function playBeep() {
  try {
    const ctx = getCtx();
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = 'sine'; o.frequency.setValueAtTime(1200, ctx.currentTime);
    g.gain.setValueAtTime(0.04, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
    o.connect(g); g.connect(ctx.destination);
    o.start(); o.stop(ctx.currentTime + 0.12);
  } catch(e) {}
}

function playBootHum() {
  try {
    const ctx = getCtx();
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = 'sine'; o.frequency.setValueAtTime(80, ctx.currentTime);
    o.frequency.exponentialRampToValueAtTime(160, ctx.currentTime + 1.5);
    g.gain.setValueAtTime(0.05, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2);
    o.connect(g); g.connect(ctx.destination);
    o.start(); o.stop(ctx.currentTime + 2);
  } catch(e) {}
}

function speakJARVIS(onDone) {
  try {
    const ctx = getCtx();
    fetch(voiceMp3)
      .then(r => r.arrayBuffer())
      .then(buf => ctx.decodeAudioData(buf))
      .then(buffer => {
        const src = ctx.createBufferSource();
        src.buffer = buffer;
        const gain = ctx.createGain();
        gain.gain.value = 0.85;
        src.connect(gain);
        gain.connect(ctx.destination);
        src.onended = onDone;
        src.start(0);
      })
      .catch(() => onDone());
    setTimeout(onDone, 8000);
  } catch(e) { onDone(); }
}

function endBoot(scr, onDone) {
  stopThruster();
  scr.style.opacity = '0';
  scr.style.transition = 'opacity 1.2s ease';
  setTimeout(() => { scr.style.display = 'none'; onDone(); }, 1400);
}

function runBoot(scr, onDone) {
  getCtx().resume();
  window.speechSynthesis.cancel();
  playBootHum();
  startThruster();
  setTimeout(() => playServo(), 400);
  setTimeout(() => playServoHigh(), 700);
  setTimeout(() => playServo(), 1100);
  setTimeout(() => playClank(), 1800);
  setTimeout(() => playBeep(), 2000);

  scr.innerHTML = `
    <style>
      @keyframes suitFlyIn {
        0% { transform: perspective(600px) translateZ(-800px) translateY(80px) scale(.2); opacity: 0; }
        40% { transform: perspective(600px) translateZ(-300px) translateY(-20px) scale(.7); opacity: 1; }
        70% { transform: perspective(600px) translateZ(-80px) translateY(10px) scale(.95); opacity: 1; }
        100% { transform: perspective(600px) translateZ(0) translateY(0) scale(1); opacity: 1; }
      }
      @keyframes suitGlow {
        0%,100% { box-shadow: none; }
        50% { box-shadow: none; }
      }
      @keyframes thrusterFlame {
        0% { height: 40px; opacity: .6; }
        50% { height: 70px; opacity: 1; }
        100% { height: 40px; opacity: .6; }
      }
      @keyframes faceLock {
        0% { transform: perspective(600px) translateZ(0) scale(1); }
        80% { transform: perspective(600px) translateZ(40px) scale(1.15); opacity: 1; }
        100% { transform: perspective(600px) translateZ(80px) scale(1.4); opacity: 0; }
      }
      .suit-container { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); perspective: 800px; }
      .suit-helmet {
        width: 160px; height: 200px; position: relative;
        animation: suitFlyIn 2.2s cubic-bezier(.25,.46,.45,.94) forwards, suitGlow 2s ease-in-out 2.2s infinite;
        opacity: 0; transform-style: preserve-3d;
      }
      .suit-helm-top {
        position: absolute; top: 0; left: 50%; transform: translateX(-50%);
        width: 120px; height: 70px; background: linear-gradient(180deg,#4a4a4a 0%,#2a2a2a 40%,#1a1a1a 100%);
        border: 2px solid #777; border-radius: 60px 60px 0 0;
      }
      .suit-helm-top::after {
        content: ''; position: absolute; top: 8px; left: 50%; transform: translateX(-50%);
        width: 30px; height: 35px; background: linear-gradient(180deg,#DAA520,#8B6914);
        clip-path: polygon(30% 0,70% 0,100% 100%,0 100%); border-radius: 2px;
      }
      .suit-visor {
        position: absolute; top: 58px; left: 50%; transform: translateX(-50%);
        width: 140px; height: 28px; background: #0a0a0a;
        border: 2px solid #DAA520; border-radius: 14px;
      }
      .suit-eye-left, .suit-eye-right {
        position: absolute; top: 6px; width: 42px; height: 10px; background: #DAA520;
        border-radius: 5px;
      }
      .suit-eye-left { left: 18px; }
      .suit-eye-right { right: 18px; }
      .suit-cheek-left, .suit-cheek-right {
        position: absolute; top: 88px; width: 75px; height: 60px;
        background: linear-gradient(135deg,#5a0000 0%,#8a0a0a 50%,#3a0000 100%);
        border: 2px solid #8B0000;
      }
      .suit-cheek-left { left: -2px; border-radius: 0 0 20px 40px; clip-path: polygon(0 0,80% 10%,100% 100%,0 100%); }
      .suit-cheek-right { right: -2px; border-radius: 0 0 40px 20px; clip-path: polygon(20% 10%,100% 0,100% 100%,0 100%); }
      .suit-jaw {
        position: absolute; bottom: 0; left: 50%; transform: translateX(-50%);
        width: 90px; height: 45px;
        background: linear-gradient(180deg,#3a3a3a,#1a1a1a);
        border: 2px solid #555; border-top: none;
        border-radius: 0 0 35px 35px;
      }
      .suit-arc {
        position: absolute; top: 108px; left: 50%; transform: translateX(-50%);
        width: 50px; height: 50px; border-radius: 50%;
        background: radial-gradient(circle,#1a0505 0%,#000 70%);
        border: 3px solid #DAA520;
      }
      .suit-arc::after {
        content: ''; position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
        width: 22px; height: 22px; border-radius: 50%;
        background: #DAA520;
        animation: none;
      }
      .suit-thruster-left, .suit-thruster-right {
        position: absolute; top: 160px; width: 18px; height: 18px; border-radius: 50%;
        background: radial-gradient(circle,#fff 0%,#ff6600 40%,#8B0000 70%,transparent 100%);
        opacity: .8; z-index: -1;
      }
      .suit-thruster-left { left: -20px; }
      .suit-thruster-right { right: -20px; }
      .suit-flame-left, .suit-flame-right {
        position: absolute; top: 175px; width: 12px; height: 50px;
        background: linear-gradient(180deg,rgba(255,140,0,.8),rgba(255,69,0,.4),transparent);
        border-radius: 0 0 50% 50%; filter: blur(3px);
        animation: thrusterFlame .2s ease-in-out infinite alternate;
      }
      .suit-flame-left { left: -17px; }
      .suit-flame-right { right: -17px; }
      /* High-tech bg effects */
      .hud-bg { position:fixed;inset:0;pointer-events:none;z-index:0;overflow:hidden;background:radial-gradient(ellipse at 30% 50%,rgba(139,0,0,.15) 0%,transparent 50%),radial-gradient(ellipse at 70% 50%,rgba(30,60,120,.15) 0%,transparent 50%),#0a0a0a}
      .hud-grid { position:absolute;inset:0;background:repeating-linear-gradient(0deg,transparent,transparent 35px,rgba(218,165,32,.06) 35px,rgba(218,165,32,.06) 36px),repeating-linear-gradient(90deg,transparent,transparent 35px,rgba(218,165,32,.06) 35px,rgba(218,165,32,.06) 36px);animation:gridPulse 3s ease-in-out infinite}
      @keyframes gridPulse { 0%,100%{opacity:.4} 50%{opacity:.8} }
      .scan-line { position:absolute;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,rgba(218,165,32,.7),transparent);opacity:.8;animation:scanMove 2.5s linear infinite}
      .scan-line:nth-child(2){animation-delay:.8s;background:linear-gradient(90deg,transparent,rgba(255,68,68,.7),transparent);top:30%}
      .scan-line:nth-child(3){animation-delay:1.6s;background:linear-gradient(90deg,transparent,rgba(68,136,255,.7),transparent);top:70%}
      @keyframes scanMove { 0%{transform:translateX(-100%)} 100%{transform:translateX(100%)} }
      .data-bar { position:absolute;width:80px;height:3px;border-radius:1px;opacity:.6;animation:dataSlide 3s linear infinite}
      .data-bar:nth-child(1){top:15%;left:10%;background:#DAA520;animation-delay:0s}
      .data-bar:nth-child(2){top:25%;left:80%;background:#ff4444;animation-delay:.4s}
      .data-bar:nth-child(3){top:45%;left:5%;background:#4488ff;animation-delay:.8s}
      .data-bar:nth-child(4){top:60%;left:85%;background:#DAA520;animation-delay:1.2s}
      .data-bar:nth-child(5){top:75%;left:15%;background:#ff4444;animation-delay:1.6s}
      .data-bar:nth-child(6){top:85%;left:75%;background:#4488ff;animation-delay:2s}
      @keyframes dataSlide { 0%{transform:translateX(0);opacity:0} 10%{opacity:.7} 90%{opacity:.7} 100%{transform:translateX(200px);opacity:0} }
      .hud-corner { position:absolute;width:60px;height:60px;border:2px solid rgba(218,165,32,.4);animation:cornerPulse 2s ease-in-out infinite}
      .hud-corner-tl { top:30px;left:30px;border-right:none;border-bottom:none}
      .hud-corner-tr { top:30px;right:30px;border-left:none;border-bottom:none}
      .hud-corner-bl { bottom:30px;left:30px;border-right:none;border-top:none}
      .hud-corner-br { bottom:30px;right:30px;border-left:none;border-top:none}
      @keyframes cornerPulse { 0%,100%{border-color:rgba(218,165,32,.25)} 50%{border-color:rgba(218,165,32,.6)} }
      .radar-sweep { position:absolute;top:50%;left:50%;width:300px;height:300px;transform:translate(-50%,-50%);border:1px solid rgba(218,165,32,.15);border-radius:50%;animation:radarPulse 3s ease-out infinite}
      .radar-sweep:nth-child(2){width:200px;height:200px;animation-delay:1s;border-color:rgba(255,68,68,.12)}
      .radar-sweep:nth-child(3){width:100px;height:100px;animation-delay:2s;border-color:rgba(68,136,255,.12)}
      @keyframes radarPulse { 0%{transform:translate(-50%,-50%) scale(.8);opacity:0} 50%{opacity:1} 100%{transform:translate(-50%,-50%) scale(1.3);opacity:0} }
      .crosshair-h,.crosshair-v { position:absolute;background:rgba(218,165,32,.25);animation:crossFade 2s ease-in-out infinite}
      .crosshair-h { top:50%;left:0;right:0;height:1px}
      .crosshair-v { left:50%;top:0;bottom:0;width:1px}
      @keyframes crossFade { 0%,100%{opacity:.2} 50%{opacity:.5} }
      .tech-ring { position:absolute;border-radius:50%;border:1px dashed rgba(218,165,32,.15);animation:ringRotate 20s linear infinite}
      .tech-ring:nth-child(1){width:500px;height:500px;top:50%;left:50%;transform:translate(-50%,-50%)}
      .tech-ring:nth-child(2){width:400px;height:400px;top:50%;left:50%;transform:translate(-50%,-50%);animation-direction:reverse;animation-duration:15s;border-color:rgba(255,68,68,.1)}
      .tech-ring:nth-child(3){width:600px;height:600px;top:50%;left:50%;transform:translate(-50%,-50%);animation-duration:25s;border-color:rgba(68,136,255,.1)}
      @keyframes ringRotate { 0%{transform:translate(-50%,-50%) rotate(0deg)} 100%{transform:translate(-50%,-50%) rotate(360deg)} }
      .tech-dot { position:absolute;width:4px;height:4px;border-radius:50%;background:rgba(218,165,32,.4);animation:dotPulse 1.5s ease-in-out infinite}
      .tech-dot:nth-child(1){top:20%;left:20%}
      .tech-dot:nth-child(2){top:80%;left:80%;animation-delay:.3s;background:rgba(255,68,68,.4)}
      .tech-dot:nth-child(3){top:30%;left:70%;animation-delay:.6s;background:rgba(68,136,255,.4)}
      .tech-dot:nth-child(4){top:70%;left:30%;animation-delay:.9s}
      @keyframes dotPulse { 0%,100%{opacity:.3;transform:scale(1)} 50%{opacity:1;transform:scale(1.5)} }
    </style>
    <div class="hud-bg">
      <div class="hud-grid"></div>
      <div class="crosshair-h"></div><div class="crosshair-v"></div>
      <div class="scan-line" style="top:15%"></div>
      <div class="scan-line"></div>
      <div class="scan-line"></div>
      <div class="data-bar"></div>
      <div class="data-bar"></div>
      <div class="data-bar"></div>
      <div class="data-bar"></div>
      <div class="data-bar"></div>
      <div class="data-bar"></div>
      <div class="radar-sweep"></div>
      <div class="radar-sweep"></div>
      <div class="radar-sweep"></div>
      <div class="hud-corner hud-corner-tl"></div>
      <div class="hud-corner hud-corner-tr"></div>
      <div class="hud-corner hud-corner-bl"></div>
      <div class="hud-corner hud-corner-br"></div>
    </div>
    <div class="suit-container">
      <div class="suit-helmet">
        <div class="suit-helm-top"></div>
        <div class="suit-visor">
          <div class="suit-eye-left"></div>
          <div class="suit-eye-right"></div>
        </div>
        <div class="suit-cheek-left"></div>
        <div class="suit-cheek-right"></div>
        <div class="suit-jaw"></div>
        <div class="suit-arc"></div>
        <div class="suit-thruster-left"></div>
        <div class="suit-thruster-right"></div>
        <div class="suit-flame-left"></div>
        <div class="suit-flame-right"></div>
      </div>
    </div>
  `;

  setTimeout(() => {
    speakJARVIS(() => endBoot(scr, onDone));
  }, 2500);
}

export function bootSequence(onDone) {
  const scr = document.getElementById('boot-screen');
  if (!scr) { onDone(); return; }

  scr.innerHTML = `
    <style>
      @keyframes pulseTap { 0%,100%{opacity:.6;transform:scale(1)} 50%{opacity:1;transform:scale(1.05)} }
      .tap-screen{position:fixed;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;z-index:200}
      .tap-icon{width:80px;height:80px;border:3px solid #DAA520;border-radius:50%;display:flex;align-items:center;justify-content:center;animation:pulseTap 1.5s ease-in-out infinite}
      .tap-icon svg{width:40px;height:40px;fill:#DAA520}
      .tap-text{font-family:'Orbitron',sans-serif;font-size:14px;color:#DAA520;letter-spacing:3px;margin-top:20px;text-transform:uppercase}
      .tap-subtext{font-family:'Orbitron',sans-serif;font-size:10px;color:#A9A9A9;letter-spacing:4px;margin-top:8px;text-transform:uppercase;text-shadow:0 0 8px rgba(218,165,32,.2)}
    </style>
    <div class="tap-screen" id="tap-start">
      <div class="tap-icon">
        <svg viewBox="0 0 24 24"><path d="M9 11.24V7.5C9 6.12 10.12 5 11.5 5S14 6.12 14 7.5v3.74c1.21-.81 2-2.18 2-3.74C16 5.01 13.99 3 11.5 3S7 5.01 7 7.5c0 1.56.79 2.93 2 3.74zm9.84 4.63l-4.54-2.26c-.17-.07-.35-.11-.54-.11H13v-6c0-.83-.67-1.5-1.5-1.5S10 6.67 10 7.5v10.74l-3.43-.72c-.08-.01-.15-.03-.24-.03-.31 0-.59.13-.79.33l-.79.8 4.94 4.94c.27.27.65.44 1.06.44h6.79c.75 0 1.33-.55 1.44-1.28l.75-5.27c.01-.07.02-.14.02-.2 0-.62-.38-1.16-.91-1.38z"/></svg>
      </div>
      <div class="tap-text">Tap to Activate</div>
      <div class="tap-subtext">powered by xui framework</div>
    </div>
  `;

  document.getElementById('tap-start').addEventListener('click', () => {
    runBoot(scr, onDone);
  }, { once: true });
}

export function addEffects() {
  const s = document.createElement('div'); s.className = 'scanlines'; document.body.appendChild(s);
  const g = document.createElement('div'); g.className = 'metal-glow'; document.body.appendChild(g);
  const b = document.createElement('div'); b.className = 'metal-bg'; document.body.appendChild(b);
}

export function revealApp() {
  const a = document.getElementById('app');
  if (a) { a.classList.remove('opacity-0'); a.classList.add('opacity-100'); }
}
