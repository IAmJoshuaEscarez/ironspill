(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function a(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(i){if(i.ep)return;i.ep=!0;const n=a(i);fetch(i.href,n)}})();function w(){"serviceWorker"in navigator&&window.addEventListener("load",async()=>{try{await navigator.serviceWorker.register("/sw.js"),console.log("✅ Service Worker registered")}catch(t){console.error("SW registration failed:",t)}})}function T(t){return`<main class="relative">${t}</main>`}function k(){return`
    <div class="min-h-screen relative z-10 p-4 md:p-6 flex flex-col">
      <!-- Top Bar -->
      <div class="flex items-start justify-between panel-3d" style="opacity:0">
        <!-- Title Left -->
        <div class="flex flex-col">
          <div class="inline-block px-3 py-1 mb-1 w-fit" style="background:var(--metal-gold);color:#000;font-family:'Orbitron';font-size:9px;font-weight:900;letter-spacing:2px;text-transform:uppercase;clip-path:polygon(3px 0,100% 0,100% calc(100% - 3px),calc(100% - 3px) 100%,0 100%,0 3px)">MODEL 51</div>
          <h1 class="text-4xl md:text-5xl font-black tracking-wider font-[Orbitron] chrome-text" style="filter:drop-shadow(2px 2px 0 #000);line-height:1">Haru</h1>
          <div class="text-xs tracking-[0.25em] text-[#B22222] font-[Rajdhani] font-bold" style="text-shadow:0 1px 0 rgba(0,0,0,.4)">PUMP & VALVE CONTROL</div>
        </div>

        <!-- Arc Reactor Right -->
        <div class="relative w-28 h-28 md:w-32 md:h-32 flex items-center justify-center flex-shrink-0">
          <div class="absolute inset-0 rounded-full border-[2px] border-[#333]" style="animation:spin 25s linear infinite"></div>
          <div class="absolute inset-1 rounded-full border-[1px] border-dashed border-[#444]" style="animation:spin 18s linear infinite reverse"></div>
          <div class="absolute inset-3 rounded-full" style="background:radial-gradient(circle,#1a0505 0%,#000 70%);border:1px solid #222;animation:pulse-ring 2.5s ease-in-out infinite"></div>
          <div class="absolute inset-6 rounded-full" style="background:radial-gradient(circle,#DAA520 0%,#8B0000 50%,transparent 70%);animation:coreGlow 2s ease-in-out infinite"></div>
          <div class="text-center z-10">
            <div class="text-[9px] font-[Orbitron] font-bold text-[#DAA520]">ARC</div>
            <div class="text-sm font-[Orbitron] font-black text-white" style="text-shadow:0 0 10px #DAA520">ONLINE</div>
          </div>
        </div>
      </div>

      <!-- Main HUD Area -->
      <div class="flex-1 flex items-center justify-center gap-4 md:gap-8 my-4">
        <!-- Left Readouts -->
        <div class="flex flex-col gap-3 panel-3d" style="animation-delay:.1s;opacity:0">
          <div class="text-right pr-2">
            <div class="text-[9px] font-[Orbitron] font-bold text-[#A9A9A9] uppercase tracking-wider">Pressure</div>
            <div id="r-pressure" class="text-2xl font-black font-[Rajdhani] text-[#FFD700]" style="text-shadow:0 0 10px rgba(255,215,0,.3)">0 PSI</div>
          </div>
          <div class="text-right pr-2">
            <div class="text-[9px] font-[Orbitron] font-bold text-[#A9A9A9] uppercase tracking-wider">Flow</div>
            <div id="r-flow" class="text-2xl font-black font-[Rajdhani] text-[#FFD700]" style="text-shadow:0 0 10px rgba(255,215,0,.3)">0 L/M</div>
          </div>
          <div class="text-right pr-2">
            <div class="text-[9px] font-[Orbitron] font-bold text-[#A9A9A9] uppercase tracking-wider">Temp</div>
            <div id="r-temp" class="text-2xl font-black font-[Rajdhani] text-[#FFD700]" style="text-shadow:0 0 10px rgba(255,215,0,.3)">24.2C</div>
          </div>
        </div>

        <!-- Center Controls (no panel) -->
        <div class="flex flex-col gap-4 w-full max-w-xs panel-3d" style="animation-delay:.2s;opacity:0">
          <!-- Status Header -->
          <div class="flex items-center justify-between pb-2" style="border-bottom:1px solid rgba(218,165,32,.3)">
            <span class="text-[10px] font-[Orbitron] font-bold tracking-[0.3em] text-[#A9A9A9] uppercase">System Controls</span>
            <span class="w-2 h-2 rounded-full bg-[#DAA520] animate-pulse"></span>
          </div>

          <!-- Pump -->
          <div>
            <div class="flex items-center justify-between mb-1">
              <span class="text-xs font-bold font-[Orbitron] text-[#DAA520]">MAIN PUMP</span>
              <button id="btn-pump" class="metal-btn px-5 py-1.5 text-[10px] rounded-sm">START PUMP</button>
            </div>
            <div class="metal-track h-1.5"><div id="pump-bar" class="metal-fill h-full w-0"></div></div>
          </div>

          <!-- Valve -->
          <div>
            <div class="flex items-center justify-between mb-1">
              <span class="text-xs font-bold font-[Orbitron] text-[#DAA520]">VALVE A</span>
              <div class="flex gap-2">
                <button id="btn-open" class="metal-btn metal-btn-gold px-4 py-1.5 text-[9px] rounded-sm">OPEN</button>
                <button id="btn-close" class="metal-btn px-4 py-1.5 text-[9px] rounded-sm">CLOSE</button>
              </div>
            </div>
            <div class="metal-track h-1.5"><div id="valve-bar" class="metal-fill metal-fill-red h-full w-0"></div></div>
          </div>
        </div>

        <!-- Right spacer (balance) -->
        <div class="w-20 hidden md:block"></div>
      </div>

      <!-- Bottom Log -->
      <div class="panel-3d" style="animation-delay:.3s;opacity:0">
        <div class="flex items-center justify-center gap-3 mb-2">
          <div class="h-px flex-1 bg-[#333]"></div>
          <span class="text-[10px] font-[Orbitron] font-bold tracking-widest text-[#A9A9A9]">Haru Industries</span>
          <div class="h-px flex-1 bg-[#333]"></div>
        </div>
        <div class="font-[Orbitron] text-[10px] text-[#A9A9A9] p-2 text-center" style="letter-spacing:.5px">
          <span class="text-[#DAA520] font-bold">&gt;&gt; </span><span id="sys-log">System initialized...</span>
        </div>
      </div>
    </div>
  `}function L(){let t=!1,e=!1,a=0,r=0,i=null;const n=s=>document.getElementById(s),o=s=>{const l=n("sys-log");l&&(l.textContent=s)};function u(){const s=n("btn-pump"),l=n("pump-bar");s&&(t?(s.textContent="STOP PUMP",s.classList.add("active"),l.style.width="100%"):(s.textContent="START PUMP",s.classList.remove("active"),l.style.width="0%"))}function h(){const s=n("btn-open"),l=n("btn-close"),m=n("valve-bar");s&&(e?(s.classList.add("active"),l.classList.remove("active"),m.style.width="100%"):(s.classList.remove("active"),l.classList.add("active"),m.style.width="0%"))}function x(){const s=n("r-pressure"),l=n("r-flow"),m=n("r-temp");s&&(s.textContent=Math.round(a)+" PSI"),l&&(l.textContent=Math.round(r)+" L/M"),m&&(m.textContent=(24+Math.random()*2).toFixed(1)+"C")}function b(){t?(a=Math.min(120,a+2),r=Math.min(80,r+1.5)):(a=Math.max(0,a-1),r=Math.max(0,r-.8)),e&&a>0?r=Math.min(80,r+.5):e||(r=Math.max(0,r-2)),x()}const g=n("btn-pump"),v=n("btn-open"),y=n("btn-close");g&&g.addEventListener("click",()=>{t=!t,u(),o(t?"PUMP ENGAGED! System GO!":"Pump halted."),t&&!i?i=setInterval(b,200):!t&&!e&&a<1&&(clearInterval(i),i=null)}),v&&v.addEventListener("click",()=>{e=!0,h(),o("Valve OPEN! Flow active."),t&&!i&&(i=setInterval(b,200))}),y&&y.addEventListener("click",()=>{e=!1,h(),o("Valve SEALED! Flow stopped."),!t&&a<1&&(clearInterval(i),i=null)}),u(),h(),x()}function O(){return k()}function P(){L()}const V={"/":O};function R(){return'<div class="p-6 text-center text-[#00d4ff]"><h2 class="text-xl font-bold font-[Orbitron]">404 - NOT FOUND</h2></div>'}function M(){let t=location.hash.slice(1)||"/";return t.startsWith("/")||(t="/"+t),(V[t]||R)()}function C(t){const e=()=>{t(M()),P()};window.addEventListener("hashchange",e),e()}const E="/assets/dadys%20home-CpiRDLye.mp3";let f=null,c=null,p=null;function d(){return f||(f=new(window.AudioContext||window.webkitAudioContext)),f.state==="suspended"&&f.resume(),f}function S(){try{const t=d(),e=t.sampleRate*2,a=t.createBuffer(1,e,t.sampleRate),r=a.getChannelData(0);for(let u=0;u<e;u++)r[u]=(Math.random()*2-1)*.12;c=t.createBufferSource(),c.buffer=a,c.loop=!0;const i=t.createBiquadFilter();i.type="lowpass",i.frequency.value=180,i.Q.value=.5;const n=t.createOscillator();n.type="sawtooth",n.frequency.value=45;const o=t.createGain();o.gain.value=.04,p=t.createGain(),p.gain.setValueAtTime(.06,t.currentTime),n.connect(o),o.connect(p),c.connect(i),i.connect(p),p.connect(t.destination),n.start(),c.start()}catch{}}function D(){try{p&&p.gain.exponentialRampToValueAtTime(.001,f.currentTime+.4),setTimeout(()=>{c&&(c.stop(),c=null)},500)}catch{}}function A(){try{const t=d(),e=t.createOscillator(),a=t.createGain();e.type="sine",e.frequency.setValueAtTime(400,t.currentTime),e.frequency.exponentialRampToValueAtTime(1200,t.currentTime+.08),e.frequency.exponentialRampToValueAtTime(300,t.currentTime+.2),a.gain.setValueAtTime(.06,t.currentTime),a.gain.exponentialRampToValueAtTime(.001,t.currentTime+.25),e.connect(a),a.connect(t.destination),e.start(),e.stop(t.currentTime+.25)}catch{}}function B(){try{const t=d(),e=t.createOscillator(),a=t.createGain();e.type="square",e.frequency.setValueAtTime(800,t.currentTime),e.frequency.exponentialRampToValueAtTime(2e3,t.currentTime+.05),e.frequency.exponentialRampToValueAtTime(600,t.currentTime+.15),a.gain.setValueAtTime(.03,t.currentTime),a.gain.exponentialRampToValueAtTime(.001,t.currentTime+.18),e.connect(a),a.connect(t.destination),e.start(),e.stop(t.currentTime+.18)}catch{}}function F(){try{const t=d(),e=t.createOscillator(),a=t.createGain(),r=t.createBiquadFilter();e.type="triangle",e.frequency.setValueAtTime(600,t.currentTime),e.frequency.exponentialRampToValueAtTime(150,t.currentTime+.12),r.type="bandpass",r.frequency.value=400,r.Q.value=8,a.gain.setValueAtTime(.1,t.currentTime),a.gain.exponentialRampToValueAtTime(.001,t.currentTime+.2),e.connect(r),r.connect(a),a.connect(t.destination),e.start(),e.stop(t.currentTime+.2)}catch{}}function q(){try{const t=d(),e=t.createOscillator(),a=t.createGain();e.type="sine",e.frequency.setValueAtTime(1200,t.currentTime),a.gain.setValueAtTime(.04,t.currentTime),a.gain.exponentialRampToValueAtTime(.001,t.currentTime+.12),e.connect(a),a.connect(t.destination),e.start(),e.stop(t.currentTime+.12)}catch{}}function I(){try{const t=d(),e=t.createOscillator(),a=t.createGain();e.type="sine",e.frequency.setValueAtTime(80,t.currentTime),e.frequency.exponentialRampToValueAtTime(160,t.currentTime+1.5),a.gain.setValueAtTime(.05,t.currentTime),a.gain.exponentialRampToValueAtTime(.001,t.currentTime+2),e.connect(a),a.connect(t.destination),e.start(),e.stop(t.currentTime+2)}catch{}}function N(t){try{const e=d();fetch(E).then(a=>a.arrayBuffer()).then(a=>e.decodeAudioData(a)).then(a=>{const r=e.createBufferSource();r.buffer=a;const i=e.createGain();i.gain.value=.85,r.connect(i),i.connect(e.destination),r.onended=t,r.start(0)}).catch(()=>t()),setTimeout(t,8e3)}catch{t()}}function j(t,e){D(),t.style.opacity="0",t.style.transition="opacity 1.2s ease",setTimeout(()=>{t.style.display="none",e()},1400)}function G(t,e){d().resume(),window.speechSynthesis.cancel(),I(),S(),setTimeout(()=>A(),400),setTimeout(()=>B(),700),setTimeout(()=>A(),1100),setTimeout(()=>F(),1800),setTimeout(()=>q(),2e3),t.innerHTML=`
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
  `,setTimeout(()=>{N(()=>j(t,e))},2500)}function H(t){const e=document.getElementById("boot-screen");if(!e){t();return}e.innerHTML=`
    <style>
      @keyframes pulseTap { 0%,100%{opacity:.6;transform:scale(1)} 50%{opacity:1;transform:scale(1.05)} }
      .tap-screen{position:fixed;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;z-index:200}
      .tap-icon{width:80px;height:80px;border:3px solid #DAA520;border-radius:50%;display:flex;align-items:center;justify-content:center;animation:pulseTap 1.5s ease-in-out infinite}
      .tap-icon svg{width:40px;height:40px;fill:#DAA520}
      .tap-text{font-family:'Orbitron',sans-serif;font-size:14px;color:#DAA520;letter-spacing:3px;margin-top:20px;text-transform:uppercase}
    </style>
    <div class="tap-screen" id="tap-start">
      <div class="tap-icon">
        <svg viewBox="0 0 24 24"><path d="M9 11.24V7.5C9 6.12 10.12 5 11.5 5S14 6.12 14 7.5v3.74c1.21-.81 2-2.18 2-3.74C16 5.01 13.99 3 11.5 3S7 5.01 7 7.5c0 1.56.79 2.93 2 3.74zm9.84 4.63l-4.54-2.26c-.17-.07-.35-.11-.54-.11H13v-6c0-.83-.67-1.5-1.5-1.5S10 6.67 10 7.5v10.74l-3.43-.72c-.08-.01-.15-.03-.24-.03-.31 0-.59.13-.79.33l-.79.8 4.94 4.94c.27.27.65.44 1.06.44h6.79c.75 0 1.33-.55 1.44-1.28l.75-5.27c.01-.07.02-.14.02-.2 0-.62-.38-1.16-.91-1.38z"/></svg>
      </div>
      <div class="tap-text">Tap to Activate</div>
    </div>
  `,document.getElementById("tap-start").addEventListener("click",()=>{G(e,t)},{once:!0})}function z(){const t=document.createElement("div");t.className="scanlines",document.body.appendChild(t);const e=document.createElement("div");e.className="metal-glow",document.body.appendChild(e);const a=document.createElement("div");a.className="metal-bg",document.body.appendChild(a)}function X(){const t=document.getElementById("app");t&&(t.classList.remove("opacity-0"),t.classList.add("opacity-100"))}w();z();function U(t){const e=document.getElementById("app");e&&(e.innerHTML=T(t))}H(()=>{C(U),X()});
