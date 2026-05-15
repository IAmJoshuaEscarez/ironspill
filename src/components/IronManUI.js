export function template() {
  return `
    <div class="min-h-screen relative z-10 p-4 md:p-6 flex flex-col">
      <!-- Top Bar -->
      <div class="flex items-start justify-between panel-3d" style="opacity:0">
        <!-- Title Left -->
        <div class="flex flex-col">
          <div class="inline-block px-3 py-1 mb-1 w-fit" style="background:var(--metal-gold);color:#000;font-family:'Orbitron';font-size:9px;font-weight:900;letter-spacing:2px;text-transform:uppercase;clip-path:polygon(3px 0,100% 0,100% calc(100% - 3px),calc(100% - 3px) 100%,0 100%,0 3px)">MODEL 51</div>
          <h1 class="text-4xl md:text-5xl font-black tracking-wider font-[Orbitron] chrome-text" style="filter:drop-shadow(2px 2px 0 #000);line-height:1">IronSpill</h1>
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
            <div class="text-[9px] font-[Orbitron] font-bold text-[#A9A9A9] uppercase tracking-wider">Main Pump</div>
            <div id="r-pressure" class="text-2xl font-black font-[Rajdhani] text-[#FFD700]" style="text-shadow:0 0 10px rgba(255,215,0,.3)">OFF</div>
          </div>
          <div class="text-right pr-2">
            <div class="text-[9px] font-[Orbitron] font-bold text-[#A9A9A9] uppercase tracking-wider">Water Pump</div>
            <div id="r-flow" class="text-2xl font-black font-[Rajdhani] text-[#FFD700]" style="text-shadow:0 0 10px rgba(255,215,0,.3)">OFF</div>
          </div>
          <div class="text-right pr-2">
            <div class="text-[9px] font-[Orbitron] font-bold text-[#A9A9A9] uppercase tracking-wider">Oil Pump</div>
            <div id="r-temp" class="text-2xl font-black font-[Rajdhani] text-[#FFD700]" style="text-shadow:0 0 10px rgba(255,215,0,.3)">OFF</div>
          </div>
        </div>

        <!-- Center Controls (no panel) -->
        <div class="flex flex-col gap-4 w-full max-w-xs panel-3d" style="animation-delay:.2s;opacity:0">
          <!-- Status Header -->
          <div class="flex items-center justify-between pb-2" style="border-bottom:1px solid rgba(218,165,32,.3)">
            <span class="text-[10px] font-[Orbitron] font-bold tracking-[0.3em] text-[#A9A9A9] uppercase">Pump Controls</span>
            <div class="flex items-center gap-2">
              <span class="text-[9px] font-[Rajdhani] font-bold text-[#A9A9A9] uppercase tracking-wider">Target <span id="esp-target">192.168.4.1</span></span>
              <span class="w-2 h-2 rounded-full bg-[#DAA520] animate-pulse"></span>
            </div>
          </div>

          <!-- Main Pump -->
          <div>
            <div class="flex items-center justify-between mb-1">
              <span class="text-xs font-bold font-[Orbitron] text-[#DAA520]">MAIN PUMP</span>
              <button id="btn-main" class="metal-btn px-5 py-1.5 text-[10px] rounded-sm">START</button>
            </div>
            <div class="metal-track h-1.5"><div id="main-bar" class="metal-fill h-full w-0"></div></div>
          </div>

          <!-- Water Pump -->
          <div>
            <div class="flex items-center justify-between mb-1">
              <span class="text-xs font-bold font-[Orbitron] text-[#DAA520]">WATER PUMP</span>
              <button id="btn-water" class="metal-btn px-5 py-1.5 text-[10px] rounded-sm">START</button>
            </div>
            <div class="metal-track h-1.5"><div id="water-bar" class="metal-fill h-full w-0"></div></div>
          </div>

          <!-- Oil Pump -->
          <div>
            <div class="flex items-center justify-between mb-1">
              <span class="text-xs font-bold font-[Orbitron] text-[#DAA520]">OIL PUMP</span>
              <button id="btn-oil" class="metal-btn px-5 py-1.5 text-[10px] rounded-sm">START</button>
            </div>
            <div class="metal-track h-1.5"><div id="oil-bar" class="metal-fill h-full w-0"></div></div>
          </div>

          <div class="text-[9px] font-[Orbitron] font-bold text-[#A9A9A9] uppercase tracking-wider text-center pt-2" style="border-top:1px solid rgba(218,165,32,.2)">Valves: Auto Sensor Mode</div>
        </div>

        <!-- Right spacer (balance) -->
        <div class="w-20 hidden md:block"></div>
      </div>

      <!-- Bottom Log -->
      <div class="panel-3d" style="animation-delay:.3s;opacity:0">
        <div class="flex items-center justify-center gap-3 mb-2">
          <div class="h-px flex-1 bg-[#333]"></div>
          <span class="text-[10px] font-[Orbitron] font-bold tracking-widest text-[#A9A9A9]">IronSpill Industries</span>
          <div class="h-px flex-1 bg-[#333]"></div>
        </div>
        <div class="font-[Orbitron] text-[10px] text-[#A9A9A9] p-2 text-center" style="letter-spacing:.5px">
          <span class="text-[#DAA520] font-bold">&gt;&gt; </span><span id="sys-log">System initialized...</span>
        </div>
      </div>
    </div>
  `;
}
